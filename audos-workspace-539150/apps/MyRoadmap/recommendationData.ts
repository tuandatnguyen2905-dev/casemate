// Data access for My Roadmap's "Recommended for Your Target Program" section:
// candidate reviews (read shared; written only through the founder-gated
// casemate-candidate-reviews-v1 server function), the program catalogue, the
// learner's existing progress in each practice app, and the deep links that
// open the recommended lesson, test family or drill.
//
// Progress is read from the same sources the apps themselves use — nothing is
// written and no new tracking is added:
//   Domain Knowledge  localStorage 'casemate:domain-lesson-progress:v1' (completedAt
//                     per lesson) against the app's own lesson catalogue
//   Aptitude Test     aptitude_attempts by account user_key, counted per test
//                     family exactly like the Aptitude Test landing page
//   Case Drill        completed drill_library_attempts + submitted Structures
//                     trees, per Question Library skill (non-archived questions)

import { computeAptitudeProgress } from '../../lib/aptitudeProgress';
import type { ProgressCatalogEntry } from '../../lib/aptitudeProgress';
import { writeDomainPendingRoute } from '../../lib/domainKnowledgeRoute';
import { trackAppSwitch } from '../../lib/engagementTracking';
import { isLibrarySkill, openCaseDrillSkill } from '../../lib/caseDrillSkillLink';
import {
  CANDIDATE_REVIEWS_HOOK,
  CANDIDATE_REVIEWS_STORAGE_READY,
  CANDIDATE_REVIEWS_TABLE,
  CANDIDATE_REVIEWS_UPDATED_EVENT,
  normalizeReviewRow,
} from '../../lib/candidateReviews';
import type { CandidateReview, ProgramRow, RecommendationTopic, ReviewDraft } from '../../lib/candidateReviews';
import { LESSON_PROGRESS_KEY } from '../IndustryKnowledge/lessonFlowCore';
import type { KnowledgeRecommendation } from '../IndustryKnowledge/industrySubcategories';

export interface TopicProgress {
  done: number;
  /** 0 when the total is unknown or the content has nothing countable — the bar is hidden. */
  total: number;
}

export interface CaseSkillProgress extends TopicProgress {
  /** First unfinished (easiest-first) question, opened by Practice Now. */
  nextQuestionId: string | null;
}

function workspaceDb(): any {
  const db = typeof window !== 'undefined' ? (window as any).__workspaceDb : null;
  if (!db?.from) throw new Error('Workspace credentials are not ready.');
  return db;
}

function rowsOf(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

function parseJsonish(value: unknown): any {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function withColumns(query: any, ...names: string[]) {
  return typeof query?.select === 'function' ? query.select(...names) : query;
}

async function readRows(build: () => any): Promise<any[]> {
  try {
    return rowsOf(await build());
  } catch {
    return [];
  }
}

/* ----------------------------------------------------------------------------
 * Reviews and programs
 * --------------------------------------------------------------------------*/

/** The candidate_reviews table does not exist yet (it needs a free WorkspaceDB table slot). */
export class ReviewStorageMissingError extends Error {}

function isMissingTable(error: any): boolean {
  const code = String(error?.code || error?.body?.code || '');
  return error?.status === 404 || code === 'TABLE_NOT_FOUND' || /table not found|does not exist|unknown table/i.test(String(error?.message || ''));
}

export async function loadCandidateReviews(): Promise<CandidateReview[]> {
  if (!CANDIDATE_REVIEWS_STORAGE_READY) throw new ReviewStorageMissingError('Candidate review storage is not set up yet.');
  const db = workspaceDb();
  let response: any;
  try {
    response = await db
      .from(CANDIDATE_REVIEWS_TABLE, { shared: true })
      .orderBy('id', 'desc')
      .limit(500)
      .get();
  } catch (error) {
    if (isMissingTable(error)) throw new ReviewStorageMissingError('Candidate review storage is not set up yet.');
    throw error;
  }
  return rowsOf(response).map(normalizeReviewRow).filter((row): row is CandidateReview => row !== null);
}

let programsPromise: Promise<ProgramRow[]> | null = null;

export function loadProgramRows(): Promise<ProgramRow[]> {
  programsPromise ??= readRows(() => withColumns(
    workspaceDb().from('programs', { shared: true }),
    'program_id', 'program_name', 'company', 'industry', 'sector', 'product_categories', 'aptitude_test_types', 'other_assessment_stages',
  ).limit(500).get()).then((rows) => {
    if (rows.length === 0) programsPromise = null;
    return rows as ProgramRow[];
  });
  return programsPromise;
}

export class ReviewServiceError extends Error {
  code: string;
  fields: Record<string, string>;

  constructor(message: string, code: string, fields: Record<string, string> = {}) {
    super(message);
    this.code = code;
    this.fields = fields;
  }
}

function reviewErrorMessage(code: string, status: number): string {
  if (code === 'founder_required') return 'Only the Casemate founder account can add, edit or delete candidate reviews.';
  if (status === 401 || code === 'session_required') return 'Your sign-in could not be verified. Sign in again with the founder account and retry.';
  if (code === 'invalid_review') return 'Please fix the highlighted fields.';
  if (code === 'review_not_found') return 'This review no longer exists — the list has been refreshed.';
  if (code === 'storage_missing') return 'Review storage isn’t set up yet (the workspace has reached its table limit).';
  return 'The review could not be saved just now. Please try again.';
}

async function callReviewService(sessionId: string | null | undefined, payload: Record<string, unknown>): Promise<any> {
  let response: Response;
  try {
    response = await fetch(CANDIDATE_REVIEWS_HOOK, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionId ? { 'X-Session-Id': sessionId } : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ReviewServiceError('No connection — check your internet and try again.', 'network_error');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data?.success === false) {
    const code = String(data?.code || `http_${response.status}`);
    throw new ReviewServiceError(reviewErrorMessage(code, response.status), code, data?.fields && typeof data.fields === 'object' ? data.fields : {});
  }
  return data;
}

function announceReviewChange() {
  window.dispatchEvent(new CustomEvent(CANDIDATE_REVIEWS_UPDATED_EVENT));
}

export async function saveCandidateReview(sessionId: string | null | undefined, draft: ReviewDraft, id?: number | null): Promise<void> {
  await callReviewService(sessionId, {
    action: id ? 'update' : 'create',
    ...(id ? { id } : {}),
    review: {
      company: draft.company.trim(),
      program: draft.program.trim(),
      position: draft.position.trim() || null,
      review_type: draft.review_type,
      review_text: draft.review_text.trim(),
      source_note: draft.source_note.trim() || null,
      topic_tags: draft.topic_tags,
    },
  });
  announceReviewChange();
}

export async function deleteCandidateReview(sessionId: string | null | undefined, id: number): Promise<void> {
  await callReviewService(sessionId, { action: 'delete', id });
  announceReviewChange();
}

/* ----------------------------------------------------------------------------
 * Aptitude Test — same catalogue and counting as the Aptitude Test landing page
 * --------------------------------------------------------------------------*/

type TestList = ReadonlyArray<{ id: unknown }>;

function catalogEntries(family: string, ...lists: TestList[]): ProgressCatalogEntry[] {
  return lists.flatMap((list) => list.map((test) => ({ id: String(test.id), family })));
}

let aptitudeCatalogPromise: Promise<ProgressCatalogEntry[]> | null = null;

function loadAptitudeCatalog(): Promise<ProgressCatalogEntry[]> {
  aptitudeCatalogPromise ??= Promise.all([
    import('../../lib/diagrammaticLibrary'),
    import('../../lib/assessmentDayDiagrammaticProcessTests'),
    import('../../lib/assessmentDayDiagrammaticTests'),
    import('../../lib/assessmentDayInductiveReasoningTests'),
    import('../../lib/assessmentDayInductiveLogicTests'),
    import('../../lib/inductiveLibrary'),
    import('../../lib/assessmentDayDeductiveTests'),
    import('../../lib/deductiveLibrary'),
    import('../../lib/assessmentDayErrorCheckingTests'),
    import('../../lib/errorCheckingLibrary'),
    import('../../lib/spatialLibrary'),
    import('../../lib/numericalReasoning'),
    import('../../lib/verbalReasoning'),
    import('../../lib/situationalJudgement'),
    import('../../lib/logicalReasoning'),
    import('../../lib/criticalThinking'),
    import('../../lib/mechanicalReasoning'),
    import('../../lib/inTrayExercises'),
  ]).then(([
    diagrammatic, diagrammaticProcess, diagrammaticAd,
    inductiveReasoning, inductiveLogic, inductive,
    deductiveAd, deductive,
    errorCheckingAd, errorChecking,
    spatial, numerical, verbal, situational, logical, critical, mechanical, inTray,
  ]) => [
    ...catalogEntries('diagrammatic', diagrammatic.loadDiagrammaticLibrary(), diagrammaticProcess.loadAssessmentDayDiagrammaticProcessTests(), diagrammaticAd.loadAssessmentDayDiagrammaticTests()),
    ...catalogEntries('inductive', inductiveReasoning.loadAssessmentDayInductiveReasoningTests(), inductiveLogic.loadAssessmentDayInductiveLogicTests(), inductive.loadInductiveLibrary()),
    ...catalogEntries('deductive', deductiveAd.loadAssessmentDayDeductiveTests(), deductive.loadDeductiveLibrary()),
    ...catalogEntries('error_checking', errorCheckingAd.loadAssessmentDayErrorCheckingTests(), errorChecking.loadErrorCheckingLibrary()),
    ...catalogEntries('spatial', spatial.loadSpatialLibrary()),
    ...catalogEntries('numerical', numerical.loadNumericalReasoningLibrary()),
    ...catalogEntries('verbal', verbal.loadVerbalReasoningLibrary()),
    ...catalogEntries('situational', situational.loadSituationalJudgementLibrary()),
    ...catalogEntries('logical', logical.loadLogicalReasoningLibrary()),
    ...catalogEntries('critical', critical.loadCriticalThinkingLibrary()),
    ...catalogEntries('mechanical', mechanical.loadMechanicalReasoningLibrary()),
    ...catalogEntries('in_tray', inTray.loadInTrayExercises()),
  ]).catch((error) => {
    aptitudeCatalogPromise = null;
    throw error;
  });
  return aptitudeCatalogPromise;
}

export async function loadAptitudeFamilyProgress(userKey: string): Promise<Record<string, TopicProgress>> {
  const [catalog, attempts] = await Promise.all([
    loadAptitudeCatalog(),
    readRows(() => withColumns(workspaceDb().from('aptitude_attempts', { shared: true }).eq('user_key', userKey), 'id', 'test_type', 'test_id').limit(1000).get()),
  ]);
  const progress = computeAptitudeProgress(
    catalog,
    attempts.map((row) => ({ test_type: row?.test_type ? String(row.test_type) : null, test_id: String(row?.test_id || '') })),
    [],
  );
  return Object.fromEntries(Object.entries(progress.byFamily).map(([family, item]) => [family, { done: item.completed, total: item.total }]));
}

/* ----------------------------------------------------------------------------
 * Case Drill — Question Library skills
 * --------------------------------------------------------------------------*/

let caseLibraryPromise: Promise<typeof import('../../lib/skillQuestionLibrary')> | null = null;

function loadCaseLibrary() {
  caseLibraryPromise ??= import('../../lib/skillQuestionLibrary').catch((error) => {
    caseLibraryPromise = null;
    throw error;
  });
  return caseLibraryPromise;
}

const DIFFICULTY_ORDER: Record<string, number> = { easy: 0, medium: 1, hard: 2, expert: 3 };

function completedLocally(questionId: string): boolean {
  try {
    return Boolean(localStorage.getItem(`casemate-expert-completed:${questionId}`));
  } catch {
    return false;
  }
}

export async function loadCaseDrillSkillProgress(): Promise<Record<string, CaseSkillProgress>> {
  const db = workspaceDb();
  const [library, attempts, trees] = await Promise.all([
    loadCaseLibrary(),
    readRows(() => withColumns(db.from('drill_library_attempts').eq('status', 'completed'), 'id', 'question_id').limit(1000).get()),
    readRows(() => withColumns(db.from('case_structure_trees'), 'id', 'case_id', 'submissions_json').limit(1000).get()),
  ]);
  const completed = new Set<string>();
  attempts.forEach((row) => {
    if (row?.question_id) completed.add(String(row.question_id));
  });
  trees.forEach((row) => {
    const caseId = String(row?.case_id || '').trim();
    if (!caseId || caseId.startsWith('pool-')) return;
    const submissions = parseJsonish(row?.submissions_json);
    if (Array.isArray(submissions) && submissions.length > 0) completed.add(caseId);
  });
  const isDone = (id: string) => completed.has(id) || completedLocally(id);

  const result: Record<string, CaseSkillProgress> = {};
  Object.entries(library.QUESTION_LIBRARY as Record<string, Array<{ id: string; difficulty?: string; reviewStatus?: string }>>).forEach(([skill, questions]) => {
    const active = questions.filter((question) => question.reviewStatus !== 'Archived');
    const next = active
      .map((question, index) => ({ question, index }))
      .filter(({ question }) => !isDone(question.id))
      .sort((a, b) => ((DIFFICULTY_ORDER[a.question.difficulty || ''] ?? 9) - (DIFFICULTY_ORDER[b.question.difficulty || ''] ?? 9)) || a.index - b.index)[0];
    result[skill] = {
      done: active.filter((question) => isDone(question.id)).length,
      total: active.length,
      nextQuestionId: next?.question.id ?? active[0]?.id ?? null,
    };
  });
  return result;
}

/* ----------------------------------------------------------------------------
 * Domain Knowledge — lessons per sub-industry
 * --------------------------------------------------------------------------*/

export interface DomainCatalog {
  /** Published sub-industry ids. */
  ids: string[];
  /** Openable (not under review / in development) lesson identities per sub-industry. */
  lessons: Record<string, string[]>;
}

let domainCatalogPromise: Promise<DomainCatalog> | null = null;

export function loadDomainCatalog(): Promise<DomainCatalog> {
  domainCatalogPromise ??= import('../IndustryKnowledge/App')
    .then((module) => module.loadLearningModeCatalog())
    .then((catalog) => {
      const lessons: Record<string, string[]> = {};
      catalog.subIndustries.forEach((sector) => {
        lessons[sector.id] = sector.lessons.filter((lesson) => !lesson.blocked).map((lesson) => lesson.identity);
      });
      return { ids: catalog.subIndustries.map((sector) => sector.id), lessons };
    })
    .catch((error) => {
      domainCatalogPromise = null;
      throw error;
    });
  return domainCatalogPromise;
}

export function readCompletedLessons(): Set<string> {
  try {
    const parsed = JSON.parse(localStorage.getItem(LESSON_PROGRESS_KEY) || '{}');
    if (!parsed || typeof parsed !== 'object') return new Set();
    return new Set(Object.entries(parsed as Record<string, any>).filter(([, entry]) => Boolean(entry?.completedAt)).map(([identity]) => identity));
  } catch {
    return new Set();
  }
}

export function domainSectorProgress(catalog: DomainCatalog | null, sectorId: string, completed: Set<string>): TopicProgress | null {
  if (!catalog) return null;
  const lessons = catalog.lessons[sectorId] || [];
  return { done: lessons.filter((identity) => completed.has(identity)).length, total: lessons.length };
}

/* ----------------------------------------------------------------------------
 * Deep links
 * --------------------------------------------------------------------------*/

const APTITUDE_ROUTES: Record<string, string> = {
  diagrammatic: 'diagrammatic-reasoning',
  inductive: 'inductive-reasoning',
  deductive: 'deductive-reasoning',
  error_checking: 'error-checking',
  spatial: 'spatial-reasoning',
  numerical: 'numerical-reasoning',
  verbal: 'verbal-reasoning',
  situational: 'situational-judgement',
  logical: 'logical-reasoning',
  critical: 'critical-thinking',
  mechanical: 'mechanical-reasoning',
  in_tray: 'in-tray-e-tray',
};

function openDockApp(appId: string) {
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId } }));
}

export function openRecommendedTopic(topic: RecommendationTopic, options: { nextQuestionId?: string | null } = {}) {
  if (topic.group === 'domain') {
    trackAppSwitch('my-roadmap', 'industry-knowledge', { trigger: 'roadmap_recommendation' });
    writeDomainPendingRoute({ industrySlug: topic.groupId || 'fmcg', subcategoryId: topic.contentId });
    openDockApp('industry-knowledge');
    return;
  }
  if (topic.group === 'aptitude') {
    trackAppSwitch('my-roadmap', 'aptitude-test', { trigger: 'roadmap_recommendation' });
    // The Aptitude Test app and the shell both follow '#aptitude-test/<family route>'.
    const hash = `#aptitude-test/${APTITUDE_ROUTES[topic.contentId] || ''}`.replace(/\/$/, '');
    if (window.location.hash.toLowerCase() === hash) window.dispatchEvent(new HashChangeEvent('hashchange'));
    else window.location.hash = hash;
    return;
  }
  trackAppSwitch('my-roadmap', 'case-drill', { trigger: 'roadmap_recommendation' });
  // Primary path: open Case Drill's Question Library list on the skill's tab.
  if (isLibrarySkill(topic.contentId)) {
    openCaseDrillSkill(topic.contentId);
    return;
  }
  // Fallback for an unknown skill id: open the next unfinished question.
  const openWith = (questionId: string | null | undefined) => {
    if (questionId) {
      try {
        sessionStorage.setItem('casemate-open-case-drill', questionId);
      } catch {
        // Case Drill still opens on its Question Library.
      }
    }
    openDockApp('case-drill');
  };
  if (options.nextQuestionId) {
    openWith(options.nextQuestionId);
    return;
  }
  loadCaseLibrary()
    .then((library) => {
      const questions = ((library.QUESTION_LIBRARY as Record<string, Array<{ id: string; difficulty?: string; reviewStatus?: string }>>)[topic.contentId] || [])
        .filter((question) => question.reviewStatus !== 'Archived');
      const first = questions
        .map((question, index) => ({ question, index }))
        .sort((a, b) => ((DIFFICULTY_ORDER[a.question.difficulty || ''] ?? 9) - (DIFFICULTY_ORDER[b.question.difficulty || ''] ?? 9)) || a.index - b.index)[0];
      openWith(first?.question.id);
    })
    .catch(() => openWith(null));
}

/** Opens a Domain Knowledge study area named by learning-deck slug (plus optional subcategory or pillar). */
export function openKnowledgeAreaRoute(area: KnowledgeRecommendation) {
  trackAppSwitch('my-roadmap', 'industry-knowledge', { trigger: 'roadmap_knowledge_area' });
  writeDomainPendingRoute({ industrySlug: area.industrySlug, subcategoryId: area.subcategoryId, pillar: area.pillar || null });
  openDockApp('industry-knowledge');
}
