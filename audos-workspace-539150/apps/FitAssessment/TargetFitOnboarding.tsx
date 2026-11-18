import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import CvPeerDataConsentLine from '../../components/CvPeerDataConsentLine';
import CvPasteAutofill from '../../components/CvPasteAutofill';
import CourseworkInputs, { courseworkComplete } from '../../components/CourseworkInputs';
import CvRewriteGuide, { CvRewriteFeedbackPanel } from '../../components/CvRewriteGuide';
import FitFeedbackPrompt from '../../components/FitFeedbackPrompt';
import { programTypeLabel } from '../../lib/programType';
import { hasSharedAnswers, isDefaultOcp, readSharedFitAnswers, writeSharedFitAnswers, type SharedFitAnswers } from '../../lib/fitSharedAnswers';
import SaveProgressButton from '../../components/SaveProgressButton';
import type { ProgressSaveStatus } from '../../components/SaveProgressButton';
import WorkStyleAssessment from '../../components/WorkStyleAssessment';
import SoftSkillMcqAssessment from '../../components/SoftSkillMcqAssessment';
import FitResultsSummary, { type FitActionRow, type FitCriterionRow } from '../../components/FitResultsSummary';
import { buildWatchListLines, compactFitEvidence, humanizeCriterionLabel, isMbtiCriterion, isMotivationCriterion, isResearchCriterion, mergePeerHintsIntoActions, resolveMotivationFitScore, stripMatePrefix } from '../../lib/fitResultsPresentation';
import type { McqChoice, SoftSkillQuestion } from '../../lib/softSkillQuestionBank';
import { fetchSoftSkillQuestionBank, selectCoreSoftSkillBank, softSkillMcqComplete } from '../../lib/softSkillQuestionBank';
import { classifyProgramCompany, industryLabel } from '../../lib/programIndustries';
import { competitionSuggestionForTarget, featureRecommendationRows } from '../../lib/fitFeatureRecommendations';
import { getProgramRecruitmentWindow, MAY_BE_OPEN_LABEL, programAvailabilityLabel } from '../../lib/programRecruitmentWindow';
import { fetchIndustryPeerBenchmark, fetchPeerBenchmarkPrivacy, setPeerBenchmarkPrivacy } from '../../lib/industryPeerBenchmark';
import type { PeerBenchmarkPrivacy } from '../../lib/industryPeerBenchmark';
import { generateAndSaveRoadmap } from '../../lib/prepRoadmap';
import { detectInternationalExposure } from '../../lib/internationalExposure';
import type { PreparationRecommendation } from '../../lib/prepRoadmap';
import { canonicalCertificationLabel, detailsFromSources, issuersFromSaved, type CertificationDetail, type CertificationIssuer } from '../../lib/certLevelScale';
import {
  FIT_ASSESSMENT_RESTORE_COLUMNS,
  FIT_RESTORE_TIMEOUT_MS,
  FIT_ROADMAP_RESTORE_COLUMNS,
  encodeFitRestoreCache,
  fitRestoreCacheKey,
  parseFitRestoreCache,
  type FitRestoreSnapshot,
} from '../../lib/fitAssessmentExperience';
import { describeTables, ensureReferenceData } from '../../utils/seedReferenceData';
import type { ReferenceSeedStatus } from '../../utils/seedReferenceData';
import { trackMetaCustomEvent } from '../../lib/metaPixel';
import { stripNulDeep } from '../../lib/cvTextSanitize';
import { CvUploadError, cvDeviceContext, cvErrorCode, cvErrorStage, cvErrorStatus, cvFailureMessage, cvFileKind, cvFileRejection, extractCvFileText, fileSizeBand, postFitCvEvent, toCvUploadError } from '../../lib/cvUploadSupport';
import { trackAppSwitch, trackFitActivation, trackFitTrackSelect, trackStepComplete, trackStepError, trackStepView } from '../../lib/engagementTracking';
import PriorAttemptsQuestions from '../../components/PriorAttemptsQuestions';
import { EMPTY_PRIOR_ATTEMPTS, priorAttemptProperties, sanitizePriorAttempts, type PriorAttempts } from '../../lib/priorAttempts';
import ExplorationFlow, { AchievementTimePicker, canonicalSkillName, CompanyCombo, confirmedCvProfile, dedupeCvExperiences, DEGREE_OPTIONS, ExperienceDurationEditor, ExperienceIndustrySelect, isIndustrySelectionComplete, isOtherChoice, MajorCombo, mergeEducationCoursework, MonthPicker, normalizeDegree, normalizeIndustrySelection, normalizeMajorName, SkillsSelector, UniversityCombo } from './App';

const FIT_ENGINE_HOOK = '/api/hooks/execute/workspace-539150/casemate-fit-engine-v3';
const FUNCTION_FIT_HOOK = '/api/hooks/execute/workspace-539150/casemate-function-fit-v1';
const PROGRAM_FIT_ANALYSIS_HOOK = '/api/hooks/execute/workspace-539150/casemate-program-fit-analysis-v1';
const STRUCTURED_FIT_HOOK = '/api/hooks/execute/workspace-539150/casemate-structured-fit-v1';
const CV_PROFILE_HOOK = '/api/hooks/execute/workspace-539150/casemate-cv-profile-v1';
const FIT_TRACKING_HOOK = '/api/hooks/execute/workspace-539150/casemate-fit-tracking-v1';
const WORKSPACE_ID = 'c6ce26d1-7466-4b72-962d-b7bf7a471c88';
const STAGES = ['Target', 'CV', 'Motivation', 'Work Style', 'Results', 'Roadmap'];
const VALIDATION_STEP_NAMES = ['track_select', 'cv', 'motivation', 'work_style', 'result', 'roadmap'];
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
type Experience = { company: string; role: string; duration: string; description: string; sector?: string; major_industry?: string; sub_sector?: string; sectorSource?: 'auto' | 'user' | 'extracted'; source?: 'extracted' | 'user' };
type Education = { institution: string; field: string; degree: string; graduationYear: string; gpa: string; coursework: string; universityTier?: number; source?: 'extracted' | 'user' };
type ExtracurricularActivity = { organization: string; role: string; duration: string; description: string; source?: 'extracted' | 'user' };
type HonorAchievement = { competition: string; organizer?: string; title: string; time: string; description: string; category?: string; sourceRowId?: string; source?: 'extracted' | 'user' };
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
  certification_details?: CertificationDetail[];
  certification_issuers?: CertificationIssuer[];
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
  programType?: string;
  products?: string;
};
type ProgramSearchResult = { program: TargetProgram; matchedFunction: string; matchedProduct: string };
type ProgramRow = {
  id: number;
  program_id: string;
  company: string;
  program_name: string;
  industry?: string | null;
  sector?: string | null;
  function_list?: string[] | string | null;
  open_date?: string | null;
  close_date?: string | null;
  active?: boolean | null;
  display_status?: string | null;
  program_type?: string | null;
  product_categories?: string | null;
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
  ocpTouched?: boolean;
  ocpResultReused?: boolean;
  workingStyleResultReused?: boolean;
  mcqAnswers?: Record<string, McqChoice>;
  mcqSeconds?: Record<string, number>;
  mcqQuestionIndex?: number;
  workStyleSubStep?: 'mcq' | 'ocp';
  fitAnalysis?: FitAnalysis | null;
  assessmentResultId?: number | null;
  userAddedEvidence?: AddedEvidence[];
  priorAttempts?: PriorAttempts;
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

const COMPANY_REASONS = ['Culture matches how I work', 'Products or customers I understand', 'Learning environment fits my needs', 'Leadership principles match my values', 'International or cross-market exposure', 'Meaningful social or customer impact', 'Performance expectations motivate me', 'Career progression fits my plan'];
const PROGRAM_REASONS = ['Structured leadership development', 'Deep functional specialization', 'Cross-functional rotation', 'Early ownership and accountability', 'Mentoring and coached practice', 'International exposure', 'Real business projects'];
const FUNCTION_REASONS = ['Relevant internship or project evidence', 'Relevant skills or coursework', 'Repeated success in similar tasks', 'I enjoy the core responsibilities', 'The work matches my strongest contribution style', 'I am still building direct evidence'];
const PROBLEM_APPROACH_OPTIONS = ['Numbers & data', 'Talking to people', 'Frameworks & structure', 'Creative experimentation'];
const ENERGIZING_WORK_OPTIONS = ['Building systems & processes', 'Influencing & persuading', 'Analyzing & interpreting data', 'Creating & storytelling'];
const CONTRIBUTION_STYLE_OPTIONS = ['Optimizing performance and measurable ROI', 'Shaping ideas and customer experiences', 'Running rapid channel and funnel experiments', 'Coordinating people to execute reliably', 'Negotiating and building long-term partnerships', 'Managing risk and protecting reliable processes', 'Coaching and facilitating other people’s growth'];
const PRIORITIES = ['Learning opportunities', 'Career progression', 'Company culture', 'Compensation & international exposure'];
const COMPANY_REASON_GROUPS = [COMPANY_REASONS.slice(0, 4), COMPANY_REASONS.slice(4, 8)];
const PROGRAM_REASON_GROUPS = [PROGRAM_REASONS.slice(0, 4), PROGRAM_REASONS.slice(4, 7)];
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

function sanitizeMotivation(raw: unknown): Motivation {
  const value = raw && typeof raw === 'object' ? raw as Partial<Motivation> : {};
  const choices = (items: unknown) => Array.isArray(items) ? items.map(String).filter((item) => item.trim().toLowerCase() !== 'other') : [];
  return {
    ...EMPTY_MOTIVATION,
    ...value,
    companyReasons: choices(value.companyReasons),
    programReasons: choices(value.programReasons),
    functionReasons: choices(value.functionReasons),
  };
}

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

const NO_FUNCTION_PROGRAM_IDS = new Set(['central-retail-ma-2026']);

function programFunctionList(programId: unknown, value: unknown): string[] {
  return NO_FUNCTION_PROGRAM_IDS.has(String(programId || '').trim()) ? [] : parseFunctionList(value);
}

const LEGACY_FUNCTION_ALIASES: Record<string, string> = {
  'Tư vấn dịch vụ Thuế hải quan': 'Customs & Global Trade Advisory',
  'Tư vấn dịch vụ Pháp lý': 'Legal Services',
  'Tư vấn dịch vụ Kế toán & Giải pháp doanh nghiệp': 'Accounting & Business Solutions',
};

function isInternRole(value: unknown): boolean {
  return /(?:\bintern(?:ship)?\b|\btrainee\b|thực\s*tập(?:\s*sinh)?|thuc\s*tap(?:\s*sinh)?)/iu.test(String(value || ''));
}

function readSessionEmail(spaceId: string): string | null {
  try {
    const value = JSON.parse(localStorage.getItem(`space_session_${spaceId}`) || '{}');
    return typeof value.email === 'string' ? value.email.toLowerCase().trim() : null;
  } catch { return null; }
}

function readValidationDraft(sessionKey: string, accountKey: string | null): SavedAssessment {
  try {
    return JSON.parse(localStorage.getItem(sessionKey) || (accountKey ? localStorage.getItem(accountKey) : null) || '{}') as SavedAssessment;
  } catch {
    return {};
  }
}

function normalizeSearchText(value: unknown): string {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9&+]+/g, ' ').trim();
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

function cvListLabel(item: unknown): string {
  if (item && typeof item === 'object') {
    const value = item as Record<string, unknown>;
    return String(value.nameNormalized || value.name || value.nameRaw || value.skill_name || value.cert_name || '').trim();
  }
  return String(item || '').trim();
}

function certificationSourcesOf(value: any): any[] {
  return [...(Array.isArray(value.certifications) ? value.certifications : []), ...(Array.isArray(value.english_certificates) ? value.english_certificates : []), ...(Array.isArray(value.parsed_cv?.certifications) ? value.parsed_cv.certifications : [])];
}
function certificationLabelOf(item: unknown): string {
  const label = cvListLabel(item);
  return canonicalCertificationLabel(label === 'MOS' ? 'MOS (PowerPoint, Word, Excel)' : label);
}

function normalizeProfile(raw: any): CvProfile {
  const value = raw && typeof raw === 'object' ? stripNulDeep(raw) : {};
  const experienceSource = Array.isArray(value.experiences)
    ? value.experiences
    : Array.isArray(value.internship_history) ? value.internship_history : [];
  const experiences = dedupeCvExperiences(experienceSource);
  const parsedEducation = Array.isArray(value.parsed_cv?.education)
    ? value.parsed_cv.education
    : value.parsed_cv?.education && typeof value.parsed_cv.education === 'object' ? [value.parsed_cv.education] : [];
  const rawEducation = Array.isArray(value.education) && value.education.length ? value.education : parsedEducation;
  const hasExplicitEducationCoursework = rawEducation.some((item: any) => item && typeof item === 'object' && Object.prototype.hasOwnProperty.call(item, 'coursework'));
  const education = rawEducation.length ? rawEducation.map((item: any, index: number) => typeof item === 'string'
    ? { institution: isOtherChoice(item) ? '' : item, field: '', degree: '', graduationYear: '', gpa: '', coursework: index === 0 ? String(value.coursework || '') : '', source: 'extracted' as const }
    : { institution: isOtherChoice(item.institution || item.university || item.universityRaw || item.school) ? '' : String(item.institution || item.university || item.universityRaw || item.school || ''), field: normalizeMajorName(item.field || item.major || item.majorRaw || item.faculty || ''), degree: normalizeDegree(item.degree || item.degreeRaw || ''), graduationYear: String(item.graduationYear || item.graduation_year || ''), gpa: normalizeGpaBand(item.gpa || item.gpaBand || item.gpaRaw), coursework: String(Object.prototype.hasOwnProperty.call(item, 'coursework') ? item.coursework || '' : (Array.isArray(item.courses) ? item.courses.join(', ') : index === 0 ? value.coursework || '' : '')), universityTier: Number(item.universityTier ?? item.university_tier ?? item.tier) || undefined, source: item.source === 'user' ? 'user' as const : 'extracted' as const })
    : [value.university, value.faculty || value.major, value.degree, value.graduation_year, value.gpa, value.coursework].some(Boolean)
      ? [{ institution: isOtherChoice(value.university) ? '' : String(value.university || ''), field: normalizeMajorName(value.faculty || value.major || ''), degree: normalizeDegree(value.degree || ''), graduationYear: String(value.graduation_year || ''), gpa: normalizeGpaBand(value.gpa), coursework: String(value.coursework || ''), universityTier: Number(value.university_tier) || undefined, source: 'extracted' as const }]
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
      const company = isOtherChoice(item.company || item.organization) ? '' : String(item.company || item.organization || '');
      const role = String(item.role || '');
      const parsedExperience = Array.isArray(value.parsed_cv?.experience) ? value.parsed_cv.experience.find((candidate: any) => String(candidate?.company || '') === company && String(candidate?.role || '') === role) : null;
      const duration = normalizeExperienceDuration(item.duration || parsedExperience?.duration) || extractExperienceDuration(value.raw_cv_text || value.parsed_cv?.raw_cv_text, company, role, item.evidenceText || parsedExperience?.evidenceText);
      const industry = normalizeIndustrySelection({ majorIndustry: item.major_industry || item.majorIndustry, subSector: item.sub_sector || item.subSector, legacySector: item.sector });
      return { company, role, duration, description: formatExperienceDescription(item.description), sector: industry.legacySector, major_industry: industry.majorIndustry, sub_sector: industry.subSector, sectorSource: item.sectorSource || item.sector_source || (item.sector || item.major_industry || item.majorIndustry ? 'extracted' : undefined), source: item.source === 'user' ? 'user' : 'extracted' };
    }),
    extracurricular_activities: activitySource.map((item: any) => typeof item === 'string'
      ? { organization: item, role: '', duration: '', description: '', source: 'extracted' as const }
      : { organization: String(item.organization || item.club || item.company || ''), role: String(item.role || ''), duration: normalizeExperienceDuration(item.duration), description: formatExperienceDescription(item.description || item.evidenceText || item.impact), source: item.source === 'user' ? 'user' as const : 'extracted' as const }),
    honors_achievements: achievementSource.map((item: any) => typeof item === 'string'
      ? { competition: item, organizer: '', title: '', time: '', description: '', source: 'extracted' as const }
      : { competition: String(item.competition || item.name || item.nameRaw || item.nameNormalized || ''), organizer: String(item.organizer || item.issuer || item.awarded_by || ''), title: String(item.title || item.award || item.result || ''), time: String(item.time || item.date || ''), description: formatExperienceDescription(item.description || item.evidenceText || item.context), category: String(item.category || ''), sourceRowId: String(item.sourceRowId || ''), source: item.source === 'user' ? 'user' as const : 'extracted' as const }),
    skills: Array.from(new Set((Array.isArray(value.skills) ? value.skills : Array.isArray(value.parsed_cv?.skills) ? value.parsed_cv.skills : Array.isArray(value.parsed_cv?.rawSkills) ? value.parsed_cv.rawSkills : []).map(cvListLabel).map(canonicalSkillName).filter((item: string) => !!item && !isOtherChoice(item)))),
    certifications: certificationSourcesOf(value).map(certificationLabelOf).filter((item: string, index: number, all: string[]) => !!item && !isOtherChoice(item) && item !== '[object Object]' && all.indexOf(item) === index),
    certification_details: detailsFromSources(certificationSourcesOf(value), certificationLabelOf, value.certification_details),
    certification_issuers: issuersFromSaved(value.certification_issuers),
    other_skills: '',
    other_skills_selected: false,
    languages: Array.isArray(value.languages) ? value.languages.map(String) : [],
    quantified_impact: Array.isArray(value.quantified_impact) ? value.quantified_impact.map(String) : [],
  };
}

function profileHasContent(profile: CvProfile) {
  return !!(profile.name || profile.university || profile.faculty || profile.skills.length || profile.experiences.length);
}

function normalizeScheduleLabel(value: unknown): string {
  const label = String(value || '').trim();
  return !label || /^(?:status not available|cycle not published|not verified)$/i.test(label) ? 'Not published' : label;
}

const UNVERIFIED_PROGRAM_STATUS = 'Program data not verified';

// Saved targets can still carry an older date-based status, so only the two
// labels users are allowed to see get through.
function targetStatusText(program: TargetProgram): string {
  return program.applicationStatus === MAY_BE_OPEN_LABEL || program.applicationStatus === UNVERIFIED_PROGRAM_STATUS ? program.applicationStatus : '';
}

function targetProgramFromRow(row: ProgramRow): TargetProgram {
  const company = String(row.company || '').trim();
  const schedule = getProgramRecruitmentWindow(row.open_date, row.close_date, new Date(), row.display_status);
  return {
    id: String(row.program_id || ''),
    company,
    program: String(row.program_name || '').trim(),
    industry: String(row.industry || row.sector || industryLabel(classifyProgramCompany(company))),
    functions: programFunctionList(row.program_id, row.function_list),
    recruitmentCycle: schedule.cycleLabel,
    applicationStatus: programAvailabilityLabel(schedule),
    verifiedData: true,
    programType: programTypeLabel(row.program_type, row.program_name),
    products: String(row.product_categories || '').trim(),
  };
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
  if (!selectedFunction.trim()) return null;
  const evidence = [motivation.problemApproach, motivation.energizingWork, motivation.contributionStyle].filter(Boolean);
  const profile = SUBROLE_PROFILES.find((entry) => entry.match.test(selectedFunction.toLowerCase()));
  const roles = profile?.roles || [
    { name: 'Analytical & Planning', tags: ['analytical', 'structured', 'strategic'] },
    { name: 'People & Partnership', tags: ['people', 'relationship', 'negotiation'] },
    { name: 'Operations & Delivery', tags: ['process', 'execution', 'coordination'] },
    { name: 'Creative & Innovation', tags: ['creative', 'consumer', 'experiment'] },
  ];
  if (evidence.length < 3) {
    return { function: selectedFunction, subroles: roles.slice(0, 2).map((role) => role.name), traits: [], evidence, version: 1 };
  }
  const traits = Array.from(new Set(evidence.flatMap((answer) => ANSWER_TRAITS[answer] || [])));
  const ranked = roles
    .map((role, index) => ({ ...role, index, score: role.tags.reduce((sum, tag) => sum + (traits.includes(tag) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  return { function: selectedFunction, subroles: ranked.slice(0, 2).map((role) => role.name), traits, evidence, version: 1 };
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

function recommendationsFromFit(target: TargetProgram, selectedFunction: string, profile: CvProfile): PreparationRecommendation[] {
  return featureRecommendationRows(target, selectedFunction, profile).map((action, index): PreparationRecommendation => {
    const category: PreparationRecommendation['category'] = action.category === 'Domain Knowledge' ? 'Domain knowledge' : action.category === 'CV' ? 'CV & interview' : 'Case practice';
    const casemateFunction: PreparationRecommendation['casemateFunction'] = action.category === 'CV'
      ? 'Update Profile / CV'
      : action.category === 'Domain Knowledge'
        ? 'Domain Knowledge'
        : action.category === 'Case Pool' ? 'Case Pool' : 'Case Drill';
    return {
      id: action.id || `target-action-${index + 1}`,
      category,
      gap: action.category || 'Preparation',
      reason: `This action is scoped to ${action.category || 'the selected Casemate feature'} for the confirmed target.`,
      recommendedAction: action.text,
      priority: action.priority === 'High' ? 'High' : 'Medium',
      casemateFunction,
      order: index + 1,
    };
  });
}

function finiteNumberOrNull(value: unknown): number | null {
  if (value == null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function looseTargetKey(value: unknown): string {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
}

function looseTargetMatch(left: unknown, right: unknown): boolean {
  const a = looseTargetKey(left);
  const b = looseTargetKey(right);
  return !!a && !!b && (a === b || a.includes(b) || b.includes(a));
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
  const sharedEngine = fit.fa_engine && typeof fit.fa_engine === 'object' ? fit.fa_engine : null;
  const sharedTargetContext = fit.validation_target || fit.target_context || {};
  const sharedTarget = sharedTargetContext.selectedTargetProgram || sharedTargetContext.target || {};
  const sharedTargetId = String(sharedTargetContext.selectedTargetProgramId || sharedTarget.id || sharedTarget.program_id || '');
  if (sharedEngine && sharedTargetId) {
    const sharedPrograms = [...(Array.isArray(sharedEngine.all_programs) ? sharedEngine.all_programs : []), ...(Array.isArray(sharedEngine.programs) ? sharedEngine.programs : [])];
    const sharedProgram = sharedPrograms.find((item: any) => String(item?.program_key || item?.program_id || '') === sharedTargetId)
      || sharedPrograms.find((item: any) => looseTargetMatch(item?.company, sharedTarget.company || sharedTargetContext.selectedCompany)
        && looseTargetMatch(item?.program || item?.program_name, sharedTarget.program || sharedTarget.program_name))
      || null;
    if (sharedProgram) {
      const parsedCorporateFit = finiteNumberOrNull(sharedProgram.work_style_fit);
      const legacySaturatedCulture = sharedEngine.version === 'fa-engine-v2.1-culture-v23'
        && sharedProgram.work_style_source === 'culture_v23_cv_mcq'
        && parsedCorporateFit != null
        && parsedCorporateFit >= 100;
      const corporateDataSufficient = sharedProgram.work_style_sufficient === true
        && parsedCorporateFit != null
        && !legacySaturatedCulture;
      const functionFit = finiteNumberOrNull(sharedProgram.function_fit_score);
      const corporateFit = corporateDataSufficient ? parsedCorporateFit : null;
      const overall = functionFit != null
        ? corporateFit != null
          ? Math.round(0.60 * functionFit + 0.40 * corporateFit)
          : Math.round(functionFit)
        : null;
      return {
        engine_version: sharedEngine.version,
        matching_ratio: overall,
        cv_profile_fit_score: sharedEngine.dimensions?.professional_evidence ?? null,
        function_fit_score: functionFit,
        motivation_fit_score: sharedEngine.dimensions?.motivation ?? null,
        work_style_fit_score: corporateFit,
        culture_fit_percent: corporateFit,
        culture_data_sufficient: corporateDataSufficient,
        soft_skill_fit: corporateDataSufficient && sharedProgram.soft_profile
          ? { ...sharedProgram.soft_profile, company: sharedProgram.company, corporate_fit_percent: corporateFit }
          : null,
        data_confidence: corporateDataSufficient ? 'Overall combines Function Fit (60%) and Corporate Fit (40%).' : 'Overall uses available Function Fit only. Corporate Fit is unavailable, so this is not a full 60/40 score.',
        dimension_scores: sharedEngine.dimensions || null,
        dimension_weights: sharedEngine.dimension_weights || null,
        criteria: [],
        strengths: [],
        gaps: [],
        potential_concerns: [],
        recommended_next_steps: [],
        preparation_actions: [],
        roadmap_actions: [],
        top_programs: fit.programs || [],
        restored_from_assessment_results: true,
      };
    }
  }
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
  const available = value != null && value !== '' && Number.isFinite(Number(value));
  return <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{label}</p><p className="mt-1 text-lg font-extrabold text-[var(--space-text-primary)]">{available ? `${Math.round(Number(value))}%` : 'Not available'}</p></div>;
}

function MultiChoice({ options, value, onChange, max = 3 }: { options: string[]; value: string[]; onChange: (next: string[]) => void; max?: number }) {
  return <div className="grid gap-2 sm:grid-cols-2">{options.map((option) => { const selected = value.includes(option); return <button key={option} type="button" aria-pressed={selected} onClick={() => onChange(selected ? value.filter((item) => item !== option) : value.length < max ? [...value, option] : [...value.slice(1), option])} className={`rounded-xl border p-3 text-left text-sm font-semibold ${selected ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}>{selected && <Check className="mr-1.5 inline h-4 w-4 text-[var(--space-text-brand)]" />}{MOTIVATION_OPTION_LABELS[option] || option}</button>; })}</div>;
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
  const { data: programRows, loading: programCatalogLoading, error: programCatalogError } = window.useWorkspaceDB<ProgramRow>('programs', {
    shared: true,
    orderBy: { column: 'company', direction: 'asc' },
    limit: 500,
  });
  const programCatalog = useMemo(() => {
    const newest = new Map<string, ProgramRow>();
    for (const row of programRows || []) {
      if (row.active === false || !row.program_id || !row.company || !row.program_name) continue;
      const current = newest.get(row.program_id);
      if (!current || Number(row.id) > Number(current.id)) newest.set(row.program_id, row);
    }
    return Array.from(newest.values())
      .map((row) => targetProgramFromRow(row))
      .sort((a, b) => Number(b.applicationStatus === MAY_BE_OPEN_LABEL) - Number(a.applicationStatus === MAY_BE_OPEN_LABEL) || a.company.localeCompare(b.company) || a.program.localeCompare(b.program));
  }, [programRows]);
  const storageKey = `casemate-validation-v3:${sessionId || visitorId || 'preview'}`;
  // A new sign-in issues a new session id; this account copy keeps the chosen
  // target and answers so the candidate resumes instead of starting over.
  const accountDraftKey = email ? `casemate-validation-v3:email:${email}` : null;
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
  const [cvChooserVisible, setCvChooserVisible] = useState(false);
  const [functionListStatus, setFunctionListStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const [savedCv, setSavedCv] = useState<{ profile: CvProfile; date: string } | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsePhase, setParsePhase] = useState(0);
  const [parseFailure, setParseFailure] = useState(false);
  const [parseFailureMessage, setParseFailureMessage] = useState('');
  const [motivation, setMotivation] = useState<Motivation>(EMPTY_MOTIVATION);
  const [ocp, setOcp] = useState<OcpScores>(DEFAULT_OCP);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, McqChoice>>({});
  const [mcqSeconds, setMcqSeconds] = useState<Record<string, number>>({});
  const [mcqQuestionIndex, setMcqQuestionIndex] = useState(0);
  const [workStyleSubStep, setWorkStyleSubStep] = useState<'mcq' | 'ocp'>('mcq');
  const [mcqBank, setMcqBank] = useState<SoftSkillQuestion[]>([]);
  const [priorOcp, setPriorOcp] = useState<OcpScores | null>(null);
  const [ocpTouched, setOcpTouched] = useState(false);
  const ocpTouchedRef = useRef(false);
  const [editingWorkStyle, setEditingWorkStyle] = useState(false);
  const [ocpResultReused, setOcpResultReused] = useState(false);
  const [workingStyleResultReused, setWorkingStyleResultReused] = useState(false);
  const [returnToTargetFitAfterCvEdit, setReturnToTargetFitAfterCvEdit] = useState(false);
  const [cvRewriteMode, setCvRewriteMode] = useState(false);
  const [recalculateAfterCvEdit, setRecalculateAfterCvEdit] = useState(false);
  const recalculateAfterCvEditRef = useRef(false);
  const [fitAnalysis, setFitAnalysis] = useState<FitAnalysis | null>(null);
  const [fitPending, setFitPending] = useState(false);
  const [peerPrivacy, setPeerPrivacy] = useState<PeerBenchmarkPrivacy | null>(null);
  const [peerPrivacyBusy, setPeerPrivacyBusy] = useState(false);
  const [cvPeerDataConsent, setCvPeerDataConsent] = useState(false);
  const [assessmentResultId, setAssessmentResultId] = useState<number | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [busy, setBusy] = useState(false);
  const [cvConfirming, setCvConfirming] = useState(false);
  const [certIssuersValid, setCertIssuersValid] = useState(true);
  const [cvPasteText, setCvPasteText] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [userAddedEvidence, setUserAddedEvidence] = useState<AddedEvidence[]>([]);
  const [priorAttempts, setPriorAttempts] = useState<PriorAttempts>(EMPTY_PRIOR_ATTEMPTS);
  const [evidenceCriterion, setEvidenceCriterion] = useState<string | null>(null);
  const [evidenceDraft, setEvidenceDraft] = useState<Omit<AddedEvidence, 'id' | 'criterionId'>>({ type: '', name: '', role: '', date: '', responsibilities: '', achievement: '', skills: '' });
  const [referenceStatus, setReferenceStatus] = useState<ReferenceSeedStatus | null>(null);
  const referenceCheckedRef = useRef(false);
  const [hydrated, setHydrated] = useState(false);
  const [recoveryDismissed, setRecoveryDismissed] = useState(false);
  const [recoveryAttempt, setRecoveryAttempt] = useState(0);
  const [recovering, setRecovering] = useState(() => {
    try {
      const saved = readValidationDraft(storageKey, accountDraftKey);
      if (saved.journey || saved.target || saved.fitAnalysis || saved.recoveryDismissed) return false;
    } catch {
      return false;
    }
    return !!readSessionEmail(spaceId);
  });
  const recoveryKeyRef = useRef<string | null>(null);
  const recoveryStartedAtRef = useRef(typeof performance === 'undefined' ? Date.now() : performance.now());
  const recoveryInteractionRef = useRef(false);
  const autosaveSequenceRef = useRef(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const previousStageRef = useRef(1);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  // Older saved drafts can still carry the pre-unification placeholder labels.
  // Once the canonical catalog arrives, replace that stale target metadata with
  // the current programs row before rendering or saving the selection again.
  const selectedTargetId = target?.id || '';
  const canonicalTarget = useMemo(
    () => selectedTargetId && !selectedTargetId.startsWith('manual-')
      ? programCatalog.find((program) => program.id === selectedTargetId) || null
      : null,
    [programCatalog, selectedTargetId],
  );
  useEffect(() => {
    if (!canonicalTarget) return;
    setTarget((current) => {
      if (!current || current.id !== canonicalTarget.id) return current;
      const currentFunctions = current.functions.join('\u0000');
      const canonicalFunctions = canonicalTarget.functions.join('\u0000');
      if (
        current.verifiedData === canonicalTarget.verifiedData &&
        current.company === canonicalTarget.company &&
        current.program === canonicalTarget.program &&
        current.industry === canonicalTarget.industry &&
        current.recruitmentCycle === canonicalTarget.recruitmentCycle &&
        current.applicationStatus === canonicalTarget.applicationStatus &&
        current.programType === canonicalTarget.programType &&
        current.products === canonicalTarget.products &&
        currentFunctions === canonicalFunctions
      ) return current;
      return canonicalTarget;
    });
  }, [canonicalTarget]);

  const journeyRef = useRef<Journey>(journey);
  journeyRef.current = journey;
  const fitStepName = journey === 'validation' ? VALIDATION_STEP_NAMES[stage - 1] || null : null;
  const fitStepNameRef = useRef(fitStepName);
  fitStepNameRef.current = fitStepName;
  const fitProgramIdRef = useRef<string | null>(target?.id || null);
  fitProgramIdRef.current = target?.id || null;
  const fitStepStartRef = useRef<{ name: string; at: number } | null>(null);
  const fitStepDurationSec = (stepName: string) => {
    const started = fitStepStartRef.current;
    return started && started.name === stepName ? Math.round((Date.now() - started.at) / 1000) : null;
  };

  const track = useCallback((name: string, properties: Record<string, unknown> = {}) => {
    void trackEvent(name, { journey: 'validation_first', track: journeyRef.current === 'exploration' ? 'discovery' : journeyRef.current, ...properties });
  }, [trackEvent]);

  useEffect(() => {
    if (journey !== 'validation' || stage < 2) return;
    let cancelled = false;
    void fetchPeerBenchmarkPrivacy(sessionId).then((privacy) => {
      if (!cancelled && privacy) {
        setPeerPrivacy(privacy);
        if (privacy.opted_in) setCvPeerDataConsent(true);
      }
    });
    return () => { cancelled = true; };
  }, [journey, stage, sessionId]);

  // The scoring engine only produces numbers it can trace to a reference-table
  // row, so the tables are checked (and seeded if empty) before the flow runs.
  useEffect(() => {
    if (journey !== 'validation' || stage < 3 || referenceCheckedRef.current) return;
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
  }, [journey, stage, sessionId]);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const saved = readValidationDraft(storageKey, accountDraftKey);
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
      if (saved.motivation) setMotivation(sanitizeMotivation(saved.motivation));
      if (saved.ocp) setOcp({ ...DEFAULT_OCP, ...saved.ocp });
      if (saved.ocpTouched) { ocpTouchedRef.current = true; setOcpTouched(true); setEditingWorkStyle(true); }
      if (saved.ocpResultReused) setOcpResultReused(true);
      if (saved.workingStyleResultReused) setWorkingStyleResultReused(true);
      if (saved.mcqAnswers) setMcqAnswers(saved.mcqAnswers);
      if (saved.mcqSeconds) setMcqSeconds(saved.mcqSeconds);
      if (typeof saved.mcqQuestionIndex === 'number') setMcqQuestionIndex(saved.mcqQuestionIndex);
      if (saved.workStyleSubStep) setWorkStyleSubStep(saved.workStyleSubStep);
      if (saved.fitAnalysis) setFitAnalysis(saved.fitAnalysis);
      if (saved.assessmentResultId) setAssessmentResultId(saved.assessmentResultId);
      if (saved.userAddedEvidence) setUserAddedEvidence(saved.userAddedEvidence);
      if (saved.priorAttempts) setPriorAttempts(sanitizePriorAttempts(saved.priorAttempts));
      if (saved.recoveryDismissed) setRecoveryDismissed(true);
    } catch { /* A corrupt draft never blocks a fresh assessment. */ }
    finally { setHydrated(true); }
  }, [storageKey]);

  // Gated on `hydrated` state rather than the ref above: the ref flips
  // synchronously inside the restore effect, so this effect would run in the
  // same commit and write the pre-restore defaults over the draft just read.
  useEffect(() => {
    if (!hydrated) return;
    const saved: SavedAssessment = { skillsInputVersion: 3, journey, stage, target, selectedFunction, search, manualMode, manualCompany, manualProgram, manualIndustry, manualCycle, profile, originalProfile, cvReviewConfirmed, cvFileName, cvFileDate, cvEntryMode, motivation, ocp, ocpTouched, ocpResultReused, workingStyleResultReused, mcqAnswers, mcqSeconds, mcqQuestionIndex, workStyleSubStep, fitAnalysis, assessmentResultId, userAddedEvidence, recoveryDismissed, priorAttempts };
    try {
      const serialized = JSON.stringify(saved);
      localStorage.setItem(storageKey, serialized);
      if (accountDraftKey) localStorage.setItem(accountDraftKey, serialized);
    } catch { /* Current state remains usable. */ }
  }, [hydrated, storageKey, accountDraftKey, journey, stage, target, selectedFunction, search, manualMode, manualCompany, manualProgram, manualIndustry, manualCycle, profile, originalProfile, cvReviewConfirmed, cvFileName, cvFileDate, cvEntryMode, motivation, ocp, ocpTouched, ocpResultReused, workingStyleResultReused, mcqAnswers, mcqSeconds, mcqQuestionIndex, workStyleSubStep, fitAnalysis, assessmentResultId, userAddedEvidence, recoveryDismissed, priorAttempts]);

  const progressRef = useRef<SavedAssessment | null>(null);
  const autosaveTimerRef = useRef<number | null>(null);

  const persistProgress = useCallback(async (progress: SavedAssessment, sequence: number) => {
    setSaveStatus('saving');
    if (!email || !sessionId) {
      if (autosaveSequenceRef.current === sequence) setSaveStatus('error');
      trackStepError('fit-assessment', fitStepNameRef.current || 'track_select', 'progress_save_sign_in_required', { track: 'validation', programId: fitProgramIdRef.current });
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
    } catch (caught) {
      if (autosaveSequenceRef.current === sequence) setSaveStatus('error');
      trackStepError('fit-assessment', fitStepNameRef.current || 'track_select', caught, { track: 'validation', programId: fitProgramIdRef.current });
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
    const progress: SavedAssessment = { skillsInputVersion: 3, journey, stage, target, selectedFunction, search, manualMode, manualCompany, manualProgram, manualIndustry, manualCycle, profile, originalProfile, cvReviewConfirmed, cvFileName, cvFileDate, cvEntryMode, motivation, ocp, ocpTouched, ocpResultReused, workingStyleResultReused, mcqAnswers, mcqSeconds, mcqQuestionIndex, workStyleSubStep, fitAnalysis, assessmentResultId, userAddedEvidence, recoveryDismissed, priorAttempts };
    progressRef.current = progress;
    if (!email || !sessionId || journey !== 'validation') return;
    const sequence = ++autosaveSequenceRef.current;
    const timer = window.setTimeout(() => { void persistProgress(progress, sequence); }, 1000);
    autosaveTimerRef.current = timer;
    return () => window.clearTimeout(timer);
  }, [persistProgress, hydrated, email, sessionId, journey, stage, target, selectedFunction, search, manualMode, manualCompany, manualProgram, manualIndustry, manualCycle, profile, originalProfile, cvReviewConfirmed, cvFileName, cvFileDate, cvEntryMode, motivation, ocp, ocpTouched, ocpResultReused, workingStyleResultReused, mcqAnswers, mcqSeconds, mcqQuestionIndex, workStyleSubStep, fitAnalysis, assessmentResultId, userAddedEvidence, recoveryDismissed, priorAttempts]);

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

  useEffect(() => {
    const viewStepName = hydrated && !recovering && fitStepName !== 'track_select' && fitStepName !== 'roadmap' ? fitStepName : null;
    if (!viewStepName) { fitStepStartRef.current = null; return; }
    if (fitStepStartRef.current?.name === viewStepName) return;
    fitStepStartRef.current = { name: viewStepName, at: Date.now() };
    trackStepView('fit-assessment', viewStepName, { track: 'validation', programId: fitProgramIdRef.current });
  }, [hydrated, recovering, fitStepName]);

  useEffect(() => {
    if (!referenceStatus || referenceStatus.ready) return;
    trackStepError('fit-assessment', fitStepNameRef.current || 'motivation', referenceStatus.error || 'scoring_reference_data_unavailable', { track: 'validation', programId: fitProgramIdRef.current });
  }, [referenceStatus]);

  const applyRestoreSnapshot = useCallback((snapshot: FitRestoreSnapshot) => {
    setTarget(snapshot.target as TargetProgram);
    setSelectedFunction(snapshot.selectedFunction);
    setFitAnalysis(snapshot.fitAnalysis as FitAnalysis);
    setAssessmentResultId(snapshot.assessmentResultId);
    setJourney('validation');
    setStage(snapshot.stage);
  }, []);

  // Signing out and back in issues a new workspace session id, which empties
  // the local draft above. Restore only the result fields needed to choose the
  // first screen; CV and work-style history load later without blocking entry.
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
      draft = readValidationDraft(storageKey, accountDraftKey);
    } catch {
      draft = {};
    }
    // Live progress in this session always wins over anything stored earlier.
    if (draft.journey || draft.target || draft.fitAnalysis || draft.recoveryDismissed) {
      recoveryKeyRef.current = email;
      setRecovering(false);
      return;
    }

    const cacheKey = fitRestoreCacheKey(email);
    let cached: FitRestoreSnapshot | null = null;
    try { cached = parseFitRestoreCache(localStorage.getItem(cacheKey)); } catch { /* Continue with account recovery when storage is unavailable. */ }
    if (cached) {
      applyRestoreSnapshot(cached);
      setRecovering(false);
    }

    const db = (window as any).__workspaceDb;
    if (!db?.from) {
      // Keep retrying after the three-second UI budget, but never keep the
      // candidate trapped behind recovery while the SDK/session initializes.
      if (recoveryAttempt < 12) {
        if (recoveryAttempt >= 6) setRecovering(false);
        const retry = window.setTimeout(() => setRecoveryAttempt((count) => count + 1), 500);
        return () => window.clearTimeout(retry);
      }
      setRecovering(false);
      return;
    }

    recoveryKeyRef.current = email;
    let cancelled = false;
    const restoreNow = () => typeof performance === 'undefined' ? Date.now() : performance.now();
    const startedAt = recoveryStartedAtRef.current;
    const releaseDelay = Math.max(0, FIT_RESTORE_TIMEOUT_MS - (restoreNow() - startedAt));
    if (!cached) setRecovering(true);
    const releaseTimer = window.setTimeout(() => {
      if (cancelled) return;
      setRecovering(false);
      console.info(`[Fit Assessment] restore released after ${Math.round(restoreNow() - startedAt)}ms; recovery continues in the background.`);
    }, releaseDelay);

    // These independent reads run together and project out large roadmap plans
    // and unrelated assessment fields. WorkspaceDB supplies session auth; a
    // rejected/invalid session releases the UI instead of blocking it.
    const assessmentRequest = db.from('assessment_results', { shared: true })
      .select(...FIT_ASSESSMENT_RESTORE_COLUMNS)
      .eq('user_email', email)
      .orderBy('id', 'desc')
      .limit(1)
      .get()
      .catch((caught: unknown) => {
        console.warn('[Fit Assessment] saved result recovery read failed:', caught);
        return null;
      });
    const roadmapRequest = db.from('prep_roadmaps', { shared: true })
      .select(...FIT_ROADMAP_RESTORE_COLUMNS)
      .eq('user_key', `email:${email}`)
      .orderBy('id', 'desc')
      .limit(5)
      .get()
      .catch((caught: unknown) => {
        console.warn('[Fit Assessment] saved target recovery read failed:', caught);
        return null;
      });

    void Promise.all([assessmentRequest, roadmapRequest]).then(([assessmentResponse, roadmapResponse]) => {
      if (cancelled || recoveryInteractionRef.current) return;
      const assessmentRows = rowsOf(assessmentResponse);
      const assessmentRow = assessmentRows.find((row) => !!parseJson(row?.result_json)) || null;
      if (!assessmentRow) return;
      const savedResult = parseJson(assessmentRow.result_json);

      // Function-first assessments own their full program-match result view in
      // ExplorationFlow. Target-first rows now use the same engine, so a saved
      // validation target keeps this recovery path on Target Fit.
      const savedTargetContext = savedResult?.validation_target || savedResult?.target_context || {};
      const hasSavedValidationTarget = !!(savedTargetContext.selectedTargetProgramId || savedTargetContext.selectedTargetProgram || savedTargetContext.target);
      if (Array.isArray(savedResult?.function_fit_scores) && savedResult.function_fit_scores.length && !hasSavedValidationTarget) {
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
      const catalogTarget = programCatalog.find((program) => program.id === targetId);
      const restoredTarget = catalogTarget || {
        id: targetId || `saved-${assessmentRow.id}`,
        company: targetCompany,
        program: targetProgram,
        industry: String(contextTarget.industry || topProgram.industry || 'Not verified'),
        functions: [],
        recruitmentCycle: normalizeScheduleLabel(contextTarget.recruitmentCycle || roadmapRow?.recruitment_cycle),
        applicationStatus: normalizeScheduleLabel(contextTarget.applicationStatus || roadmapRow?.window_label),
        verifiedData: false,
      };
      const snapshot: FitRestoreSnapshot = {
        target: restoredTarget,
        selectedFunction: String(context.selectedFunction || roadmapRow?.target_function || savedResult?.topFunction || ''),
        fitAnalysis: savedAnalysis,
        assessmentResultId: Number(assessmentRow.id),
        stage: roadmapRow ? 6 : 5,
      };
      applyRestoreSnapshot(snapshot);
      try { localStorage.setItem(cacheKey, encodeFitRestoreCache(snapshot)); } catch { /* Cache is an optional acceleration. */ }
      console.info(`[Fit Assessment] saved assessment restored in ${Math.round(restoreNow() - startedAt)}ms.`);
    }).catch((caught) => {
      console.warn('[Fit Assessment] saved assessment recovery failed:', caught);
    }).finally(() => {
      window.clearTimeout(releaseTimer);
      if (!cancelled) setRecovering(false);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(releaseTimer);
    };
  }, [email, sessionId, storageKey, recoveryAttempt, applyRestoreSnapshot]);

  useEffect(() => {
    if (!email || journey === null) return;
    const db = (window as any).__workspaceDb;
    if (!db?.from) return;
    void Promise.all([
      db.from('user_cv_profiles', { shared: true }).select('raw_cv_text', 'created_at').eq('user_email', email).orderBy('id', 'desc').limit(1).get().catch(() => []),
      db.from('culture_fit_results', { shared: true }).select('kind', 'payload_json').eq('user_key', userKey).eq('kind', 'corporate').orderBy('id', 'desc').limit(1).get().catch(() => []),
      db.from('assessment_results', { shared: true }).select('created_at').eq('user_email', email).orderBy('id', 'desc').limit(1).get().catch(() => []),
    ]).then(([cvResponse, cultureResponse, resultResponse]) => {
      const cvRow = rowsOf(cvResponse)[0];
      if (cvRow) {
        const parsed = parseJson(cvRow.raw_cv_text);
        // user_cv_profiles.updated_at is rewritten by data backfills, so it is not a recency signal. The saved date is the
        // later of the CV's creation (ignoring the 2026-10-09 11:27 backfill stamp) and the account's latest assessment result.
        const createdMs = Date.parse(String(cvRow.created_at || ''));
        const createdIsBackfill = createdMs >= Date.parse('2026-10-09T11:27:00Z') && createdMs < Date.parse('2026-10-09T11:29:00Z');
        const resultMs = Date.parse(String(rowsOf(resultResponse)[0]?.created_at || ''));
        const activityMs = [createdIsBackfill ? NaN : createdMs, resultMs].filter(Number.isFinite);
        const date = activityMs.length ? new Date(Math.max(...activityMs)).toISOString() : String(cvRow.created_at || '');
        if (parsed) setSavedCv({ profile: normalizeProfile(parsed), date });
      }
      const cultureRows = rowsOf(cultureResponse);
      const corporate = cultureRows.find((row) => row.kind === 'corporate');
      const corporatePayload = parseJson(corporate?.payload_json) || {};
      const preferences = corporatePayload.preferences || corporatePayload.answers;
      if (preferences && OCP_ITEMS.every(([key]) => Number(preferences[key]) >= 1 && Number(preferences[key]) <= 5)) {
        const latestOcp = { ...DEFAULT_OCP, ...preferences };
        setPriorOcp(latestOcp);
        if (!ocpTouchedRef.current) {
          setOcp(latestOcp);
          setOcpResultReused(true);
          setWorkingStyleResultReused(true);
          setEditingWorkStyle(false);
        }
      }
    });
  }, [email, journey, userKey]);

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

  const callHook = useCallback(async (url: string, action: string, payload: Record<string, any>, timeoutMs?: number) => {
    const controller = timeoutMs ? new AbortController() : null;
    const abortTimer = controller ? window.setTimeout(() => controller.abort(), timeoutMs) : null;
    let response: Response;
    let data: any;
    try {
      response = await fetch(`${url}?action=${action}`,  { method: 'POST', headers: { 'Content-Type': 'application/json', ...(sessionId ? { 'X-Session-Id': sessionId } : {}) }, body: JSON.stringify({ ...payload, user_key: userKey, email }), signal: controller?.signal });
      data = await response.json().catch(() => null);
    } catch (caught) {
      if (controller?.signal.aborted) throw Object.assign(new Error('The request took too long.'), { code: 'timeout' });
      throw caught;
    } finally {
      if (abortTimer) window.clearTimeout(abortTimer);
    }
    if (!response.ok || !data || typeof data !== 'object' || data.success === false) {
      const fallback = response.ok ? 'Casemate could not read the server response. Please try again.' : 'Casemate could not process this request.';
      throw Object.assign(new Error(data?.error || fallback), { code: data?.code || (response.ok ? 'unreadable_response' : undefined), status: response.status });
    }
    return data;
  }, [sessionId, userKey, email]);

  // The calculate hook can save its row even when its answer never reaches the
  // browser intact, so a missing id is looked up by this run's request id before
  // the attempt is reported as failed. Shared reads cover every session of the
  // signed-in account, unlike the session-scoped default.
  const findSavedCalculation = useCallback(async (requestId: string): Promise<{ id: number; functionFitScores: any[] } | null> => {
    const db = (window as any).__workspaceDb;
    if (!db?.from || !email) return null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      if (attempt) await new Promise((resolve) => window.setTimeout(resolve, 1500));
      try {
        const response = await db.from('assessment_results', { shared: true })
          .select('id', 'result_json')
          .eq('user_email', email)
          .orderBy('id', 'desc')
          .limit(3)
          .get();
        const row = rowsOf(response).find((item) => parseJson(item?.result_json)?.validation_target?.calculationRequestId === requestId);
        const id = Number(row?.id);
        if (row && Number.isFinite(id) && id > 0) {
          const scores = parseJson(row.result_json)?.function_fit_scores;
          return { id, functionFitScores: Array.isArray(scores) ? scores : [] };
        }
      } catch (caught) {
        console.warn('[Fit Assessment] saved calculation lookup failed:', caught);
      }
    }
    return null;
  }, [email]);

  // Programs that may be open lead the catalog order, so they also lead every
  // result list. A query can name the program, company, a function the program
  // hires for, or a product the company sells.
  const searchResults = useMemo<ProgramSearchResult[]>(() => {
    const terms = normalizeSearchText(search).split(' ').filter(Boolean);
    if (!terms.length) return programCatalog.map((program) => ({ program, matchedFunction: '', matchedProduct: '' }));
    const hasAll = (text: unknown) => { const value = normalizeSearchText(text); return terms.every((term) => value.includes(term)); };
    return programCatalog.flatMap((program) => {
      if (hasAll(`${program.program} ${program.company} ${program.industry} ${program.programType || ''}`)) return [{ program, matchedFunction: '', matchedProduct: '' }];
      const matchedFunction = program.functions.find(hasAll) || '';
      const product = matchedFunction ? '' : (program.products || '').split(';').map((part) => part.trim()).find(hasAll) || '';
      if (matchedFunction || product) return [{ program, matchedFunction, matchedProduct: product.length > 90 ? `${product.slice(0, 89)}…` : product }];
      return hasAll(`${program.company} ${program.functions.join(' ')} ${program.products || ''}`) ? [{ program, matchedFunction: '', matchedProduct: '' }] : [];
    }).slice(0, 40);
  }, [programCatalog, search]);

  const sharedTargetSuggestion = useMemo(() => {
    if (target || journey !== 'validation') return null;
    const last = readSharedFitAnswers(email).lastTarget;
    return last?.programId ? programCatalog.find((program) => program.id === last.programId) || null : null;
  }, [target, journey, email, programCatalog]);

  useEffect(() => {
    if (!target) { setFunctionListStatus('idle'); return; }
    if (!target.verifiedData || target.id.startsWith('manual-')) { setFunctionListStatus('loaded'); return; }
    const db = (window as any).__workspaceDb;
    if (!db?.from) { setFunctionListStatus('error'); return; }
    let cancelled = false;
    // A catalog pick already carries its function list, so this refresh runs
    // silently; only a restored or stale target waits for it.
    setFunctionListStatus((current) => current === 'loaded' ? current : 'loading');
    void db.from('programs', { shared: true }).eq('program_id', target.id).limit(1).get()
      .then((response: any) => {
        if (cancelled) return;
        const row = rowsOf(response)[0];
        if (!row) throw new Error('Program row not found.');
        const functions = programFunctionList(row.program_id, row.function_list);
        const schedule = getProgramRecruitmentWindow(row.open_date, row.close_date, new Date(), row.display_status);
        setTarget((current) => current?.id === target.id ? {
          ...current,
          functions,
          recruitmentCycle: schedule.cycleLabel,
          applicationStatus: programAvailabilityLabel(schedule),
        } : current);
        setSelectedFunction((current) => {
          const resolved = LEGACY_FUNCTION_ALIASES[current] || current;
          return functions.includes(resolved) ? resolved : '';
        });
        setFunctionListStatus('loaded');
      })
      .catch((caught: unknown) => {
        if (cancelled) return;
        setFunctionListStatus((current) => current === 'loaded' ? current : 'error');
        trackStepError('fit-assessment', 'track_select', caught, { track: 'validation', programId: target.id });
      });
    return () => { cancelled = true; };
  }, [target?.id, target?.verifiedData]);

  const chooseTarget = (program: TargetProgram) => {
    setTarget(program);
    setSelectedFunction('');
    setSearch('');
    setProgramSearchFocused(false);
    setFunctionListStatus('loaded');
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

  const uploadPdfForServerParsing = async (file: File) => {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('workspaceId', WORKSPACE_ID);
    form.append('folder', 'cv-parser-temp');
    const appId = (window as any).__APP_ID__ || (window as any).__SPACE_ID__ || 'workspace-539150';
    const response = await fetch('/api/upload/file', {
      method: 'POST',
      headers: { 'X-App-Id': appId },
      body: form,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false || !data.url) throw new Error(data.error || 'The PDF could not be uploaded for server parsing.');
    return { url: String(data.url), key: String(data.key || data.url) };
  };

  const deleteTemporaryCvUpload = async (key: string) => {
    if (!key) return;
    const appId = (window as any).__APP_ID__ || (window as any).__SPACE_ID__ || 'workspace-539150';
    const response = await fetch('/api/upload/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-App-Id': appId },
      body: JSON.stringify(/^https?:\/\//.test(key) ? { url: key } : { key }),
    });
    if (!response.ok) console.warn('[Fit Assessment] Temporary CV upload cleanup failed with status', response.status);
  };

  const reportCvUploadFailure = (failure: unknown, context: Record<string, string | number | boolean | null>, extra: Record<string, string | number | boolean | null> = {}) => {
    const code = cvErrorCode(failure);
    const stage = cvErrorStage(failure, 'engine_parse');
    const properties = { ...context, ...extra, failed_stage: stage, error_code: code, http_status: cvErrorStatus(failure) };
    console.error('[Fit Assessment] CV upload failed.', stage, code, failure);
    setParseFailure(true);
    setParseFailureMessage(cvFailureMessage(code));
    track('cv_parse_failed', { reason: stage === 'file_check' ? code : `${stage}:${code}`, ...properties });
    trackStepError('fit-assessment', 'cv', `cv_upload_failed:${stage}:${code}`, { track: 'validation', programId: fitProgramIdRef.current, properties });
    void postFitCvEvent(sessionId, 'fit_cv_upload_failed', properties);
  };

  const parseCvFile = async (file: File) => {
    setError(''); setNotice(''); setParseFailure(false); setParseFailureMessage('');
    const startedAt = Date.now();
    const kind = cvFileKind(file);
    const context: Record<string, string | number | boolean | null> = { track: 'validation', source: 'file', file_type: kind, file_size_band: fileSizeBand(file.size), ...cvDeviceContext() };
    void postFitCvEvent(sessionId, 'fit_cv_upload_attempted', context);
    const rejection = cvFileRejection(file);
    if (rejection) {
      reportCvUploadFailure(new CvUploadError('This file cannot be read.', 'file_check', rejection), context);
      return;
    }
    lastCvFileRef.current = file;
    setParsing(true); setParsePhase(0); track('cv_uploaded', { file_type: kind, file_size_band: context.file_size_band }); track('cv_parse_started');
    const timer = window.setInterval(() => setParsePhase((current) => Math.min(3, current + 1)), 900);
    let textChars = 0;
    let pageCount: number | null = null;
    let primaryError: string | null = null;
    try {
      let normalized: CvProfile | null = null;
      let parsePath = 'engine';
      let cvText = '';
      try {
        const extracted = await extractCvFileText(file);
        cvText = extracted.text; pageCount = extracted.pages; textChars = cvText.length;
        if (textChars < 40) throw new CvUploadError('The file does not contain readable text.', 'text_extract', 'text_too_short');
        const data = await callHook(FIT_ENGINE_HOOK, 'parse_cv', { cv_text: cvText, assessment_session_id: sessionId }, 75000).catch((caught) => { throw toCvUploadError(caught, 'engine_parse'); });
        const candidate = normalizeProfile(data.profile);
        if (!profileHasContent(candidate)) throw new CvUploadError('The CV reader returned no details.', 'engine_parse', 'no_content');
        normalized = candidate;
      } catch (firstError) {
        primaryError = `${cvErrorStage(firstError, 'engine_parse')}:${cvErrorCode(firstError)}`;
        if (cvErrorCode(firstError) === 'password_protected' || (kind === 'docx' && cvText.length < 40)) throw firstError;
        console.warn('[Fit Assessment] Primary CV reading failed; trying the server reader.', firstError);
        parsePath = 'fallback';
        let temporaryUpload: { url: string; key: string } | null = null;
        try {
          let data: any;
          if (kind === 'docx') {
            data = await callHook(STRUCTURED_FIT_HOOK, 'parse_cv', { cv_text: cvText, assessment_session_id: sessionId }, 90000).catch((caught) => { throw toCvUploadError(caught, 'fallback_parse'); });
          } else {
            temporaryUpload = await uploadPdfForServerParsing(file).catch((caught) => { throw toCvUploadError(caught, 'fallback_upload', 'upload_failed'); });
            data = await callHook(STRUCTURED_FIT_HOOK, 'parse_cv', { document_url: temporaryUpload.url, assessment_session_id: sessionId }, 90000).catch((caught) => { throw toCvUploadError(caught, 'fallback_parse'); });
          }
          const candidate = normalizeProfile(data.profile);
          if (!profileHasContent(candidate)) throw new CvUploadError('The server reader returned no details.', 'fallback_parse', 'no_content');
          normalized = candidate;
        } catch (secondError) {
          throw cvErrorCode(firstError) === 'text_too_short' && cvErrorCode(secondError) !== 'ai_unavailable' ? firstError : secondError;
        } finally {
          if (temporaryUpload) await deleteTemporaryCvUpload(temporaryUpload.key).catch((cleanupError) => console.warn('[Fit Assessment] Temporary CV cleanup failed.', cleanupError));
        }
      }
      if (!normalized) throw new CvUploadError('No details were extracted.', 'fallback_parse', 'no_content');
      const reviewProfile = { ...normalized, education: normalized.education.length ? normalized.education : [{ institution: '', field: '', degree: '', graduationYear: '', gpa: '', coursework: '', source: 'extracted' as const }] };
      setSavedCv({ profile: reviewProfile, date: new Date().toISOString() });
      setOriginalProfile(reviewProfile); setProfile(reviewProfile); setCvReviewConfirmed(false); setCvFileName(file.name); setCvFileDate(new Date().toISOString()); setCvEntryMode('upload'); setCvChooserVisible(false);
      void postFitCvEvent(sessionId, 'fit_cv_uploaded', { ...context, parse_path: parsePath, primary_error: primaryError, text_chars: textChars, page_count: pageCount, duration_sec: Math.round((Date.now() - startedAt) / 1000) }, 'step');
      try {
        await persistCvProfile(reviewProfile, 'parsed');
      } catch (saveError) {
        setNotice('Mate read your CV, but could not save it yet. Review the details below and press Next — Mate will try saving again.');
        const saveProperties = { ...context, failed_stage: 'cv_save', error_code: cvErrorCode(saveError), http_status: cvErrorStatus(saveError) };
        track('cv_save_failed', saveProperties);
        trackStepError('fit-assessment', 'cv', 'cv_save_failed', { track: 'validation', programId: fitProgramIdRef.current, properties: saveProperties });
        void postFitCvEvent(sessionId, 'fit_cv_save_failed', saveProperties);
      }
    } catch (parseError) {
      reportCvUploadFailure(parseError, context, { text_chars: textChars, page_count: pageCount, primary_error: primaryError, duration_sec: Math.round((Date.now() - startedAt) / 1000) });
    } finally {
      window.clearInterval(timer); setParsing(false);
    }
  };

  const useSavedCv = () => {
    if (!savedCv) return;
    setProfile(savedCv.profile); setOriginalProfile(savedCv.profile); setCvReviewConfirmed(false); setCvFileName('Latest saved CV profile'); setCvFileDate(savedCv.date); setCvEntryMode('saved'); setCvChooserVisible(false); setParseFailure(false); setError('');
    track('saved_cv_reused');
  };

  useEffect(() => {
    if (!savedCv || stage !== 2 || cvChooserVisible || profileHasContent(profile) || cvEntryMode) return;
    setProfile(savedCv.profile); setOriginalProfile(savedCv.profile); setCvReviewConfirmed(false); setCvFileName('Latest saved CV profile'); setCvFileDate(savedCv.date); setCvEntryMode('saved');
  }, [savedCv, stage, cvChooserVisible]);

  const confirmCvProfile = async () => {
    if (cvConfirming) return;
    setError('');
    setCvConfirming(true);
    try {
      if (sessionId && cvPeerDataConsent !== (peerPrivacy?.opted_in === true)) {
        const privacy = await setPeerBenchmarkPrivacy(sessionId, cvPeerDataConsent);
        if (privacy) setPeerPrivacy(privacy);
        else console.warn('[Fit Assessment] Peer benchmark consent could not be synced; CV confirmation will continue.');
      }
      const confirmedProfile = confirmedCvProfile(profile);
      await persistCvProfile(confirmedProfile, 'confirmed');
      setProfile(confirmedProfile);
      setSavedCv({ profile: confirmedProfile, date: new Date().toISOString() });
      setCvReviewConfirmed(true);
      track('cv_review_completed', { corrected: JSON.stringify(profile) !== JSON.stringify(originalProfile) });
      trackStepComplete('fit-assessment', 'cv', { track: 'validation', programId: target?.id || null, durationSec: fitStepDurationSec('cv') });
      if (returnToTargetFitAfterCvEdit) {
        setReturnToTargetFitAfterCvEdit(false);
        setRecalculateAfterCvEdit(true);
        setStage(4);
      } else {
        setStage(3);
        track('motivation_assessment_started');
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not save your confirmed CV.');
      trackStepError('fit-assessment', 'cv', caught, { track: 'validation', programId: target?.id || null });
    } finally {
      setCvConfirming(false);
    }
  };

  const parseCvText = async () => {
    const text = cvPasteText.trim();
    if (text.length < 40 || parsing) return;
    setError(''); setNotice(''); setParseFailure(false); setParseFailureMessage('');
    const startedAt = Date.now();
    const context: Record<string, string | number | boolean | null> = { track: 'validation', source: 'text', file_type: null, file_size_band: null, ...cvDeviceContext() };
    void postFitCvEvent(sessionId, 'fit_cv_upload_attempted', context);
    setParsing(true); setParsePhase(0); track('cv_parse_started', { source: 'text' });
    const timer = window.setInterval(() => setParsePhase((current) => Math.min(3, current + 1)), 900);
    try {
      const data = await callHook(STRUCTURED_FIT_HOOK, 'parse_cv', { cv_text: text, assessment_session_id: sessionId }, 90000).catch((caught) => { throw toCvUploadError(caught, 'engine_parse'); });
      const candidate = normalizeProfile(data.profile);
      if (!profileHasContent(candidate)) throw new CvUploadError('The CV reader returned no details.', 'engine_parse', 'no_content');
      const reviewProfile = { ...candidate, education: candidate.education.length ? candidate.education : [{ institution: '', field: '', degree: '', graduationYear: '', gpa: '', coursework: '', source: 'extracted' as const }] };
      setSavedCv({ profile: reviewProfile, date: new Date().toISOString() });
      setOriginalProfile(reviewProfile); setProfile(reviewProfile); setCvReviewConfirmed(false); setCvFileName('Pasted CV text'); setCvFileDate(new Date().toISOString());
      void postFitCvEvent(sessionId, 'fit_cv_uploaded', { ...context, parse_path: 'text', text_chars: text.length, duration_sec: Math.round((Date.now() - startedAt) / 1000) }, 'step');
      try {
        await persistCvProfile(reviewProfile, 'parsed');
      } catch (saveError) {
        setNotice('Mate read your CV, but could not save it yet. Review the details below and press Next — Mate will try saving again.');
        track('cv_save_failed', { ...context, failed_stage: 'cv_save', error_code: cvErrorCode(saveError), http_status: cvErrorStatus(saveError) });
      }
    } catch (parseError) {
      reportCvUploadFailure(parseError, context, { text_chars: text.length, duration_sec: Math.round((Date.now() - startedAt) / 1000) });
    } finally {
      window.clearInterval(timer); setParsing(false);
    }
  };

  const startManualCv = () => {
    const manualProfile: CvProfile = { ...EMPTY_PROFILE, education: [{ institution: '', field: '', degree: '', graduationYear: '', gpa: '', coursework: '', source: 'user' }] };
    setProfile(manualProfile); setOriginalProfile(manualProfile); setCvReviewConfirmed(false); setCvFileName('Manual CV entry'); setCvFileDate(new Date().toISOString()); setCvEntryMode('manual'); setCvChooserVisible(false); setParseFailure(false); setError('');
    track('manual_cv_started');
  };

  const hasFunctionTracks = !!target?.functions.length;
  const functionSelectionReady = !!target && functionListStatus === 'loaded' && (!hasFunctionTracks || !!selectedFunction);
  const motivationComplete = !!(motivation.companyReasons.length && motivation.programReasons.length && (!hasFunctionTracks || motivation.functionReasons.length) && motivation.problemApproach && motivation.energizingWork && motivation.contributionStyle);

  useEffect(() => {
    if (journey !== 'validation' || stage < 3) return;
    void fetchSoftSkillQuestionBank()
      .then((rows) => setMcqBank(selectCoreSoftSkillBank(rows)))
      .catch(() => setMcqBank([]));
  }, [journey, stage]);

  const mcqComplete = useMemo(() => softSkillMcqComplete(mcqAnswers, mcqBank), [mcqAnswers, mcqBank]);

  // Scenario answers and sliders given in either track prefill this one on
  // the Work Style step; a saved corporate work-style result still wins.
  const sharedAnswersAppliedRef = useRef(false);
  useEffect(() => {
    if (!hydrated || journey !== 'validation' || stage !== 4 || sharedAnswersAppliedRef.current) return;
    sharedAnswersAppliedRef.current = true;
    const shared = readSharedFitAnswers(email);
    if (hasSharedAnswers(shared.mcqAnswers)) {
      setMcqAnswers((current) => hasSharedAnswers(current) ? current : shared.mcqAnswers as Record<string, McqChoice>);
      setMcqSeconds((current) => hasSharedAnswers(current) ? current : shared.mcqSeconds || {});
    }
    if (shared.ocp && !isDefaultOcp(shared.ocp) && !priorOcp && !ocpTouchedRef.current) setOcp((current) => isDefaultOcp(current) ? { ...DEFAULT_OCP, ...shared.ocp } as OcpScores : current);
  }, [hydrated, journey, stage, email, priorOcp]);
  useEffect(() => {
    if (!hydrated) return;
    const patch: SharedFitAnswers = {};
    if (hasSharedAnswers(mcqAnswers)) { patch.mcqAnswers = mcqAnswers; patch.mcqSeconds = mcqSeconds; }
    if (!isDefaultOcp(ocp)) patch.ocp = ocp;
    if (Object.keys(patch).length) writeSharedFitAnswers(email, patch);
  }, [hydrated, email, mcqAnswers, mcqSeconds, ocp]);

  const changePeerPrivacy = async (optIn: boolean) => {
    setPeerPrivacyBusy(true);
    setError('');
    try {
      const privacy = await setPeerBenchmarkPrivacy(sessionId, optIn);
      if (!privacy) throw new Error('Mate could not update your peer-benchmark privacy choice.');
      setPeerPrivacy(privacy);
      if (optIn && target && fitAnalysis) {
        const benchmark = await fetchIndustryPeerBenchmark(sessionId, {
          target_company: target.company,
          target_industry: target.industry,
          target_sector: classifyProgramCompany(target.company),
          cv_profile: profile,
          ocp_scores: ocp,
          mbti_type: null,
          analysis: fitAnalysis,
          assessment_session_id: sessionId || undefined,
          contribute: true,
        });
        if (benchmark) setFitAnalysis((current) => current ? { ...current, peer_industry_benchmark: benchmark } : current);
      }
      setNotice(optIn ? 'You are now contributing anonymous industry/product fit signals. No name, email, or CV text is shared.' : 'You have opted out. Your peer contributions are excluded from cohort benchmarks.');
      track('peer_benchmark_privacy_changed', { opted_in: optIn });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not update your peer-benchmark privacy choice.');
    } finally {
      setPeerPrivacyBusy(false);
    }
  };

  const runAssessment = async () => {
    if (!target || !functionSelectionReady || !cvReviewConfirmed || !motivationComplete) return;
    if (!mcqComplete) {
      setError('Complete the Casemate soft-skill questionnaire before continuing to results.');
      setWorkStyleSubStep('mcq');
      return;
    }
    if (referenceStatus && !referenceStatus.ready) {
      setError('Casemate\u2019s scoring reference data is unavailable, so no evidence-backed score can be produced right now. Please reopen Fit Assessment in a moment.');
      trackStepError('fit-assessment', 'work_style', 'scoring_reference_data_unavailable', { track: 'validation', programId: target.id });
      return;
    }
    setBusy(true); setError(''); setFitPending(false);
    try {
      const recommendedSubroles = recommendSubroles(selectedFunction, motivation);
      const calculationRequestId = `validation_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      const diagnosticMotivation = sanitizeMotivation({ ...motivation, commitment: 'Primary target', roleUnderstanding: '', longTerm: '' });
      const targetContext = { selectedTargetProgramId: target.id, selectedTargetProgram: target, selectedCompany: target.company, selectedFunction, recruitmentCycle: target.recruitmentCycle, activeTargetStatus: 'assessing', cvReviewConfirmed, motivationAssessmentResponses: diagnosticMotivation, recommendedSubroles, ocpResultReused, workingStyleResultReused, userAddedEvidence, calculationRequestId };
      const canonicalProfile = confirmedCvProfile(profile);
      let calculateError: unknown = null;
      const calculated: Record<string, any> = await callHook(FUNCTION_FIT_HOOK, 'calculate', {
        cv_profile: {
          ...canonicalProfile,
          university_tier: canonicalProfile.education[0]?.universityTier || canonicalProfile.university_tier,
          education: canonicalProfile.education.map((education: Education) => ({ ...education, university_tier: education.universityTier, tier: education.universityTier })),
        },
        selected_certifications: canonicalProfile.certifications,
        other_skills: '',
        motivation_answers: legacyMotivation(motivation, selectedFunction),
        ocp_scores: ocp,
        mbti_answers: {},
        mbti_type: '',
        mbti_counts: {},
        mcq_answers: mcqAnswers,
        mcq_seconds: mcqSeconds,
        assessment_session_id: calculationRequestId,
        target_context: targetContext,
      }).catch((caught: unknown) => { calculateError = caught; return {}; });
      let resultId = Number(calculated.assessment_result_id);
      let functionFitScores: any[] = Array.isArray(calculated.function_fit_scores) ? calculated.function_fit_scores : [];
      if (!Number.isFinite(resultId) || resultId <= 0) {
        const recovered = await findSavedCalculation(calculationRequestId);
        if (recovered) {
          resultId = recovered.id;
          functionFitScores = recovered.functionFitScores;
        } else if (calculateError) {
          throw calculateError;
        } else {
          throw new Error('Mate could not save the shared fit calculation. Please try again.');
        }
      }
      const analyzed = await callHook(PROGRAM_FIT_ANALYSIS_HOOK, 'analyze', {
        program_id: target.id,
        assessment_result_id: resultId,
        selected_function: selectedFunction,
        target_context: targetContext,
        ocp_scores: ocp,
      });
      const analysis = analyzed.analysis || null;
      const motivationFitScore = resolveMotivationFitScore(analysis, functionFitScores, selectedFunction);
      let enrichedAnalysis = analysis ? { ...analysis, motivation_fit_score: motivationFitScore ?? analysis.motivation_fit_score, recommended_subroles: recommendedSubroles } : null;
      if (enrichedAnalysis) {
        const peerBenchmark = await fetchIndustryPeerBenchmark(sessionId, {
          target_company: target.company,
          target_industry: target.industry,
          target_sector: classifyProgramCompany(target.company),
          cv_profile: profile,
          ocp_scores: ocp,
          mbti_type: null,
          analysis: enrichedAnalysis,
          assessment_session_id: sessionId,
          contribute: cvPeerDataConsent,
        });
        if (peerBenchmark) {
          const baseActions = enrichedAnalysis.preparation_actions?.length
            ? enrichedAnalysis.preparation_actions
            : enrichedAnalysis.roadmap_actions || [];
          const merged = mergePeerHintsIntoActions(baseActions, peerBenchmark, 12);
          enrichedAnalysis = {
            ...enrichedAnalysis,
            preparation_actions: merged,
            roadmap_actions: mergePeerHintsIntoActions(enrichedAnalysis.roadmap_actions || baseActions, peerBenchmark, 12),
          };
        }
      }
      setAssessmentResultId(Number.isFinite(resultId) && resultId > 0 ? resultId : null);
      setFitAnalysis(enrichedAnalysis);
      setFitPending(!analysis);
      trackStepComplete('fit-assessment', 'work_style', { track: 'validation', programId: target.id, durationSec: fitStepDurationSec('work_style') });
      setStage(5);
      trackMetaCustomEvent('FitAssessmentComplete', {
        journey: 'validation',
        program_id: target.id,
      }, `fit-validation:${resultId}`);
      track('target_fit_viewed', { program_id: target.id, result_available: !!analysis });
      track('working_style_assessment_completed', { reused: workingStyleResultReused });
      track('ocp_assessment_completed', { reused: ocpResultReused });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not prepare your Target Fit result.');
      trackStepError('fit-assessment', 'work_style', caught, { track: 'validation', programId: target.id });
    } finally { setBusy(false); }
  };

  useEffect(() => {
    if (!recalculateAfterCvEdit || !cvReviewConfirmed || recalculateAfterCvEditRef.current) return;
    recalculateAfterCvEditRef.current = true;
    setRecalculateAfterCvEdit(false);
    void runAssessment().finally(() => { recalculateAfterCvEditRef.current = false; });
  }, [recalculateAfterCvEdit, cvReviewConfirmed]);

  useEffect(() => {
    if (stage !== 2) setCvRewriteMode(false);
  }, [stage]);

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
    trackStepView('fit-assessment', 'roadmap', { track: 'validation', programId: target.id });
    trackFitActivation('validation', { programId: target.id });
    setBusy(true); setError('');
    try {
      const recommendations = recommendationsFromFit(target, selectedFunction, profile);
      const cleanFit = {
        overallFit: finiteNumberOrNull(fitAnalysis?.matching_ratio),
        eligibilityStatus: fitAnalysis?.eligibility_status || null,
        profileExperienceFit: finiteNumberOrNull(fitAnalysis?.cv_profile_fit_score),
        functionFit: finiteNumberOrNull(fitAnalysis?.function_fit_score),
        motivationFit: finiteNumberOrNull(fitAnalysis?.motivation_fit_score),
        workStyleFit: finiteNumberOrNull(fitAnalysis?.work_style_fit_score ?? fitAnalysis?.culture_fit_percent),
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
        mbtiType: fitAnalysis?.mbti_type || null,
        engineFlags: fitAnalysis?.engine_flags || [],
        referenceDegraded: fitAnalysis?.reference_degraded || [],
      };
      await generateAndSaveRoadmap({ targetProgram: target.program, targetCompany: target.company, targetProgramId: target.id, targetFunction: selectedFunction, recruitmentCycle: target.recruitmentCycle, activeTargetStatus: 'active', fitResultReference: assessmentResultId ? `assessment_results:${assessmentResultId}` : null, targetFit: engineFit, preparationRecommendations: recommendations, roadmapTaskStatus: Object.fromEntries(recommendations.map((item) => [item.id, 'pending'])), matchPercent: cleanFit.overallFit, sessionId, accountEmail: email });
      try { localStorage.setItem(`casemate-roadmap-target:${sessionId || 'preview'}`, JSON.stringify({ program: target.program, company: target.company, programId: target.id, function: selectedFunction, matchPercent: cleanFit.overallFit })); } catch { /* Roadmap is already persisted. */ }
      trackStepComplete('fit-assessment', 'result', { track: 'validation', programId: target.id, durationSec: fitStepDurationSec('result') });
      setStage(6); track('target_confirmed', { program_id: target.id, function: selectedFunction }); track('preparation_plan_generated', { program_id: target.id, recommendation_count: recommendations.length }); track('roadmap_opened', { source: 'validation_first' }); trackAppSwitch('fit-assessment', 'my-roadmap', { trigger: 'generate_my_roadmap' }); openApp('my-roadmap');
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'The preparation plan could not be generated.'); trackStepError('fit-assessment', 'roadmap', caught, { track: 'validation', programId: target.id }); }
    finally { setBusy(false); }
  };

  const changeTarget = () => {
    setTarget(null); setSelectedFunction(''); setSearch(''); setFunctionListStatus('idle'); setFitAnalysis(null); setFitPending(false); setAssessmentResultId(null); setStage(1); setJourney('validation');
  };

  // Start over is the one way back to the first question: the target is
  // cleared, while the CV and answers stay for the next run.
  const startOverAssessment = () => {
    recoveryInteractionRef.current = true;
    setJourney('validation');
    setStage(1);
    setTarget(null); setSelectedFunction(''); setSearch(''); setFunctionListStatus('idle'); setManualMode(false);
    setFitAnalysis(null); setFitPending(false); setAssessmentResultId(null);
    setError('');
    setNotice('');
    track('assessment_returned_to_first_step', { answers_preserved: true });
  };

  // A mis-tapped branch has to be undone, not just hidden: the selector reopens
  // with neither option pre-selected and nothing entered in the wrong flow.
  const returnToSelector = () => {
    recoveryInteractionRef.current = true;
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
      <div className="min-h-full bg-[var(--space-surface-page)] text-[var(--space-text-primary)]" aria-busy="true" aria-label="Restoring your saved Fit Assessment">
        <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6">
          <div className="motion-safe:animate-pulse space-y-5 rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 sm:p-8" data-testid="fit-restore-skeleton">
            <span className="sr-only">Restoring your saved assessment…</span>
            <div className="h-3 w-28 rounded-full bg-[var(--space-surface-muted)]" />
            <div className="h-7 w-3/4 rounded-xl bg-[var(--space-surface-muted)]" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded-full bg-[var(--space-surface-muted)]" />
              <div className="h-4 w-5/6 rounded-full bg-[var(--space-surface-muted)]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-24 rounded-2xl bg-[var(--space-surface-muted)]" />
              <div className="h-24 rounded-2xl bg-[var(--space-surface-muted)]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (journey === 'exploration') return <ExplorationFlow showCvChooserOnEntry journey={journey} priorAttempts={priorAttempts} onBackToSelector={returnToSelector} sharedSavedCv={savedCv} onSavedCvChange={(value) => setSavedCv({ profile: normalizeProfile(value.profile), date: value.date })} />;

  const rankingChoice = (index: number, value: string) => setMotivation((current) => {
    const next = current.priorityRanking.slice(); next[index] = value;
    return { ...current, priorityRanking: next.filter(Boolean) };
  });
  const subroleRecommendation = recommendSubroles(selectedFunction, motivation);
  const displayedSubroleRecommendation = fitAnalysis?.recommended_subroles || subroleRecommendation;
  const foundPrior = !!priorOcp;
  const confirmedTechnicalSkills = profile.skills.filter((skill) => /excel|powerpoint|google sheets|google workspace|sql|power bi|tableau|python|\bsap\b|\bvba\b|r programming/i.test(skill));
  const quantifiedLeadershipActivity = profile.extracurricular_activities.find((activity) => /\d[\d,.]*\s*(?:\+|%|x|members?|participants?|reaches?|people|users?|customers?|events?|projects?)/i.test(activity.description || ''));
  const internationalExposure = detectInternationalExposure(profile);
  const resultCriteria = (fitAnalysis?.criteria || [])
    .filter((criterion: any) => !isMbtiCriterion(criterion) && !isResearchCriterion(criterion))
    .map((criterion: any) => {
      const key = String(criterion?.id || criterion?.label_en || criterion?.label || '').toLowerCase();
      if (/leadership/.test(key) && quantifiedLeadershipActivity) {
        const activityName = [quantifiedLeadershipActivity.role, quantifiedLeadershipActivity.organization].filter(Boolean).join(' at ');
        return {
          ...criterion,
          status: 'met',
          score: undefined,
          evidence: `${activityName || 'Your extracurricular activity'} includes quantified leadership outcomes.`,
          improvement_tip: 'Keep the team size, participant reach, and other measured outcomes in your CV bullets.',
        };
      }
      if (/technical[ _-]?skills?|tools?/.test(key) && confirmedTechnicalSkills.length > 0) {
        return {
          ...criterion,
          status: 'met',
          score: undefined,
          evidence: `Tools confirmed in your Skills section: ${confirmedTechnicalSkills.join(', ')}.`,
          improvement_tip: 'Keep these tools on your CV and mention where you used each one.',
        };
      }
      return criterion;
    });
  if (internationalExposure.signals.length && !resultCriteria.some((criterion: any) => String(criterion?.id || '').toLowerCase().includes('international_exposure'))) {
    resultCriteria.unshift({ id: 'international_exposure', label_en: 'International Exposure', status: 'met', evidence: internationalExposure.summary, improvement_tip: 'Keep this cross-border experience visible in your CV and interview examples.' });
  }
  const strengths = resultCriteria.filter((criterion: any) => criterion.status === 'met').slice(0, 6);
  const gaps = resultCriteria.filter((criterion: any) => criterion.status === 'not_met' || criterion.status === 'partial').slice(0, 6);
  const cleanResultText = (value: unknown) => stripMatePrefix(String(value || '')
    .replace(/\s*\[[^\]]+\]/g, '')
    .replace(/\b(?:fa_[a-z_]+|questionnaire|cv):[^\s|]+/gi, '')
    .replace(/\s*\|\s*/g, '; ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;])/g, '$1')
    .trim());
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
      const evidenceParts: string[] = [];
      if (education?.institution || education?.gpa) evidenceParts.push('Strong academic background');
      if (profile.certifications.length) evidenceParts.push(`${profile.certifications.length === 1 ? 'A certification provides' : 'Certifications provide'} supporting evidence`);
      if (profile.honors_achievements.length) evidenceParts.push(`${profile.honors_achievements.length === 1 ? 'A competition or achievement provides' : 'Competitions and achievements provide'} additional proof`);
      if (experienceNames.length) evidenceParts.push(`${experienceNames[0]} gives relevant practical evidence`);
      else evidenceParts.push(`No internship or project matched to ${targetFunction} is confirmed yet`);
      return {
        label: 'Professional Evidence',
        summary: `${evidenceParts.join('; ')}.`,
        impact: met ? `Supports your story for ${targetName}.` : 'Add one clearer example; this is not a rejection.',
        next: met ? 'Keep each bullet measurable.' : `Add a ${targetFunction} internship, certification, or project with an outcome.`,
      };
    }
    if (key.includes('motivation')) {
      const direction = motivation.functionReasons[0] || motivation.programReasons[0] || motivation.companyReasons[0] || 'your evidence for this direction';
      return { label: 'Motivation', summary: met ? `${direction} — clear fit with this target.` : `${direction} — this reflects your personal preferences for the target.`, impact: met ? `Credible “why ${targetName}” story.` : 'This is a preference signal, not something you need to improve.', next: '' };
    }
    if (key.includes('work_style')) {
      const prefs = workPreferences.length ? workPreferences.join(' & ') : 'your slider preferences';
      return { label: 'Work Style', summary: met ? `Aligns on ${prefs}.` : `Partial fit on ${prefs} — prove it in examples.`, impact: met ? `Supports day-to-day fit in ${targetFunction}.` : 'Preference signal only — not pass/fail.', next: met ? 'Use teamwork examples in interviews.' : 'Add one team project or internship story.' };
    }
    if (key.includes('cognitive')) {
      const academic = [education?.institution, education?.gpa].filter(Boolean).join(' with ');
      return { label: 'Academic Foundation', summary: met ? `${academic || 'Solid academics'}${courseNames.length ? ` · ${courseNames.join(', ')}` : ''}.` : `${academic || 'Academic base present'} — add stronger analytical proof.`, impact: met ? `Supports structured learning for ${targetName}.` : 'One quantified academic or case example would help.', next: met ? 'Tie grades or coursework to a real decision.' : competitionSuggestionForTarget(targetFunction, profile.honors_achievements) };
    }
    if (key.includes('leadership')) {
      // Name the role the engine counted as leadership, not whichever activity happens to be listed first.
      const detailRole = Array.isArray(fitAnalysis?.leadership_detail?.roles) ? fitAnalysis?.leadership_detail?.roles[0] : null;
      const leadActivity = profile.extracurricular_activities.find((activity) => /\b(?:leader|lead|head|president|captain|chair|founder|manager|coordinator)\b|trưởng|chủ nhiệm|bí thư|phó ban/i.test(activity.role || ''));
      const leadershipName = detailRole
        ? [detailRole.role, detailRole.organization].filter(Boolean).join(' at ')
        : leadActivity ? [leadActivity.role, leadActivity.organization].filter(Boolean).join(' at ') : '';
      const showcased = leadershipName || activityNames[0] || achievementNames[0];
      const hasMeasuredOutcome = !!quantifiedLeadershipActivity;
      return {
        label: 'Leadership',
        summary: showcased ? `${showcased} shows initiative${hasMeasuredOutcome ? ' with quantified impact' : ''}.` : 'No clear leadership or team-ownership example is confirmed yet.',
        impact: hasMeasuredOutcome ? `Team size, participant reach, and measured results support the ownership expected in ${targetName}.` : met ? `Supports ownership expected in ${targetName}.` : 'Good start — quantify your impact.',
        next: hasMeasuredOutcome ? 'Keep these measured outcomes prominent in your CV bullets.' : met ? 'Lead with action → result.' : cleanResultText(criterion?.improvement_tip) || 'State what you owned and one measurable outcome.',
      };
    }
    if (isMbtiCriterion(criterion)) {
      return { label: '', summary: '', impact: '', next: '' };
    }
    const fallback = compactFitEvidence(criterion?.evidence, 140);
    return {
      label: humanizeCriterionLabel(cleanResultText(criterion?.label_en || criterion?.label_vi || 'Fit evidence')),
      summary: fallback || (met ? 'Solid evidence in this area.' : 'Add one specific, measurable example.'),
      impact: met ? 'This evidence supports your target fit.' : 'A clearer example would make your fit easier to understand.',
      next: cleanResultText(criterion?.improvement_tip) || 'Add one specific, measurable example.',
    };
  };

  const resultStrengthRows: FitCriterionRow[] = strengths.map((item: any) => {
    const copy = criterionCopy(item);
    return { id: item.id, label: copy.label, summary: copy.summary };
  }).filter((row) => row.label && row.summary);
  const resultGapRows: FitCriterionRow[] = gaps.map((item: any) => {
    const copy = criterionCopy(item);
    return { id: item.id, label: copy.label, summary: copy.summary, next: copy.next };
  }).filter((row) => row.label && row.summary);
  const resultConcernLines = buildWatchListLines({
    engineConcerns: (fitAnalysis?.potential_concerns || []).filter((concern: unknown) => {
      const text = String(concern || '');
      if (confirmedTechnicalSkills.length > 0 && /technical[ _-]?skills?|tools?|excel|powerpoint|google sheets/i.test(text)) return false;
      if (quantifiedLeadershipActivity && /leadership|extracurricular|measurable outcome|quantify/i.test(text)) return false;
      return true;
    }),
    gapRows: resultGapRows,
    limit: 6,
  });
  const resultActionRows: FitActionRow[] = target ? featureRecommendationRows(target, selectedFunction, profile) : [];
  const parseLabels = ['Reading your CV', 'Structuring your experience', 'Identifying target-relevant evidence', 'Preparing your profile for review'];
  const cvFormVisible = !cvChooserVisible && cvEntryMode !== null && (profileHasContent(profile) || cvEntryMode === 'manual');
  const cvRewriteLayout = cvRewriteMode && cvFormVisible && !!target;
  const isSearchingToSwap = !!target && !!search.trim();
  const missingAfterUpload = (value: unknown) => cvEntryMode === 'upload' && !String(value || '').trim();
  const missingInputClass = 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_4%,var(--space-surface-card))]';
  const cvProfileFieldsValid = certIssuersValid && !profile.education.some((education) => !education.degree || !courseworkComplete(education.coursework)) && !profile.experiences.some((experience) => !isIndustrySelectionComplete(experience));

  return (
    <div ref={rootRef} className="min-h-full bg-[var(--space-surface-page)] text-[var(--space-text-primary)] [&_button]:min-h-11">
      <div className="mx-auto flex w-full max-w-[82rem] items-start gap-4 px-3 py-4 sm:px-6 sm:py-7">
        <aside className="sticky top-4 hidden w-40 shrink-0 lg:block"><SaveProgressButton status={saveStatus} onSave={saveNow} /></aside>
        <main className="min-w-0 flex-1">
        <div className="h-6" aria-hidden="true" />
        <div className="flex items-center justify-between gap-3">
          <div className="lg:hidden"><SaveProgressButton status={saveStatus} onSave={saveNow} /></div>
          {journey === 'validation' && <button type="button" onClick={startOverAssessment} className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold text-[var(--space-text-brand)] hover:bg-[var(--space-surface-accent-soft)]"><RefreshCw className="h-3.5 w-3.5" />Start over</button>}
        </div>
        {!(journey === 'validation' && stage === 2) && <header className="mb-5">
          <FitBrandTag />
          <h1 className="mt-2 text-xl font-extrabold tracking-tight sm:text-3xl">Validate your target before you prepare</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">See how your confirmed profile fits one MT or consulting target, where evidence is missing, and what to do next.</p>
        </header>}

        {journey === 'validation' && stage !== 2 && <FitStepIndicator steps={STAGES} current={stage} />}

        {notice && <div className="mb-4 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-success-500)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_9%,transparent)] p-3 text-sm text-[var(--space-text-primary)]">{notice}</div>}
        {error && <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_8%,transparent)] p-3 text-sm font-semibold text-[var(--space-semantic-danger)]"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}

        {(journey === null || (journey === 'validation' && stage === 1)) && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
          {!(journey === 'validation' && target) && <>
          {journey === null && <PriorAttemptsQuestions value={priorAttempts} onChange={setPriorAttempts} className="mb-6" />}
          <h2 className="text-lg font-extrabold sm:text-xl">Do you already have a specific MT program in mind?</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <button type="button" onClick={() => { recoveryInteractionRef.current = true; setJourney('validation'); setStage(1); track('validation_started'); track('target_status_selected', { has_target: true }); }} className={`rounded-2xl border p-5 text-left ${journey === 'validation' ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}><p className="font-extrabold">Yes, I have a target</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]">Compare your current profile with one selected program and function.</p></button>
            <button type="button" onClick={() => { recoveryInteractionRef.current = true; setJourney('exploration'); track('target_status_selected', { has_target: false }); trackFitTrackSelect('discovery', { programId: null, properties: priorAttemptProperties(priorAttempts) }); trackStepView('fit-assessment', 'track_select', { track: 'discovery', programId: null }); }} className="rounded-2xl border border-[var(--space-border-default)] p-5 text-left hover:border-[var(--space-brand-primary-500)]"><p className="font-extrabold">Not yet, help me explore</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]">Continue to the existing function-first Exploration flow.</p></button>
          </div>
          </>}

          {journey === 'validation' && <div className={target ? '' : 'mt-7 border-t border-[var(--space-border-default)] pt-6'}>
            <button type="button" onClick={returnToSelector} className="mb-4 flex w-fit items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Go Back</button>
            {target && <h2 className="mb-4 text-lg font-extrabold sm:text-xl">Your target program</h2>}
            <label className="text-sm font-bold">Search Target Program<div className="relative mt-2"><Search className="absolute left-3 top-3.5 h-4 w-4 text-[var(--space-text-muted)]" /><input value={search} onFocus={() => setProgramSearchFocused(true)} onBlur={() => window.setTimeout(() => setProgramSearchFocused(false), 150)} onChange={(event) => { setSearch(event.target.value); track('target_program_searched', { query_length: event.target.value.length }); }} placeholder="Search by program, company, function or product (e.g. Marketing, beer, skincare)" className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] py-3 pl-10 pr-3 text-sm outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)]" /></div></label>
            {programCatalogLoading && <p className="mt-3 text-xs font-semibold text-[var(--space-text-muted)]">Loading current programs…</p>}
            {!target && !search.trim() && !manualMode && sharedTargetSuggestion && <button type="button" onClick={() => { chooseTarget(sharedTargetSuggestion); const lastFunction = readSharedFitAnswers(email).lastTarget?.selectedFunction || ''; if (lastFunction && sharedTargetSuggestion.functions.includes(lastFunction)) setSelectedFunction(lastFunction); }} className="mt-3 flex w-full items-center justify-between gap-3 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4 text-left"><span className="min-w-0"><span className="block text-xs font-bold text-[var(--space-text-brand)]">From your Discovery results</span><span className="mt-0.5 block font-extrabold">{sharedTargetSuggestion.company} · {sharedTargetSuggestion.program}</span></span><ArrowRight className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" /></button>}
            {programCatalogError && !programCatalogLoading && <p className="mt-3 text-xs font-semibold text-[var(--space-semantic-danger)]">Current programs could not be loaded. You can still enter a program manually.</p>}
            {(!target || isSearchingToSwap) && !manualMode && !programCatalogLoading && <div className="mt-3 max-h-[28rem] space-y-2 overflow-y-auto pr-1">{searchResults.map(({ program, matchedFunction, matchedProduct }) => <button key={program.id} type="button" onClick={() => chooseTarget(program)} className="w-full rounded-2xl border border-[var(--space-border-default)] p-4 text-left hover:border-[var(--space-brand-primary-500)] focus:outline-none focus:ring-2 focus:ring-[var(--space-brand-primary-200)]"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-xs font-bold text-[var(--space-text-muted)]">{program.company}</p><p className="mt-0.5 font-extrabold">{program.program}</p></div><div className="flex flex-wrap items-center gap-1.5">{targetStatusText(program) && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-semantic-success-700)]">{targetStatusText(program)}</span>}{program.programType && <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-text-brand)]">{program.programType}</span>}</div></div><p className="mt-2 text-xs text-[var(--space-text-secondary)]">{program.industry}</p>{matchedFunction && <p className="mt-1 text-xs font-semibold text-[var(--space-text-brand)]">Offers function: {matchedFunction}</p>}{matchedProduct && <p className="mt-1 text-xs font-semibold text-[var(--space-text-brand)]">Sells: {matchedProduct}</p>}</button>)}</div>}
            {(!target || isSearchingToSwap) && search.trim() && searchResults.length === 0 && !manualMode && <div className="mt-4 rounded-2xl bg-[var(--space-surface-muted)] p-4"><p className="font-bold">Can't find your target program?</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => { setNotice('Your program request has been recorded for review.'); track('manual_program_requested', { search_query: search.trim() }); }} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Request This Program</button><button type="button" onClick={() => setManualMode(true)} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Enter Program Manually</button><button type="button" onClick={() => setSearch('')} className="rounded-xl px-3 py-2 text-xs font-bold text-[var(--space-text-muted)]">Return to Search</button></div></div>}
            {manualMode && <div className="mt-4 rounded-2xl border border-[var(--space-border-default)] p-4"><p className="font-extrabold">Enter Program Manually</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{[['Company', manualCompany, setManualCompany], ['Program', manualProgram, setManualProgram], ['Industry', manualIndustry, setManualIndustry]].map(([label, value, setter]: any) => <label key={label} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={value} onChange={(event) => setter(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm" /></label>)}</div><p className="mt-3 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,transparent)] p-3 text-xs leading-5 text-[var(--space-text-secondary)]">Casemate can provide a general function-level assessment, but program-specific fit may be limited until this program is added to our database.</p><button type="button" onClick={continueManualTarget} disabled={!manualCompany.trim() || !manualProgram.trim()} className="mt-3 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">Use Manual Program</button></div>}
            {target && !isSearchingToSwap && <div className="mt-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold text-[var(--space-text-muted)]">{target.company} · {target.industry}</p><h3 className="mt-1 text-lg font-extrabold">{target.program}</h3>{(target.programType || targetStatusText(target)) && <div className="mt-1.5 flex flex-wrap items-center gap-1.5">{target.programType && <span className="rounded-full bg-[var(--space-surface-card)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-text-brand)]">{target.programType}</span>}{targetStatusText(target) && <span className="text-xs text-[var(--space-text-secondary)]">{targetStatusText(target)}</span>}</div>}</div><button type="button" onClick={() => { setTarget(null); setSelectedFunction(''); setFunctionListStatus('idle'); }} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Choose Another Program</button></div>{functionListStatus === 'loading' && <p className="mt-4 text-xs font-semibold text-[var(--space-text-muted)]">Loading function tracks…</p>}{functionListStatus === 'error' && <p className="mt-4 text-xs font-semibold text-[var(--space-semantic-danger)]">Function tracks could not be loaded. Choose the program again to retry.</p>}{functionListStatus === 'loaded' && target.functions.length > 0 && <label className="mt-4 block text-sm font-bold">Target function / track<select value={selectedFunction} onChange={(event) => { setSelectedFunction(event.target.value); track('target_function_selected', { function: event.target.value, program_id: target.id }); }} className="mt-2 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-3 text-sm outline-none focus:border-[var(--space-brand-primary)]"><option value="">Select a function or track</option>{target.functions.map((fn) => <option key={fn} value={fn}>{fn}</option>)}</select></label>}{functionListStatus === 'loaded' && target.functions.length === 0 && <p className="mt-4 text-xs font-semibold text-[var(--space-text-muted)]">No specific function track for this program.</p>}{!target.verifiedData && <button type="button" onClick={continueManualTarget} className="sr-only">Continue manual target</button>}</div>}
            {target && !isSearchingToSwap && <PriorAttemptsQuestions value={priorAttempts} onChange={setPriorAttempts} className="mt-6" />}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end"><button type="button" disabled={!functionSelectionReady} onClick={() => { setCvChooserVisible(true); setStage(2); trackFitTrackSelect('validation', { programId: target?.id || null, properties: priorAttemptProperties(priorAttempts) }); trackStepView('fit-assessment', 'track_select', { track: 'validation', programId: target?.id || null }); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">Continue with This Target <ArrowRight className="h-4 w-4" /></button></div>
          </div>}
        </section>}

        {journey === 'validation' && stage === 2 && <div className={cvRewriteLayout ? 'grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)]' : undefined}>
          {cvRewriteLayout && target && <aside className="min-w-0 max-h-[75vh] overflow-y-auto rounded-3xl lg:sticky lg:top-4 lg:order-last lg:max-h-[calc(100vh-2rem)]"><CvRewriteFeedbackPanel programId={target.id} company={target.company} program={target.program} position={selectedFunction} profile={profile} canSave={cvProfileFieldsValid} saving={cvConfirming} onSave={() => void confirmCvProfile()} onClose={() => setCvRewriteMode(false)} /></aside>}
        <section className={`${cvRewriteLayout ? 'min-w-0 rounded-3xl sm:p-7' : cvFormVisible ? 'mx-auto max-w-5xl rounded-3xl sm:p-7' : 'rounded-3xl sm:p-7'} border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 [&_input]:font-normal [&_select]:font-normal [&_textarea]:font-normal`}>
          {!cvFormVisible && <CvSubmitStep variant="validation" parsing={parsing} parsePhase={parsePhase} parseLabels={parseLabels} hasSavedCv={!!savedCv} savedCvDate={savedCv?.date} parseFailure={parseFailure} failureMessage={parseFailureMessage} onFile={(file) => void parseCvFile(file)} onUseSaved={useSavedCv} onManual={startManualCv} onFillManually={startManualCv} onRetry={() => { const file = lastCvFileRef.current; if (!file) return false; void parseCvFile(file); return true; }} onBack={() => { setError(''); setParseFailure(false); setCvChooserVisible(false); setStage(1); }} />}
          {cvFormVisible && <div><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · CV confirmation</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">{cvEntryMode === 'manual' ? 'Add your CV details' : 'Review what Mate found'}</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">{cvEntryMode === 'manual' ? 'Fill in the fields below. Have your CV as text? Paste it to auto-fill the form, then check every field.' : 'Correct anything that is incomplete. Your CV is evidence, not a gate — no experience is okay.'}</p></div></div>
            {cvEntryMode === 'manual' && <CvPasteAutofill text={cvPasteText} onTextChange={setCvPasteText} onAutofill={() => void parseCvText()} parsing={parsing} parsingLabel={parseLabels[Math.min(parsePhase, parseLabels.length - 1)]} failureMessage={parseFailure ? parseFailureMessage : null} />}
            <label className="mt-6 block text-xs font-bold text-[var(--space-text-secondary)]">Full name<input value={profile.name} aria-invalid={missingAfterUpload(profile.name) || undefined} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-[var(--space-brand-primary)] ${missingAfterUpload(profile.name) ? missingInputClass : 'border-[var(--space-border-default)]'}`} />{missingAfterUpload(profile.name) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">We couldn't read this — please fill it in.</span>}</label>
            <div className="mt-6"><div className="flex items-center justify-between gap-3"><h3 className="flex items-center gap-2 text-sm font-extrabold"><GraduationCap className="h-4 w-4 text-[var(--space-text-brand)]" />Education</h3><button type="button" onClick={() => { const index = profile.education.length; setProfile((current) => ({ ...current, education: [...current.education, { institution: '', field: '', degree: '', graduationYear: '', gpa: '', coursework: '', source: 'user' }] })); window.setTimeout(() => document.getElementById(`cv-education-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-xl bg-[var(--space-surface-accent-soft)] px-3 py-2 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add Education</button></div>{profile.education.length === 0 && <p className="mt-2 text-xs text-[var(--space-text-muted)]">No confirmed education. Add an entry if relevant.</p>}<div className="mt-3 space-y-3">{profile.education.map((education, index) => <div key={`education-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Education {index + 1}</span><button type="button" onClick={() => setProfile((current) => { const educationEntries = current.education.filter((_, itemIndex) => itemIndex !== index); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', university_tier: primary?.universityTier, faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} aria-label={`Delete education entry ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2"><UniversityCombo id={`cv-education-${index}`} label="University name" value={education.institution} missing={missingAfterUpload(education.institution)} onChange={(institution, universityTier) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, institution, universityTier } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', university_tier: primary?.universityTier, faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} /><MajorCombo id={`cv-major-${index}`} label="Major" value={education.field} missing={missingAfterUpload(education.field)} onChange={(field) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, field } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} /></div><div className="grid gap-3 sm:grid-cols-3"><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label htmlFor={`cv-degree-${index}`} className="block">Degree <span className="text-[var(--space-semantic-danger)]">*</span></label><div className="relative mt-1.5"><select id={`cv-degree-${index}`} value={education.degree} required aria-required="true" aria-invalid={!education.degree || undefined} onChange={(event) => setProfile((current) => ({ ...current, education: current.education.map((item, itemIndex) => itemIndex === index ? { ...item, degree: event.target.value } : item) }))} className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal outline-none focus:border-[var(--space-brand-primary)] ${education.degree ? 'border-[var(--space-border-default)]' : missingInputClass}`}> <option value="">Select degree</option>{DEGREE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" /></div>{!education.degree && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select a degree.</span>}</div><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label htmlFor={`cv-gpa-${index}`} className="block">GPA</label><div className="relative mt-1.5"><select id={`cv-gpa-${index}`} value={education.gpa} aria-label="GPA" aria-invalid={missingAfterUpload(education.gpa) || undefined} onChange={(event) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, gpa: event.target.value } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, gpa: primary?.gpa || '' }; })} className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal outline-none focus:border-[var(--space-brand-primary)] ${missingAfterUpload(education.gpa) ? missingInputClass : 'border-[var(--space-border-default)]'}`}> <option value="">Select your GPA range</option>{GPA_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" /></div>{missingAfterUpload(education.gpa) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select your GPA range.</span>}</div><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label className="block">Graduation</label><div className="mt-1.5"><MonthPicker value={education.graduationYear} placeholder="Graduation month" missing={missingAfterUpload(education.graduationYear)} onChange={(graduationYear) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, graduationYear } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} />{missingAfterUpload(education.graduationYear) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select your graduation month.</span>}</div></div></div><CourseworkInputs id={`cv-coursework-${index}`} value={education.coursework} onChange={(coursework) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, coursework } : item); return { ...current, education: educationEntries, coursework: mergeEducationCoursework(educationEntries) }; })} /></div></div>)}</div></div>
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><BriefcaseBusiness className="h-4 w-4 text-[var(--space-text-brand)]" />Work Experiences</h3><button type="button" onClick={() => { const index = profile.experiences.length; setProfile((current) => ({ ...current, experiences: [...current.experiences, { company: '', role: '', duration: '', description: '', sector: '', source: 'user' }] })); window.setTimeout(() => document.getElementById(`cv-experience-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>{profile.experiences.length === 0 && <p className={`mt-2 rounded-xl border p-3 text-xs ${cvEntryMode === 'upload' ? 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_4%,var(--space-surface-card))] font-semibold text-[var(--space-semantic-danger)]' : 'border-transparent bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>{cvEntryMode === 'upload' ? "We couldn't read any work experience. Add an entry if your CV includes one." : 'No confirmed work experiences. Add an entry if relevant.'}</p>}<div className="mt-3 space-y-3">{profile.experiences.map((experience, index) => <div key={`experience-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="flex items-center gap-2 text-xs font-bold text-[var(--space-text-secondary)]">Work Experience {index + 1}{isInternRole(experience.role) && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-brand-primary-500)_12%,transparent)] px-2 py-0.5 text-[10px] text-[var(--space-text-brand)]">Internship</span>}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, experiences: current.experiences.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete experience entry ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 grid gap-3 sm:grid-cols-2"><CompanyCombo id={`cv-experience-${index}`} value={experience.company} missing={missingAfterUpload(experience.company)} onChange={(company) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, company } : item) }))} /><label className="text-xs font-bold text-[var(--space-text-secondary)]">Role<input value={experience.role} aria-invalid={missingAfterUpload(experience.role) || undefined} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, role: event.target.value } : item) }))} className={`mt-1.5 w-full rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)] ${missingAfterUpload(experience.role) ? missingInputClass : 'border-[var(--space-border-default)]'}`} />{missingAfterUpload(experience.role) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">We couldn't read this — please fill it in.</span>}</label></div><div className="mt-3"><ExperienceIndustrySelect company={experience.company} description={experience.description} value={experience.sector} majorIndustry={experience.major_industry} subSector={experience.sub_sector} source={experience.sectorSource} onChange={(industry, sectorSource) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, sector: industry.legacySector, major_industry: industry.majorIndustry, sub_sector: industry.subSector, sectorSource } : item) }))} /></div><div className="mt-3"><ExperienceDurationEditor value={experience.duration} missing={cvEntryMode === 'upload'} onChange={(duration) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, duration } : item) }))} /></div><label className="mt-3 block text-xs font-bold text-[var(--space-text-secondary)]">Description<textarea rows={Math.max(3, formatExperienceDescription(experience.description).split('\n').length)} value={experience.description} onBlur={(event) => { const description = formatExperienceDescription(event.target.value); setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, description } : item) })); }} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder="Responsibilities, achievements and quantified impact" className="mt-1.5 w-full whitespace-pre-wrap rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label></div>)}</div></div>
            <SkillsSelector skills={profile.skills} certifications={profile.certifications} certificationDetails={profile.certification_details || []} onCertificationDetailsChange={(details) => setProfile((current) => ({ ...current, certification_details: details }))} certificationIssuers={profile.certification_issuers || []} onCertificationIssuersChange={(issuers) => setProfile((current) => ({ ...current, certification_issuers: issuers }))} onCertificationIssuerValidityChange={setCertIssuersValid} otherSkills={profile.other_skills} otherSelected={profile.other_skills_selected} onChange={(value) => setProfile((current) => ({ ...current, skills: value.skills, certifications: value.certifications, other_skills: value.otherSkills, other_skills_selected: value.otherSelected }))} />
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><Users className="h-4 w-4 text-[var(--space-text-brand)]" />Extracurricular Activities</h3><button type="button" onClick={() => { const index = profile.extracurricular_activities.length; setProfile((current) => ({ ...current, extracurricular_activities: [...current.extracurricular_activities, { organization: '', role: '', duration: '', description: '', source: 'user' }] })); window.setTimeout(() => document.getElementById(`cv-activity-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>{profile.extracurricular_activities.length === 0 && <p className="mt-2 rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-muted)]">No confirmed extracurricular activities. Add clubs, volunteer work, student organizations, or team projects if relevant.</p>}<div className="mt-3 space-y-3">{profile.extracurricular_activities.map((activity, index) => <div key={`activity-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Extracurricular Activity {index + 1}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete extracurricular activity ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2">{([['Organization', 'organization'], ['Role', 'role']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input id={key === 'organization' ? `cv-activity-${index}` : undefined} value={activity[key]} placeholder={label} onChange={(event) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: event.target.value } : item) }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label>)}</div><ExperienceDurationEditor value={activity.duration} onChange={(duration) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, duration } : item) }))} /></div><label className="mt-3 block text-xs font-bold text-[var(--space-text-secondary)]">Description<textarea rows={Math.max(3, formatExperienceDescription(activity.description).split('\n').length)} value={activity.description} onBlur={(event) => { const description = formatExperienceDescription(event.target.value); setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, description } : item) })); }} onChange={(event) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder={'One responsibility, contribution, or result per line'} className="mt-1.5 w-full whitespace-pre-wrap rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label></div>)}</div></div>
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><Trophy className="h-4 w-4 text-[var(--space-text-brand)]" />Honors &amp; Achievements</h3><button type="button" onClick={() => { const index = profile.honors_achievements.length; setProfile((current) => ({ ...current, honors_achievements: [...current.honors_achievements, { competition: '', organizer: '', title: '', time: '', description: '', source: 'user' }] })); window.setTimeout(() => document.getElementById(`cv-achievement-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>{profile.honors_achievements.length === 0 && <p className="mt-2 rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-muted)]">No confirmed honors or achievements. Add competition results, awards, or academic honors if relevant.</p>}<div className="mt-3 space-y-3">{profile.honors_achievements.map((achievement, index) => <div key={`achievement-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Honor &amp; Achievement {index + 1}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete honor or achievement ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 grid gap-3 sm:grid-cols-2">{([['Competition', 'competition', 'Competition'], ['Organizer / Issuer', 'organizer', 'e.g. FTU, Unilever, Ministry of Education'], ['Title', 'title', 'Title']] as const).map(([label, key, placeholder]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input id={key === 'competition' ? `cv-achievement-${index}` : undefined} value={achievement[key] || ''} placeholder={placeholder} onChange={(event) => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: event.target.value } : item) }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label>)}<div className="text-xs font-bold text-[var(--space-text-secondary)]"><span className="block">Time</span><div className="mt-1.5"><AchievementTimePicker value={achievement.time} onChange={(time) => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, time } : item) }))} /></div></div></div></div>)}</div></div>
            <CvPeerDataConsentLine checked={cvPeerDataConsent} onChange={setCvPeerDataConsent} />
            <div className="mt-5 flex flex-col-reverse gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between"><button type="button" disabled={cvConfirming} onClick={() => setStage(1)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)] disabled:opacity-45"><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-col gap-2 sm:flex-row sm:items-center">{cvConfirming && <p role="status" className="text-center text-xs font-semibold text-[var(--space-text-muted)] sm:text-right">Saving your confirmed CV — this can take a few seconds…</p>}<button type="button" disabled={!cvProfileFieldsValid || cvConfirming} aria-busy={cvConfirming || undefined} onClick={() => void confirmCvProfile()} className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 ${cvConfirming ? 'cursor-wait' : 'disabled:opacity-45'}`}>{cvConfirming ? <><Loader2 className="h-4 w-4 animate-spin" />Saving…</> : <>Next <ArrowRight className="h-4 w-4" /></>}</button></div></div>
          </div>}
        </section></div>}

        {journey === 'validation' && stage === 3 && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Target Motivation Assessment</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">Essential motivation only</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Why this company, program, and role — not work-style sliders (those come next). Logistics and deep prep checks live elsewhere.</p>
          <div className="mt-6 space-y-7">
            <div><p className="mb-3 font-bold">What draws you to this company? <span className="font-normal text-[var(--space-text-muted)]">(up to 3)</span></p><MultiChoice value={motivation.companyReasons} onChange={(value) => setMotivation((current) => ({ ...current, companyReasons: value }))} options={COMPANY_REASONS} /></div>
            <div><p className="mb-3 font-bold">What do you want from this program? <span className="font-normal text-[var(--space-text-muted)]">(up to 3)</span></p><MultiChoice value={motivation.programReasons} onChange={(value) => setMotivation((current) => ({ ...current, programReasons: value }))} options={PROGRAM_REASONS} /></div>
            {hasFunctionTracks && <div><p className="mb-3 font-bold">Why this function or track? <span className="font-normal text-[var(--space-text-muted)]">(up to 3)</span></p><MultiChoice value={motivation.functionReasons} onChange={(value) => setMotivation((current) => ({ ...current, functionReasons: value }))} options={FUNCTION_REASONS} /></div>}
            <div className="rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4 sm:p-5"><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Strengths → sub-role fit</p><p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">Three quick diagnostics — Mate maps the pattern to sub-roles inside {selectedFunction || 'your target function'}.</p>
              <div className="mt-5 space-y-6">
                <div><p className="mb-3 font-bold">A messy problem lands on your desk. What do you reach for first?</p><SingleChoice value={motivation.problemApproach} onChange={(value) => setMotivation((current) => ({ ...current, problemApproach: value }))} options={PROBLEM_APPROACH_OPTIONS} /></div>
                <div><p className="mb-3 font-bold">At the end of a good day, which work left you energized?</p><SingleChoice value={motivation.energizingWork} onChange={(value) => setMotivation((current) => ({ ...current, energizingWork: value }))} options={ENERGIZING_WORK_OPTIONS} /></div>
                <div><p className="mb-3 font-bold">A project succeeds. Which contribution feels most like yours?</p><SingleChoice value={motivation.contributionStyle} onChange={(value) => setMotivation((current) => ({ ...current, contributionStyle: value }))} options={CONTRIBUTION_STYLE_OPTIONS} /></div>
              </div>
            </div>
          </div>
          <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStage(2)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" disabled={!motivationComplete} onClick={() => { setWorkStyleSubStep(mcqComplete ? 'ocp' : 'mcq'); setStage(4); track('motivation_assessment_completed'); trackStepComplete('fit-assessment', 'motivation', { track: 'validation', programId: target?.id || null, durationSec: fitStepDurationSec('motivation') }); }} className="rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">Continue to Work Style</button></div>
        </section>}

        {journey === 'validation' && stage === 4 && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Work Style</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">Situational Judgement &amp; Work Preference</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Both are on this page — answer them in any order.</p>
          <SoftSkillMcqAssessment answers={mcqAnswers} seconds={mcqSeconds} questionIndex={mcqQuestionIndex} onAnswer={(itemId, choice, secondsOnItem) => { setMcqAnswers((current) => ({ ...current, [itemId]: choice })); setMcqSeconds((current) => ({ ...current, [itemId]: secondsOnItem })); }} onQuestionIndexChange={setMcqQuestionIndex} />
          <div className="mt-8 border-t border-[var(--space-border-default)] pt-6">
          {foundPrior && !editingWorkStyle && <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><div><p className="text-sm font-bold">Using your latest saved work-style result</p><p className="mt-0.5 text-xs text-[var(--space-text-muted)]">It is applied automatically to this target.</p></div><button type="button" onClick={() => { setEditingWorkStyle(true); ocpTouchedRef.current = true; setOcpTouched(true); setOcpResultReused(false); setWorkingStyleResultReused(false); }} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-[var(--space-text-brand)] hover:bg-[var(--space-surface-accent-soft)]">Edit work style</button></div>}
          {(!foundPrior || editingWorkStyle) && <WorkStyleAssessment scores={ocp} onScoreChange={(key, value) => { setOcp((current) => ({ ...current, [key]: value })); ocpTouchedRef.current = true; setOcpTouched(true); setOcpResultReused(false); setWorkingStyleResultReused(false); }} />}
          </div>
          {!mcqComplete ? <p className="mt-4 text-sm text-[var(--space-text-muted)]">Answer every Situational Judgement scenario to continue to results.</p> : null}
          <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStage(3)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" disabled={busy || !mcqComplete} onClick={() => void runAssessment()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{busy ? 'Preparing Target Fit…' : 'Continue to Results'}</button></div>
        </section>}

        {journey === 'validation' && (stage === 5 || stage === 6) && target && <section className="space-y-4">
          {false && <div className="rounded-3xl bg-[var(--space-brand-primary)] p-5 text-[var(--space-text-on-primary)] sm:p-7"><p className="text-xs font-bold uppercase tracking-widest opacity-80">Target Fit</p><h2 className="mt-1 text-2xl font-extrabold">{target.company} · {target.program}</h2><p className="mt-2 text-sm opacity-90">{selectedFunction ? `${selectedFunction} · ` : ''}{target.recruitmentCycle}</p></div>}
          {fitPending || !fitAnalysis ? <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 text-center"><Sparkles className="mx-auto h-8 w-8 text-[var(--space-text-brand)]" /><h3 className="mt-3 text-lg font-extrabold">Your assessment is complete. Your Target Fit result is being prepared.</h3><p className="mt-2 text-sm text-[var(--space-text-secondary)]">No program-specific score is shown because the selected program rubric or result is not currently available. Your confirmed function and profile can still anchor a general preparation plan.</p></div> : <><FitResultsSummary company={target.company} program={target.program} targetFunction={selectedFunction} recruitmentCycle={target.recruitmentCycle} analysis={fitAnalysis} rolePaths={displayedSubroleRecommendation?.subroles || []} subrolePack={displayedSubroleRecommendation ? { function: displayedSubroleRecommendation.function, subroles: displayedSubroleRecommendation.subroles } : null} workStyleLabel="Corporate Fit" strengthRows={resultStrengthRows} gapRows={resultGapRows} concernLines={resultConcernLines} actionRows={resultActionRows} showDetails showCriteriaBreakdown={false} />
          <CvRewriteGuide programId={target.id} company={target.company} program={target.program} position={selectedFunction} profile={profile} onEditCv={() => { setReturnToTargetFitAfterCvEdit(true); setCvReviewConfirmed(false); setCvRewriteMode(true); setStage(2); }} />
          <FitFeedbackPrompt track="validation" programId={target.id} />
          </>}
          <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-extrabold">Review My Fit</h3><p className="mt-1 text-sm text-[var(--space-text-muted)]">Optional detailed breakdown — it does not block target confirmation.</p></div><button type="button" disabled={!fitAnalysis} onClick={() => { setShowBreakdown((current) => !current); track('fit_breakdown_viewed', { program_id: target.id }); }} className="inline-flex items-center gap-1 rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold disabled:opacity-40">{showBreakdown ? 'Hide breakdown' : 'Review My Fit'} <ChevronDown className={`h-4 w-4 ${showBreakdown ? 'rotate-180' : ''}`} /></button></div>
            {showBreakdown && <div className="mt-4 space-y-3">{resultCriteria.map((criterion: any) => <article key={criterion.id} className="rounded-2xl border border-[var(--space-border-default)] p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><h4 className="font-extrabold">{criterionCopy(criterion).label}</h4><p className="mt-1 text-xs text-[var(--space-text-muted)]">Mate’s read: {criterion.status === 'met' ? 'You already show strong evidence here' : 'This is an opportunity to strengthen your story'}</p></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${criterion.status === 'met' ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_12%,transparent)] text-[var(--space-semantic-warning)]'}`}>{criterion.status === 'met' ? 'Strong evidence' : 'Opportunity to strengthen'}</span></div><p className="mt-3 text-sm leading-6 text-[var(--space-text-secondary)]"><b>What Mate noticed:</b> {criterionCopy(criterion).summary}</p><p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]"><b>What this means for you:</b> {criterionCopy(criterion).impact}</p>{criterionCopy(criterion).next && <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]"><b>Your next move:</b> {criterionCopy(criterion).next}</p>}{criterion.status !== 'met' && !criterion.evidence && !isMotivationCriterion(criterion) && <div className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-3"><p className="text-sm font-bold">Mate could not find a clear {criterionCopy(criterion).label.toLowerCase()} example in your CV. Do you have one to add?</p><div className="mt-2 flex gap-2"><button type="button" onClick={() => { setEvidenceCriterion(criterion.id); track('missing_evidence_prompted', { criterion_id: criterion.id }); }} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Yes, Add Experience</button><button type="button" onClick={() => setEvidenceCriterion(null)} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">No, Continue</button></div></div>}</article>)}
              {evidenceCriterion && <div className="rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"><h4 className="font-extrabold">Add structured evidence</h4><div className="mt-3 grid gap-2 sm:grid-cols-2">{([['Experience type','type'],['Name / organization','name'],['Role','role'],['Date','date'],['Responsibilities','responsibilities'],['Achievement','achievement'],['Skills demonstrated','skills']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={evidenceDraft[key]} onChange={(event) => setEvidenceDraft((current) => ({ ...current, [key]: event.target.value }))} className="mt-1 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-sm" /></label>)}</div><button type="button" disabled={!evidenceDraft.name.trim()} onClick={addEvidence} className="mt-3 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">Save Evidence</button></div>}
            </div>}
          </div>
          {stage === 6 ? (
            <div className="flex flex-col justify-end gap-2 sm:flex-row">
              <button type="button" onClick={() => { trackAppSwitch('fit-assessment', 'my-roadmap', { trigger: 'open_my_roadmap' }); openApp('my-roadmap'); }} className="rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3">Open My Roadmap</button>
              <button type="button" onClick={() => { setReturnToTargetFitAfterCvEdit(true); setCvReviewConfirmed(false); setStage(2); }} className="rounded-xl border border-[var(--space-border-default)] px-5 py-2 text-sm font-bold">Edit CV</button>
            </div>
          ) : (
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStage(4)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={() => { setReturnToTargetFitAfterCvEdit(true); setCvReviewConfirmed(false); setStage(2); }} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Edit CV</button><button type="button" onClick={changeTarget} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Change Target</button><button type="button" disabled={busy} onClick={() => void confirmTarget()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}Confirm Target &amp; Generate Preparation Plan</button></div></div>
          )}
        </section>}
        </main>
      </div>
    </div>
  );
}
