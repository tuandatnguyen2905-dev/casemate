import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ClipboardPaste,
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
import { buildWatchListLines, compactFitEvidence, humanizeCriterionLabel, isMbtiCriterion, isMotivationCriterion, isResearchCriterion, resolveMotivationFitScore, stripMatePrefix } from '../../lib/fitResultsPresentation';
import { competitionSuggestionForTarget, featureRecommendationRows } from '../../lib/fitFeatureRecommendations';
import { recommendSubroles } from '../../lib/recommendSubroles';
import type { McqChoice, SoftSkillQuestion } from '../../lib/softSkillQuestionBank';
import { fetchSoftSkillQuestionBank, selectCoreSoftSkillBank, softSkillMcqComplete } from '../../lib/softSkillQuestionBank';
import { generateAndSaveRoadmap } from '../../lib/prepRoadmap';
import { classifyProgramCompany } from '../../lib/programIndustries';
import { getProgramRecruitmentWindow, programAvailabilityLabel } from '../../lib/programRecruitmentWindow';
import { fetchPeerBenchmarkPrivacy, setPeerBenchmarkPrivacy, type PeerBenchmarkPrivacy } from '../../lib/industryPeerBenchmark';
import { applyCertificationInput, applyCertificationIssuer, canonicalCertificationLabel, certificationInputValue, certificationIssuerValue, detailsFromSources, issuersFromSaved, resolveCertification, type CertificationDetail, type CertificationIssuer } from '../../lib/certLevelScale';
import { detectInternationalExposure } from '../../lib/internationalExposure';
import { resolveFitCvEntryView } from '../../lib/fitCvEntryFlow';
import { trackMetaCustomEvent } from '../../lib/metaPixel';
import { stripNulDeep } from '../../lib/cvTextSanitize';
import { CvUploadError, cvDeviceContext, cvErrorCode, cvErrorStage, cvErrorStatus, cvFailureMessage, cvFileKind, cvFileRejection, extractCvFileText, fileSizeBand, toCvUploadError } from '../../lib/cvUploadSupport';
import { trackAppSwitch, trackFitActivation, trackStepComplete, trackStepError, trackStepView } from '../../lib/engagementTracking';
import type { PriorAttempts } from '../../lib/priorAttempts';

const STRUCTURED_HOOK = '/api/hooks/execute/workspace-539150/casemate-structured-fit-v1';
const FUNCTION_HOOK = '/api/hooks/execute/workspace-539150/casemate-function-fit-v1';
const PROGRAM_FIT_ANALYSIS_HOOK = '/api/hooks/execute/workspace-539150/casemate-program-fit-analysis-v1';
const CV_PROFILE_HOOK = '/api/hooks/execute/workspace-539150/casemate-cv-profile-v1';
const FIT_TRACKING_HOOK = '/api/hooks/execute/workspace-539150/casemate-fit-tracking-v1';
const WORKSPACE_ID = 'c6ce26d1-7466-4b72-962d-b7bf7a471c88';

type Education = { institution: string; field: string; degree: string; graduationYear: string; gpa: string; coursework: string; universityTier?: number; source?: 'extracted' | 'user' };
type Experience = { company: string; role: string; duration: string; description: string; sector?: string; major_industry?: string; sub_sector?: string; sectorSource?: 'auto' | 'user' | 'extracted' };
type ExtracurricularActivity = { organization: string; role: string; duration: string; description: string };
type HonorAchievement = { competition: string; organizer?: string; title: string; time: string; description: string; category?: string; sourceRowId?: string };
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
  certification_details?: CertificationDetail[];
  certification_issuers?: CertificationIssuer[];
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
type ProgramCultureProfile = { company: string; confidence_score?: number | string | null } & Partial<OcpScores>;

type ProgramMatch = {
  program_id: string;
  company: string;
  program: string;
  industry: string;
  sector?: string;
  matched_functions: string[];
  offered_functions?: string[];
  offered_positions?: string[];
  recommended_positions?: Array<{ name: string; score?: number | null; fit_percent?: number | null }>;
  best_fit_position?: string;
  best_track_position?: string;
  best_track_fit_percent?: number | null;
  function: string;
  function_fit_score: number | null;
  corporate_fit_percent: number | null;
  corporate_data_sufficient: boolean;
  program_fit_percent: number | null;
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

export const DEGREE_OPTIONS = ["Bachelor's degree", "Master's degree", 'MBA', 'PhD'] as const;
const DEFAULT_OCP: OcpScores = {
  innovation: 3, detail: 3, results: 3, competitive: 3, supportive: 3, teamwork: 3,
  reward_development: 3, reward_compensation: 3, work_life_balance: 3,
};
const EMPTY_MOTIVATION: MotivationAnswers = { job_priority: '', work_preference: '', strength: '', energizing_problem: '' };
const STEP_LABELS = ['CV', 'Work style', 'Function fit', 'Programs'];

function explorationStepIndicator(step: number): number {
  if (step <= 1) return 1;
  if (step === 2) return 2;
  if (step === 5) return 3;
  if (step >= 6) return 4;
  return 2;
}
const MEDALS = ['🥇', '🥈', '🥉'];

function explorationMotivationForSubroles(motivation: MotivationAnswers) {
  return {
    problemApproach: motivation.energizing_problem,
    energizingWork: motivation.work_preference,
    contributionStyle: motivation.strength,
  };
}

function programPositionPaths(program: ProgramMatch): string[] {
  const offered = program.offered_positions?.length ? program.offered_positions : program.offered_functions;
  if (offered?.length) return offered.filter(Boolean);
  const ranked = program.matched_functions?.filter(Boolean) || [];
  if (ranked.length) return ranked;
  return [program.best_fit_position || program.function].filter(Boolean) as string[];
}

function bestTrackFitForProgram(program: ProgramMatch): { name: string; fitPercent: number | null } {
  const fromField = program.best_track_fit_percent == null ? null : Number(program.best_track_fit_percent);
  const fieldName = program.best_track_position || program.best_fit_position;
  if (fieldName && fromField != null && Number.isFinite(fromField)) {
    return { name: fieldName, fitPercent: fromField };
  }
  const ranked = program.recommended_positions?.filter((row) => row?.name) || [];
  if (ranked.length) {
    let best = ranked[0];
    for (const row of ranked) {
      const pct = row.fit_percent == null ? null : Number(row.fit_percent);
      const bestPct = best.fit_percent == null ? null : Number(best.fit_percent);
      if (pct != null && Number.isFinite(pct) && (bestPct == null || !Number.isFinite(bestPct) || pct > bestPct)) best = row;
    }
    return {
      name: best.name,
      fitPercent: typeof best.fit_percent === 'number' ? best.fit_percent : null,
    };
  }
  const fallback = program.best_fit_position || program.function || programPositionPaths(program)[0] || '';
  return fallback ? { name: fallback, fitPercent: null } : { name: '', fitPercent: null };
}

type ProgramWindowRow = { id?: number | null; program_id?: string | null; open_date?: string | null; close_date?: string | null; display_status?: string | null; program_type?: string | null };

function programWindowStatus(row: ProgramWindowRow | undefined) {
  return row ? getProgramRecruitmentWindow(row.open_date, row.close_date, new Date(), row.display_status) : null;
}

// 0 = may be open now, 1 = opening soon, 2 = closed or no published dates.
function programOpenRank(row: ProgramWindowRow | undefined): number {
  const status = programWindowStatus(row)?.statusLabel;
  if (status === 'Open Now') return 0;
  return status === 'Opening Soon' || status === 'Expected' ? 1 : 2;
}

function sortProgramsByBestTrackFit(programs: ProgramMatch[], openRank: (program: ProgramMatch) => number = () => 0): ProgramMatch[] {
  const score = (program: ProgramMatch) => {
    const fit = bestTrackFitForProgram(program).fitPercent;
    return typeof fit === 'number' && Number.isFinite(fit) ? fit : -1;
  };
  return [...programs].sort((a, b) => openRank(a) - openRank(b) || score(b) - score(a) || Number(b.program_fit_percent ?? -1) - Number(a.program_fit_percent ?? -1));
}

function ProgramPositionFitBlock({ program }: { program: ProgramMatch }) {
  const best = bestTrackFitForProgram(program);
  if (!best.name) {
    return <p className="mt-1 text-[11px] text-[var(--space-text-secondary)]">{program.function || '—'}</p>;
  }
  return (
    <p className="mt-2 text-[11px] text-[var(--space-text-secondary)]">
      <span className="font-semibold text-[var(--space-text-primary)]">{best.name}</span>
      {best.fitPercent != null && (
        <span className="ml-2 font-semibold text-[var(--space-text-brand)]">{best.fitPercent}% track fit</span>
      )}
    </p>
  );
}

function programSectorLabel(program: ProgramMatch): string {
  return program.sector === 'advertising' || /advertising/i.test(program.industry)
    ? 'Advertising & Marketing'
    : program.industry;
}

function cultureCompanyKey(value: unknown): string {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\bvietnam\b/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function cultureCategoryFromText(value: unknown): string {
  const text = String(value || '').toLowerCase();
  if (/fmcg|consumer|food|beverage|dairy|tobacco/.test(text)) return 'fmcg';
  if (/retail|commerce|fashion/.test(text)) return 'retail';
  if (/bank|finance|insurance|fintech/.test(text)) return 'banking';
  if (/tech|software|digital|e-commerce|telecom|gaming/.test(text)) return 'tech';
  if (/advertis|marketing|media/.test(text)) return 'advertising';
  if (/manufactur|industrial|engineer/.test(text)) return 'industrial';
  if (/logistics|supply chain|freight/.test(text)) return 'logistics';
  if (/health|pharma|life science/.test(text)) return 'healthcare';
  if (/consult|professional service|audit|advisory/.test(text)) return 'consulting';
  if (/real estate|property|proptech/.test(text)) return 'realestate';
  return 'other';
}

function corporateFitFromProfiles(program: ProgramMatch, ocp: OcpScores, profiles: ProgramCultureProfile[]) {
  const companyKey = cultureCompanyKey(program.company);
  const exactProfile = profiles.find((item) => {
    const profileKey = cultureCompanyKey(item.company);
    return companyKey && profileKey && (companyKey === profileKey || companyKey.includes(profileKey) || profileKey.includes(companyKey));
  });
  const companyCategory = classifyProgramCompany(program.company);
  const programCategory = companyCategory !== 'other' ? companyCategory : cultureCategoryFromText(`${program.industry} ${program.sector || ''}`);
  const industryProfiles = profiles.filter((item) => {
    const classified = classifyProgramCompany(item.company);
    return classified !== 'other' && classified === programCategory;
  });
  const sourceProfiles = exactProfile ? [exactProfile] : industryProfiles.length ? industryProfiles : profiles;
  const source = exactProfile ? 'company' : industryProfiles.length ? 'industry' : 'global';
  const keys = Object.keys(DEFAULT_OCP) as OcpKey[];
  const benchmark: Partial<OcpScores> = {};
  keys.forEach((key) => {
    let weighted = 0;
    let totalWeight = 0;
    sourceProfiles.forEach((profile) => {
      const value = Number(profile[key]);
      if (!Number.isFinite(value)) return;
      const confidence = Number(profile.confidence_score);
      const weight = Number.isFinite(confidence) && confidence > 0 ? Math.max(0.25, confidence) : 1;
      weighted += value * weight;
      totalWeight += weight;
    });
    if (totalWeight > 0) benchmark[key] = weighted / totalWeight;
  });
  const alignments = keys.map((key) => {
    const user = Number(ocp[key]);
    const benchmarkValue = Number(benchmark[key]);
    return Number.isFinite(user) && Number.isFinite(benchmarkValue) ? Math.max(0, 100 - Math.abs(user - benchmarkValue) * 25) : null;
  }).filter((value): value is number => value != null);
  const score = alignments.length === keys.length ? Math.round(alignments.reduce((sum, value) => sum + value, 0) / alignments.length) : null;
  return { score, source, sampleSize: sourceProfiles.length, category: programCategory };
}

function displayProgramFit(program: ProgramMatch, ocp: OcpScores, profiles: ProgramCultureProfile[]) {
  const trackFit = bestTrackFitForProgram(program).fitPercent;
  const functionFit = trackFit != null && Number.isFinite(trackFit) ? Math.round(trackFit) : program.function_fit_score;
  const corporate = corporateFitFromProfiles(program, ocp, profiles);
  const corporateFit = corporate.score;
  const corporateSufficient = corporateFit != null;
  const overallFit = functionFit == null
    ? null
    : corporateSufficient ? Math.round(0.60 * Number(functionFit) + 0.40 * corporateFit) : Math.round(Number(functionFit));
  return { functionFit, corporateFit, corporateSufficient, overallFit, corporateSource: corporate.source, corporateSampleSize: corporate.sampleSize, corporateCategory: corporate.category };
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

type FitEventRole = 'open' | 'step' | 'activation' | 'core_action' | 'diagnostic' | 'retention';
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
function canonicalWorkspaceSessionId(value: unknown): string | null {
  const id = typeof value === 'string' ? value.trim() : '';
  return /^wses_[A-Za-z0-9_-]+$/.test(id) || /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ? id : null;
}
function readCanonicalWorkspaceSessionId(spaceId: string): string | null {
  try {
    const value = JSON.parse(localStorage.getItem(`space_session_${spaceId}`) || '{}');
    if (value?.verified === false) return null;
    return canonicalWorkspaceSessionId(value?.workspaceSessionId || value?.sessionId || value?.id);
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
  return '';
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
function cvListLabel(item: unknown): string {
  if (item && typeof item === 'object') {
    const value = item as Record<string, unknown>;
    return String(value.nameNormalized || value.name || value.nameRaw || value.skill_name || value.cert_name || '').trim();
  }
  return String(item || '').trim();
}

export function isOtherChoice(value: unknown): boolean {
  return /^(?:other|others)$/i.test(String(value || '').trim());
}

export function canonicalSkillName(raw: unknown): string {
  const value = String(raw || '').trim();
  const key = value.toLocaleLowerCase('en').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  if (/^(?:advanced )?(?:microsoft |ms )?excel$/.test(key)) return 'Excel';
  if (/^(?:microsoft |ms )?power ?point$/.test(key)) return 'PowerPoint';
  if (/^google (?:sheet|sheets|spreadsheet|spreadsheets)$/.test(key)) return 'Google Sheets';
  if (/^(?:google workspace|g suite)$/.test(key)) return 'Google Workspace';
  return value;
}

function canonicalSkillList(values: unknown[]): string[] {
  const seen = new Set<string>();
  return values.map(cvListLabel).map(canonicalSkillName).filter((item) => {
    const key = item.toLocaleLowerCase('en');
    if (!item || isOtherChoice(item) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function scoringSkillAliases(skills: string[]): string[] {
  const aliases = skills.flatMap((skill) => {
    if (skill === 'Excel') return ['Excel', 'Microsoft Excel', 'Advanced Excel', 'Advanced Excel & spreadsheet modeling'];
    if (skill === 'PowerPoint') return ['PowerPoint', 'Microsoft PowerPoint', 'Microsoft PowerPoint & slide storytelling'];
    if (skill === 'Google Sheets') return ['Google Sheets', 'Google Sheet', 'Google spreadsheet'];
    if (skill === 'Google Workspace') return ['Google Workspace', 'G Suite'];
    return [skill];
  });
  return Array.from(new Set(aliases));
}

function certificationSourcesOf(value: any): any[] {
  return [...(Array.isArray(value.certifications) ? value.certifications : []), ...(Array.isArray(value.english_certificates) ? value.english_certificates : []), ...(Array.isArray(value.parsed_cv?.certifications) ? value.parsed_cv.certifications : [])];
}
function certificationLabelOf(item: unknown): string {
  const label = cvListLabel(item);
  return canonicalCertificationLabel(label === 'MOS' ? 'MOS (PowerPoint, Word, Excel)' : label);
}

function normalizedExperiencePart(value: unknown): string {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function dedupeCvExperiences<T extends Record<string, any>>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const company = normalizedExperiencePart(item.company || item.organization);
    const role = normalizedExperiencePart(item.role);
    const dates = normalizedExperiencePart(item.duration || `${item.start_date || item.startDate || ''}|${item.end_date || item.endDate || ''}`);
    const key = `${company}|${role}|${dates}`;
    if (!company && !role) return false;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function experienceDurationMonths(value: unknown): number {
  const range = parseDurationRange(String(value || ''));
  if (!range.start) return 0;
  const now = new Date();
  const end = range.present ? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}` : range.end;
  if (!end) return 0;
  const [startYear, startMonth] = range.start.split('-').map(Number);
  const [endYear, endMonth] = end.split('-').map(Number);
  return Math.max(0, (endYear - startYear) * 12 + endMonth - startMonth);
}

export function confirmedCvProfile<T extends Record<string, any>>(rawProfile: T): T {
  const experiences = dedupeCvExperiences(Array.isArray(rawProfile.experiences) ? rawProfile.experiences : []);
  const canonicalSkills = canonicalSkillList(Array.isArray(rawProfile.skills) ? rawProfile.skills : []);
  const scoringSkills = scoringSkillAliases(canonicalSkills);
  const extracurricularActivities = Array.isArray(rawProfile.extracurricular_activities) ? rawProfile.extracurricular_activities : [];
  const honorsAchievements = Array.isArray(rawProfile.honors_achievements) ? rawProfile.honors_achievements : [];
  const quantifiedImpact = Array.from(new Set([
    ...(Array.isArray(rawProfile.quantified_impact) ? rawProfile.quantified_impact.map(String) : []),
    ...extracurricularActivities.map((activity: any) => String(activity?.description || '')).filter((description: string) => /\d[\d,.]*\s*(?:\+|%|x|members?|participants?|reaches?|people|users?|customers?|events?|projects?)/i.test(description)),
  ].filter(Boolean)));
  const internationalExposure = detectInternationalExposure(rawProfile);
  const priorParsed = rawProfile.parsed_cv && typeof rawProfile.parsed_cv === 'object' ? rawProfile.parsed_cv : {};
  const priorExperiences = Array.isArray(priorParsed.experience) ? priorParsed.experience : [];
  const parsedExperiences = experiences.map((item: any) => {
    const prior = priorExperiences.find((candidate: any) => normalizedExperiencePart(candidate?.company) === normalizedExperiencePart(item.company || item.organization) && normalizedExperiencePart(candidate?.role) === normalizedExperiencePart(item.role)) || {};
    return { ...prior, ...item, company: String(item.company || item.organization || ''), durationMonths: experienceDurationMonths(item.duration) || Number(prior.durationMonths) || 0, isInternship: isInternRole(item.role) };
  });
  const certificationIssuers = issuersFromSaved(rawProfile.certification_issuers, Array.isArray(rawProfile.certifications) ? rawProfile.certifications.map(String) : []);
  return { ...rawProfile, experiences, skills: canonicalSkills, skill_aliases: scoringSkills, certification_issuers: certificationIssuers, extracurricular_activities: extracurricularActivities, honors_achievements: honorsAchievements, quantified_impact: quantifiedImpact, international_exposure: internationalExposure, internship_history: [], parsed_cv: { ...priorParsed, experience: parsedExperiences, extracurricular: extracurricularActivities, competitions: honorsAchievements, quantified_impact: quantifiedImpact, international_exposure: internationalExposure, skills: scoringSkills, rawSkills: scoringSkills }, other_skills: '', other_skills_selected: false };
}

function normalizeProfile(raw: any): CvProfile {
  const value = raw && typeof raw === 'object' ? stripNulDeep(raw) : {};
  const experienceSource = Array.isArray(value.experiences) ? value.experiences : Array.isArray(value.internship_history)
    ? value.internship_history : [];
  const experiences = dedupeCvExperiences(experienceSource.map((item: any) => {
    const industry = normalizeIndustrySelection({
      majorIndustry: item.major_industry || item.majorIndustry,
      subSector: item.sub_sector || item.subSector,
      legacySector: item.sector,
    });
    return {
      company: isOtherChoice(item.company || item.organization) ? '' : item.company || item.organization || '',
      role: item.role || '',
      duration: normalizeExperienceDuration(item.duration),
      description: formatExperienceDescription(item.description),
      sector: industry.legacySector,
      major_industry: industry.majorIndustry,
      sub_sector: industry.subSector,
      sectorSource: item.sectorSource || item.sector_source || (item.sector || item.major_industry || item.majorIndustry ? 'extracted' : undefined),
    };
  }));
  const parsedEducation = Array.isArray(value.parsed_cv?.education)
    ? value.parsed_cv.education
    : value.parsed_cv?.education && typeof value.parsed_cv.education === 'object' ? [value.parsed_cv.education] : [];
  const parsedCourses = parsedEducation.reduce((all: string[], item: any) => all.concat(Array.isArray(item?.courses) ? item.courses.map(String) : []), []);
  const rawEducation = Array.isArray(value.education) && value.education.length ? value.education : parsedEducation;
  const hasExplicitEducationCoursework = rawEducation.some((item: any) => item && typeof item === 'object' && Object.prototype.hasOwnProperty.call(item, 'coursework'));
  const education: Education[] = rawEducation.length
    ? rawEducation.map((item: any, index: number) => ({
        institution: isOtherChoice(item.institution || item.university || item.universityRaw || item.school) ? '' : String(item.institution || item.university || item.universityRaw || item.school || ''),
        field: normalizeMajorName(item.field || item.major || item.majorRaw || item.faculty || ''),
        degree: normalizeDegree(item.degree || item.degreeRaw || ''),
        graduationYear: String(item.graduationYear || item.graduation_year || ''),
        gpa: normalizeGpaBand(item.gpa || item.gpaBand || item.gpaRaw || ''),
        coursework: String(Object.prototype.hasOwnProperty.call(item, 'coursework') ? item.coursework || '' : (Array.isArray(item.courses) ? item.courses.join(', ') : index === 0 ? value.coursework || '' : '')),
        universityTier: Number(item.universityTier ?? item.university_tier ?? item.tier) || undefined,
        source: item.source === 'user' ? 'user' : 'extracted',
      })).filter((item: Education) => item.institution || item.field || item.degree || item.graduationYear || item.gpa || item.coursework)
    : [value.university, value.faculty || value.major, value.degree, value.graduation_year, value.gpa, value.coursework].some(Boolean)
      ? [{ institution: isOtherChoice(value.university) ? '' : String(value.university || ''), field: normalizeMajorName(value.faculty || value.major || ''), degree: normalizeDegree(value.degree || ''), graduationYear: String(value.graduation_year || ''), gpa: normalizeGpaBand(value.gpa || ''), coursework: String(value.coursework || ''), universityTier: Number(value.university_tier) || undefined, source: 'extracted' }]
      : [];
  const primaryEducation = education[0];
  const activitySource = Array.isArray(value.extracurricular_activities) ? value.extracurricular_activities : Array.isArray(value.parsed_cv?.extracurricular) ? value.parsed_cv.extracurricular : Array.isArray(value.activities) ? value.activities : [];
  const achievementSource = Array.isArray(value.honors_achievements) ? value.honors_achievements : Array.isArray(value.parsed_cv?.competitions) ? value.parsed_cv.competitions : Array.isArray(value.standout_points) ? value.standout_points : [];
  const extracurricular_activities = activitySource.map((item: any) => typeof item === 'string'
    ? { organization: item, role: '', duration: '', description: '' }
    : { organization: String(item.organization || item.club || ''), role: String(item.role || ''), duration: normalizeExperienceDuration(item.duration), description: formatExperienceDescription(item.description || item.evidenceText) });
  const honors_achievements = achievementSource.map((item: any) => typeof item === 'string'
    ? { competition: item, organizer: '', title: '', time: '', description: '' }
    : { competition: String(item.competition || item.name || item.nameRaw || item.nameNormalized || ''), organizer: String(item.organizer || item.issuer || item.awarded_by || ''), title: String(item.title || item.award || item.result || ''), time: String(item.time || item.date || ''), description: formatExperienceDescription(item.description || item.evidenceText), category: item.category || '', sourceRowId: item.sourceRowId || '' });
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
    skills: canonicalSkillList(Array.isArray(value.skills) ? value.skills : Array.isArray(value.parsed_cv?.skills) ? value.parsed_cv.skills : Array.isArray(value.parsed_cv?.rawSkills) ? value.parsed_cv.rawSkills : []),
    certifications: certificationSourcesOf(value).map(certificationLabelOf).filter((item: string, index: number, all: string[]) => !!item && !isOtherChoice(item) && item !== '[object Object]' && all.indexOf(item) === index),
    certification_details: detailsFromSources(certificationSourcesOf(value), certificationLabelOf, value.certification_details),
    certification_issuers: issuersFromSaved(value.certification_issuers),
    other_skills: '',
    other_skills_selected: false,
  };
}
function profileHasContent(profile: CvProfile) {
  return !!(profile.name || profile.university || profile.faculty || profile.gpa || profile.skills.length || profile.certifications.length || profile.experiences.some((item) => item.company || item.role));
}

type SkillOption = {
  key: string;
  name: string;
  category: string;
  keywords?: string;
  kind: 'certification' | 'skill';
  issuer?: string;
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
  certificationDetails?: CertificationDetail[];
  onCertificationDetailsChange?: (details: CertificationDetail[]) => void;
  certificationIssuers?: CertificationIssuer[];
  onCertificationIssuersChange?: (issuers: CertificationIssuer[]) => void;
  /** Reports whether every certification missing from the catalog has an issuer. */
  onCertificationIssuerValidityChange?: (valid: boolean) => void;
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
    setQuery('');
    setFilterActive(false);
    setOpen(false);
  };

  const optionCount = visibleOptions.length;
  const displayValue = filterActive ? query : universityDisplayName(value);

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
          onChange={(event) => { const next = event.target.value; setQuery(next); onChange(next, 3); setFilterActive(true); setOpen(true); }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' && optionCount) { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current + 1) % optionCount); }
            else if (event.key === 'ArrowUp' && optionCount) { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current - 1 + optionCount) % optionCount); }
            else if (event.key === 'Enter' && open && visibleOptions[activeIndex]) { event.preventDefault(); selectOption(visibleOptions[activeIndex]); }
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
          {loadError && <p className="p-3 text-sm font-normal text-[var(--space-semantic-danger)]">The verified list could not be loaded. Type your university name directly.</p>}
          {!loadError && visibleOptions.length === 0 && <p className="p-3 text-sm font-normal text-[var(--space-text-muted)]">No ranked university matches. The name you typed will be saved.</p>}
          {!loadError && visibleOptions.map((option, index) => <button id={`${listId}-${index}`} key={option.name} type="button" role="option" aria-selected={universityDisplayName(value) === option.displayName} onMouseEnter={() => setActiveIndex(index)} onClick={() => selectOption(option)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-bold text-[var(--space-text-primary)] ${activeIndex === index ? 'bg-[var(--space-surface-muted)]' : 'hover:bg-[var(--space-surface-muted)]'}`}>{option.displayName}</button>)}
        </>}
      </div>}
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
    setQuery('');
    setFilterActive(false);
    setOpen(false);
  };

  const optionCount = visibleOptions.length;
  const displayValue = filterActive ? query : value;

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
          onChange={(event) => { setQuery(event.target.value); onChange(event.target.value); setFilterActive(true); setOpen(true); }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' && optionCount) { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current + 1) % optionCount); }
            else if (event.key === 'ArrowUp' && optionCount) { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current - 1 + optionCount) % optionCount); }
            else if (event.key === 'Enter' && open && visibleOptions[activeIndex]) { event.preventDefault(); selectOption(visibleOptions[activeIndex]); }
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
          {loadError && <p className="p-3 text-sm font-normal text-[var(--space-semantic-danger)]">The verified company list could not be loaded. Type the company name directly.</p>}
          {!loadError && visibleOptions.length === 0 && <p className="p-3 text-sm font-normal text-[var(--space-text-muted)]">No company matches. The name you typed will be saved.</p>}
          {!loadError && visibleOptions.map((option, index) => <button id={`${listId}-${index}`} key={option.name} type="button" role="option" aria-selected={value === option.name} onMouseEnter={() => setActiveIndex(index)} onClick={() => selectOption(option)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-[var(--space-text-primary)] ${activeIndex === index ? 'bg-[var(--space-surface-muted)]' : 'hover:bg-[var(--space-surface-muted)]'}`}>{option.name}</button>)}
        </>}
      </div>}
    </div>
  );
}

type IndustrySubSector = { value: string; label: string; legacySector: string };
type IndustryMajor = { value: string; label: string; legacySector: string; subSectors: IndustrySubSector[] };

export const EXPERIENCE_INDUSTRIES: IndustryMajor[] = [
  { value: 'finance_banking_insurance', label: 'Finance, Banking & Insurance', legacySector: 'banking', subSectors: [
    { value: 'banking', label: 'Banking', legacySector: 'banking' },
    { value: 'securities_investment', label: 'Securities / Investment', legacySector: 'banking' },
    { value: 'insurance', label: 'Insurance', legacySector: 'banking' },
    { value: 'fintech', label: 'Fintech', legacySector: 'banking' },
    { value: 'accounting_audit', label: 'Accounting / Audit', legacySector: 'consulting' },
  ] },
  { value: 'consumer_retail', label: 'Consumer Goods & Retail', legacySector: 'retail', subSectors: [
    { value: 'fmcg_food_beverage', label: 'FMCG — Food & Beverage', legacySector: 'fmcg' },
    { value: 'fmcg_personal_beauty', label: 'FMCG — Personal Care & Beauty', legacySector: 'fmcg' },
    { value: 'retail', label: 'Retail', legacySector: 'retail' },
    { value: 'ecommerce', label: 'E-commerce', legacySector: 'retail' },
    { value: 'fashion', label: 'Fashion', legacySector: 'retail' },
  ] },
  { value: 'technology', label: 'Technology', legacySector: 'technology', subSectors: [
    { value: 'software_it', label: 'Software / IT', legacySector: 'technology' },
    { value: 'telecommunications', label: 'Telecommunications', legacySector: 'technology' },
    { value: 'ai_data', label: 'AI / Data', legacySector: 'technology' },
    { value: 'semiconductor_hardware', label: 'Semiconductor / Hardware', legacySector: 'technology' },
    { value: 'blockchain', label: 'Blockchain', legacySector: 'technology' },
  ] },
  { value: 'professional_services', label: 'Consulting & Professional Services', legacySector: 'consulting', subSectors: [
    { value: 'management_consulting', label: 'Management Consulting', legacySector: 'consulting' },
    { value: 'hr_recruitment', label: 'Human Resources / Recruitment', legacySector: 'consulting' },
    { value: 'legal', label: 'Legal', legacySector: 'consulting' },
    { value: 'marketing_advertising_pr', label: 'Marketing / Advertising / PR', legacySector: 'advertising' },
  ] },
  { value: 'manufacturing_industry', label: 'Manufacturing & Industry', legacySector: 'manufacturing', subSectors: [
    { value: 'manufacturing', label: 'Manufacturing', legacySector: 'manufacturing' },
    { value: 'automotive', label: 'Automotive', legacySector: 'manufacturing' },
    { value: 'chemicals_materials', label: 'Chemicals / Materials', legacySector: 'manufacturing' },
    { value: 'energy', label: 'Energy', legacySector: 'manufacturing' },
  ] },
  { value: 'logistics_supply_chain', label: 'Logistics & Supply Chain', legacySector: 'logistics', subSectors: [
    { value: 'transportation', label: 'Transportation', legacySector: 'logistics' },
    { value: 'warehousing', label: 'Warehousing', legacySector: 'logistics' },
    { value: 'aviation_maritime', label: 'Aviation / Maritime', legacySector: 'logistics' },
  ] },
  { value: 'real_estate_construction', label: 'Real Estate & Construction', legacySector: 'real_estate', subSectors: [] },
  { value: 'tourism_hospitality_fnb', label: 'Tourism, Hospitality & F&B', legacySector: 'hospitality', subSectors: [] },
  { value: 'healthcare_pharma', label: 'Healthcare & Pharmaceuticals', legacySector: 'healthcare', subSectors: [] },
  { value: 'media_entertainment', label: 'Media & Entertainment', legacySector: 'advertising', subSectors: [] },
  { value: 'education_nonprofit_government', label: 'Education, Nonprofit & Government', legacySector: '', subSectors: [] },
];

const LEGACY_DEFAULT_SELECTION: Record<string, { majorIndustry: string; subSector: string }> = {
  fmcg: { majorIndustry: 'consumer_retail', subSector: 'fmcg_food_beverage' },
  banking: { majorIndustry: 'finance_banking_insurance', subSector: 'banking' },
  retail: { majorIndustry: 'consumer_retail', subSector: 'retail' },
  technology: { majorIndustry: 'technology', subSector: 'software_it' },
  manufacturing: { majorIndustry: 'manufacturing_industry', subSector: 'manufacturing' },
  logistics: { majorIndustry: 'logistics_supply_chain', subSector: 'transportation' },
  consulting: { majorIndustry: 'professional_services', subSector: 'management_consulting' },
  hospitality: { majorIndustry: 'tourism_hospitality_fnb', subSector: '' },
  advertising: { majorIndustry: 'professional_services', subSector: 'marketing_advertising_pr' },
  real_estate: { majorIndustry: 'real_estate_construction', subSector: '' },
  healthcare: { majorIndustry: 'healthcare_pharma', subSector: '' },
};

export type IndustrySelection = { majorIndustry: string; subSector: string; legacySector: string };
type IndustryKeyword = IndustrySelection & { keyword: string };
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

function industryKey(raw: unknown): string {
  return normalizeIndustryText(raw).replace(/\s+/g, '_');
}

function normalizeLegacySector(raw: unknown): string {
  const normalized = industryKey(raw);
  return Object.prototype.hasOwnProperty.call(LEGACY_DEFAULT_SELECTION, normalized) ? normalized : '';
}

export function normalizeIndustrySelection(input: { majorIndustry?: unknown; subSector?: unknown; legacySector?: unknown }): IndustrySelection {
  const legacySector = normalizeLegacySector(input.legacySector);
  const legacyDefault = LEGACY_DEFAULT_SELECTION[legacySector];
  const majorKey = industryKey(input.majorIndustry);
  const subKey = industryKey(input.subSector);
  const legacyOnly = !majorKey && !subKey;
  const major = EXPERIENCE_INDUSTRIES.find((item) => item.value === majorKey || industryKey(item.label) === majorKey)
    || (legacyOnly ? EXPERIENCE_INDUSTRIES.find((item) => item.value === legacyDefault?.majorIndustry) : undefined);
  if (!major) return { majorIndustry: '', subSector: '', legacySector };
  const subSector = major.subSectors.find((item) => item.value === subKey || industryKey(item.label) === subKey)
    || (legacyOnly ? major.subSectors.find((item) => item.value === legacyDefault?.subSector) : undefined);
  return {
    majorIndustry: major.value,
    subSector: subSector?.value || '',
    legacySector: legacySector || subSector?.legacySector || major.legacySector,
  };
}

export function normalizeIndustrySector(raw: unknown): string {
  const legacy = normalizeLegacySector(raw);
  if (legacy) return legacy;
  const key = industryKey(raw);
  for (const major of EXPERIENCE_INDUSTRIES) {
    if (major.value === key || industryKey(major.label) === key) return major.legacySector;
    const subSector = major.subSectors.find((item) => item.value === key || industryKey(item.label) === key);
    if (subSector) return subSector.legacySector;
  }
  return '';
}

export function isIndustrySelectionComplete(experience: { sector?: unknown; major_industry?: unknown; majorIndustry?: unknown; sub_sector?: unknown; subSector?: unknown }): boolean {
  const selection = normalizeIndustrySelection({
    majorIndustry: experience.major_industry || experience.majorIndustry,
    subSector: experience.sub_sector || experience.subSector,
    legacySector: experience.sector,
  });
  const major = EXPERIENCE_INDUSTRIES.find((item) => item.value === selection.majorIndustry);
  return !!major && (major.subSectors.length === 0 || !!selection.subSector);
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
      .map((row) => ({ keyword: String(row.keyword || '').trim(), ...normalizeIndustrySelection({ majorIndustry: row.major_industry, subSector: row.sub_sector, legacySector: row.sector }) }))
      .filter((row) => row.keyword && row.majorIndustry)
      .sort((a, b) => normalizeIndustryText(b.keyword).length - normalizeIndustryText(a.keyword).length))
    .catch((error: unknown) => {
      industryKeywordsPromise = null;
      throw error;
    });
  return industryKeywordsPromise;
}

function detectIndustrySelection(text: string, keywords: IndustryKeyword[], allowPartial = false): IndustrySelection | null {
  const haystack = normalizeIndustryText(text);
  if (haystack.length < 2) return null;
  const match = keywords.find((row) => {
    const needle = normalizeIndustryText(row.keyword);
    if (needle.length < 2) return false;
    return allowPartial && needle.length > 2 ? haystack.includes(needle) : ` ${haystack} `.includes(` ${needle} `);
  });
  return match ? { majorIndustry: match.majorIndustry, subSector: match.subSector, legacySector: match.legacySector } : null;
}

type ExperienceIndustrySelectProps = {
  company: string;
  description: string;
  value?: string;
  majorIndustry?: string;
  subSector?: string;
  source?: IndustrySource;
  onChange: (selection: IndustrySelection, source?: IndustrySource) => void;
};

export function ExperienceIndustrySelect({ company, description, value = '', majorIndustry = '', subSector = '', source, onChange }: ExperienceIndustrySelectProps) {
  const [keywords, setKeywords] = useState<IndustryKeyword[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [matchedFrom, setMatchedFrom] = useState<'company' | 'description' | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const normalizedSelection = normalizeIndustrySelection({ majorIndustry, subSector, legacySector: value });
  const selectedMajor = EXPERIENCE_INDUSTRIES.find((item) => item.value === normalizedSelection.majorIndustry);
  const complete = !!selectedMajor && (selectedMajor.subSectors.length === 0 || !!normalizedSelection.subSector);

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
      const companyMatch = detectIndustrySelection(company, keywords, true);
      const descriptionMatch = companyMatch ? null : detectIndustrySelection(description, keywords);
      const nextSelection = companyMatch || descriptionMatch;
      setMatchedFrom(companyMatch ? 'company' : descriptionMatch ? 'description' : null);
      if (!nextSelection) {
        if (source === 'auto') onChangeRef.current({ majorIndustry: '', subSector: '', legacySector: '' }, undefined);
        return;
      }
      if (nextSelection.majorIndustry !== normalizedSelection.majorIndustry || nextSelection.subSector !== normalizedSelection.subSector || nextSelection.legacySector !== normalizedSelection.legacySector || source !== 'auto') {
        onChangeRef.current(nextSelection, 'auto');
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [company, description, keywords, normalizedSelection.majorIndustry, normalizedSelection.subSector, normalizedSelection.legacySector, source]);

  const selectMajor = (nextMajor: string) => {
    setMatchedFrom(null);
    const major = EXPERIENCE_INDUSTRIES.find((item) => item.value === nextMajor);
    onChange({ majorIndustry: major?.value || '', subSector: '', legacySector: major?.legacySector || '' }, 'user');
  };
  const selectSubSector = (nextSubSector: string) => {
    setMatchedFrom(null);
    const sub = selectedMajor?.subSectors.find((item) => item.value === nextSubSector);
    onChange({ majorIndustry: selectedMajor?.value || '', subSector: sub?.value || '', legacySector: sub?.legacySector || selectedMajor?.legacySector || '' }, 'user');
  };

  return (
    <div className="block text-xs font-bold text-[var(--space-text-secondary)]">
      <div className="grid gap-3 sm:grid-cols-2">
        <label>Major industry <span className="text-[var(--space-semantic-danger)]">*</span><div className="relative mt-1.5"><select value={normalizedSelection.majorIndustry} required aria-required="true" aria-invalid={!normalizedSelection.majorIndustry || undefined} onChange={(event) => selectMajor(event.target.value)} className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] ${normalizedSelection.majorIndustry ? 'border-[var(--space-border-default)]' : 'border-[var(--space-semantic-danger)]'}`}><option value="">Select major industry</option>{EXPERIENCE_INDUSTRIES.map((industry) => <option key={industry.value} value={industry.value}>{industry.label}</option>)}</select><ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" /></div></label>
        {selectedMajor?.subSectors.length ? <label>Sub-sector <span className="text-[var(--space-semantic-danger)]">*</span><div className="relative mt-1.5"><select value={normalizedSelection.subSector} required aria-required="true" aria-invalid={!normalizedSelection.subSector || undefined} onChange={(event) => selectSubSector(event.target.value)} className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] ${normalizedSelection.subSector ? 'border-[var(--space-border-default)]' : 'border-[var(--space-semantic-danger)]'}`}><option value="">Select sub-sector</option>{selectedMajor.subSectors.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" /></div></label> : normalizedSelection.majorIndustry ? <div className="flex items-end"><p className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-muted)]">No sub-sector required</p></div> : null}
      </div>
      {!complete && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please complete the industry selection.</span>}
      {source === 'auto' && matchedFrom && <span className="mt-1 block text-[11px] font-normal text-[var(--space-text-muted)]">Auto-detected from {matchedFrom === 'company' ? 'company name' : 'description'}. You can change it.</span>}
      {loadError && <span className="mt-1 block text-[11px] font-normal text-[var(--space-text-muted)]">Automatic detection is unavailable. You can still select both levels manually.</span>}
    </div>
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

export function CombinedSkillsSelector({ skills, certifications, onChange }: SkillsSelectorProps) {
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
  ]), [skills, certifications]);
  const selectedCount = selectedKeys.size;
  const visibleOptions = useMemo<SkillOption[]>(() => {
    const needle = query.trim().toLocaleLowerCase('vi');
    const filtered = options
      .filter((option) => !needle || `${option.name} ${option.category} ${option.keywords || ''}`.toLocaleLowerCase('vi').includes(needle))
      .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    return filtered;
  }, [options, query]);

  useEffect(() => { setActiveIndex(0); }, [query, options.length]);
  useEffect(() => {
    if (!open || loading) return;
    document.getElementById(`fit-skill-option-${activeIndex}`)?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open, loading]);

  const updateOption = (option: SkillOption) => {
    const selected = selectedKeys.has(option.key);
    if (!selected && selectedCount >= 8) return;
    if (option.kind === 'certification') {
      onChange({ skills, certifications: selected ? certifications.filter((name) => name !== option.name) : [...certifications, option.name], otherSkills: '', otherSelected: false });
    } else {
      onChange({ skills: selected ? skills.filter((name) => name !== option.name) : [...skills, option.name], certifications, otherSkills: '', otherSelected: false });
    }
    setQuery('');
    setOpen(true);
  };

  const selectedOptions = useMemo<SkillOption[]>(() => [
    ...certifications.map((name) => options.find((option) => option.key === `cert:${name}`) || { key: `cert:${name}`, name, category: 'Certification', kind: 'certification' as const }),
    ...skills.map((name) => options.find((option) => option.key === `skill:${name}`) || { key: `skill:${name}`, name, category: 'Skill', kind: 'skill' as const }),
  ], [certifications, skills, options]);

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
          {loading ? <p className="p-3 text-sm text-[var(--space-text-muted)]">Loading skills…</p> : <>{loadError && <p className="p-3 text-sm text-[var(--space-semantic-danger)]">The skills list could not be loaded.</p>}{visibleOptions.map((option, index) => { const selected = selectedKeys.has(option.key); const disabled = !selected && selectedCount >= 8; return <button id={`fit-skill-option-${index}`} key={option.key} type="button" role="option" aria-selected={selected} aria-disabled={disabled} onMouseEnter={() => setActiveIndex(index)} onClick={() => updateOption(option)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${activeIndex === index ? 'bg-[var(--space-surface-muted)]' : ''} ${disabled ? 'cursor-not-allowed opacity-45' : 'hover:bg-[var(--space-surface-muted)]'}`}><span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--space-text-brand)]">{selected && <Check className="h-4 w-4" />}</span><span className="min-w-0 flex-1 truncate text-sm font-bold">{option.name}</span></button>; })}</>}
        </div>}
      </div>
      {selectedCount >= 8 && <p className="mt-2 text-xs font-semibold text-[var(--space-text-muted)]">You have selected the maximum of 8 skills.</p>}
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
  showCategory?: boolean;
  options: SkillOption[];
  selected: string[];
  loading: boolean;
  loadError: boolean;
  onChange: (values: string[]) => void;
};

function CatalogMultiSelect({ id, title, searchLabel, placeholder, loadingLabel, errorLabel, emptyLabel, customLabel, showCategory = false, options, selected, loading, loadError, onChange }: CatalogMultiSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = `${id}-options`;
  const normalizedSelected = useMemo(() => new Set(selected.map((name) => name.toLocaleLowerCase('vi'))), [selected]);
  const visibleOptions = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('vi');
    return options.filter((option) => !needle || `${option.name} ${option.category} ${option.keywords || ''}`.toLocaleLowerCase('vi').includes(needle));
  }, [options, query]);
  const customValue = query.trim();
  const canAddCustom = !!customValue && !options.some((option) => option.name.toLocaleLowerCase('vi') === customValue.toLocaleLowerCase('vi')) && !normalizedSelected.has(customValue.toLocaleLowerCase('vi'));
  const customOptionIndex = visibleOptions.length;
  const optionCount = visibleOptions.length + (canAddCustom ? 1 : 0);

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
  const chooseActiveOption = () => {
    if (activeIndex < visibleOptions.length) addValue(visibleOptions[activeIndex].name);
    else if (canAddCustom && activeIndex === customOptionIndex) addValue(customValue);
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
          </>}
        </div>}
      </div>
    </section>
  );
}

function canonicalCertificationName(name: string): string {
  return canonicalCertificationLabel(name);
}

export function SkillsSelector({ skills, certifications, certificationDetails, onCertificationDetailsChange, certificationIssuers, onCertificationIssuersChange, onCertificationIssuerValidityChange, onChange }: SkillsSelectorProps) {
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
          issuer: existing?.issuer || String(row.issuer || '').trim(),
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
  const certificationLevelRows = useMemo(() => canonicalCertifications.map((name) => {
    const detail = (certificationDetails || []).find((item) => item.name.trim().toLocaleLowerCase('vi') === name.trim().toLocaleLowerCase('vi'));
    return { name, detail, resolution: resolveCertification({ name, score: detail?.score, level: detail?.level }) };
  }).filter((row) => !!row.resolution.scaleId), [canonicalCertifications, certificationDetails]);
  // Until the catalog has loaded every certification would look custom, so none is.
  const customCertifications = useMemo(() => loading || loadError ? [] : canonicalCertifications.filter((name) => !certificationOptions.some((option) => option.name.toLocaleLowerCase('vi') === name.toLocaleLowerCase('vi'))), [loading, loadError, canonicalCertifications, certificationOptions]);
  const issuersComplete = !onCertificationIssuersChange || customCertifications.every((name) => !!certificationIssuerValue(name, certificationIssuers).trim());
  const validityChangeRef = useRef(onCertificationIssuerValidityChange);
  validityChangeRef.current = onCertificationIssuerValidityChange;
  useEffect(() => { validityChangeRef.current?.(issuersComplete); }, [issuersComplete]);

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
        options={skillOptions}
        selected={skills}
        loading={loading}
        loadError={loadError}
        onChange={(values) => onChange({ skills: values, certifications, otherSkills: '', otherSelected: false })}
      />
      <CatalogMultiSelect
        id="fit-certifications"
        title="Certifications"
        searchLabel="Search certifications"
        placeholder="Search certifications (e.g. CFA, Google, data, project management)"
        loadingLabel="Loading certifications…"
        errorLabel="The certifications list could not be loaded. You can still add one as free text."
        emptyLabel="No matching certification. Type a name and add it as a custom certification."
        customLabel="Add certification"
        showCategory
        options={certificationOptions}
        selected={canonicalCertifications}
        loading={loading}
        loadError={loadError}
        onChange={(values) => onChange({ skills, certifications: values, otherSkills: '', otherSelected: false })}
      />
      {onCertificationIssuersChange && customCertifications.length > 0 && <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3" data-testid="certification-issuers">
        <h4 className="text-xs font-extrabold text-[var(--space-text-primary)]">Who issued {customCertifications.length === 1 ? 'this certification' : 'these certifications'}? <span className="text-[var(--space-semantic-danger)]">*</span></h4>
        <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Not in Casemate’s list yet, so add the organization that issued {customCertifications.length === 1 ? 'it' : 'each one'} (e.g. BCG for a BCG Strategic Consulting course).</p>
        <div className="mt-3 space-y-3">{customCertifications.map((name, index) => { const issuer = certificationIssuerValue(name, certificationIssuers); return <div key={name} className="grid gap-1.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] sm:items-start sm:gap-3">
          <div className="min-w-0 truncate text-sm font-bold text-[var(--space-text-primary)]">{name}</div>
          <div><label htmlFor={`fit-cert-issuer-${index}`} className="sr-only">Issuer of {name}</label><input id={`fit-cert-issuer-${index}`} value={issuer} required aria-required="true" aria-invalid={!issuer.trim() || undefined} onChange={(event) => onCertificationIssuersChange(applyCertificationIssuer(name, event.target.value, certificationIssuers || []))} placeholder="Issued by (e.g. BCG, Coursera)" className={`w-full rounded-xl border bg-[var(--space-surface-card)] px-3 py-2 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] ${issuer.trim() ? 'border-[var(--space-border-default)]' : 'border-[var(--space-semantic-danger)]'}`} />{!issuer.trim() && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please add who issued this certification.</span>}</div>
        </div>; })}</div>
      </div>}
      {onCertificationDetailsChange && certificationLevelRows.length > 0 && <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3" data-testid="certification-levels">
        <h4 className="text-xs font-extrabold text-[var(--space-text-primary)]">Certification score / level</h4>
        <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">A higher score or level counts for more in your fit. Check what Mate detected and correct it if it is wrong.</p>
        <div className="mt-3 space-y-3">{certificationLevelRows.map((row, index) => <div key={row.name} className="grid gap-1.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] sm:items-start sm:gap-3">
          <div className="min-w-0"><div className="truncate text-sm font-bold text-[var(--space-text-primary)]">{row.name}</div><div className={`mt-0.5 text-[11px] ${row.resolution.detected ? 'font-semibold text-[var(--space-text-brand)]' : 'text-[var(--space-text-muted)]'}`}>{row.resolution.detected ? row.resolution.summary : 'Level not detected \u2014 a conservative default is used until you add it.'}</div></div>
          <div><label htmlFor={`fit-cert-level-${index}`} className="sr-only">Score or level for {row.name}</label><input id={`fit-cert-level-${index}`} list={`fit-cert-level-options-${index}`} value={certificationInputValue(row.detail)} onChange={(event) => onCertificationDetailsChange?.(applyCertificationInput(row.name, event.target.value, certificationDetails || []))} placeholder={row.resolution.suggestions.length ? `e.g. ${row.resolution.suggestions.slice(0, 2).join(', ')}` : 'Score or level'} className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)]" /><datalist id={`fit-cert-level-options-${index}`}>{row.resolution.suggestions.map((suggestion) => <option key={suggestion} value={suggestion} />)}</datalist></div>
        </div>)}</div>
      </div>}
    </>
  );
}

const PARSE_LABELS = ['Reading your CV', 'Structuring your experience', 'Identifying relevant evidence', 'Preparing your profile for review'];
const MISSING_INPUT_CLASS = 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_4%,var(--space-surface-card))]';
function isInternRole(value: unknown): boolean {
  return /(?:\bintern(?:ship)?\b|\btrainee\b|thực\s*tập(?:\s*sinh)?|thuc\s*tap(?:\s*sinh)?)/iu.test(String(value || ''));
}

export default function FitAssessmentApp({ onBackToSelector, sharedSavedCv = null, onSavedCvChange, showCvChooserOnEntry = false, journey = null, priorAttempts = null }: { onBackToSelector?: () => void; sharedSavedCv?: { profile: any; date: string } | null; onSavedCvChange?: (value: { profile: any; date: string }) => void; showCvChooserOnEntry?: boolean; journey?: 'validation' | 'exploration' | null; priorAttempts?: PriorAttempts | null } = {}) {
  const { sessionId: runtimeSessionId, visitorId, spaceId, userEmail } = useSpaceRuntime();
  const sessionId = useMemo(() => canonicalWorkspaceSessionId(runtimeSessionId) || readCanonicalWorkspaceSessionId(spaceId) || undefined, [runtimeSessionId, spaceId, userEmail]);
  const email = useMemo(() => userEmail || readSessionEmail(spaceId), [userEmail, spaceId]);
  const userKey = useMemo(() => email ? `email:${email}` : `device:${visitorId || 'anonymous'}`, [email, visitorId]);
  const { data: programCultureProfiles } = window.useWorkspaceDB<ProgramCultureProfile>('culture_company_profiles', { shared: true, limit: 500 });
  const storageKey = `casemate-function-first-v1:${sessionId || 'preview'}`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastCvFileRef = useRef<File | null>(null);
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
  const [cvChooserVisible, setCvChooserVisible] = useState(showCvChooserOnEntry);
  const [parsePhase, setParsePhase] = useState(0);
  const missingAfterUpload = (value: unknown) => cvEntryMode === 'upload' && !String(value || '').trim();
  const [profile, setProfile] = useState<CvProfile>(EMPTY_PROFILE);
  const [cvText, setCvText] = useState('');
  const [showPaste, setShowPaste] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [dragging, setDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parseFailure, setParseFailure] = useState(false);
  const [parseFailureMessage, setParseFailureMessage] = useState('');
  const [savedCv, setSavedCv] = useState<{ profile: CvProfile; date: string } | null>(() => sharedSavedCv ? { profile: normalizeProfile(sharedSavedCv.profile), date: sharedSavedCv.date } : null);
  const publishSavedCv = useCallback((value: { profile: CvProfile; date: string }) => {
    setSavedCv(value);
    onSavedCvChange?.(value);
  }, [onSavedCvChange]);
  useEffect(() => {
    if (!sharedSavedCv) return;
    setSavedCv({ profile: normalizeProfile(sharedSavedCv.profile), date: sharedSavedCv.date });
  }, [sharedSavedCv]);
  const [error, setError] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<MotivationAnswers>(EMPTY_MOTIVATION);
  const [ocp, setOcp] = useState<OcpScores>(DEFAULT_OCP);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, McqChoice>>({});
  const [mcqSeconds, setMcqSeconds] = useState<Record<string, number>>({});
  const [mcqQuestionIndex, setMcqQuestionIndex] = useState(0);
  const [mcqBank, setMcqBank] = useState<SoftSkillQuestion[]>([]);
  const [functionScores, setFunctionScores] = useState<FunctionScore[]>([]);
  const [assessmentResultId, setAssessmentResultId] = useState<number | null>(null);
  const [programs, setPrograms] = useState<ProgramMatch[]>([]);
  const [fitAnalysis, setFitAnalysis] = useState<Record<string, any> | null>(null);
  const [filterFunctions, setFilterFunctions] = useState<string[]>([]);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [busy, setBusy] = useState<'idle' | 'function' | 'programs'>('idle');
  const [roadmapBusy, setRoadmapBusy] = useState(false);
  const [cvConfirming, setCvConfirming] = useState(false);
  const [returnToTargetFitAfterCvEdit, setReturnToTargetFitAfterCvEdit] = useState(false);
  const [cvRewriteMode, setCvRewriteMode] = useState(false);
  const [recalculateAfterCvEdit, setRecalculateAfterCvEdit] = useState(false);
  const recalculateInFlightRef = useRef(false);
  const [assessmentSessionId, setAssessmentSessionId] = useState(() => `fit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`);
  const [peerPrivacy, setPeerPrivacy] = useState<PeerBenchmarkPrivacy | null>(null);
  const [cvPeerDataConsent, setCvPeerDataConsent] = useState(false);
  const [certIssuersValid, setCertIssuersValid] = useState(true);
  const fitStartedTrackedRef = useRef(false);
  const fitTrackRef = useRef<'discovery' | 'validation' | null>(null);
  fitTrackRef.current = journey === 'exploration' ? 'discovery' : journey === 'validation' ? 'validation' : null;
  const hasLiveProgress = cvReady
    || step > 1
    || cvText.trim().length > 0
    || profileHasContent(profile)
    || Object.keys(mcqAnswers).length > 0
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
            properties_json: { track: fitTrackRef.current, ...properties },
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
    const onceKey = `casemate-fit-started:${sessionId}`;
    try {
      if (sessionStorage.getItem(onceKey)) return;
      sessionStorage.setItem(onceKey, '1');
    } catch { /* Without sessionStorage this falls back to once per mount. */ }
    void emitFitEvent('fit_started', 'open', {});
  }, [sessionId, emitFitEvent]);

  const fitStepStartRef = useRef<{ name: string; at: number } | null>(null);
  const fitStepName = step === 1 ? 'cv' : step === 2 ? 'work_style' : step === 5 ? 'function_fit' : step >= 6 ? 'programs' : null;
  const fitStepNameRef = useRef(fitStepName);
  fitStepNameRef.current = fitStepName;
  const selectedProgramRef = useRef(selectedProgram);
  selectedProgramRef.current = selectedProgram;
  const fitStepDurationSec = (stepName: string) => {
    const started = fitStepStartRef.current;
    return started && started.name === stepName ? Math.round((Date.now() - started.at) / 1000) : null;
  };

  useEffect(() => {
    if (hydratedStorageKey !== storageKey || !fitStepName || fitStepStartRef.current?.name === fitStepName) return;
    fitStepStartRef.current = { name: fitStepName, at: Date.now() };
    trackStepView('fit-assessment', fitStepName, { track: 'discovery', programId: selectedProgramRef.current });
  }, [hydratedStorageKey, storageKey, fitStepName]);

  useEffect(() => {
    let cancelled = false;
    void fetchPeerBenchmarkPrivacy(sessionId).then((privacy) => {
      if (!cancelled && privacy) {
        setPeerPrivacy(privacy);
        if (privacy.opted_in) setCvPeerDataConsent(true);
      }
    });
    return () => { cancelled = true; };
  }, [sessionId]);

  useEffect(() => {
    if (restoredStorageKeyRef.current === storageKey) return;
    const sessionChanged = restoredStorageKeyRef.current !== null;
    restoredStorageKeyRef.current = storageKey;
    localProgressRef.current = false;
    recoverySessionRef.current = null;
    if (sessionChanged) {
      setStep(1); setCvReady(false); setCvChooserVisible(showCvChooserOnEntry); setProfile(EMPTY_PROFILE); setCvText(''); setShowPaste(false); setSelectedFile(''); setError(null);
      setMotivation(EMPTY_MOTIVATION); setOcp(DEFAULT_OCP); setMcqAnswers({}); setMcqSeconds({}); setMcqQuestionIndex(0); setFunctionScores([]); setAssessmentResultId(null);
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
      if (saved.mcqAnswers) setMcqAnswers(saved.mcqAnswers);
      if (saved.mcqSeconds) setMcqSeconds(saved.mcqSeconds);
      if (typeof saved.mcqQuestionIndex === 'number') setMcqQuestionIndex(saved.mcqQuestionIndex);
      if (saved.ocp) setOcp({ ...DEFAULT_OCP, ...saved.ocp });
      if (Array.isArray(saved.functionScores)) setFunctionScores(saved.functionScores);
      if (Number.isFinite(Number(saved.assessmentResultId))) setAssessmentResultId(Number(saved.assessmentResultId));
      if (Array.isArray(saved.programs)) setPrograms(saved.programs);
      if (saved.fitAnalysis && typeof saved.fitAnalysis === 'object') setFitAnalysis(saved.fitAnalysis);
      if (Array.isArray(saved.filterFunctions)) setFilterFunctions(saved.filterFunctions);
      if (saved.filterExpanded) setFilterExpanded(true);
      if (typeof saved.selectedProgram === 'string') setSelectedProgram(saved.selectedProgram);
      if (saved.returnToTargetFitAfterCvEdit === true) setReturnToTargetFitAfterCvEdit(true);
      if (saved.assessmentSessionId) setAssessmentSessionId(String(saved.assessmentSessionId));
      {
        let restoredStep = Math.max(1, Math.min(7, Number(saved.step) || 1));
        if (restoredStep === 2 || restoredStep === 3) restoredStep = 2;
        // The entry chooser is for a fresh start; a draft past the CV step
        // (including a chosen program) reopens where it was left.
        const resumable = restoredStep >= 2 && saved.cvReady === true;
        if (showCvChooserOnEntry && resumable) setCvChooserVisible(false);
        setStep(showCvChooserOnEntry && !resumable ? 1 : restoredStep === 4 ? 2 : restoredStep);
      }
      localProgressRef.current = saved.cvReady === true
        || Number(saved.step) > 1
        || (saved.profile && profileHasContent(normalizeProfile(saved.profile)))
        || Object.values(saved.motivation || {}).some(Boolean)
        || (Array.isArray(saved.functionScores) && saved.functionScores.length > 0);
    } catch { /* A broken local draft should not block a fresh run. */ }
    finally { setHydratedStorageKey(storageKey); }
  }, [storageKey, showCvChooserOnEntry]);

  useEffect(() => {
    if (hydratedStorageKey !== storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ skillsInputVersion: 3, step, cvReady, cvText, showPaste, profile, motivation, mcqAnswers, mcqSeconds, mcqQuestionIndex, ocp, functionScores, assessmentResultId, programs, fitAnalysis, filterFunctions, filterExpanded, selectedProgram, returnToTargetFitAfterCvEdit, assessmentSessionId }));
    } catch { /* The current tab still works when storage is unavailable. */ }
  }, [hydratedStorageKey, storageKey, step, cvReady, cvText, showPaste, profile, motivation, mcqAnswers, mcqSeconds, mcqQuestionIndex, ocp, functionScores, assessmentResultId, programs, fitAnalysis, filterFunctions, filterExpanded, selectedProgram, returnToTargetFitAfterCvEdit, assessmentSessionId]);

  const persistProgress = useCallback(async (progress: Record<string, unknown>, sequence: number) => {
    setSaveStatus('saving');
    if (!email || !sessionId) {
      if (autosaveSequenceRef.current === sequence) setSaveStatus('error');
      trackStepError('fit-assessment', fitStepNameRef.current || 'cv', 'progress_save_sign_in_required', { track: 'discovery', programId: selectedProgramRef.current });
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
    } catch (caught) {
      if (autosaveSequenceRef.current === sequence) setSaveStatus('error');
      trackStepError('fit-assessment', fitStepNameRef.current || 'cv', caught, { track: 'discovery', programId: selectedProgramRef.current });
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
    const progress = { skillsInputVersion: 3, step, cvReady, cvText, showPaste, profile, motivation, mcqAnswers, mcqSeconds, mcqQuestionIndex, ocp, functionScores, assessmentResultId, programs, fitAnalysis, filterFunctions, filterExpanded, selectedProgram, returnToTargetFitAfterCvEdit, assessmentSessionId, priorAttempts };
    progressRef.current = progress;
    if (!email || !sessionId || !hasLiveProgress) return;
    const sequence = ++autosaveSequenceRef.current;
    const timer = window.setTimeout(() => { void persistProgress(progress, sequence); }, 1000);
    autosaveTimerRef.current = timer;
    return () => window.clearTimeout(timer);
  }, [persistProgress, hydratedStorageKey, storageKey, email, sessionId, hasLiveProgress, step, cvReady, cvText, showPaste, profile, motivation, mcqAnswers, mcqSeconds, mcqQuestionIndex, ocp, functionScores, assessmentResultId, programs, fitAnalysis, filterFunctions, filterExpanded, selectedProgram, returnToTargetFitAfterCvEdit, assessmentSessionId, priorAttempts]);

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
      response = await fetch(`${url}?action=${action}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...(sessionId ? { 'X-Session-Id': sessionId } : {}) },
        body: JSON.stringify({ ...payload, user_key: userKey, email, assessment_session_id: assessmentSessionId }),
        signal: controller?.signal,
      });
      data = await response.json().catch(() => ({}));
    } catch (caught) {
      if (controller?.signal.aborted) throw Object.assign(new Error('The request took too long.'), { code: 'timeout' });
      throw caught;
    } finally {
      if (abortTimer) window.clearTimeout(abortTimer);
    }
    if (!response.ok || data.success === false) throw Object.assign(new Error(data.error || 'Casemate could not process this request. Please try again.'), { code: data.code, status: response.status });
    return data;
  }, [sessionId, userKey, email, assessmentSessionId]);

  useEffect(() => {
    // Keyed on session + sign-in email, so a sign-in email that resolves after
    // mount retries recovery. Live local progress still blocks it either way.
    const recoveryKey = `${sessionId || ''}:${email || ''}`;
    if (!sessionId || hydratedStorageKey !== storageKey || cvChooserVisible || localProgressRef.current || recoverySessionRef.current === recoveryKey) return;
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
  }, [sessionId, email, hydratedStorageKey, storageKey, callHook, cvChooserVisible]);

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
  const applySavedCv = () => {
    if (!savedCv) return;
    setError(null);
    setParseFailure(false);
    setProfile(savedCv.profile);
    setCvEntryMode('saved');
    setCvReady(true);
    setCvChooserVisible(false);
    void trackEvent('fit_assessment_saved_cv_reused', {});
  };

  const startManualCv = () => {
    setError(null);
    setParseFailure(false);
    setProfile(EMPTY_PROFILE);
    setCvText('');
    setCvEntryMode('manual');
    setCvReady(true);
    setShowPaste(true);
    setCvChooserVisible(false);
    void trackEvent('fit_assessment_manual_cv_started', {});
  };

  const startBlankCvForm = () => {
    setError(null);
    setParseFailure(false);
    setProfile(EMPTY_PROFILE);
    setCvText('');
    setCvEntryMode('manual');
    setShowPaste(false);
    setCvReady(true);
    setCvChooserVisible(false);
    void trackEvent('fit_assessment_manual_form_started', {});
  };

  const startOverCvUpload = () => {
    setError(null);
    setParseFailure(false);
    setParsing(false);
    setParsePhase(0);
    setProfile(EMPTY_PROFILE);
    setCvEntryMode(null);
    setCvReady(false);
    setCvText('');
    setShowPaste(false);
    setSelectedFile('');
    void trackEvent('fit_assessment_cv_upload_start_over', {});
  };

  const reportCvUploadFailure = (failure: unknown, context: Record<string, string | number | boolean | null>, extra: Record<string, string | number | boolean | null> = {}) => {
    const code = cvErrorCode(failure);
    const stage = cvErrorStage(failure, 'engine_parse');
    const properties = { ...context, ...extra, failed_stage: stage, error_code: code, http_status: cvErrorStatus(failure) };
    console.error('[Fit Assessment] CV reading failed.', stage, code, failure);
    setParseFailure(true);
    setParseFailureMessage(cvFailureMessage(code));
    trackStepError('fit-assessment', 'cv', `cv_upload_failed:${stage}:${code}`, { track: 'discovery', programId: selectedProgram, properties });
    void emitFitEvent('fit_cv_upload_failed', 'diagnostic', properties);
  };

  const parseInput = async ({ file, text }: { file?: File; text?: string }) => {
    setError(null); setParseFailure(false); setParseFailureMessage('');
    if (!file && String(text || '').trim().length < 40) { setError('Paste at least 40 characters from your CV.'); return; }
    const startedAt = Date.now();
    const kind = file ? cvFileKind(file) : null;
    const context: Record<string, string | number | boolean | null> = { source: file ? 'file' : 'text', file_type: kind, file_size_band: file ? fileSizeBand(file.size) : null, ...cvDeviceContext() };
    void emitFitEvent('fit_cv_upload_attempted', 'diagnostic', context);
    if (file) {
      const rejection = cvFileRejection(file);
      if (rejection) { reportCvUploadFailure(new CvUploadError('This file cannot be read.', 'file_check', rejection), context); return; }
      lastCvFileRef.current = file;
      setSelectedFile(file.name);
    }
    setParsing(true); setParsePhase(0); const phaseTimer = window.setInterval(() => setParsePhase((current) => Math.min(3, current + 1)), 900); let uploadedKey = '';
    let textChars = 0;
    let pageCount: number | null = null;
    let primaryError: string | null = null;
    let parsePath = 'text';
    try {
      let data: any = null;
      if (file) {
        let fileText = '';
        try {
          const extracted = await extractCvFileText(file);
          fileText = extracted.text; pageCount = extracted.pages; textChars = fileText.length;
          if (textChars < 40) throw new CvUploadError('The file does not contain readable text.', 'text_extract', 'text_too_short');
          data = await callHook(STRUCTURED_HOOK, 'parse_cv', { cv_text: fileText }, 90000).catch((caught) => { throw toCvUploadError(caught, 'engine_parse'); });
        } catch (firstError) {
          primaryError = `${cvErrorStage(firstError, 'engine_parse')}:${cvErrorCode(firstError)}`;
          if (kind !== 'pdf' || cvErrorCode(firstError) === 'password_protected') throw firstError;
          console.warn('[Fit Assessment] Text reading failed; trying the server document reader.', firstError);
          parsePath = 'document';
          try {
            const uploaded = await uploadPdf(file).catch((caught) => { throw toCvUploadError(caught, 'fallback_upload', 'upload_failed'); });
            uploadedKey = uploaded.key;
            data = await callHook(STRUCTURED_HOOK, 'parse_cv', { document_url: uploaded.url }, 90000).catch((caught) => { throw toCvUploadError(caught, 'fallback_parse'); });
          } catch (secondError) {
            throw cvErrorCode(firstError) === 'text_too_short' && cvErrorCode(secondError) !== 'ai_unavailable' ? firstError : secondError;
          }
        }
      } else {
        textChars = String(text || '').trim().length;
        data = await callHook(STRUCTURED_HOOK, 'parse_cv', { cv_text: text }, 90000).catch((caught) => { throw toCvUploadError(caught, 'engine_parse'); });
      }
      const extractedProfile = normalizeProfile(data.profile);
      if (!profileHasContent(extractedProfile)) throw new CvUploadError('No details were extracted.', 'engine_parse', 'no_content');
      setProfile(extractedProfile); publishSavedCv({ profile: extractedProfile, date: new Date().toISOString() }); setCvEntryMode(file ? 'upload' : 'manual'); setCvReady(true); setShowPaste(false); setCvChooserVisible(false);
      void emitFitEvent('fit_cv_uploaded', 'step', { ...context, parse_path: parsePath, primary_error: primaryError, text_chars: textChars, page_count: pageCount, duration_sec: Math.round((Date.now() - startedAt) / 1000) });
      void trackEvent('fit_assessment_cv_parsed', { source: file ? 'file' : 'text' });
      try {
        await persistCvProfile(extractedProfile, 'parsed');
      } catch (saveError) {
        setError('Mate read your CV, but could not save it yet. Review the details below and press Next — Mate will try saving again.');
        const saveProperties = { ...context, failed_stage: 'cv_save', error_code: cvErrorCode(saveError), http_status: cvErrorStatus(saveError) };
        trackStepError('fit-assessment', 'cv', 'cv_save_failed', { track: 'discovery', programId: selectedProgram, properties: saveProperties });
        void emitFitEvent('fit_cv_save_failed', 'diagnostic', saveProperties);
      }
    } catch (caught) {
      reportCvUploadFailure(caught, context, { text_chars: textChars, page_count: pageCount, primary_error: primaryError, duration_sec: Math.round((Date.now() - startedAt) / 1000) });
    } finally { window.clearInterval(phaseTimer); if (uploadedKey) void deleteUploadedPdf(uploadedKey); setParsing(false); }
  };

  const confirmCvProfile = async () => {
    if (cvConfirming) return;
    setError(null);
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
      publishSavedCv({ profile: confirmedProfile, date: new Date().toISOString() });
      setError(null);
      if (returnToTargetFitAfterCvEdit && selectedProgram) setRecalculateAfterCvEdit(true);
      else setStep(2);
      void emitFitEvent('fit_cv_reviewed', 'step', { has_experience: profile.experiences.length > 0 });
      const cvDurationSec = fitStepDurationSec('cv');
      void emitFitEvent('fit_step_completed', 'step', { step: 1, step_name: 'cv', duration_sec: cvDurationSec });
      trackStepComplete('fit-assessment', 'cv', { track: 'discovery', programId: selectedProgram, durationSec: cvDurationSec });
      void trackEvent('fit_assessment_profile_confirmed', { hasExperience: profile.experiences.length > 0 });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not save your confirmed CV.');
      trackStepError('fit-assessment', 'cv', caught, { track: 'discovery', programId: selectedProgram });
    } finally {
      setCvConfirming(false);
    }
  };

  const functionCalculationPayload = () => {
    const confirmedProfile = confirmedCvProfile(profile);
    return ({
    cv_profile: {
      ...confirmedProfile,
      parsed_cv: {
        ...(confirmedProfile.parsed_cv || {}),
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
    selected_certifications: confirmedProfile.certifications,
    other_skills: '',
    motivation_answers: motivation,
    mcq_answers: mcqAnswers,
    mcq_seconds: mcqSeconds,
    ocp_scores: ocp,
    mbti_answers: {},
    mbti_type: '',
    mbti_counts: {},
  });
  };

  const calculateFunctions = async () => {
    if (!workStyleComplete) return;
    setBusy('function'); setError(null);
    try {
      const data = await callHook(FUNCTION_HOOK, 'calculate', functionCalculationPayload());
      setFunctionScores(data.function_fit_scores || []); setAssessmentResultId(Number(data.assessment_result_id)); setStep(5);
      const workStyleDurationSec = fitStepDurationSec('work_style');
      void emitFitEvent('fit_step_completed', 'step', { step: 2, step_name: 'work_style', duration_sec: workStyleDurationSec });
      trackStepComplete('fit-assessment', 'work_style', { track: 'discovery', programId: selectedProgram, durationSec: workStyleDurationSec });
      void emitFitEvent('fit_function_viewed', 'activation', {
        top_function: data.top_functions?.[0]?.name || null,
        top_score: data.top_functions?.[0]?.score ?? null,
      });
      void trackEvent('function_fit_calculated', { topFunction: data.top_functions?.[0]?.name, topScore: data.top_functions?.[0]?.score });
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Mate could not calculate your function fit.'); trackStepError('fit-assessment', 'work_style', caught, { track: 'discovery', programId: selectedProgram }); }
    finally { setBusy('idle'); }
  };
  const loadPrograms = async () => {
    if (!assessmentResultId) return;
    setBusy('programs'); setError(null);
    try {
      const data = await callHook(FUNCTION_HOOK, 'programs', { assessment_result_id: assessmentResultId });
      setPrograms(data.programs || []); setFitAnalysis(null); setFilterFunctions(data.filter_functions || []); setFilterExpanded(data.expanded_to_top_three === true); setSelectedProgram(null); setStep(6);
      const functionFitDurationSec = fitStepDurationSec('function_fit');
      void emitFitEvent('fit_step_completed', 'step', { step: 5, step_name: 'function_fit', duration_sec: functionFitDurationSec });
      trackStepComplete('fit-assessment', 'function_fit', { track: 'discovery', programId: selectedProgram, durationSec: functionFitDurationSec });
      void trackEvent('function_programs_filtered', { count: data.programs?.length || 0, functions: data.filter_functions || [] });
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Mate could not load your matched programs.'); trackStepError('fit-assessment', 'function_fit', caught, { track: 'discovery', programId: selectedProgram }); }
    finally { setBusy('idle'); }
  };
  const resetAssessment = useCallback(() => {
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
    if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current);
    autosaveSequenceRef.current += 1;
    progressRef.current = null;
    setAssessmentSessionId(`fit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`);
    setStep(1); setCvReady(false); setCvEntryMode(null); setProfile(EMPTY_PROFILE); setCvText(''); setShowPaste(false); setSelectedFile(''); setDragging(false); setParsing(false); setParsePhase(0); setError(null);
    setMotivation(EMPTY_MOTIVATION); setOcp(DEFAULT_OCP); setMcqAnswers({}); setMcqSeconds({}); setMcqQuestionIndex(0); setFunctionScores([]); setAssessmentResultId(null);
    setPrograms([]); setFitAnalysis(null); setFilterFunctions([]); setFilterExpanded(false); setSelectedProgram(null); setBusy('idle'); setRoadmapBusy(false);
    setReturnToTargetFitAfterCvEdit(false); setRecalculateAfterCvEdit(false); recalculateInFlightRef.current = false; setSaveStatus('idle');
  }, [storageKey]);

  const startOverAssessment = () => {
    setError(null);
    setStep(1);
    void trackEvent('fit_assessment_returned_to_first_step', { answers_preserved: true });
  };

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
      const targetContext = {
        selectedTargetProgramId: program.program_id,
        selectedTargetProgram: { id: program.program_id, program: program.program, company: program.company, industry: program.industry, functions: programPositionPaths(program) },
        selectedCompany: program.company,
        selectedFunction: program.function || program.best_fit_position || programPositionPaths(program)[0] || '',
        activeTargetStatus: 'assessing',
      };
      const data = await callHook(PROGRAM_FIT_ANALYSIS_HOOK, 'analyze', {
        program_id: program.program_id,
        assessment_result_id: assessmentResultId,
        selected_function: targetContext.selectedFunction,
        target_context: targetContext,
        ocp_scores: ocp,
      });
      const positionPaths = programPositionPaths(program);
      const targetFn = program.best_fit_position || program.function || positionPaths[0] || '';
      const programPositions = positionPaths.length
        ? { function: program.program, subroles: positionPaths, traits: [], evidence: [], version: 2 }
        : recommendSubroles(targetFn, explorationMotivationForSubroles(motivation));
      const serverAnalysis = data.analysis || {};
      const preciseFit = displayProgramFit(program, ocp, programCultureProfiles || []);
      const baseAnalysis = { ...serverAnalysis, matching_ratio: preciseFit.overallFit, function_fit_score: preciseFit.functionFit, work_style_fit_score: preciseFit.corporateFit, culture_fit_percent: preciseFit.corporateFit, culture_data_sufficient: preciseFit.corporateSufficient, culture_fit_source: preciseFit.corporateSource, culture_fit_sample_size: preciseFit.corporateSampleSize };
      const motivationFitScore = resolveMotivationFitScore(baseAnalysis, functionScores, targetFn);
      setFitAnalysis({ ...baseAnalysis, motivation_fit_score: motivationFitScore ?? baseAnalysis.motivation_fit_score, recommended_subroles: programPositions || baseAnalysis.recommended_subroles });
      writeSharedFitAnswers(email, { lastTarget: { programId: program.program_id, company: program.company, program: program.program, selectedFunction: targetFn, source: 'discovery' } });
      setStep(7);
      trackMetaCustomEvent('FitAssessmentComplete', {
        journey: 'exploration',
        program_id: program.program_id,
      }, `fit-exploration:${assessmentResultId}:${program.program_id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not prepare your Target Fit result.');
      trackStepError('fit-assessment', 'programs', caught, { track: 'discovery', programId: program.program_id });
    } finally { setBusy('idle'); }
  };

  const recomputeSelectedTargetAfterCvEdit = async () => {
    const originalProgram = programs.find((item) => item.program_id === selectedProgram);
    if (!originalProgram || !selectedProgram) return;
    setBusy('function'); setError(null);
    try {
      const functionData = await callHook(FUNCTION_HOOK, 'calculate', functionCalculationPayload());
      const nextAssessmentResultId = Number(functionData.assessment_result_id);
      if (!Number.isFinite(nextAssessmentResultId) || nextAssessmentResultId <= 0) throw new Error('Mate could not save the recalculated function fit.');
      const programData = await callHook(FUNCTION_HOOK, 'programs', { assessment_result_id: nextAssessmentResultId });
      const refreshedPrograms: ProgramMatch[] = Array.isArray(programData.programs) ? programData.programs : [];
      const refreshedTarget = refreshedPrograms.find((item) => item.program_id === selectedProgram) || originalProgram;
      const nextPrograms = refreshedPrograms.some((item) => item.program_id === selectedProgram) ? refreshedPrograms : [refreshedTarget, ...refreshedPrograms];
      const positionPaths = programPositionPaths(refreshedTarget);
      const targetFn = refreshedTarget.best_fit_position || refreshedTarget.function || positionPaths[0] || '';
      const targetContext = {
        selectedTargetProgramId: refreshedTarget.program_id,
        selectedTargetProgram: { id: refreshedTarget.program_id, program: refreshedTarget.program, company: refreshedTarget.company, industry: refreshedTarget.industry, functions: positionPaths },
        selectedCompany: refreshedTarget.company,
        selectedFunction: targetFn,
        activeTargetStatus: 'assessing',
      };
      const analysisData = await callHook(PROGRAM_FIT_ANALYSIS_HOOK, 'analyze', {
        program_id: refreshedTarget.program_id,
        assessment_result_id: nextAssessmentResultId,
        selected_function: targetFn,
        target_context: targetContext,
        ocp_scores: ocp,
      });
      const programPositions = positionPaths.length
        ? { function: refreshedTarget.program, subroles: positionPaths, traits: [], evidence: [], version: 2 }
        : recommendSubroles(targetFn, explorationMotivationForSubroles(motivation));
      const serverAnalysis = analysisData.analysis || {};
      const preciseFit = displayProgramFit(refreshedTarget, ocp, programCultureProfiles || []);
      const baseAnalysis = { ...serverAnalysis, matching_ratio: preciseFit.overallFit, function_fit_score: preciseFit.functionFit, work_style_fit_score: preciseFit.corporateFit, culture_fit_percent: preciseFit.corporateFit, culture_data_sufficient: preciseFit.corporateSufficient, culture_fit_source: preciseFit.corporateSource, culture_fit_sample_size: preciseFit.corporateSampleSize };
      const motivationFitScore = resolveMotivationFitScore(baseAnalysis, functionData.function_fit_scores || [], targetFn);
      setFunctionScores(functionData.function_fit_scores || []);
      setAssessmentResultId(nextAssessmentResultId);
      setPrograms(nextPrograms);
      setFilterFunctions(programData.filter_functions || []);
      setFilterExpanded(programData.expanded_to_top_three === true);
      setFitAnalysis({ ...baseAnalysis, motivation_fit_score: motivationFitScore ?? baseAnalysis.motivation_fit_score, recommended_subroles: programPositions || baseAnalysis.recommended_subroles });
      setReturnToTargetFitAfterCvEdit(false);
      setStep(7);
      void trackEvent('target_fit_recalculated_after_cv_edit', { program_id: refreshedTarget.program_id });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not recalculate your Target Fit from the edited CV.');
      trackStepError('fit-assessment', 'cv', caught, { track: 'discovery', programId: selectedProgram });
    } finally {
      setBusy('idle');
    }
  };

  useEffect(() => {
    if (!recalculateAfterCvEdit || recalculateInFlightRef.current) return;
    recalculateInFlightRef.current = true;
    setRecalculateAfterCvEdit(false);
    void recomputeSelectedTargetAfterCvEdit().finally(() => { recalculateInFlightRef.current = false; });
  }, [recalculateAfterCvEdit]);

  const openRoadmap = async () => {
    const program = programs.find((item) => item.program_id === selectedProgram);
    if (!program || roadmapBusy) return;
    trackStepView('fit-assessment', 'my_roadmap', { track: 'discovery', programId: program.program_id });
    trackFitActivation('discovery', { programId: program.program_id });
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
      const programsDurationSec = fitStepDurationSec('programs');
      void emitFitEvent('fit_step_completed', 'step', { step: 6, step_name: 'program_selection', duration_sec: programsDurationSec });
      trackStepComplete('fit-assessment', 'programs', { track: 'discovery', programId: program.program_id, durationSec: programsDurationSec });
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
      trackAppSwitch('fit-assessment', 'my-roadmap', { trigger: 'generate_my_roadmap' });
      openApp('my-roadmap');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Your roadmap could not be saved. Please try again.');
      trackStepError('fit-assessment', 'my_roadmap', caught, { track: 'discovery', programId: program.program_id });
    } finally {
      setRoadmapBusy(false);
    }
  };

  useEffect(() => {
    void fetchSoftSkillQuestionBank()
      .then((rows) => setMcqBank(selectCoreSoftSkillBank(rows)))
      .catch(() => setMcqBank([]));
  }, []);

  const mcqComplete = useMemo(() => softSkillMcqComplete(mcqAnswers, mcqBank), [mcqAnswers, mcqBank]);

  // Scenario answers and sliders given in either track prefill this one. They
  // are applied on the Work Style step only, after saved-result recovery has run.
  const sharedAnswersAppliedRef = useRef<string | null>(null);
  useEffect(() => {
    if (step !== 2 || hydratedStorageKey !== storageKey) return;
    const appliedKey = `${storageKey}:${email || ''}`;
    if (sharedAnswersAppliedRef.current === appliedKey) return;
    sharedAnswersAppliedRef.current = appliedKey;
    const shared = readSharedFitAnswers(email);
    if (hasSharedAnswers(shared.mcqAnswers)) {
      setMcqAnswers((current) => hasSharedAnswers(current) ? current : shared.mcqAnswers as Record<string, McqChoice>);
      setMcqSeconds((current) => hasSharedAnswers(current) ? current : shared.mcqSeconds || {});
    }
    if (shared.ocp && !isDefaultOcp(shared.ocp)) setOcp((current) => isDefaultOcp(current) ? { ...DEFAULT_OCP, ...shared.ocp } as OcpScores : current);
  }, [step, hydratedStorageKey, storageKey, email]);
  useEffect(() => {
    if (hydratedStorageKey !== storageKey) return;
    const patch: SharedFitAnswers = {};
    if (hasSharedAnswers(mcqAnswers)) { patch.mcqAnswers = mcqAnswers; patch.mcqSeconds = mcqSeconds; }
    if (!isDefaultOcp(ocp)) patch.ocp = ocp;
    if (Object.keys(patch).length) writeSharedFitAnswers(email, patch);
  }, [hydratedStorageKey, storageKey, email, mcqAnswers, mcqSeconds, ocp]);

  const { data: programWindowRows } = window.useWorkspaceDB<ProgramWindowRow>('programs', {
    shared: true,
    columns: ['id', 'program_id', 'open_date', 'close_date', 'display_status', 'program_type'],
    limit: 500,
  });
  const programWindows = useMemo(() => {
    const newest = new Map<string, ProgramWindowRow>();
    for (const row of programWindowRows || []) {
      const id = String(row.program_id || '').trim();
      const current = newest.get(id);
      if (id && (!current || Number(row.id) > Number(current.id))) newest.set(id, row);
    }
    return newest;
  }, [programWindowRows]);
  const topProgramsByTrackFit = useMemo(
    () => sortProgramsByBestTrackFit(programs, (program) => programOpenRank(programWindows.get(program.program_id))).slice(0, 5),
    [programs, programWindows],
  );
  const workStyleComplete = mcqComplete;
  const topFunctions = functionScores.slice(0, 3);
  const cvProfileFieldsValid = profileHasContent(profile) && certIssuersValid && !profile.education.some((education) => !education.degree || !courseworkComplete(education.coursework)) && !profile.experiences.some((experience) => !isIndustrySelectionComplete(experience));
  const cvEntryView = resolveFitCvEntryView({ step, cvReady, chooserVisible: cvChooserVisible, showPaste });
  const rewriteProgram = selectedProgram ? programs.find((item) => item.program_id === selectedProgram) : undefined;
  const cvRewriteLayout = cvRewriteMode && cvEntryView === 'confirmation' && !!rewriteProgram;

  useEffect(() => {
    if (step !== 1) setCvRewriteMode(false);
  }, [step]);

  return (
    <div className="min-h-full bg-[var(--space-surface-page)] text-[var(--space-text-primary)] [&_button]:min-h-11">
      <div className="mx-auto flex w-full max-w-[82rem] items-start gap-4 px-3 py-4 sm:px-6 sm:py-7">
        <aside className="sticky top-4 hidden w-40 shrink-0 lg:block"><SaveProgressButton status={saveStatus} onSave={saveNow} /></aside>
        <main className="min-w-0 flex-1">
        <div className="h-6" aria-hidden="true" />
        <div className="flex items-center justify-between gap-3">
          <div className="lg:hidden"><SaveProgressButton status={saveStatus} onSave={saveNow} /></div>
          <button type="button" onClick={startOverAssessment} className="ml-auto inline-flex w-fit items-center gap-1.5 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold text-[var(--space-text-brand)] hover:bg-[var(--space-surface-accent-soft)]"><RefreshCw className="h-3.5 w-3.5" />Start over</button>
        </div>
        {step !== 1 && <header className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <FitBrandTag />
            <h1 className="mt-2 text-xl font-extrabold tracking-tight sm:text-3xl">Find your function first. Then find the right program.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">A focused two-stage assessment for Vietnamese Economics and STEM students preparing for MT and consulting applications.</p>
          </div>
        </header>}

        {step !== 1 && <FitStepIndicator steps={STEP_LABELS} current={explorationStepIndicator(step)} />}

        {error && <div className="mb-4 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_8%,transparent)] p-3 text-xs font-semibold text-[var(--space-semantic-danger)]">{error}</div>}

        {cvEntryView === 'chooser' && (
          <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
            <CvSubmitStep variant="discovery" parsing={parsing} parsePhase={parsePhase} parseLabels={PARSE_LABELS} hasSavedCv={!!savedCv} savedCvDate={savedCv?.date} selectedFileName={selectedFile} parseFailure={parseFailure} failureMessage={parseFailureMessage} onFile={(file) => void parseInput({ file })} onUseSaved={applySavedCv} onManual={startManualCv} onFillManually={startManualCv} onRetry={() => { const file = lastCvFileRef.current; if (!file) return false; void parseInput({ file }); return true; }} onBack={onBackToSelector ? returnToFlowSelector : undefined} />
          </section>
        )}

        {(cvEntryView === 'confirmation' || cvEntryView === 'paste') && (
          <div className={cvRewriteLayout ? 'grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)]' : undefined}>
          {cvRewriteLayout && rewriteProgram && <aside className="min-w-0 max-h-[75vh] overflow-y-auto rounded-3xl lg:sticky lg:top-4 lg:order-last lg:max-h-[calc(100vh-2rem)]"><CvRewriteFeedbackPanel programId={rewriteProgram.program_id} company={rewriteProgram.company} program={rewriteProgram.program} position={rewriteProgram.best_fit_position || rewriteProgram.function || programPositionPaths(rewriteProgram)[0] || ''} profile={profile} canSave={cvProfileFieldsValid} saving={cvConfirming || busy === 'function'} onSave={() => void confirmCvProfile()} onClose={() => setCvRewriteMode(false)} /></aside>}
          <section className={`${cvRewriteLayout ? 'min-w-0' : 'mx-auto max-w-5xl'} rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 [&_input]:font-normal [&_select]:font-normal [&_textarea]:font-normal sm:p-7`}>
            <div><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · CV confirmation</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">{showPaste ? 'Add your CV details' : 'Review what Mate found'}</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">{showPaste ? 'Fill in the fields below. Have your CV as text? Paste it to auto-fill the form, then check every field.' : 'Correct anything that is incomplete. Your CV is evidence, not a gate — no experience is okay.'}</p></div>
            {showPaste && <CvPasteAutofill text={cvText} onTextChange={setCvText} onAutofill={() => void parseInput({ text: cvText })} parsing={parsing} parsingLabel={PARSE_LABELS[Math.min(parsePhase, PARSE_LABELS.length - 1)]} failureMessage={parseFailure ? parseFailureMessage : null} />}
            <label className="mt-6 block text-xs font-bold text-[var(--space-text-secondary)]">Full name<input value={profile.name} aria-invalid={missingAfterUpload(profile.name) || undefined} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-[var(--space-brand-primary)] ${missingAfterUpload(profile.name) ? MISSING_INPUT_CLASS : 'border-[var(--space-border-default)]'}`} />{missingAfterUpload(profile.name) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">We couldn't read this — please fill it in.</span>}</label>
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3"><h3 className="flex items-center gap-2 text-sm font-extrabold"><GraduationCap className="h-4 w-4 text-[var(--space-text-brand)]" />Education</h3><button type="button" onClick={() => { const index = profile.education.length; setProfile((current) => ({ ...current, education: [...current.education, { institution: '', field: '', degree: '', graduationYear: '', gpa: '', coursework: '', source: 'user' }] })); window.setTimeout(() => document.getElementById(`fit-education-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-xl bg-[var(--space-surface-accent-soft)] px-3 py-2 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add Education</button></div>
              {profile.education.length === 0 && <p className="mt-2 text-xs text-[var(--space-text-muted)]">No confirmed education. Add an entry if relevant.</p>}
              <div className="mt-3 space-y-3">{profile.education.map((education, index) => <div key={`education-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Education {index + 1}</span><button type="button" onClick={() => setProfile((current) => { const educationEntries = current.education.filter((_, itemIndex) => itemIndex !== index); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', university_tier: primary?.universityTier, faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} aria-label={`Delete education entry ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2"><UniversityCombo id={`fit-education-${index}`} label="University name" value={education.institution} missing={missingAfterUpload(education.institution)} onChange={(institution, universityTier) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, institution, universityTier } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', university_tier: primary?.universityTier, faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} /><MajorCombo id={`fit-major-${index}`} label="Major" value={education.field} missing={missingAfterUpload(education.field)} onChange={(field) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, field } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} /></div><div className="grid gap-3 sm:grid-cols-3"><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label htmlFor={`fit-degree-${index}`} className="block">Degree <span className="text-[var(--space-semantic-danger)]">*</span></label><div className="relative mt-1.5"><select id={`fit-degree-${index}`} value={education.degree} required aria-required="true" aria-invalid={!education.degree || undefined} onChange={(event) => setProfile((current) => ({ ...current, education: current.education.map((item, itemIndex) => itemIndex === index ? { ...item, degree: event.target.value } : item) }))} className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal outline-none focus:border-[var(--space-brand-primary)] ${education.degree ? 'border-[var(--space-border-default)]' : 'border-[var(--space-semantic-danger)]'}`}><option value="">Select degree</option>{DEGREE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" /></div>{!education.degree && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select a degree.</span>}</div><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label htmlFor={`fit-gpa-${index}`} className="block">GPA</label><div className="relative mt-1.5"><select id={`fit-gpa-${index}`} value={education.gpa} aria-invalid={missingAfterUpload(education.gpa) || undefined} onChange={(event) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, gpa: event.target.value } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, gpa: primary?.gpa || '' }; })} className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal outline-none focus:border-[var(--space-brand-primary)] ${missingAfterUpload(education.gpa) ? MISSING_INPUT_CLASS : 'border-[var(--space-border-default)]'}`}><option value="">Select your GPA range</option>{GPA_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" /></div>{missingAfterUpload(education.gpa) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select your GPA range.</span>}</div><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label className="block">Graduation</label><div className="mt-1.5"><MonthPicker value={education.graduationYear} placeholder="Graduation month" missing={missingAfterUpload(education.graduationYear)} onChange={(graduationYear) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, graduationYear } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} />{missingAfterUpload(education.graduationYear) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select your graduation month.</span>}</div></div></div><CourseworkInputs id={`fit-coursework-${index}`} value={education.coursework} onChange={(coursework) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, coursework } : item); return { ...current, education: educationEntries, coursework: mergeEducationCoursework(educationEntries) }; })} /></div></div>)}</div>
            </div>
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><BriefcaseBusiness className="h-4 w-4 text-[var(--space-text-brand)]" />Work Experiences</h3><button type="button" onClick={() => { const index = profile.experiences.length; setProfile((current) => ({ ...current, experiences: [...current.experiences, { company: '', role: '', duration: '', description: '', sector: '' }] })); window.setTimeout(() => document.getElementById(`fit-company-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>
              {profile.experiences.length === 0 ? <p className={`mt-3 rounded-xl p-3 text-xs ${cvEntryMode === 'upload' ? 'border border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_4%,var(--space-surface-card))] font-semibold text-[var(--space-semantic-danger)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>{cvEntryMode === 'upload' ? "We couldn't read any work experience. Add an entry if your CV includes one." : 'No work experience yet? That is normal. The model will use your other four dimensions and treat CV evidence as a fresh-graduate baseline.'}</p> : <div className="mt-3 space-y-3">{profile.experiences.map((experience, index) => <div key={`experience-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="flex items-center gap-2 text-xs font-bold text-[var(--space-text-secondary)]">Work Experience {index + 1}{isInternRole(experience.role) && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-brand-primary-500)_12%,transparent)] px-2 py-0.5 text-[10px] text-[var(--space-text-brand)]">Internship</span>}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, experiences: current.experiences.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete work experience ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2"><CompanyCombo id={`fit-company-${index}`} value={experience.company || ''} missing={missingAfterUpload(experience.company)} onChange={(company) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, company } : item) }))} /><label className="text-xs font-bold text-[var(--space-text-secondary)]">Role<input value={experience.role || ''} aria-invalid={missingAfterUpload(experience.role) || undefined} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, role: event.target.value } : item) }))} className={`mt-1.5 w-full rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)] ${missingAfterUpload(experience.role) ? MISSING_INPUT_CLASS : 'border-[var(--space-border-default)]'}`} /></label></div><ExperienceIndustrySelect company={experience.company || ''} description={experience.description || ''} value={experience.sector} majorIndustry={experience.major_industry} subSector={experience.sub_sector} source={experience.sectorSource} onChange={(industry, sectorSource) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, sector: industry.legacySector, major_industry: industry.majorIndustry, sub_sector: industry.subSector, sectorSource } : item) }))} /><ExperienceDurationEditor value={experience.duration || ''} missing={cvEntryMode === 'upload'} onChange={(duration) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, duration } : item) }))} /><label className="block text-xs font-bold text-[var(--space-text-secondary)]">Description<textarea rows={Math.max(3, formatExperienceDescription(experience.description).split('\n').length)} value={experience.description} onBlur={(event) => { const description = formatExperienceDescription(event.target.value); setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, description } : item) })); }} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder="Responsibilities, projects, and measurable results" className="mt-1.5 w-full whitespace-pre-wrap rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label></div></div>)}</div>}
            </div>
            <SkillsSelector skills={profile.skills} certifications={profile.certifications} certificationDetails={profile.certification_details || []} onCertificationDetailsChange={(details) => setProfile((current) => ({ ...current, certification_details: details }))} certificationIssuers={profile.certification_issuers || []} onCertificationIssuersChange={(issuers) => setProfile((current) => ({ ...current, certification_issuers: issuers }))} onCertificationIssuerValidityChange={setCertIssuersValid} otherSkills={profile.other_skills} otherSelected={profile.other_skills_selected} onChange={(value) => setProfile((current) => ({ ...current, skills: value.skills, certifications: value.certifications, other_skills: value.otherSkills, other_skills_selected: value.otherSelected }))} />
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><Users className="h-4 w-4 text-[var(--space-text-brand)]" />Extracurricular Activities</h3><button type="button" onClick={() => setProfile((current) => ({ ...current, extracurricular_activities: [...current.extracurricular_activities, { organization: '', role: '', duration: '', description: '' }] }))} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>
              {profile.extracurricular_activities.length === 0 ? <p className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-muted)]">No extracurricular activities confirmed. Add clubs, volunteer work, student organizations, or team projects if relevant.</p> : <div className="mt-3 space-y-3">{profile.extracurricular_activities.map((activity, index) => <div key={`activity-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Extracurricular Activity {index + 1}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete extracurricular activity ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2">{([['Organization', 'organization'], ['Role', 'role']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={activity[key] || ''} onChange={(event) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: event.target.value } : item) }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label>)}</div><ExperienceDurationEditor value={activity.duration || ''} onChange={(duration) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, duration } : item) }))} /><label className="block text-xs font-bold text-[var(--space-text-secondary)]">Description<textarea rows={Math.max(3, formatExperienceDescription(activity.description).split('\n').length)} value={activity.description} onBlur={(event) => { const description = formatExperienceDescription(event.target.value); setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, description } : item) })); }} onChange={(event) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder={'One responsibility, contribution, or result per line'} className="mt-1.5 w-full whitespace-pre-wrap rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label></div></div>)}</div>}
            </div>
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><Trophy className="h-4 w-4 text-[var(--space-text-brand)]" />Honors &amp; Achievements</h3><button type="button" onClick={() => setProfile((current) => ({ ...current, honors_achievements: [...current.honors_achievements, { competition: '', organizer: '', title: '', time: '', description: '' }] }))} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>
              {profile.honors_achievements.length === 0 ? <p className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-muted)]">No honors or achievements confirmed. Add competition results, awards, or academic honors if relevant.</p> : <div className="mt-3 space-y-3">{profile.honors_achievements.map((achievement, index) => <div key={`achievement-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Honor &amp; Achievement {index + 1}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete honor or achievement ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2">{([['Competition', 'competition', 'Competition'], ['Organizer / Issuer', 'organizer', 'e.g. FTU, Unilever, Ministry of Education'], ['Title', 'title', 'Title']] as const).map(([label, key, placeholder]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={achievement[key] || ''} placeholder={placeholder} onChange={(event) => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: event.target.value } : item) }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label>)}<div className="text-xs font-bold text-[var(--space-text-secondary)]"><span className="block">Time</span><div className="mt-1.5"><AchievementTimePicker value={achievement.time || ''} onChange={(time) => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, time } : item) }))} /></div></div></div></div></div>)}</div>}
            </div>
            <CvPeerDataConsentLine checked={cvPeerDataConsent} onChange={setCvPeerDataConsent} />
            <div className="mt-5 flex flex-col-reverse gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between"><button type="button" disabled={cvConfirming} onClick={showPaste ? startOverCvUpload : onBackToSelector ? returnToFlowSelector : startOverCvUpload} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)] disabled:opacity-45"><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-col gap-2 sm:flex-row sm:items-center">{cvConfirming && <p role="status" className="text-center text-xs font-semibold text-[var(--space-text-muted)] sm:text-right">Saving your confirmed CV — this can take a few seconds…</p>}<button type="button" disabled={!cvProfileFieldsValid || cvConfirming} aria-busy={cvConfirming || undefined} onClick={() => void confirmCvProfile()} className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 ${cvConfirming ? 'cursor-wait' : 'disabled:opacity-45'}`}>{cvConfirming ? <><Loader2 className="h-4 w-4 animate-spin" />Saving…</> : <>Next <ArrowRight className="h-4 w-4" /></>}</button></div></div>
          </section>
          </div>
        )}

        {step === 2 && (
          <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7"><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · Step 2 of 2</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">Work Style</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Situational Judgement and Work Preference are both on this page — answer them in any order.</p>
            <SoftSkillMcqAssessment answers={mcqAnswers} seconds={mcqSeconds} questionIndex={mcqQuestionIndex} onAnswer={(itemId, choice, secondsOnItem) => { setMcqAnswers((current) => ({ ...current, [itemId]: choice })); setMcqSeconds((current) => ({ ...current, [itemId]: secondsOnItem })); }} onQuestionIndexChange={setMcqQuestionIndex} />
            <div className="mt-8 border-t border-[var(--space-border-default)] pt-6">
            <WorkStyleAssessment scores={ocp} onScoreChange={(key, value) => setOcp((current) => ({ ...current, [key]: value }))} />
            </div>
            {!mcqComplete ? <p className="mt-4 text-sm text-[var(--space-text-muted)]">Answer every Situational Judgement scenario to see your function fit.</p> : null}
            <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(1)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" disabled={!workStyleComplete || busy !== 'idle'} onClick={() => void calculateFunctions()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">{busy === 'function' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{busy === 'function' ? 'Calculating…' : 'See My Function Fit'}</button></div>
          </section>
        )}

        {step === 5 && topFunctions.length > 0 && (
          <section className="space-y-4"><div className="overflow-hidden rounded-3xl bg-[var(--space-brand-primary)] p-5 text-[var(--space-text-on-primary)] sm:p-7"><p className="text-xs font-bold uppercase tracking-widest opacity-80">Stage 1 complete</p><h2 className="mt-1 text-2xl font-extrabold">Your top function fits</h2></div>
            <div className="space-y-4">{topFunctions.map((fn, index) => <article key={fn.id} className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex items-start justify-between gap-3 sm:gap-4"><div className="flex min-w-0 items-start gap-3"><span className="shrink-0 text-xl sm:text-2xl">{MEDALS[index]}</span><div className="min-w-0"><h3 className="break-words text-base font-extrabold sm:text-lg">{fn.name} <span className="text-[var(--space-text-brand)]">— {fn.score}%</span></h3><p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{fn.explanation}</p></div></div><Target className="h-5 w-5 shrink-0 text-[var(--space-text-brand)]" /></div><div className="mt-4 grid gap-2 sm:grid-cols-4">{[
              ['Env fit', `${fn.breakdown.work_style.score}%`, 'Weighted match on this function\'s signature work preferences (e.g. detail vs innovation) from your 9 sliders'],
              ['Academic + field', `${fn.breakdown.cognitive.score}%`, 'GPA/competitions plus coursework and role keywords for this function'],
              ['SJT + interest', `${fn.breakdown.motivation.score}%`, 'Behavioral scenarios plus CV signal for this function'],
              ['CV evidence', `${fn.breakdown.cv_evidence.score}%`, 'Experience, certs, competitions and skills for this track'],
            ].map(([label, value, hint]) => <div key={label} className="rounded-xl bg-[var(--space-surface-muted)] p-2 text-center" title={hint}><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">{label}</p><p className="mt-1 text-sm font-extrabold">{value}</p></div>)}</div>
            <p className="mt-2 text-[11px] leading-5 text-[var(--space-text-muted)]">Scores are <span className="font-semibold">per function</span> — they change with role keywords, coursework, your work-style sliders, and SJT answers.</p></article>)}</div>
            <div className="rounded-3xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-5"><p className="font-extrabold">Does this direction feel right?</p><p className="mt-1 text-sm text-[var(--space-text-muted)]">Confirm to see only programs offering at least one of your strongest functions.</p></div><div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(2)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={() => setStep(2)} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Review answers</button><button type="button" disabled={busy !== 'idle'} onClick={() => void loadPrograms()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">{busy === 'programs' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}{busy === 'programs' ? 'Filtering programs…' : 'Confirm & Match Programs'}</button></div></div>
          </section>
        )}

        {step === 6 && (
          <section className="space-y-4"><div className="overflow-hidden rounded-3xl bg-[var(--space-brand-primary)] p-5 text-[var(--space-text-on-primary)] sm:p-7"><p className="text-xs font-bold uppercase tracking-widest opacity-80">Stage 2 · Program matching</p><h2 className="mt-1 text-2xl font-extrabold">Top program matches for you</h2><p className="mt-2 text-sm opacity-90">Programs that may be open come first, then those opening soon, then the rest — each group ranked by your strongest position track fit, not only overall company match.</p></div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Top 5 by position fit</p><h3 className="mt-1 text-lg font-extrabold sm:text-xl">{topProgramsByTrackFit.length} programs</h3></div></div>
            <div className="space-y-4">{topProgramsByTrackFit.map((program, index) => { const selected = selectedProgram === program.program_id; const displayFit = displayProgramFit(program, ocp, programCultureProfiles || []); const windowStatus = programWindowStatus(programWindows.get(program.program_id)); const availability = windowStatus ? programAvailabilityLabel(windowStatus) : ''; const typeLabel = programTypeLabel(programWindows.get(program.program_id)?.program_type, program.program); return <button key={program.program_id} type="button" role="radio" aria-checked={selected} onClick={() => setSelectedProgram(program.program_id)} className={`w-full rounded-3xl border bg-[var(--space-surface-card)] p-5 text-left transition ${selected ? 'border-[var(--space-brand-primary)] shadow-[0_0_0_2px_color-mix(in_srgb,var(--space-brand-primary-500)_12%,transparent)]' : 'border-[var(--space-border-default)]'}`}><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="flex min-w-0 items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-sm font-extrabold text-[var(--space-text-brand)]">{index + 1}</span><div className="min-w-0"><p className="break-words text-xs font-bold text-[var(--space-text-muted)]">{program.company}</p><h4 className="mt-0.5 break-words text-base font-extrabold">{program.program}</h4><p className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[var(--space-text-muted)]">{programSectorLabel(program)}{typeLabel && <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-brand)]">{typeLabel}</span>}{availability && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-semantic-success-700)]">{availability}</span>}</p><ProgramPositionFitBlock program={program} /></div></div><div className="flex items-center gap-2"><span className="rounded-full bg-[var(--space-brand-primary)] px-3 py-1 text-sm font-extrabold text-[var(--space-text-on-primary)]">{displayFit.overallFit == null ? 'Not enough data' : displayFit.corporateSufficient ? `${displayFit.overallFit}% overall · 60/40` : `${displayFit.overallFit}% overall · Track data only`}</span><span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selected ? 'border-[var(--space-brand-primary)]' : 'border-[var(--space-border-strong)]'}`}>{selected && <span className="h-2.5 w-2.5 rounded-full bg-[var(--space-brand-primary)]" />}</span></div></div><div className="mt-4 grid grid-cols-2 gap-3"><div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-[var(--space-surface-muted)] p-4 text-center"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">Function fit {displayFit.corporateSufficient ? '· 60%' : '· track-specific'}</p><p className="mt-1 text-base font-extrabold sm:text-lg">{displayFit.functionFit == null ? 'Not enough data' : `${displayFit.functionFit}%`}</p></div><div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-[var(--space-surface-muted)] p-4 text-center"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">Corporate fit {displayFit.corporateSufficient ? displayFit.corporateSource === 'company' ? '· 40% · company' : displayFit.corporateSource === 'industry' ? '· 40% · industry proxy' : '· 40% · market proxy' : '· unavailable'}</p><p className="mt-1 text-base font-extrabold sm:text-lg">{displayFit.corporateFit != null ? `${displayFit.corporateFit}%` : 'Not enough data'}</p></div></div></button>; })}</div>
            {programs.length === 0 && <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 text-sm text-[var(--space-text-muted)]">No matching programs were found. Review your function answers and try again.</div>}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(5)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button>{selectedProgram && <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-3xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-5 sm:flex-row sm:items-center"><div><p className="text-sm font-extrabold">1 program selected</p><p className="mt-1 text-xs text-[var(--space-text-muted)]">Review your full Target Fit before creating a roadmap.</p></div><button type="button" disabled={busy !== 'idle'} onClick={() => void evaluateSelectedProgram()} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-60 sm:w-auto sm:py-3">{busy === 'programs' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronRight className="h-4 w-4" />}{busy === 'programs' ? 'Evaluating fit…' : 'Review My Target Fit'}</button></div>}</div>
          </section>
        )}

        {step === 7 && selectedProgram && (() => {
          const program = programs.find((item) => item.program_id === selectedProgram);
          if (!program) return null;
          const positionPaths = programPositionPaths(program);
          const targetFn = program.best_fit_position || program.function || positionPaths[0] || '';
          const fallbackSubroles = positionPaths.length
            ? null
            : recommendSubroles(targetFn, explorationMotivationForSubroles(motivation));
          const rawAnalysis = fitAnalysis || {};
          const preciseFit = displayProgramFit(program, ocp, programCultureProfiles || []);
          const motivationFitScore = resolveMotivationFitScore(rawAnalysis, functionScores, targetFn);
          const analysis = { ...rawAnalysis, matching_ratio: preciseFit.overallFit, function_fit_score: preciseFit.functionFit, work_style_fit_score: preciseFit.corporateFit, culture_fit_percent: preciseFit.corporateFit, culture_data_sufficient: preciseFit.corporateSufficient, culture_fit_source: preciseFit.corporateSource, culture_fit_sample_size: preciseFit.corporateSampleSize, motivation_fit_score: motivationFitScore ?? rawAnalysis.motivation_fit_score };
          const displayedSubroles = positionPaths.length
            ? { function: program.program, subroles: positionPaths }
            : (analysis.recommended_subroles || fallbackSubroles);
          const confirmedTechnicalSkills = profile.skills.filter((skill) => /excel|powerpoint|google sheets|google workspace|sql|power bi|tableau|python|\bsap\b|\bvba\b|r programming/i.test(skill));
          const quantifiedLeadershipActivity = profile.extracurricular_activities.find((activity) => /\d[\d,.]*\s*(?:\+|%|x|members?|participants?|reaches?|people|users?|customers?|events?|projects?)/i.test(activity.description || ''));
          const confirmedCompetitionCategories = new Set(profile.honors_achievements.map((achievement) => achievement.category).filter(Boolean));
          const competitionCategoryCount = confirmedCompetitionCategories.size || (profile.honors_achievements.length ? 1 : 0);
          const internationalExposure = detectInternationalExposure(profile);
          const criteria = Array.isArray(analysis.criteria) ? analysis.criteria
            .filter((item: any) => !isMbtiCriterion(item) && !isResearchCriterion(item))
            .map((item: any) => {
              const key = String(item?.id || item?.label_en || item?.label || '').toLowerCase();
              if (/cognitive|academic/.test(key) && item?.status !== 'met') {
                const academicEvidence = profile.gpa ? `${profile.gpa} academic band confirmed` : 'Academic foundation confirmed';
                const competitionEvidence = competitionCategoryCount ? `competition evidence is present in ${competitionCategoryCount} ${competitionCategoryCount === 1 ? 'category' : 'categories'}` : 'no competition evidence is confirmed yet';
                return { ...item, label_en: 'Academic Foundation', evidence: `${academicEvidence}; ${competitionEvidence}.`, improvement_tip: competitionSuggestionForTarget(targetFn, profile.honors_achievements) };
              }
              if (/leadership/.test(key) && quantifiedLeadershipActivity) {
                const activityName = [quantifiedLeadershipActivity.role, quantifiedLeadershipActivity.organization].filter(Boolean).join(' at ');
                return { ...item, status: 'met', score: undefined, evidence: `${activityName || 'Your extracurricular activity'} includes quantified leadership outcomes.`, improvement_tip: 'Keep the team size, participant reach, and other measured outcomes in your CV bullets.' };
              }
              if (/technical[ _-]?skills?|tools?/.test(key) && confirmedTechnicalSkills.length > 0) {
                return { ...item, status: 'met', score: undefined, evidence: `Tools confirmed in your Skills section: ${confirmedTechnicalSkills.join(', ')}.`, improvement_tip: 'Keep these tools on your CV and mention where you used each one.' };
              }
              return item;
            }) : [];
          if (internationalExposure.signals.length && !criteria.some((item: any) => String(item?.id || '').toLowerCase().includes('international_exposure'))) {
            criteria.unshift({ id: 'international_exposure', label_en: 'International Exposure', status: 'met', evidence: internationalExposure.summary, improvement_tip: 'Keep this cross-border experience visible in your CV and interview examples.' });
          }
          const resultStrengthRows: FitCriterionRow[] = criteria.filter((item: any) => item?.status === 'met').map((item: any, index: number) => ({
            id: item?.id || `s-${index}`,
            label: humanizeCriterionLabel(item?.label_en || item?.label || 'Strength'),
            summary: compactFitEvidence(stripMatePrefix(String(item?.evidence || item?.summary || ''))),
          }));
          const resultGapRows: FitCriterionRow[] = criteria.filter((item: any) => item?.status === 'not_met' || item?.status === 'partial').map((item: any, index: number) => ({
            id: item?.id || `g-${index}`,
            label: humanizeCriterionLabel(item?.label_en || item?.label || 'Growth area'),
            summary: compactFitEvidence(stripMatePrefix(String(item?.evidence || item?.summary || ''))),
            next: isMotivationCriterion(item) ? '' : stripMatePrefix(String(item?.improvement_tip || '')),
          }));
          const resultConcernLines = buildWatchListLines({ engineConcerns: (analysis.potential_concerns || []).filter((concern: unknown) => {
            const text = String(concern || '');
            if (confirmedTechnicalSkills.length > 0 && /technical[ _-]?skills?|tools?|excel|powerpoint|google sheets/i.test(text)) return false;
            if (quantifiedLeadershipActivity && /leadership|extracurricular|measurable outcome|quantify/i.test(text)) return false;
            return true;
          }), gapRows: resultGapRows, limit: 8 });
          const resultActionRows: FitActionRow[] = featureRecommendationRows({ company: program.company, program: program.program, industry: program.industry }, targetFn, profile);
          return (
            <section className="space-y-4">
              <FitResultsSummary
                company={program.company}
                program={program.program}
                targetFunction={targetFn}
                analysis={{ ...analysis, criteria }}
                rolePaths={displayedSubroles?.subroles || positionPaths}
                subrolePack={displayedSubroles ? { function: displayedSubroles.function, subroles: displayedSubroles.subroles } : null}
                rolePathsKind={positionPaths.length ? 'program_positions' : 'function_subroles'}
                workStyleLabel={analysis.culture_fit_source === 'company' ? 'Corporate Fit' : analysis.culture_fit_source === 'industry' ? 'Corporate Fit · Industry proxy' : 'Corporate Fit · Market proxy'}
                strengthRows={resultStrengthRows}
                gapRows={resultGapRows}
                concernLines={resultConcernLines}
                actionRows={resultActionRows}
                showDetails
              />
              <CvRewriteGuide programId={program.program_id} company={program.company} program={program.program} position={targetFn} profile={profile} onEditCv={() => { setReturnToTargetFitAfterCvEdit(true); setCvReady(true); setCvRewriteMode(true); setStep(1); }} />
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" onClick={() => setStep(6)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button>
                <div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={() => { setReturnToTargetFitAfterCvEdit(true); setCvReady(true); setStep(1); }} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2.5 text-sm font-bold">Edit CV</button><button type="button" disabled={roadmapBusy} onClick={() => void openRoadmap()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-60 sm:py-3">{roadmapBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronRight className="h-4 w-4" />}{roadmapBusy ? 'Saving roadmap…' : 'Generate My Roadmap'}</button></div>
              </div>
            </section>
          );
        })()}
        {step >= 5 && <FitFeedbackPrompt track="discovery" programId={selectedProgram} />}
        </main>
      </div>
    </div>
  );
}
