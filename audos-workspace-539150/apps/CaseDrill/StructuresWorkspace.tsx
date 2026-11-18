import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  CircleMinus,
  CircleX,
  History,
  Loader2,
  Network,
  Redo2,
  RotateCcw,
  Save,
  Search,
  Send,
  Undo2,
  Unlink,
  X,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import ExhibitRenderer from '../../components/ExhibitRenderer';
import { clarifyUnitText, clarifyUnitsDeep } from '../../lib/unitLabels';
import {
  StructureTreeCanvas,
  childrenOf,
  normalizeOrders,
  useStructureTreeEditing,
  type CrossLink,
  type TreeDraft,
  type TreeNode,
} from '../../components/StructureTree';
import { QUESTION_LIBRARY, type LibraryExhibit, type LibraryQuestion } from '../../lib/skillQuestionLibrary';
import { restoreArchivedHardQuestion } from '../../lib/hardCaseDrillQuestions';
import { DIFFICULTY_LABELS } from '../../lib/caseLibraryShared';
import { displayDifficultyOf } from '../../lib/difficultyTiers';
import {
  suggestedStructureFor,
  type CoverageStatus,
  type SuggestedStructureTree,
  type SuggestedTreeNode,
} from '../../lib/structureSuggestedTrees';
import {
  assessTreeAgainstGuide,
  structureAnswerGuideFor,
  structureGradingBrief,
} from '../../lib/structureFrameworkGuides';
import { structuresEasySuggestedTree } from '../../lib/structuresEasyBank';
import { presentLibraryQuestion, type PresentedQuestion } from '../../lib/learnerContentPresentation';
import CaseResultView from '../../components/CaseResultView';
import { openCasePoolCase, sourceFullCase } from '../../components/SolveFullCaseCta';
import { buildReasoningFeedback, chooseNextAction, emptyWorkedAnswer, resultOutcome, retryAction, type ResultOutcome, type WorkedAnswerModel } from '../../lib/caseResultModel';
import {
  normalizeCriterionScores,
  rubricForExercise,
  type HonestScoreResult,
} from '../../lib/caseScoringRubrics';

const REQUEST_KEY = 'casemate-open-structures-case';
const LEGACY_REQUEST_KEY = 'casemate-open-case-drill';
const TABLE = 'case_structure_trees';

const BASE_STRUCTURE_QUESTIONS = QUESTION_LIBRARY.structures
  .map(restoreArchivedHardQuestion)
  .filter((question) => question.reviewStatus !== 'Archived');

type SaveState = 'editing' | 'saving' | 'saved' | 'error';
type ViewState = 'editing' | 'feedback' | 'compare';

interface FeedbackAction {
  title: string;
  detail: string;
  nodeIds: string[];
}

interface TreeFeedback {
  summary: string;
  strengths: FeedbackAction[];
  improvements: FeedbackAction[];
  priorities: FeedbackAction[];
  coverage: Array<{ branchId: string; status: CoverageStatus }>;
  scoring?: HonestScoreResult;
  /** Four-part feedback. Absent on attempts saved before the framework guides; those fall back to strengths, improvements and priorities. */
  covered?: string[];
  materialGap?: FeedbackAction | null;
  whyItMatters?: string;
  nextAction?: { action: string; why: string } | null;
}

interface Submission {
  id: string;
  submittedAt: string;
  nodes: TreeNode[];
  crossLinks: CrossLink[];
  feedback: TreeFeedback;
}

interface ProgressRow {
  id: number;
  case_id: string;
  draft_json?: TreeDraft | string;
  submissions_json?: Submission[] | string;
}

function uid(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function rowsOf(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

function parseStored<T>(value: T | string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

const UNAVAILABLE_TEXT = 'Text unavailable for this box';

function isTechnicalLabel(value: string): boolean {
  const text = value.trim();
  return /^(?:issue|sub[- ]?issue|node|branch|root|new branch)[-_ #]*[a-z0-9-]*$/i.test(text)
    || /^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(text)
    || /^(?:node|root|branch)-[a-z0-9-]{6,}$/i.test(text);
}

function legacyText(value: any, lookup: Map<string, string>, fallback: string): string {
  const candidates = [value?.text, value?.label, value?.title, value?.name, value?.content, value?.value];
  for (const candidate of candidates) {
    if (typeof candidate !== 'string' && typeof candidate !== 'number') continue;
    const text = String(candidate).trim();
    if (!text) continue;
    const resolved = lookup.get(text) || text;
    if (!isTechnicalLabel(resolved)) return resolved;
  }
  return fallback;
}

function flattenLegacyNodes(value: any): any[] {
  const nodeContainer = value?.nodes ?? value?.tree?.nodes ?? value?.tree;
  const source = Array.isArray(value)
    ? value
    : Array.isArray(nodeContainer)
      ? nodeContainer
      : nodeContainer && typeof nodeContainer === 'object'
        ? Object.entries(nodeContainer).map(([key, node]) => ({ ...(node as any), id: (node as any)?.id ?? key }))
        : value?.root && typeof value.root === 'object'
          ? [value.root]
          : [];
  const flattened: any[] = [];
  const visit = (node: any, parentId: string | null, order: number) => {
    if (!node || typeof node !== 'object') return;
    const id = String(node.id ?? node.nodeId ?? node.key ?? uid('legacy'));
    flattened.push({ ...node, __id: id, __parentId: node.parentId ?? node.parent_id ?? node.parent ?? parentId, __order: node.order ?? node.index ?? order });
    const childContainer = node.children ?? node.branches ?? node.subIssues;
    const children = Array.isArray(childContainer)
      ? childContainer
      : childContainer && typeof childContainer === 'object'
        ? Object.entries(childContainer).map(([key, child]) => ({ ...(child as any), id: (child as any)?.id ?? key }))
        : [];
    children.forEach((child: any, index: number) => visit(child, id, index));
  };
  source.forEach((node: any, index: number) => visit(node, null, index));
  return flattened;
}

function normalizeStoredDraft(value: any, item: LibraryQuestion): TreeDraft {
  const fallback = emptyDraft(item);
  if (typeof value === 'string') {
    try { JSON.parse(value); } catch {
      const lines = value.split('\n').map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim()).filter(Boolean);
      if (lines.length) return {
        nodes: [fallback.nodes[0], ...lines.map((text, index) => ({ id: `legacy-text-${item.id}-${index}`, parentId: fallback.nodes[0].id, text: isTechnicalLabel(text) ? UNAVAILABLE_TEXT : text, order: index }))],
        crossLinks: [],
      };
    }
  }
  const parsed = parseStored<any>(value, fallback);
  const rawNodes = flattenLegacyNodes(parsed);
  if (!rawNodes.length) return fallback;
  const lookup = new Map<string, string>();
  const textDictionaries = [parsed?.nodeTextById, parsed?.node_text_by_id, parsed?.labels, parsed?.texts];
  textDictionaries.forEach((dictionary) => {
    if (!dictionary || typeof dictionary !== 'object') return;
    Object.entries(dictionary).forEach(([id, text]) => {
      if ((typeof text === 'string' || typeof text === 'number') && String(text).trim() && !isTechnicalLabel(String(text))) lookup.set(String(id), String(text).trim());
    });
  });
  rawNodes.forEach((node) => {
    const id = String(node.__id);
    const raw = [node.text, node.label, node.title, node.name, node.content, node.value]
      .find((candidate) => (typeof candidate === 'string' || typeof candidate === 'number') && String(candidate).trim());
    if (raw != null && !isTechnicalLabel(String(raw))) lookup.set(id, String(raw).trim());
  });
  const ids = new Set(rawNodes.map((node) => String(node.__id)));
  let nodes = rawNodes.map((node, index) => {
    const id = String(node.__id);
    const rawParent = node.__parentId && typeof node.__parentId === 'object' ? node.__parentId.id : node.__parentId;
    const parentId = rawParent != null && ids.has(String(rawParent)) ? String(rawParent) : null;
    return {
      id,
      parentId,
      text: legacyText(node, lookup, parentId === null && index === 0 ? item.question : UNAVAILABLE_TEXT),
      order: Number.isFinite(Number(node.__order)) ? Number(node.__order) : index,
    };
  });
  if (!nodes.some((node) => node.parentId === null)) nodes[0] = { ...nodes[0], parentId: null, text: nodes[0].text === UNAVAILABLE_TEXT ? item.question : nodes[0].text };
  const primaryRootIndex = nodes.findIndex((node) => node.parentId === null);
  const primaryRootId = nodes[primaryRootIndex]?.id;
  if (primaryRootIndex >= 0 && nodes[primaryRootIndex].text === UNAVAILABLE_TEXT) nodes[primaryRootIndex] = { ...nodes[primaryRootIndex], text: item.question };
  if (primaryRootId) nodes = nodes.map((node, index) => index !== primaryRootIndex && node.parentId === null ? { ...node, parentId: primaryRootId } : node);
  const crossLinksRaw = Array.isArray(parsed?.crossLinks) ? parsed.crossLinks : Array.isArray(parsed?.links) ? parsed.links : [];
  const crossLinks = crossLinksRaw.map((link: any, index: number) => ({
    id: String(link.id || `legacy-link-${index}`),
    from: String(link.from ?? link.source ?? ''),
    to: String(link.to ?? link.target ?? ''),
    label: typeof link.label === 'string' ? link.label : undefined,
  })).filter((link: CrossLink) => ids.has(link.from) && ids.has(link.to));
  return { nodes: normalizeOrders(nodes), crossLinks };
}

function presentStructureQuestion(item: LibraryQuestion): PresentedQuestion {
  return presentLibraryQuestion(
    { businessContext: item.businessContext, instruction: item.instruction, question: item.question, authoredRoot: structuresEasySuggestedTree(item.id)?.root.text },
    { hasExhibits: questionExhibits(item).length > 0 },
  );
}

/** A new tree starts from a concise root question, never from the whole prompt; the brief above shows the full task. */
function emptyDraft(item: LibraryQuestion): TreeDraft {
  return {
    nodes: [{ id: `root-${item.id}`, parentId: null, text: presentStructureQuestion(item).rootQuestion || item.question, order: 0 }],
    crossLinks: [],
  };
}

function questionExhibits(item: LibraryQuestion): LibraryExhibit[] {
  if (item.exhibits?.length) return item.exhibits;
  return item.exhibit ? [item.exhibit] : [];
}

function linearize(nodes: TreeNode[]): Array<{ node: TreeNode; depth: number }> {
  const result: Array<{ node: TreeNode; depth: number }> = [];
  const root = nodes.find((node) => node.parentId === null) || nodes[0];
  const visit = (node: TreeNode, depth: number) => {
    result.push({ node, depth });
    childrenOf(nodes, node.id).forEach((child) => visit(child, depth + 1));
  };
  if (root) visit(root, 0);
  return result;
}

function treeForPrompt(nodes: TreeNode[]): string {
  return linearize(nodes).map(({ node, depth }) => `${'  '.repeat(depth)}[${node.id}] ${node.text}`).join('\n');
}

function exhibitsForPrompt(item: LibraryQuestion): string {
  return questionExhibits(item).map((exhibit, index) => {
    const rows = exhibit.rows?.map((row) => row.join(' | ')).join('; ') || '';
    const series = exhibit.series?.map((entry) => `${entry.name}: ${entry.values.join(', ')}`).join('; ') || '';
    const labelledValues = exhibit.labels?.map((label, valueIndex) => `${label}=${exhibit.values?.[valueIndex] ?? '-'}`).join('; ') || '';
    return `Exhibit ${index + 1}: ${exhibit.title}. ${rows || series || labelledValues || exhibit.subtitle || ''}`;
  }).join('\n') || 'No exhibit for this drill.';
}

function humanizeFeedbackText(value: unknown, nodes: TreeNode[]): string {
  let text = String(value || '').trim();
  const ordered = [...nodes].sort((a, b) => b.id.length - a.id.length);
  ordered.forEach((node) => {
    const replacement = node.text?.trim() && !isTechnicalLabel(node.text) ? `“${node.text.trim()}”` : UNAVAILABLE_TEXT;
    text = text.split(`[${node.id}]`).join(replacement).split(node.id).join(replacement);
  });
  return text
    .replace(/\b(?:Issue|Sub-Issue)\s*#?\d+\b/gi, UNAVAILABLE_TEXT)
    .replace(/\b(?:node|branch|root)-[a-z0-9-]{6,}\b/gi, UNAVAILABLE_TEXT)
    .replace(/\b[0-9a-f]{8}-[0-9a-f-]{27,}\b/gi, UNAVAILABLE_TEXT);
}

function cleanAction(value: any, validIds: Set<string>, nodes: TreeNode[]): FeedbackAction | null {
  if (!value || typeof value !== 'object') return null;
  const title = humanizeFeedbackText(value.title, nodes);
  const detail = humanizeFeedbackText(value.detail, nodes);
  if (!title || !detail) return null;
  const nodeIds = Array.isArray(value.nodeIds)
    ? value.nodeIds.map(String).filter((id: string) => validIds.has(id)).slice(0, 6)
    : [];
  return { title, detail, nodeIds };
}

const FEEDBACK_STOP_WORDS = new Set([
  'about', 'after', 'also', 'before', 'branch', 'candidate', 'clear', 'first', 'from', 'into', 'next', 'only', 'should', 'that', 'their', 'then', 'this', 'tree', 'with', 'would',
]);

function feedbackTokens(value: string): Set<string> {
  const aliases: Record<string, string> = {
    break: 'decompose', causes: 'cause', choosing: 'prioritize', choose: 'prioritize', costs: 'cost', customers: 'customer', drivers: 'driver', expand: 'decompose', identify: 'measure', improvements: 'improve', locate: 'measure', margins: 'margin', order: 'prioritize', prices: 'price', pricing: 'price', profits: 'profit', quantify: 'measure', revenues: 'revenue', sales: 'sale', sequence: 'prioritize', split: 'decompose', stores: 'store', volumes: 'volume',
  };
  return new Set(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .map((word) => aliases[word] || word)
    .filter((word) => word.length > 2 && !FEEDBACK_STOP_WORDS.has(word)));
}

function tokenOverlap(leftText: string, rightText: string): boolean {
  const left = feedbackTokens(leftText);
  const right = feedbackTokens(rightText);
  if (!left.size || !right.size) return false;
  const overlap = [...left].filter((word) => right.has(word)).length;
  const containment = overlap / Math.min(left.size, right.size);
  const union = new Set([...left, ...right]).size;
  return (Math.min(left.size, right.size) >= 3 && containment >= 0.55) || overlap / union >= 0.5;
}

function isNearDuplicate(candidate: string, prior: string): boolean {
  const candidateParts = [candidate, ...candidate.split(/[.!?;:\n]+/).map((part) => part.trim()).filter(Boolean)];
  const priorParts = [prior, ...prior.split(/[.!?;:\n]+/).map((part) => part.trim()).filter(Boolean)];
  return candidateParts.some((left) => priorParts.some((right) => tokenOverlap(left, right)));
}

function actionText(action: FeedbackAction): string {
  return `${action.title}. ${action.detail}`;
}

function cleanDistinctActions(raw: any, ids: Set<string>, nodes: TreeNode[], blocked: string[]): FeedbackAction[] {
  const result: FeedbackAction[] = [];
  if (!Array.isArray(raw)) return result;
  raw.forEach((item) => {
    const action = cleanAction(item, ids, nodes);
    if (!action || result.length >= 5) return;
    const text = actionText(action);
    if ([...blocked, ...result.map(actionText)].some((prior) => isNearDuplicate(text, prior))) return;
    result.push(action);
  });
  return result;
}

function cleanFeedback(value: any, nodes: TreeNode[], suggested: SuggestedStructureTree): TreeFeedback {
  const ids = new Set(nodes.map((node) => node.id));
  const suggestedIds = new Set(suggested.branches.map((branch) => branch.id));
  const fixedRoleText = [suggested.investigateFirst, ...suggested.explanations.map((item) => `${item.title} ${item.explanation}`)];
  const strengths = cleanDistinctActions(value?.strengths, ids, nodes, fixedRoleText);
  const improvements = cleanDistinctActions(value?.improvements, ids, nodes, [...fixedRoleText, ...strengths.map(actionText)]);
  const priorities = cleanDistinctActions(value?.priorities, ids, nodes, [...fixedRoleText, ...strengths.map(actionText), ...improvements.map(actionText)]);
  const coverage = Array.isArray(value?.coverage) ? value.coverage.map((item: any) => ({
    branchId: String(item?.branchId || ''),
    status: String(item?.status || '').toLowerCase() as CoverageStatus,
  })).filter((item: { branchId: string; status: CoverageStatus }) => suggestedIds.has(item.branchId) && ['covered', 'partial', 'missed'].includes(item.status)) : [];
  const coveredRaw = Array.isArray(value?.covered) ? value.covered : [];
  const covered = coveredRaw
    .map((entry: any) => humanizeFeedbackText(typeof entry === 'string' ? entry : entry?.detail || entry?.title, nodes))
    .filter((entry: string) => entry && entry !== UNAVAILABLE_TEXT)
    .slice(0, 4);
  const materialGap = cleanAction(value?.material_gap ?? value?.materialGap, ids, nodes);
  const whyItMatters = humanizeFeedbackText(value?.why_it_matters ?? value?.whyItMatters ?? '', nodes);
  const nextRaw = value?.next_step ?? value?.nextAction;
  const nextAction = nextRaw && typeof nextRaw === 'object' && String(nextRaw.action || '').trim()
    ? { action: humanizeFeedbackText(nextRaw.action, nodes), why: humanizeFeedbackText(nextRaw.why || '', nodes) }
    : null;
  return {
    summary: humanizeFeedbackText(value?.summary || 'Review the highlighted branches, then revise the tree and submit another version.', nodes),
    strengths,
    improvements,
    priorities,
    coverage,
    ...(value?.scoring ? { scoring: value.scoring as HonestScoreResult } : {}),
    ...(covered.length ? { covered } : {}),
    ...(materialGap ? { materialGap } : {}),
    ...(whyItMatters ? { whyItMatters } : {}),
    ...(nextAction ? { nextAction } : {}),
  };
}

function normalizeSubmission(value: any, item: LibraryQuestion, suggested: SuggestedStructureTree): Submission | null {
  if (!value || typeof value !== 'object') return null;
  const legacyTree = value.nodes ?? value.tree ?? value.answer;
  const normalized = normalizeStoredDraft(typeof legacyTree === 'string'
    ? legacyTree
    : { ...value, nodes: legacyTree, crossLinks: value.crossLinks ?? value.links }, item);
  return {
    id: String(value.id || uid('legacy-submission')),
    submittedAt: String(value.submittedAt || value.submitted_at || new Date().toISOString()),
    nodes: normalized.nodes,
    crossLinks: normalized.crossLinks,
    feedback: cleanFeedback(value.feedback || {}, normalized.nodes, suggested),
  };
}

function tokens(value: string): Set<string> {
  const aliases: Record<string, string> = { customers: 'customer', clients: 'customer', costs: 'cost', pricing: 'price', prices: 'price', revenues: 'revenue', competitors: 'competition', competitive: 'competition', capabilities: 'capability', economics: 'economic', profitability: 'profit', margins: 'margin', operational: 'operation', operations: 'operation', risks: 'risk' };
  return new Set(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/[^a-z0-9]+/).filter((word) => word.length > 2).map((word) => aliases[word] || word));
}

function heuristicCoverage(branch: SuggestedTreeNode, nodes: TreeNode[]): CoverageStatus {
  const userNodes = nodes.filter((node) => node.parentId !== null && node.text !== UNAVAILABLE_TEXT && !isTechnicalLabel(node.text));
  if (!userNodes.length) return 'missed';
  const expected = tokens([branch.text, ...(branch.children || []).map((child) => child.text)].join(' '));
  let best = 0;
  userNodes.forEach((node) => {
    const actual = tokens(node.text);
    const overlap = [...expected].filter((word) => actual.has(word)).length;
    best = Math.max(best, overlap / Math.max(2, Math.min(expected.size, actual.size)));
  });
  return best >= 0.55 ? 'covered' : best >= 0.2 ? 'partial' : 'missed';
}

function coverageFor(feedback: TreeFeedback, suggested: SuggestedStructureTree, nodes: TreeNode[], guideCoverage?: Map<string, CoverageStatus>): Map<string, CoverageStatus> {
  const hasCandidateBranches = nodes.some((node) => node.parentId !== null && node.text !== UNAVAILABLE_TEXT && !isTechnicalLabel(node.text));
  if (!hasCandidateBranches) return new Map<string, CoverageStatus>(suggested.branches.map((branch) => [branch.id, 'missed']));
  const returned = new Map<string, CoverageStatus>(feedback.coverage.map((item) => [item.branchId, item.status]));
  return new Map<string, CoverageStatus>(suggested.branches.map((branch) => [branch.id, returned.get(branch.id) || guideCoverage?.get(branch.id) || heuristicCoverage(branch, nodes)]));
}

function fourPartFeedback(feedback: TreeFeedback): { covered: string[]; gap: FeedbackAction | null; why: string; next: { action: string; why: string } | null } {
  const covered = feedback.covered?.length
    ? feedback.covered
    : feedback.strengths.slice(0, 3).map((item) => `${item.title}: ${item.detail}`);
  const gap = feedback.materialGap || feedback.improvements[0] || null;
  const legacyPriority = feedback.priorities[0] ? { action: feedback.priorities[0].title, why: feedback.priorities[0].detail } : null;
  const next = feedback.nextAction || feedback.scoring?.nextStep || legacyPriority;
  return { covered, gap, why: feedback.whyItMatters || '', next };
}

function FourPartFeedbackPanel({ feedback, onHighlight }: { feedback: TreeFeedback; onHighlight: (ids: string[]) => void }) {
  const parts = fourPartFeedback(feedback);
  return (
    <section className="mt-4 grid gap-3 sm:grid-cols-2" data-testid="structures-feedback-four-part">
      <div className="rounded-xl bg-[var(--space-surface-muted)] p-3" data-testid="structures-feedback-covered">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-semantic-success)]">1 · What you covered</p>
        {parts.covered.length ? (
          <ul className="mt-2 space-y-1.5">
            {parts.covered.map((entry, index) => <li key={`${index}-${entry.slice(0, 24)}`} className="rounded-lg bg-[var(--space-surface-card)] p-2.5 text-[11px] leading-5 text-[var(--space-text-secondary)]">{entry}</li>)}
          </ul>
        ) : <p className="mt-2 text-[11px] leading-5 text-[var(--space-text-muted)]">No material driver was clearly covered in this version.</p>}
      </div>
      <div className="rounded-xl bg-[var(--space-surface-muted)] p-3" data-testid="structures-feedback-gap">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-semantic-warning)]">2 · Most material gap</p>
        {parts.gap ? (
          <button type="button" onClick={() => onHighlight(parts.gap?.nodeIds || [])} className="mt-2 block w-full rounded-lg bg-[var(--space-surface-card)] p-2.5 text-left">
            <span className="block text-xs font-bold text-[var(--space-text-primary)]">{parts.gap.title}</span>
            <span className="mt-1 block text-[11px] leading-5 text-[var(--space-text-secondary)]">{parts.gap.detail}</span>
            {parts.gap.nodeIds.length ? <span className="mt-1 block text-[9px] font-bold text-[var(--space-text-brand)]">Highlight {parts.gap.nodeIds.length} node{parts.gap.nodeIds.length === 1 ? '' : 's'}</span> : null}
          </button>
        ) : <p className="mt-2 text-[11px] leading-5 text-[var(--space-text-muted)]">No material gap was found. The tree covers the drivers this case needs.</p>}
      </div>
      {parts.why ? (
        <div className="rounded-xl bg-[var(--space-surface-muted)] p-3" data-testid="structures-feedback-why">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">3 · Why it matters</p>
          <p className="mt-2 text-[11px] leading-5 text-[var(--space-text-secondary)]">{parts.why}</p>
        </div>
      ) : null}
      {parts.next ? (
        <div className={`rounded-xl border-l-4 border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] p-3 ${parts.why ? '' : 'sm:col-span-2'}`} data-testid="structures-feedback-next-step">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">4 · Next step</p>
          <p className="mt-2 text-xs font-bold leading-5 text-[var(--space-text-primary)]">{parts.next.action}</p>
          {parts.next.why ? <p className="mt-1 text-[11px] leading-5 text-[var(--space-text-secondary)]">{parts.next.why}</p> : null}
        </div>
      ) : null}
    </section>
  );
}

/** Legacy submissions saved before scoring existed: the outcome follows branch coverage, the only verdict they carry. */
function coverageOutcome(coverage: Map<string, CoverageStatus>): ResultOutcome {
  const statuses = [...coverage.values()];
  if (!statuses.length) return 'partial';
  const ratio = statuses.reduce((sum, status) => sum + (status === 'covered' ? 1 : status === 'partial' ? 0.5 : 0), 0) / statuses.length;
  return ratio >= 0.8 ? 'correct' : ratio >= 0.4 ? 'partial' : 'incorrect';
}

/** The recommended tree the grader compared against, presented as one strong example. */
function structureWorkedAnswer(item: LibraryQuestion, tree: SuggestedStructureTree): WorkedAnswerModel {
  return {
    ...emptyWorkedAnswer('example'),
    approach: tree.explanations.map((entry) => `${entry.title}: ${entry.explanation}`),
    conclusion: tree.investigateFirst ? `Investigate first: ${tree.investigateFirst}` : '',
    checks: questionExhibits(item)
      .map((exhibit, index) => (exhibit.structureEvidence ? `Exhibit ${index + 1} · ${exhibit.title}: ${exhibit.structureEvidence}` : ''))
      .filter(Boolean),
    note: 'The recommended tree is one strong approach, not the only valid answer. A different tree that reaches the material drivers with sound, non-overlapping logic earns full credit.',
  };
}

function CoverageMark({ status }: { status: CoverageStatus }) {
  const spec = status === 'covered'
    ? { label: 'Covered', Icon: CheckCircle2, className: 'text-[var(--space-semantic-success)]' }
    : status === 'partial'
      ? { label: 'Partially covered', Icon: CircleMinus, className: 'text-[var(--space-semantic-warning)]' }
      : { label: 'Missed', Icon: CircleX, className: 'text-[var(--space-semantic-danger)]' };
  return <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${spec.className}`}><spec.Icon className="h-3.5 w-3.5" /> {spec.label}</span>;
}

const TREE_COLUMN_GAP = 16;
const TREE_STEM = 32;
const TREE_MIN_COLUMN = 232;
const TREE_MAX_COLUMN = 340;

function SuggestedTreePanel({ tree, coverage }: { tree: SuggestedStructureTree; coverage: Map<string, CoverageStatus> }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [hostWidth, setHostWidth] = useState(0);
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const update = () => setHostWidth(host.clientWidth);
    update();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    observer?.observe(host);
    window.addEventListener('resize', update);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);
  const count = tree.branches.length;
  const fitting = hostWidth > 0 ? Math.floor((hostWidth + TREE_COLUMN_GAP) / (TREE_MIN_COLUMN + TREE_COLUMN_GAP)) : 1;
  const rowCount = Math.max(1, Math.ceil(count / Math.max(1, Math.min(count, fitting))));
  const columns = Math.max(1, Math.ceil(count / rowCount));
  const rows: SuggestedTreeNode[][] = [];
  for (let index = 0; index < count; index += columns) rows.push(tree.branches.slice(index, index + columns));
  const columnWidth = `min(${TREE_MAX_COLUMN}px, calc((100% - ${(columns - 1) * TREE_COLUMN_GAP}px) / ${columns}))`;
  const line = 'var(--space-brand-primary)';
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-[var(--space-surface-page)] p-3 sm:p-4" data-testid="structures-suggested-tree">
      <div ref={hostRef} className="mx-auto w-full">
        <div className="mx-auto flex min-h-28 w-full max-w-[640px] items-center justify-center whitespace-pre-wrap break-words rounded-xl border-2 border-[var(--space-brand-primary)] bg-white p-4 text-center text-sm font-bold leading-6 text-[var(--space-text-primary)] [overflow-wrap:anywhere]">{clarifyUnitText(tree.root.text)}</div>
        <div>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative flex justify-center" style={{ columnGap: TREE_COLUMN_GAP, paddingTop: TREE_STEM }}>
              <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 z-0 w-0.5 -translate-x-1/2" style={{ height: rowIndex === rows.length - 1 ? TREE_STEM / 2 : '100%', background: line }} />
              {row.map((branch, index) => (
                <section key={branch.id} className="relative z-10 min-w-0 shrink-0 grow-0" style={{ width: columnWidth }}>
                  <span aria-hidden="true" className="pointer-events-none absolute left-1/2 w-0.5 -translate-x-1/2" style={{ top: -TREE_STEM / 2, height: TREE_STEM / 2, background: line }} />
                  {row.length > 1 ? <span aria-hidden="true" className="pointer-events-none absolute h-0.5" style={{ top: -TREE_STEM / 2 - 1, left: index === 0 ? '50%' : -TREE_COLUMN_GAP / 2, right: index === row.length - 1 ? '50%' : -TREE_COLUMN_GAP / 2, background: line }} /> : null}
                  <div className="min-h-24 whitespace-pre-wrap break-words rounded-xl border-2 border-[var(--space-brand-primary)] bg-white p-3 text-center text-xs font-bold leading-5 text-[var(--space-text-primary)] [overflow-wrap:anywhere]">
                    {clarifyUnitText(branch.text)}
                    <span className="mt-2 block"><CoverageMark status={coverage.get(branch.id) || 'missed'} /></span>
                  </div>
                  <div className="mx-auto h-3 w-px bg-[var(--space-brand-primary)]" />
                  <div className="space-y-2">
                    {(branch.children || []).map((child) => (
                      <div key={child.id} className="min-h-28 whitespace-pre-wrap break-words rounded-xl border-2 border-[var(--space-brand-primary)] bg-white p-3 text-xs leading-5 text-[var(--space-text-primary)] [overflow-wrap:anywhere]">
                        <p className="font-semibold">{clarifyUnitText(child.text)}</p>
                        {child.test ? <p className="mt-2 border-t border-[var(--space-border-default)] pt-2 text-[10px] leading-4 text-[var(--space-text-muted)]"><span className="font-bold text-[var(--space-text-brand)]">To test this, look at:</span> {clarifyUnitText(child.test)}</p> : null}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function parseAiJson(text: string): any {
  const trimmed = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Mate returned feedback in an unreadable format. Your tree is unchanged; please resubmit.');
  return JSON.parse(trimmed.slice(start, end + 1));
}

function scoreableTreeText(nodes: TreeNode[]): string {
  return nodes
    .filter((node) => node.parentId !== null && node.text !== UNAVAILABLE_TEXT && !isTechnicalLabel(node.text))
    .map((node) => node.text.trim())
    .filter(Boolean)
    .join('\n');
}

function DraftVersionCard({ draft }: { draft: TreeDraft }) {
  return (
    <section className="min-w-0 rounded-2xl border-2 border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold text-[var(--space-text-primary)]">Current revised tree</p>
        <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[9px] font-bold text-[var(--space-text-brand)]">Editable</span>
      </div>
      <ol className="mt-3 space-y-1.5">
        {linearize(draft.nodes).map(({ node, depth }) => (
          <li key={node.id} className="rounded-lg bg-[var(--space-surface-muted)] px-2 py-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]" style={{ marginLeft: `${Math.min(depth, 5) * 12}px` }}>
            {node.text}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs leading-5 text-[var(--space-text-brand)]">Keep editing this version, then resubmit to preserve the next checkpoint.</p>
    </section>
  );
}

function VersionCard({ submission, label }: { submission: Submission; label: string }) {
  return (
    <section className="min-w-0 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold text-[var(--space-text-primary)]">{label}</p>
        <span className="text-[10px] text-[var(--space-text-muted)]">{new Date(submission.submittedAt).toLocaleString()}</span>
      </div>
      <ol className="mt-3 space-y-1.5">
        {linearize(submission.nodes).map(({ node, depth }) => (
          <li key={node.id} className="rounded-lg bg-[var(--space-surface-muted)] px-2 py-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]" style={{ marginLeft: `${Math.min(depth, 5) * 12}px` }}>
            {node.text}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs leading-5 text-[var(--space-text-secondary)]">{clarifyUnitText(submission.feedback.summary)}</p>
    </section>
  );
}

export default function StructuresWorkspace({ initialCaseId, caseOverride, suggestedTreeOverride = null, briefOverride = null, onSubmitted, onBackToLibrary, hideEvidenceColumn = false, onCaseSelected, onGraded, onGradeError }: { initialCaseId?: string; caseOverride?: LibraryQuestion; suggestedTreeOverride?: SuggestedStructureTree | null; /** Host-case brief shown instead of the drill's own, so an embedded workspace is the only place the case and task appear. */ briefOverride?: Pick<PresentedQuestion, 'context' | 'keyTerms' | 'exhibitGuide' | 'guidance' | 'task'> & { instruction?: string; exhibits?: LibraryExhibit[] } | null; onSubmitted?: () => void; onBackToLibrary?: () => void; hideEvidenceColumn?: boolean; onCaseSelected?: (item: LibraryQuestion) => void; onGraded?: (caseId: string, scoring?: HonestScoreResult) => void; onGradeError?: (error: unknown) => void }) {
  const { sessionId } = useSpaceRuntime();
  const availableCases = useMemo(() => caseOverride
    ? [caseOverride, ...BASE_STRUCTURE_QUESTIONS.filter((item) => item.id !== caseOverride.id)]
    : BASE_STRUCTURE_QUESTIONS, [caseOverride]);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(() => {
    try {
      const direct = sessionStorage.getItem(REQUEST_KEY);
      const legacy = sessionStorage.getItem(LEGACY_REQUEST_KEY);
      const requested = availableCases.some((item) => item.id === initialCaseId)
        ? initialCaseId
        : availableCases.some((item) => item.id === direct) ? direct : legacy;
      return availableCases.some((item) => item.id === requested) ? String(requested) : availableCases[0]?.id || '';
    } catch {
      return availableCases[0]?.id || '';
    }
  });
  const [showLibrary, setShowLibrary] = useState(false);
  const [briefOpen, setBriefOpen] = useState(true);
  const [draft, setDraft] = useState<TreeDraft>(() => emptyDraft(availableCases.find((item) => item.id === selectedId) || availableCases[0]));
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [undoStack, setUndoStack] = useState<TreeDraft[]>([]);
  const [redoStack, setRedoStack] = useState<TreeDraft[]>([]);
  const [saveState, setSaveState] = useState<SaveState>('editing');
  const [viewState, setViewState] = useState<ViewState>('editing');
  const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const rowIdRef = useRef<number | null>(null);
  const editedSinceLoadRef = useRef(false);
  const feedbackRef = useRef<HTMLElement>(null);
  const revealFeedbackRef = useRef(false);

  const activeCase = useMemo(() => availableCases.find((item) => item.id === selectedId) || availableCases[0], [availableCases, selectedId]);
  const hostExhibits = caseOverride && activeCase?.id === caseOverride.id && briefOverride?.exhibits?.length ? briefOverride.exhibits : null;
  const shownExhibits = useMemo(() => clarifyUnitsDeep(hostExhibits || questionExhibits(activeCase)), [activeCase, hostExhibits]);
  // "Use in your issue tree" notes name the branches the model tree expects, so they appear only once a tree has been submitted.
  const exhibitsBeforeSubmission = useMemo(() => shownExhibits.map(({ structureRole: _branchHint, ...exhibit }) => exhibit), [shownExhibits]);
  const embedded = Boolean(caseOverride && activeCase?.id === caseOverride.id);
  const presentedCase = useMemo(() => presentStructureQuestion(activeCase), [activeCase]);
  const brief = embedded && briefOverride ? { ...presentedCase, instruction: '', ...briefOverride } : presentedCase;
  // Trees saved before concise roots started from the whole prompt; they display the concise root and keep their stored text.
  const formatRootText = (text: string) => (text === activeCase.question ? clarifyUnitText(presentedCase.rootQuestion || text) : text);
  // Only authored content may be shown as the strong example tree: the host case's published
  // issue tree, a mapped framework guide, or an authored Easy tree. Never the archetype template.
  const treeOverride = caseOverride && suggestedTreeOverride && activeCase?.id === caseOverride.id ? suggestedTreeOverride : null;
  const guide = useMemo(() => (treeOverride ? null : structureAnswerGuideFor(activeCase)), [activeCase, treeOverride]);
  const treeVerified = Boolean(treeOverride || guide || structuresEasySuggestedTree(activeCase.id));
  const suggestedTree = useMemo(() => treeOverride || suggestedStructureFor(activeCase), [activeCase, treeOverride]);
  const latest = submissions[submissions.length - 1] || null;
  const guideCoverage = useMemo(() => {
    if (!guide || !latest) return undefined;
    const assessment = assessTreeAgainstGuide(activeCase, guide, scoreableTreeText(latest.nodes));
    return new Map<string, CoverageStatus>(assessment.branchCoverage.map((item) => [item.branchId, item.status]));
  }, [activeCase, guide, latest]);
  useEffect(() => {
    if (initialCaseId && availableCases.some((item) => item.id === initialCaseId)) {
      setSelectedId(initialCaseId);
      setShowLibrary(false);
    }
  }, [availableCases, initialCaseId]);

  const filteredCases = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return availableCases;
    return availableCases.filter((item) => `${item.id} ${item.title} ${item.question} ${item.businessContext || ''}`.toLowerCase().includes(needle));
  }, [availableCases, query]);

  useEffect(() => {
    const consume = () => {
      try {
        const direct = sessionStorage.getItem(REQUEST_KEY);
        const legacy = sessionStorage.getItem(LEGACY_REQUEST_KEY);
        if (direct && !availableCases.some((item) => item.id === direct)) sessionStorage.removeItem(REQUEST_KEY);
        const requested = availableCases.some((item) => item.id === direct) ? direct : legacy;
        if (requested && availableCases.some((item) => item.id === requested)) {
          sessionStorage.removeItem(REQUEST_KEY);
          sessionStorage.removeItem(LEGACY_REQUEST_KEY);
          setSelectedId(requested);
          setShowLibrary(false);
        }
      } catch { /* storage unavailable */ }
    };
    consume();
    const onOpen = (event: Event) => {
      if ((event as CustomEvent).detail?.appId === 'case-drill') consume();
    };
    window.addEventListener('openApp', onOpen);
    return () => window.removeEventListener('openApp', onOpen);
  }, [availableCases]);

  useEffect(() => {
    if (!activeCase) return;
    let cancelled = false;
    setHydrated(false);
    setUndoStack([]);
    setRedoStack([]);
    setViewState('editing');
    setHighlightIds(new Set());
    setSelectedNodeId(null);
    setError('');
    rowIdRef.current = null;
    editedSinceLoadRef.current = false;
    const fallback = emptyDraft(activeCase);
    const storageKey = `casemate-structures-v2:${sessionId || 'preview'}:${activeCase.id}`;
    try {
      const local = JSON.parse(localStorage.getItem(storageKey) || 'null');
      setDraft(local?.draft ? normalizeStoredDraft(local.draft, activeCase) : fallback);
      const localSubmissions = Array.isArray(local?.submissions)
        ? local.submissions.map((submission: any) => normalizeSubmission(submission, activeCase, suggestedTree)).filter(Boolean) as Submission[]
        : [];
      setSubmissions(localSubmissions);
      if (localSubmissions.length) setViewState('feedback');
    } catch {
      setDraft(fallback);
      setSubmissions([]);
    }
    const load = async () => {
      if (!sessionId) { setHydrated(true); return; }
      try {
        const db = (window as any).__workspaceDb;
        if (!db?.from) throw new Error('Workspace database unavailable');
        const response = await db.from(TABLE).eq('case_id', activeCase.id).limit(1).get();
        const row = rowsOf(response)[0] as ProgressRow | undefined;
        if (!cancelled && row) {
          rowIdRef.current = Number(row.id);
          const remoteDraft = parseStored<any>(row.draft_json, fallback);
          const remoteSubmissions = parseStored<any[]>(row.submissions_json, []);
          setDraft(normalizeStoredDraft(remoteDraft, activeCase));
          const savedSubmissions = Array.isArray(remoteSubmissions)
            ? remoteSubmissions.map((submission) => normalizeSubmission(submission, activeCase, suggestedTree)).filter(Boolean) as Submission[]
            : [];
          setSubmissions(savedSubmissions);
          if (!editedSinceLoadRef.current) setViewState(savedSubmissions.length ? 'feedback' : 'editing');
        }
      } catch (loadError) {
        console.warn('[Structures] remote resume failed', loadError);
      } finally {
        if (!cancelled) setHydrated(true);
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [activeCase?.id, sessionId, suggestedTree]);

  useEffect(() => {
    if (!hydrated || !activeCase) return;
    const storageKey = `casemate-structures-v2:${sessionId || 'preview'}:${activeCase.id}`;
    try { localStorage.setItem(storageKey, JSON.stringify({ draft, submissions })); } catch { /* best effort */ }
    setSaveState(sessionId ? 'saving' : 'saved');
    const timer = window.setTimeout(async () => {
      if (!sessionId) { setSaveState('saved'); return; }
      try {
        const db = (window as any).__workspaceDb;
        const payload = { case_id: activeCase.id, draft_json: draft, submissions_json: submissions };
        if (rowIdRef.current) {
          await db.from(TABLE).update(rowIdRef.current, payload);
        } else {
          const existing = await db.from(TABLE).eq('case_id', activeCase.id).limit(1).get();
          const row = rowsOf(existing)[0];
          if (row?.id) {
            rowIdRef.current = Number(row.id);
            await db.from(TABLE).update(row.id, payload);
          } else {
            await db.from(TABLE).insert(payload);
            const created = await db.from(TABLE).eq('case_id', activeCase.id).limit(1).get();
            rowIdRef.current = Number(rowsOf(created)[0]?.id) || null;
          }
        }
        setSaveState('saved');
      } catch (saveError) {
        console.warn('[Structures] autosave failed', saveError);
        setSaveState('error');
      }
    }, 700);
    return () => window.clearTimeout(timer);
  }, [draft, submissions, hydrated, activeCase?.id, sessionId]);

  const commit = useCallback((next: TreeDraft) => {
    editedSinceLoadRef.current = true;
    setUndoStack((stack) => [...stack.slice(-49), draft]);
    setRedoStack([]);
    setDraft({ nodes: normalizeOrders(next.nodes), crossLinks: next.crossLinks });
    setViewState('editing');
    setHighlightIds(new Set());
    setSaveState('editing');
  }, [draft]);

  const undo = useCallback(() => {
    const previous = undoStack[undoStack.length - 1];
    if (!previous) return;
    setUndoStack((stack) => stack.slice(0, -1));
    setRedoStack((stack) => [...stack, draft]);
    setDraft(previous);
    setViewState('editing');
  }, [draft, undoStack]);

  const redo = useCallback(() => {
    const next = redoStack[redoStack.length - 1];
    if (!next) return;
    setRedoStack((stack) => stack.slice(0, -1));
    setUndoStack((stack) => [...stack, draft]);
    setDraft(next);
    setViewState('editing');
  }, [draft, redoStack]);

  const treeEditor = useStructureTreeEditing({ draft, commit, undo, redo });
  const { setSelectedNodeId, commitDraft } = treeEditor;

  const requestFeedback = async (): Promise<TreeFeedback> => {
    const token = (window as any).__workspaceDb?.token;
    const structureRubric = rubricForExercise('structures');
    const assessment = guide ? assessTreeAgainstGuide(activeCase, guide, scoreableTreeText(draft.nodes)) : null;
    const gradingBrief = [
      structureGradingBrief(activeCase, guide),
      assessment
        ? `KEYWORD HINTS (advisory only; they can miss synonyms and alternative structures, so judge meaning yourself):\nDrivers detected: ${assessment.matchedDrivers.join('; ') || 'none'}\nDrivers not detected: ${assessment.missedDrivers.join('; ') || 'none'}`
        : '',
    ].filter(Boolean).join('\n\n');
    const suggestedSection = treeVerified
      ? [
          `SUGGESTED FIRST-LEVEL BRANCHES (compare semantically${treeOverride ? '; taken from this case\'s published model answer' : ''}):\n${suggestedTree.branches.map((branch) => `[${branch.id}] ${branch.text}: ${(branch.children || []).map((child) => child.text).join(' | ')}`).join('\n')}`,
          suggestedTree.explanations.length ? `FIXED LOGIC COPY FOR WHY THIS BREAKDOWN WORKS (do not turn this into advice or repeat it elsewhere):\n${suggestedTree.explanations.map((item) => `${item.title}: ${item.explanation}`).join('\n')}` : '',
          suggestedTree.investigateFirst ? `FIXED ANALYSIS ORDER FOR INVESTIGATE FIRST (do not repeat or paraphrase this in improvements or priorities):\n${suggestedTree.investigateFirst}` : '',
        ].filter(Boolean).join('\n\n')
      : 'NO AUTHORED MODEL STRUCTURE: this question has no verified suggested tree. Judge the candidate tree only against the case facts, the central question and the marking contract, and return "coverage": [].';
    if (!token) throw new Error('Sign in so Mate can assess and save this submission.');
    const response = await fetch('/proxy/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': token },
      body: JSON.stringify({
        model: 'gpt-6.1-sol',
        reasoning_effort: 'medium',
        max_completion_tokens: 6000,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'You are Mate, a rigorous consulting case grader. Assess the candidate issue tree on its own merits for this specific case. Accept different wording and multiple coherent structures; the suggested tree is one strong approach, not a mandatory framework. Use the full 0-10 range. Irrelevant, unsupported, fundamentally misunderstood, or mostly empty work must receive 0-2 where warranted. Length and confident wording are not evidence. Internal node IDs may appear in the input, but NEVER include an ID, code, JSON, numeric reference, or placeholder label in any visible text. Refer to a candidate box by quoting its exact human-readable text. Put internal candidate IDs only in nodeIds. Compare first-level ideas semantically, not by exact wording. Follow the MARKING CONTRACT and CASE-SPECIFIC ANSWER GUIDE in the user message. The framework is a guide, not an answer key: give full credit to an alternative issue tree that reaches the material drivers with sound, non-overlapping logic, whatever its labels, depth or branch order. Never penalise a missing branch unless it could change the decision in this case. Never invent case facts, and do not require a final recommendation when the question only asks for a structure. If the guide says no framework fits, judge the tree on its own logic. The visible feedback has four parts that must not repeat each other: covered (what the candidate genuinely covered, quoting their words), material_gap (the single most material missing or weakest driver), why_it_matters (how that gap could change the answer in this case), and next_step (one concrete action specific to this case, naming the data cut, exhibit or analysis to add, never generic framework text). The supplied Why this breakdown works copy is logic only, and Investigate first is analysis order only; never repeat them. For every rubric criterion return: key, score (0-10), evidence (a short quote or faithful paraphrase of what the candidate actually wrote), reason, and stronger_answer. If no meaningful strength exists, say so plainly and respectfully. Do not invent evidence or exhibit numbers. Write all user-facing feedback in English and do not use long em dashes. Return JSON only.',
          },
          {
            role: 'user',
            content: `STRUCTURES DRILL ID: ${activeCase.id}\nTITLE: ${activeCase.title}\nCASE CONTEXT: ${activeCase.businessContext || activeCase.instruction || activeCase.title}\nCENTRAL QUESTION: ${activeCase.question}\nEXHIBITS AND NUMBERS:\n${exhibitsForPrompt(activeCase)}\n\nSHARED RUBRIC (weights sum to 100):\n${JSON.stringify(structureRubric)}\n\nCANDIDATE TREE:\n${treeForPrompt(draft.nodes)}\n\n${suggestedSection}\n\n${gradingBrief}\n\nCROSS-BRANCH RELATIONSHIPS:\n${draft.crossLinks.map((link) => `${link.from} <-> ${link.to}`).join('\n') || 'None'}\n\nReturn exactly: {"summary":"...","covered":["short sentence naming a driver the candidate genuinely covered, quoting their words"],"material_gap":{"title":"...","detail":"...","nodeIds":["..."]},"why_it_matters":"...","coverage":[{"branchId":"suggested branch id","status":"covered|partial|missed"}],"criteria":[{"key":"exact rubric key","score":0,"evidence":"...","reason":"...","stronger_answer":"..."}],"evidence_to_revisit":["exact fact + miss/misread + why it matters"],"next_step":{"action":"string","why":"string"},"further_improvements":[{"action":"string","why":"string"}]}. Return every rubric criterion exactly once and ${treeVerified ? 'one coverage item for every suggested first-level branch' : 'an empty coverage array'}. covered has one to three items and must contain only correct content already present in the candidate tree, never advice; use [] if nothing material was covered. material_gap is the single most material driver the tree misses or handles weakest, judged against what could change the decision in this case; if the tree already covers every material driver, name its weakest evidence or prioritisation point instead. Put the candidate box that is weakest or closest to the gap in nodeIds, or [] when the driver is absent. why_it_matters explains in one or two sentences how the gap could lead to a wrong or unsupported conclusion in this specific case. next_step.action is one concrete, case-specific step (for example the data cut, exhibit or comparison to add) and next_step.why gives its payoff. Do not repeat the same idea across covered, material_gap, why_it_matters, next_step, the fixed logic copy or the fixed analysis order. evidence_to_revisit must be [] unless a specific case fact or exhibit figure was missed or misread; never flag evidence the candidate used correctly. next_step is the one highest-impact correction, prioritizing conclusion, logic, or case evidence before style. further_improvements has zero to two non-repeating smaller actions.`, 
          },
        ],
        stream: false,
      }),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new Error(body?.error?.message || body?.error || 'Mate could not assess this tree. Please try again.');
    const text = body?.choices?.[0]?.message?.content || '';
    const parsed = parseAiJson(text);
    const visibleCriteria = Array.isArray(parsed.criteria)
      ? parsed.criteria.map((item: any) => ({
          ...item,
          evidence: humanizeFeedbackText(item?.evidence, draft.nodes),
          reason: humanizeFeedbackText(item?.reason, draft.nodes),
          stronger_answer: humanizeFeedbackText(item?.stronger_answer, draft.nodes),
        }))
      : [];
    const feedback = cleanFeedback(parsed, draft.nodes, suggestedTree);
    feedback.scoring = normalizeCriterionScores({ ...parsed, criteria: visibleCriteria }, structureRubric, scoreableTreeText(draft.nodes));
    return feedback;
  };

  const submit = async () => {
    if (draft.nodes.some((node) => !node.text.trim())) { setError('Finish the text in every box before submitting.'); return; }
    setSubmitting(true);
    setError('');
    try {
      const feedback = await requestFeedback();
      const snapshot: Submission = {
        id: uid('submission'),
        submittedAt: new Date().toISOString(),
        nodes: draft.nodes.map((node) => ({ ...node })),
        crossLinks: draft.crossLinks.map((link) => ({ ...link })),
        feedback,
      };
      setSubmissions((items) => [...items, snapshot]);
      onSubmitted?.();
      onGraded?.(activeCase.id, feedback.scoring);
      revealFeedbackRef.current = true;
      setViewState('feedback');
      setHighlightIds(new Set([...(feedback.materialGap ? [feedback.materialGap] : []), ...feedback.improvements, ...feedback.priorities].flatMap((item) => item.nodeIds)));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Mate could not assess this tree. Please try again.');
      onGradeError?.(submitError);
    } finally {
      setSubmitting(false);
    }
  };

  // Submitted versions stay in history, and the cleared tree can be brought back with Undo.
  const startOver = () => {
    editedSinceLoadRef.current = true;
    setUndoStack((stack) => [...stack.slice(-49), draft]);
    setRedoStack([]);
    setDraft(emptyDraft(activeCase));
    setViewState('editing');
    setHighlightIds(new Set());
    setSelectedNodeId(null);
    setError('');
    setSaveState('editing');
  };

  useEffect(() => {
    if (viewState !== 'feedback' || !revealFeedbackRef.current) return;
    revealFeedbackRef.current = false;
    feedbackRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [viewState, submissions.length]);

  const statusLabel = saveState === 'saving' ? 'Saving draft…' : saveState === 'saved' ? 'Saved draft' : saveState === 'error' ? 'Saved on this device' : 'Editing';
  const statusIcon = saveState === 'saving' ? Loader2 : saveState === 'saved' ? Check : saveState === 'error' ? Save : CircleDot;
  const StatusIcon = statusIcon;

  if (showLibrary) {
    return (
      <div className="mt-5" data-testid="structures-library">
        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Structures Question Library</p>
              <h2 className="mt-1 text-lg font-bold text-[var(--space-text-primary)]">Structures exercises · {availableCases.length} cases</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">The case set, difficulties, charts, and numbers are unchanged. Only the solving method is now an issue tree.</p>
            </div>
            <button type="button" onClick={() => setShowLibrary(false)} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-semibold text-[var(--space-text-secondary)]"><X className="h-4 w-4" /> Close</button>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by case, company, or question" className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-page)] py-3 pl-9 pr-3 text-sm text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)]" />
          </div>
        </div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {filteredCases.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => { setSelectedId(item.id); setShowLibrary(false); onCaseSelected?.(item); }} className="flex h-full w-full items-start gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left hover:border-[var(--space-brand-primary)]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]"><Network className="h-4 w-4" /></span>
                <span className="min-w-0"><span className="block text-sm font-bold text-[var(--space-text-primary)]">{clarifyUnitText(item.title)}</span><span className="mt-1 block line-clamp-2 text-xs leading-5 text-[var(--space-text-secondary)]">{clarifyUnitText(item.question)}</span></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-5" data-testid="structures-workspace" data-retry-anchor>
      <header className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-text-brand)]">Structures v2</span>
              <span className="text-[10px] font-semibold text-[var(--space-text-muted)]">{activeCase.industry || 'Cross-industry'}</span>
              <span className="text-[10px] font-semibold text-[var(--space-text-muted)]">{activeCase.drillType || 'Issue Tree'}</span>
              <span className="text-[10px] font-semibold text-[var(--space-text-muted)]">{DIFFICULTY_LABELS[displayDifficultyOf(activeCase)]}</span>
            </div>
            {embedded ? null : <h2 className="mt-2 text-lg font-bold leading-7 text-[var(--space-text-primary)]">{clarifyUnitText(activeCase.title)}</h2>}
            <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">Read → Build → Submit → Feedback → Revise → Compare versions</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setShowLibrary(true)} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-semibold text-[var(--space-text-secondary)]"><BookOpen className="h-4 w-4" /> Choose case</button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[var(--space-border-default)] pt-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${saveState === 'error' ? 'bg-[color-mix(in_srgb,var(--space-semantic-warning)_14%,transparent)] text-[var(--space-semantic-warning)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]'}`}><StatusIcon className={`h-3 w-3 ${saveState === 'saving' ? 'animate-spin' : ''}`} /> {statusLabel}</span>
          {submissions.length ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success)_12%,transparent)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-semantic-success)]"><History className="h-3 w-3" /> {submissions.length} submitted version{submissions.length === 1 ? '' : 's'}</span> : null}
          {viewState === 'feedback' ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--space-semantic-warning)_14%,transparent)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-semantic-warning)]">Feedback mode · highlighted nodes</span> : null}
          <div className="ml-auto flex gap-1">
            <button type="button" onClick={undo} disabled={!undoStack.length} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--space-border-default)] disabled:opacity-35" title="Undo (Ctrl+Z)"><Undo2 className="h-4 w-4" /></button>
            <button type="button" onClick={redo} disabled={!redoStack.length} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--space-border-default)] disabled:opacity-35" title="Redo (Ctrl+Y)"><Redo2 className="h-4 w-4" /></button>
          </div>
        </div>
      </header>

      <section className="mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
        <button type="button" onClick={() => setBriefOpen((open) => !open)} className="flex w-full items-center justify-between gap-3 p-4 text-left">
          <span><span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">1 · Read the case</span><span className="mt-1 block text-sm font-bold text-[var(--space-text-primary)]">Brief & central question</span></span>
          {briefOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {briefOpen ? (
          <div className="border-t border-[var(--space-border-default)] p-4 pt-3">
            <p className="whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-secondary)]" data-testid="structures-case-context">{clarifyUnitText(brief.context || 'Use the case prompt and any supplied exhibits to build a clear, testable issue tree.')}</p>
            {brief.keyTerms.length ? <p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="structures-key-terms"><span className="font-bold text-[var(--space-text-primary)]">Key terms:</span> {clarifyUnitText(brief.keyTerms.join(' '))}</p> : null}
            <div className="mt-3 rounded-xl border-l-4 border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Central question</p>
              <p className="mt-1 whitespace-pre-wrap text-sm font-semibold leading-6 text-[var(--space-text-primary)]" data-testid="structures-central-question">{clarifyUnitText(brief.task || activeCase.question)}</p>
              {[brief.instruction, ...brief.guidance].filter(Boolean).map((line) => <p key={line} className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">{clarifyUnitText(String(line))}</p>)}
            </div>
          </div>
        ) : null}
      </section>

      {shownExhibits.length ? (
        <div className="mt-3" data-testid="structures-exhibits">
          <ExhibitRenderer exhibits={submissions.length ? shownExhibits : exhibitsBeforeSubmission} guide={brief.exhibitGuide} />
        </div>
      ) : (
        <p className="mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 text-xs leading-5 text-[var(--space-text-muted)]">This drill has no exhibit. Build the tree from the case prompt.</p>
      )}

      <div className="mt-3">
        <main className="min-w-0 space-y-3">
          <StructureTreeCanvas draft={draft} editor={treeEditor} highlightIds={highlightIds} formatDisplay={formatRootText} />

          {draft.crossLinks.length ? (
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]"><Unlink className="h-3.5 w-3.5" /> Cross-branch relationships · dashed, never hierarchy</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {draft.crossLinks.map((link) => <button key={link.id} type="button" onClick={() => commitDraft({ ...draft, crossLinks: draft.crossLinks.filter((item) => item.id !== link.id) })} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[var(--space-brand-highlight)] px-2.5 py-1.5 text-[10px] text-[var(--space-text-secondary)]" title="Remove relationship">{draft.nodes.find((node) => node.id === link.from)?.text.slice(0, 24)} ↔ {draft.nodes.find((node) => node.id === link.to)?.text.slice(0, 24)} <X className="h-3 w-3" /></button>)}
              </div>
            </section>
          ) : null}

          {error ? <p className="rounded-xl border border-[var(--space-semantic-danger)] bg-[var(--space-surface-card)] p-3 text-xs text-[var(--space-semantic-danger)]" role="alert">{error}</p> : null}

          <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">3 · Submit for case-specific feedback</p><p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">Mate evaluates your actual nodes, accepts multiple valid structures, and highlights the branches it discusses. No model tree is revealed before submission.</p></div>
              <button type="button" onClick={submit} disabled={submitting} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-4 text-sm font-bold text-[var(--space-text-on-primary)] disabled:opacity-45" data-testid="button-submit-structure-tree">{submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{submitting ? 'Mate is assessing…' : submissions.length ? 'Submit revised tree' : 'Submit my tree'}</button>
            </div>
          </section>

          {latest && viewState === 'feedback' ? (
            <section ref={feedbackRef} className="scroll-mt-3 rounded-2xl border-2 border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] p-4" data-testid="structures-feedback">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">4 · Feedback · Version {submissions.length}</p>
              {(() => {
                const scoring = latest.feedback.scoring;
                const coverage = coverageFor(latest.feedback, suggestedTree, latest.nodes, guideCoverage);
                const answered = Boolean(scoreableTreeText(latest.nodes).trim());
                const outcome = scoring
                  ? resultOutcome(scoring.overallScore, 10, { answered })
                  : answered ? coverageOutcome(coverage) : 'not-answered';
                const parts = fourPartFeedback(latest.feedback);
                const focus = parts.next?.action || '';
                // Inside Case Pool the host full case is caseOverride's source; never offer it as the next step.
                const fullCase = caseOverride && activeCase.source_case_id === caseOverride.source_case_id ? null : sourceFullCase(activeCase.source_case_id);
                const caseIndex = availableCases.findIndex((item) => item.id === activeCase.id);
                const nextStructure = availableCases.length > 1 ? availableCases[(caseIndex + 1) % availableCases.length] : null;
                return (
                  <CaseResultView
                    score={scoring ? scoring.overallScore : null}
                    scale={10}
                    outcome={outcome}
                    completedOn={latest.submittedAt}
                    summaryNote={scoring ? undefined : 'Saved before scores were added; the verdict follows your branch coverage.'}
                    feedback={buildReasoningFeedback({
                      criteria: scoring?.criteria || [],
                      worked: parts.covered,
                      failed: [parts.gap ? `${parts.gap.title}: ${parts.gap.detail}` : '', parts.why],
                      evidenceToRevisit: scoring?.evidenceToRevisit || [],
                      exclude: focus ? [focus] : [],
                    })}
                    criteria={scoring?.criteria || []}
                    layout="stacked"
                    learnerResponse={answered ? (
                      <ol className="space-y-1.5" data-testid="structures-submitted-tree">
                        {linearize(latest.nodes).map(({ node, depth }) => (
                          <li key={node.id} className="break-words rounded-lg bg-[var(--space-surface-muted)] px-2 py-1.5 text-xs leading-5 text-[var(--space-text-secondary)]" style={{ marginLeft: `${Math.min(depth, 5) * 14}px` }}>
                            {formatRootText(node.text)}
                          </li>
                        ))}
                      </ol>
                    ) : undefined}
                    approachSlot={treeVerified ? (
                      <div data-testid="structures-tree-comparison">
                        <div className="flex flex-wrap gap-3 rounded-xl border border-[var(--space-border-default)] p-3" aria-label="Coverage legend">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Coverage of your tree</span>
                          <CoverageMark status="covered" /><CoverageMark status="partial" /><CoverageMark status="missed" />
                        </div>
                        <div className="mt-3 min-w-0">
                          <SuggestedTreePanel tree={suggestedTree} coverage={coverage} />
                        </div>
                      </div>
                    ) : undefined}
                    workedAnswer={treeVerified ? structureWorkedAnswer(activeCase, suggestedTree) : null}
                    unavailableReason={treeVerified ? undefined : `Structures question ${activeCase.id} has no authored model structure yet, so Mate does not show a template tree as its answer.`}
                    retry={retryAction(startOver, { focus, label: caseOverride ? 'Retry issue tree' : undefined })}
                    nextAction={chooseNextAction(outcome, {
                      'full-case': fullCase ? { kind: 'full-case', label: 'Solve the full case', detail: `Use this structure on the full case: ${fullCase.title}.`, onSelect: () => openCasePoolCase(fullCase.id) } : null,
                      'next-question': nextStructure ? { kind: 'next-question', label: 'Next structure case', detail: `Build a tree for “${nextStructure.title}”.`, onSelect: () => { setSelectedId(nextStructure.id); setShowLibrary(false); onCaseSelected?.(nextStructure); } } : null,
                    })}
                    testId="structures-result"
                  />
                );
              })()}
              {onBackToLibrary ? (
                <div className="mt-4 flex flex-col gap-2 pb-20 sm:flex-row sm:pb-0">
                  <button type="button" onClick={onBackToLibrary} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--space-border-default)] px-4 text-sm font-bold text-[var(--space-text-secondary)]" data-testid="button-back-structure-library"><ArrowRight className="h-4 w-4 rotate-180" /> Back to case library</button>
                </div>
              ) : null}
            </section>
          ) : null}

          {submissions.length && viewState !== 'feedback' ? (
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">5 · Compare versions</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Submission snapshots stay locked while the current tree remains editable.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => { setViewState('feedback'); setHighlightIds(new Set()); }} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-[var(--space-brand-primary)] px-3 text-xs font-semibold text-[var(--space-text-brand)]" data-testid="button-view-latest-structure-feedback"><CheckCircle2 className="h-4 w-4" /> View latest feedback</button><button type="button" onClick={() => setViewState(viewState === 'compare' ? 'editing' : 'compare')} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-semibold text-[var(--space-text-secondary)]"><History className="h-4 w-4" /> {viewState === 'compare' ? 'Hide comparison' : 'Compare versions'}</button></div></div>
              {viewState === 'compare' ? <div className="mt-3 grid gap-3 lg:grid-cols-3">{submissions.slice(-2).map((submission, index, shown) => <VersionCard key={submission.id} submission={submission} label={shown.length === 1 ? 'First submission' : index === 0 ? `Earlier · Version ${Math.max(1, submissions.length - 1)}` : `Latest · Version ${submissions.length}`} />)}<DraftVersionCard draft={draft} /></div> : null}
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
