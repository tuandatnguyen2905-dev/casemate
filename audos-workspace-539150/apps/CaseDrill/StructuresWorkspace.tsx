import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import {
  ArrowLeftRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDot,
  GitBranch,
  History,
  Link2,
  Loader2,
  Maximize2,
  Plus,
  Redo2,
  RotateCcw,
  Save,
  Search,
  Send,
  Trash2,
  Undo2,
  Unlink,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import ExhibitRenderer from '../../components/ExhibitRenderer';
import { QUESTION_LIBRARY, type LibraryExhibit, type LibraryQuestion } from '../../lib/skillQuestionLibrary';
import { restoreArchivedHardQuestion } from '../../lib/hardCaseDrillQuestions';
import { DIFFICULTY_LABELS } from '../../lib/caseLibraryShared';

const REQUEST_KEY = 'casemate-open-structures-case';
const LEGACY_REQUEST_KEY = 'casemate-open-case-drill';
const TABLE = 'case_structure_trees';
const NODE_WIDTH = 220;
const NODE_HEIGHT = 86;
const X_GAP = 285;
const Y_GAP = 112;

const STRUCTURE_CASES = QUESTION_LIBRARY.structures
  .map(restoreArchivedHardQuestion)
  .filter((question) => question.reviewStatus !== 'Archived');

type SaveState = 'editing' | 'saving' | 'saved' | 'error';
type ViewState = 'editing' | 'feedback' | 'compare';

interface TreeNode {
  id: string;
  parentId: string | null;
  text: string;
  order: number;
  x?: number;
  y?: number;
}

interface CrossLink {
  id: string;
  from: string;
  to: string;
  label?: string;
}

interface TreeDraft {
  nodes: TreeNode[];
  crossLinks: CrossLink[];
}

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

interface LayoutNode extends TreeNode {
  x: number;
  y: number;
  depth: number;
}

interface NodeDragState {
  pointerId: number;
  nodeId: string;
  startClientX: number;
  startClientY: number;
  basePositions: Map<string, { x: number; y: number }>;
  movingIds: Set<string>;
  moved: boolean;
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

function emptyDraft(item: LibraryQuestion): TreeDraft {
  return {
    nodes: [{ id: `root-${item.id}`, parentId: null, text: item.question, order: 0 }],
    crossLinks: [],
  };
}

function questionExhibits(item: LibraryQuestion): LibraryExhibit[] {
  if (item.exhibits?.length) return item.exhibits;
  return item.exhibit ? [item.exhibit] : [];
}

function childrenOf(nodes: TreeNode[], parentId: string | null): TreeNode[] {
  return nodes.filter((node) => node.parentId === parentId).sort((a, b) => a.order - b.order);
}

function descendantsOf(nodes: TreeNode[], nodeId: string): Set<string> {
  const found = new Set<string>([nodeId]);
  let changed = true;
  while (changed) {
    changed = false;
    nodes.forEach((node) => {
      if (node.parentId && found.has(node.parentId) && !found.has(node.id)) {
        found.add(node.id);
        changed = true;
      }
    });
  }
  return found;
}

function normalizeOrders(nodes: TreeNode[]): TreeNode[] {
  const byParent = new Map<string | null, TreeNode[]>();
  nodes.forEach((node) => {
    const list = byParent.get(node.parentId) || [];
    list.push(node);
    byParent.set(node.parentId, list);
  });
  const orderById = new Map<string, number>();
  byParent.forEach((list) => list.sort((a, b) => a.order - b.order).forEach((node, index) => orderById.set(node.id, index)));
  return nodes.map((node) => ({ ...node, order: orderById.get(node.id) || 0 }));
}

function layoutTree(
  nodes: TreeNode[],
  positionOverrides?: ReadonlyMap<string, { x: number; y: number }>,
): { nodes: LayoutNode[]; width: number; height: number } {
  const positioned = new Map<string, LayoutNode>();
  let leafCursor = 0;
  const root = nodes.find((node) => node.parentId === null) || nodes[0];
  const visit = (node: TreeNode, depth: number): number => {
    const children = childrenOf(nodes, node.id);
    let y: number;
    if (!children.length) {
      y = leafCursor * Y_GAP + 44;
      leafCursor += 1;
    } else {
      const childYs = children.map((child) => visit(child, depth + 1));
      y = (childYs[0] + childYs[childYs.length - 1]) / 2;
    }
    const override = positionOverrides?.get(node.id);
    positioned.set(node.id, {
      ...node,
      x: override?.x ?? node.x ?? depth * X_GAP + 36,
      y: override?.y ?? node.y ?? y,
      depth,
    });
    return y;
  };
  if (root) visit(root, 0);
  nodes.filter((node) => !positioned.has(node.id)).forEach((node) => visit(node, 0));
  const resolved = Array.from(positioned.values());
  const maxX = resolved.reduce((value, node) => Math.max(value, node.x + NODE_WIDTH), 0);
  const maxY = resolved.reduce((value, node) => Math.max(value, node.y + NODE_HEIGHT), 0);
  return {
    nodes: resolved,
    width: Math.max(720, maxX + 80),
    height: Math.max(480, maxY + 100),
  };
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

function cleanAction(value: any, validIds: Set<string>): FeedbackAction | null {
  if (!value || typeof value !== 'object') return null;
  const title = String(value.title || '').trim();
  const detail = String(value.detail || '').trim();
  if (!title || !detail) return null;
  const nodeIds = Array.isArray(value.nodeIds)
    ? value.nodeIds.map(String).filter((id: string) => validIds.has(id)).slice(0, 6)
    : [];
  return { title, detail, nodeIds };
}

function cleanFeedback(value: any, nodes: TreeNode[]): TreeFeedback {
  const ids = new Set(nodes.map((node) => node.id));
  const list = (raw: any) => Array.isArray(raw) ? raw.map((item) => cleanAction(item, ids)).filter(Boolean).slice(0, 5) as FeedbackAction[] : [];
  return {
    summary: String(value?.summary || 'Review the highlighted branches, then revise the tree and submit another version.').trim(),
    strengths: list(value?.strengths),
    improvements: list(value?.improvements),
    priorities: list(value?.priorities),
  };
}

function parseAiJson(text: string): any {
  const trimmed = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Mate returned feedback in an unreadable format. Please resubmit.');
  return JSON.parse(trimmed.slice(start, end + 1));
}

function NodeEditor({
  node,
  root,
  highlighted,
  relationSource,
  moveSource,
  onText,
  onAddChild,
  onAddSibling,
  onDelete,
  onRelation,
  onMove,
  dragging = false,
  onPointerDown,
  shouldSuppressEdit,
}: {
  node: TreeNode;
  root: boolean;
  highlighted: boolean;
  relationSource: boolean;
  moveSource: boolean;
  onText: (text: string) => void;
  onAddChild: () => void;
  onAddSibling: () => void;
  onDelete: () => void;
  onRelation: () => void;
  onMove: () => void;
  dragging?: boolean;
  onPointerDown?: (event: ReactPointerEvent<HTMLElement>) => void;
  shouldSuppressEdit?: () => boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(node.text);
  useEffect(() => setValue(node.text), [node.text]);
  const commit = () => {
    const next = value.trim();
    if (next && next !== node.text) onText(next);
    else setValue(node.text);
    setEditing(false);
  };
  return (
    <article
      onPointerDown={onPointerDown}
      onDoubleClick={() => { if (!dragging && !shouldSuppressEdit?.()) setEditing(true); }}
      className={`group relative rounded-2xl border-2 bg-[var(--space-surface-card)] p-3 shadow-sm transition-all ${dragging ? 'cursor-grabbing select-none' : 'cursor-grab'} ${
        highlighted
          ? 'border-[var(--space-semantic-warning)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--space-semantic-warning)_20%,transparent)]'
          : relationSource
            ? 'border-[var(--space-brand-highlight)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--space-brand-highlight)_18%,transparent)]'
            : moveSource
              ? 'border-[var(--space-brand-primary)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--space-brand-primary-500)_18%,transparent)]'
            : root
              ? 'border-[var(--space-brand-primary)]'
              : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-200)]'
      }`}
      data-node-id={node.id}
      data-testid={`structure-node-${node.id}`}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className={`text-[9px] font-bold uppercase tracking-[0.14em] ${root ? 'text-[var(--space-text-brand)]' : 'text-[var(--space-text-muted)]'}`}>
          {root ? 'Central question' : 'Sub-question'}
        </span>
        {!editing ? <span className="text-[9px] text-[var(--space-text-muted)]">{dragging ? 'Moving subtree…' : 'Drag'}</span> : null}
      </div>
      {editing ? (
        <textarea
          autoFocus
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') commit();
            if (event.key === 'Escape') { setValue(node.text); setEditing(false); }
          }}
          rows={3}
          className="w-full resize-none rounded-lg border border-[var(--space-brand-primary)] bg-[var(--space-surface-page)] p-2 text-xs leading-5 text-[var(--space-text-primary)] outline-none"
          aria-label="Edit issue tree node"
        />
      ) : (
        <button type="button" onClick={() => { if (!dragging && !shouldSuppressEdit?.()) setEditing(true); }} className="min-h-10 w-full cursor-grab text-left text-xs font-semibold leading-5 text-[var(--space-text-primary)]">
          {node.text}
        </button>
      )}
      <div data-node-action className="mt-2 flex flex-wrap gap-1 opacity-100 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
        <button type="button" onClick={onAddChild} className="inline-flex h-8 items-center gap-1 rounded-lg bg-[var(--space-surface-muted)] px-2 text-[10px] font-semibold text-[var(--space-text-secondary)]" title="Add sub-issue"><GitBranch className="h-3 w-3" /> Sub-issue</button>
        {!root ? <button type="button" onClick={onAddSibling} className="inline-flex h-8 items-center gap-1 rounded-lg bg-[var(--space-surface-muted)] px-2 text-[10px] font-semibold text-[var(--space-text-secondary)]" title="Add related issue"><Plus className="h-3 w-3" /> Related issue</button> : null}
        {!root ? <button type="button" onClick={onMove} className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]" title="Move or reconnect subtree"><ArrowLeftRight className="h-3 w-3" /></button> : null}
        <button type="button" onClick={onRelation} className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]" title="Add cross-branch relationship"><Link2 className="h-3 w-3" /></button>
        {!root ? <button type="button" onClick={onDelete} className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--space-surface-muted)] text-[var(--space-semantic-danger)]" title="Delete subtree"><Trash2 className="h-3 w-3" /></button> : null}
      </div>
    </article>
  );
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
      <p className="mt-3 text-xs leading-5 text-[var(--space-text-secondary)]">{submission.feedback.summary}</p>
    </section>
  );
}

export default function StructuresWorkspace({ initialCaseId, onSubmitted }: { initialCaseId?: string; onSubmitted?: () => void }) {
  const { sessionId } = useSpaceRuntime();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(() => {
    try {
      const direct = sessionStorage.getItem(REQUEST_KEY);
      const legacy = sessionStorage.getItem(LEGACY_REQUEST_KEY);
      const requested = STRUCTURE_CASES.some((item) => item.id === initialCaseId)
        ? initialCaseId
        : STRUCTURE_CASES.some((item) => item.id === direct) ? direct : legacy;
      return STRUCTURE_CASES.some((item) => item.id === requested) ? String(requested) : STRUCTURE_CASES[0]?.id || '';
    } catch {
      return STRUCTURE_CASES[0]?.id || '';
    }
  });
  const [showLibrary, setShowLibrary] = useState(false);
  const [briefOpen, setBriefOpen] = useState(true);
  const [draft, setDraft] = useState<TreeDraft>(() => emptyDraft(STRUCTURE_CASES.find((item) => item.id === selectedId) || STRUCTURE_CASES[0]));
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [undoStack, setUndoStack] = useState<TreeDraft[]>([]);
  const [redoStack, setRedoStack] = useState<TreeDraft[]>([]);
  const [saveState, setSaveState] = useState<SaveState>('editing');
  const [viewState, setViewState] = useState<ViewState>('editing');
  const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set());
  const [relationFrom, setRelationFrom] = useState<string | null>(null);
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [zoom, setZoom] = useState(0.88);
  const [pan, setPan] = useState({ x: 18, y: 18 });
  const [panning, setPanning] = useState<{ x: number; y: number; startX: number; startY: number } | null>(null);
  const [nodeDrag, setNodeDrag] = useState<NodeDragState | null>(null);
  const [dragPositions, setDragPositions] = useState<Map<string, { x: number; y: number }> | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const rowIdRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodeDragRef = useRef<NodeDragState | null>(null);
  const dragPositionsRef = useRef<Map<string, { x: number; y: number }> | null>(null);
  const recentDragRef = useRef<{ nodeId: string; until: number } | null>(null);

  const activeCase = useMemo(() => STRUCTURE_CASES.find((item) => item.id === selectedId) || STRUCTURE_CASES[0], [selectedId]);
  const layout = useMemo(() => layoutTree(draft.nodes, dragPositions || undefined), [draft.nodes, dragPositions]);
  const nodeMap = useMemo(() => new Map(layout.nodes.map((node) => [node.id, node])), [layout.nodes]);
  const latest = submissions[submissions.length - 1] || null;
  useEffect(() => {
    if (initialCaseId && STRUCTURE_CASES.some((item) => item.id === initialCaseId)) {
      setSelectedId(initialCaseId);
      setShowLibrary(false);
    }
  }, [initialCaseId]);

  const filteredCases = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return STRUCTURE_CASES;
    return STRUCTURE_CASES.filter((item) => `${item.id} ${item.title} ${item.question} ${item.businessContext || ''}`.toLowerCase().includes(needle));
  }, [query]);

  useEffect(() => {
    const consume = () => {
      try {
        const direct = sessionStorage.getItem(REQUEST_KEY);
        const legacy = sessionStorage.getItem(LEGACY_REQUEST_KEY);
        if (direct && !STRUCTURE_CASES.some((item) => item.id === direct)) sessionStorage.removeItem(REQUEST_KEY);
        const requested = STRUCTURE_CASES.some((item) => item.id === direct) ? direct : legacy;
        if (requested && STRUCTURE_CASES.some((item) => item.id === requested)) {
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
  }, []);

  useEffect(() => {
    if (!activeCase) return;
    let cancelled = false;
    setHydrated(false);
    setUndoStack([]);
    setRedoStack([]);
    setViewState('editing');
    setHighlightIds(new Set());
    setRelationFrom(null);
    setMoveFrom(null);
    nodeDragRef.current = null;
    dragPositionsRef.current = null;
    setNodeDrag(null);
    setDragPositions(null);
    setError('');
    rowIdRef.current = null;
    const fallback = emptyDraft(activeCase);
    const storageKey = `casemate-structures-v2:${sessionId || 'preview'}:${activeCase.id}`;
    try {
      const local = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (local?.draft?.nodes?.length) setDraft(local.draft);
      else setDraft(fallback);
      if (Array.isArray(local?.submissions)) setSubmissions(local.submissions);
      else setSubmissions([]);
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
          const remoteDraft = parseStored<TreeDraft>(row.draft_json, fallback);
          const remoteSubmissions = parseStored<Submission[]>(row.submissions_json, []);
          if (remoteDraft?.nodes?.length) setDraft(remoteDraft);
          setSubmissions(Array.isArray(remoteSubmissions) ? remoteSubmissions : []);
        }
      } catch (loadError) {
        console.warn('[Structures] remote resume failed', loadError);
      } finally {
        if (!cancelled) setHydrated(true);
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [activeCase?.id, sessionId]);

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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (event.key.toLowerCase() === 'z' && !event.shiftKey) { event.preventDefault(); undo(); }
      if (event.key.toLowerCase() === 'y' || (event.key.toLowerCase() === 'z' && event.shiftKey)) { event.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);

  const addChild = (parentId: string) => {
    const siblings = childrenOf(draft.nodes, parentId);
    const parent = nodeMap.get(parentId);
    const siblingLayouts = siblings.map((node) => nodeMap.get(node.id)).filter(Boolean) as LayoutNode[];
    const nextY = siblingLayouts.length ? Math.max(...siblingLayouts.map((node) => node.y)) + Y_GAP : parent?.y;
    commit({
      ...draft,
      nodes: [...draft.nodes, {
        id: uid('node'),
        parentId,
        text: 'New testable sub-question',
        order: siblings.length,
        x: parent ? parent.x + X_GAP : undefined,
        y: nextY,
      }],
    });
  };

  const addSibling = (nodeId: string) => {
    const node = draft.nodes.find((item) => item.id === nodeId);
    if (!node || node.parentId === null) return;
    const siblings = childrenOf(draft.nodes, node.parentId);
    const siblingLayouts = siblings.map((item) => nodeMap.get(item.id)).filter(Boolean) as LayoutNode[];
    const current = nodeMap.get(nodeId);
    commit({
      ...draft,
      nodes: [...draft.nodes, {
        id: uid('node'),
        parentId: node.parentId,
        text: 'New parallel branch',
        order: siblings.length,
        x: current?.x,
        y: siblingLayouts.length ? Math.max(...siblingLayouts.map((item) => item.y)) + Y_GAP : current?.y,
      }],
    });
  };

  const deleteNode = (nodeId: string) => {
    const removing = descendantsOf(draft.nodes, nodeId);
    commit({
      nodes: draft.nodes.filter((node) => !removing.has(node.id)),
      crossLinks: draft.crossLinks.filter((link) => !removing.has(link.from) && !removing.has(link.to)),
    });
  };

  const updateText = (nodeId: string, text: string) => commit({ ...draft, nodes: draft.nodes.map((node) => node.id === nodeId ? { ...node, text } : node) });

  const moveNode = (movingId: string, targetId: string, asChild: boolean) => {
    if (movingId === targetId) return;
    const moving = draft.nodes.find((node) => node.id === movingId);
    const target = draft.nodes.find((node) => node.id === targetId);
    if (!moving || !target || moving.parentId === null || descendantsOf(draft.nodes, movingId).has(targetId)) return;
    const nextParent = asChild ? target.id : target.parentId;
    if (nextParent === null) return;
    const targetSiblings = childrenOf(draft.nodes.filter((node) => node.id !== movingId), nextParent);
    const targetIndex = asChild ? targetSiblings.length : Math.max(0, targetSiblings.findIndex((node) => node.id === targetId));
    const next = draft.nodes.map((node) => node.id === movingId ? { ...node, parentId: nextParent, order: targetIndex } : node);
    next.forEach((node) => {
      if (node.id !== movingId && node.parentId === nextParent && node.order >= targetIndex) node.order += 1;
    });
    commit({ ...draft, nodes: next });
  };

  const handleMove = (nodeId: string) => {
    if (!moveFrom) { setMoveFrom(nodeId); setRelationFrom(null); return; }
    if (moveFrom === nodeId) { setMoveFrom(null); return; }
    moveNode(moveFrom, nodeId, true);
    setMoveFrom(null);
  };

  const handleRelation = (nodeId: string) => {
    if (!relationFrom) { setRelationFrom(nodeId); setMoveFrom(null); return; }
    if (relationFrom === nodeId) { setRelationFrom(null); return; }
    const duplicate = draft.crossLinks.some((link) => (link.from === relationFrom && link.to === nodeId) || (link.from === nodeId && link.to === relationFrom));
    if (!duplicate) commit({ ...draft, crossLinks: [...draft.crossLinks, { id: uid('link'), from: relationFrom, to: nodeId }] });
    setRelationFrom(null);
  };

  const startNodeDrag = (event: ReactPointerEvent<HTMLElement>, nodeId: string) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest('textarea, [data-node-action]')) return;
    const basePositions = new Map(layout.nodes.map((node) => [node.id, { x: node.x, y: node.y }]));
    event.currentTarget.setPointerCapture(event.pointerId);
    const nextDrag: NodeDragState = {
      pointerId: event.pointerId,
      nodeId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      basePositions,
      movingIds: descendantsOf(draft.nodes, nodeId),
      moved: false,
    };
    setPanning(null);
    dragPositionsRef.current = null;
    nodeDragRef.current = nextDrag;
    setDragPositions(null);
    setNodeDrag(nextDrag);
  };

  const moveNodeDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const activeDrag = nodeDragRef.current;
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
    const clientDx = event.clientX - activeDrag.startClientX;
    const clientDy = event.clientY - activeDrag.startClientY;
    if (!activeDrag.moved && Math.hypot(clientDx, clientDy) < 4) return;
    event.preventDefault();
    const movingPositions = Array.from(activeDrag.movingIds)
      .map((id) => activeDrag.basePositions.get(id))
      .filter(Boolean) as Array<{ x: number; y: number }>;
    const minX = Math.min(...movingPositions.map((position) => position.x));
    const minY = Math.min(...movingPositions.map((position) => position.y));
    const dx = Math.max(clientDx / zoom, 16 - minX);
    const dy = Math.max(clientDy / zoom, 16 - minY);
    const nextPositions = new Map(activeDrag.basePositions);
    activeDrag.movingIds.forEach((id) => {
      const start = activeDrag.basePositions.get(id);
      if (start) nextPositions.set(id, { x: start.x + dx, y: start.y + dy });
    });
    dragPositionsRef.current = nextPositions;
    setDragPositions(nextPositions);
    if (!activeDrag.moved) {
      const movedDrag = { ...activeDrag, moved: true };
      nodeDragRef.current = movedDrag;
      setNodeDrag(movedDrag);
    }
  };

  const finishNodeDrag = (pointerId: number, cancelled = false) => {
    const activeDrag = nodeDragRef.current;
    const finalPositions = dragPositionsRef.current;
    if (!activeDrag || pointerId !== activeDrag.pointerId) return;
    if (!cancelled && activeDrag.moved && finalPositions) {
      recentDragRef.current = { nodeId: activeDrag.nodeId, until: Date.now() + 350 };
      commit({
        ...draft,
        nodes: draft.nodes.map((node) => {
          const position = finalPositions.get(node.id);
          return position ? { ...node, x: Math.round(position.x), y: Math.round(position.y) } : node;
        }),
      });
    }
    nodeDragRef.current = null;
    dragPositionsRef.current = null;
    setNodeDrag(null);
    setDragPositions(null);
  };

  const shouldSuppressNodeEdit = (nodeId: string): boolean => {
    const recent = recentDragRef.current;
    if (!recent || Date.now() > recent.until) {
      recentDragRef.current = null;
      return false;
    }
    return recent.nodeId === nodeId;
  };

  const fitToScreen = useCallback(() => {
    const host = canvasRef.current;
    if (!host) return;
    const availableW = Math.max(320, host.clientWidth - 32);
    const availableH = Math.max(360, host.clientHeight - 32);
    const nextZoom = Math.min(1, Math.max(0.28, Math.min(availableW / layout.width, availableH / layout.height)));
    setZoom(nextZoom);
    setPan({ x: 16, y: 16 });
  }, [layout.height, layout.width]);

  const requestFeedback = async (): Promise<TreeFeedback> => {
    const token = (window as any).__workspaceDb?.token;
    if (!token) throw new Error('Sign in so Mate can assess and save this submission.');
    const response = await fetch('/proxy/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': token },
      body: JSON.stringify({
        model: 'gpt-5.6-terra',
        reasoning_effort: 'none',
        max_completion_tokens: 1800,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'You are Mate, a consulting case coach. Assess the candidate issue tree on its own merits for this specific case. Accept multiple valid structures; never require a single predetermined framework. Be concrete and actionable. Discuss exact node IDs. Evaluate root alignment, first-level exhaustiveness, mutual exclusivity, missing areas at any depth, testability with data, prioritization, and use of case context/exhibits. Return only JSON: {"summary":"...","strengths":[{"title":"...","detail":"...","nodeIds":["..."]}],"improvements":[same shape],"priorities":[same shape]}. Keep each array to 1-4 items.',
          },
          {
            role: 'user',
            content: `STRUCTURES DRILL ID: ${activeCase.id}\nTITLE: ${activeCase.title}\nCASE CONTEXT: ${activeCase.businessContext || activeCase.instruction || activeCase.title}\nCENTRAL QUESTION: ${activeCase.question}\nEXHIBITS AND NUMBERS:\n${exhibitsForPrompt(activeCase)}\n\nCANDIDATE TREE:\n${treeForPrompt(draft.nodes)}\n\nCROSS-BRANCH RELATIONSHIPS:\n${draft.crossLinks.map((link) => `${link.from} <-> ${link.to}`).join('\n') || 'None'}`,
          },
        ],
        stream: false,
      }),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new Error(body?.error?.message || body?.error || 'Mate could not assess this tree. Please try again.');
    const text = body?.choices?.[0]?.message?.content || '';
    return cleanFeedback(parseAiJson(text), draft.nodes);
  };

  const submit = async () => {
    if (draft.nodes.length < 2) { setError('Add at least one branch before submitting your tree.'); return; }
    if (draft.nodes.some((node) => !node.text.trim())) { setError('Finish the text in every node before submitting.'); return; }
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
      setViewState('feedback');
      setHighlightIds(new Set([...feedback.improvements, ...feedback.priorities].flatMap((item) => item.nodeIds)));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Mate could not assess this tree. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
              <h2 className="mt-1 text-lg font-bold text-[var(--space-text-primary)]">Structures exercises · {STRUCTURE_CASES.length} cases</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">The case set, IDs, difficulties, charts, and numbers are unchanged. Only the solving method is now an issue tree.</p>
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
              <button type="button" onClick={() => { setSelectedId(item.id); setShowLibrary(false); }} className="flex h-full w-full items-start gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left hover:border-[var(--space-brand-primary)]">
                <span className="rounded-lg bg-[var(--space-surface-accent-soft)] px-2 py-1 text-[10px] font-bold text-[var(--space-text-brand)]">{item.id}</span>
                <span className="min-w-0"><span className="block text-sm font-bold text-[var(--space-text-primary)]">{item.title}</span><span className="mt-1 block line-clamp-2 text-xs leading-5 text-[var(--space-text-secondary)]">{item.question}</span></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-5" data-testid="structures-workspace">
      <header className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-text-brand)]">Structures v2</span>
              <span className="text-[10px] font-semibold text-[var(--space-text-muted)]">{activeCase.id}</span>
              <span className="text-[10px] font-semibold text-[var(--space-text-muted)]">{activeCase.industry || 'Cross-industry'}</span>
              <span className="text-[10px] font-semibold text-[var(--space-text-muted)]">{activeCase.drillType || 'Issue Tree'}</span>
              <span className="text-[10px] font-semibold text-[var(--space-text-muted)]">{DIFFICULTY_LABELS[activeCase.difficulty]}</span>
            </div>
            <h2 className="mt-2 text-lg font-bold leading-7 text-[var(--space-text-primary)]">{activeCase.title}</h2>
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
            <p className="text-sm leading-6 text-[var(--space-text-secondary)]">{activeCase.businessContext || activeCase.instruction || 'Use the case prompt and any supplied exhibits to build a clear, testable issue tree.'}</p>
            <div className="mt-3 rounded-xl border-l-4 border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Central question</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{activeCase.question}</p>
            </div>
          </div>
        ) : null}
      </section>

      {questionExhibits(activeCase).length ? (
        <div className="mt-3" data-testid="structures-exhibits">
          <ExhibitRenderer exhibits={questionExhibits(activeCase)} displayMode="advanced" />
        </div>
      ) : (
        <p className="mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 text-xs leading-5 text-[var(--space-text-muted)]">This drill has no exhibit. Build the tree from the case prompt.</p>
      )}

      <div className="mt-3">
        <main className="min-w-0 space-y-3">
          <section className="overflow-hidden rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
            <div className="flex flex-wrap items-center gap-2 border-b border-[var(--space-border-default)] p-3">
              <div className="mr-auto">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">2 · Build your tree</p>
                <p className="mt-0.5 text-[10px] text-[var(--space-text-muted)]">Click a node to edit. Drag any node to reposition it; moving a parent carries its descendants.</p>
              </div>
              {relationFrom ? <span className="rounded-full bg-[color-mix(in_srgb,var(--space-brand-highlight)_14%,transparent)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-text-brand)]">Select a second node for a dashed relationship</span> : null}
              {moveFrom ? <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-text-brand)]">Select the new parent node</span> : null}
              <button type="button" onClick={() => setZoom((value) => Math.max(0.28, value - 0.1))} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--space-border-default)]"><ZoomOut className="h-4 w-4" /></button>
              <span className="w-11 text-center text-[10px] font-semibold text-[var(--space-text-muted)]">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom((value) => Math.min(1.6, value + 0.1))} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--space-border-default)]"><ZoomIn className="h-4 w-4" /></button>
              <button type="button" onClick={fitToScreen} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] px-2.5 text-[10px] font-semibold text-[var(--space-text-secondary)]"><Maximize2 className="h-3.5 w-3.5" /> Fit</button>
            </div>

            <div
              ref={canvasRef}
              className={`relative hidden h-[590px] overflow-hidden bg-[var(--space-surface-page)] lg:block ${nodeDrag || panning ? 'cursor-grabbing' : 'cursor-grab'}`}
              onWheel={(event) => {
                if (!event.ctrlKey && !event.metaKey) return;
                event.preventDefault();
                setZoom((value) => Math.min(1.6, Math.max(0.28, value - event.deltaY * 0.001)));
              }}
              onPointerDown={(event) => {
                if ((event.target as HTMLElement).closest('[data-node-id]')) return;
                (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
                setPanning({ x: pan.x, y: pan.y, startX: event.clientX, startY: event.clientY });
              }}
              onPointerMove={(event) => {
                if (nodeDragRef.current) { moveNodeDrag(event); return; }
                if (!panning) return;
                setPan({ x: panning.x + event.clientX - panning.startX, y: panning.y + event.clientY - panning.startY });
              }}
              onPointerUp={(event) => {
                if (nodeDragRef.current) finishNodeDrag(event.pointerId);
                setPanning(null);
              }}
              onPointerCancel={(event) => {
                if (nodeDragRef.current) finishNodeDrag(event.pointerId, true);
                setPanning(null);
              }}
              data-testid="structures-canvas"
            >
              <div className="absolute left-0 top-0 origin-top-left" style={{ width: layout.width, height: layout.height, transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
                <svg className="pointer-events-none absolute inset-0 overflow-visible" width={layout.width} height={layout.height} aria-hidden="true">
                  {layout.nodes.filter((node) => node.parentId).map((node) => {
                    const parent = nodeMap.get(node.parentId as string);
                    if (!parent) return null;
                    const x1 = parent.x + NODE_WIDTH;
                    const y1 = parent.y + NODE_HEIGHT / 2;
                    const x2 = node.x;
                    const y2 = node.y + NODE_HEIGHT / 2;
                    const mid = (x1 + x2) / 2;
                    return <path key={`hierarchy-${node.id}`} d={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`} fill="none" stroke="var(--space-border-strong)" strokeWidth="2" />;
                  })}
                  {draft.crossLinks.map((link) => {
                    const from = nodeMap.get(link.from);
                    const to = nodeMap.get(link.to);
                    if (!from || !to) return null;
                    return <path key={link.id} d={`M ${from.x + NODE_WIDTH / 2} ${from.y + NODE_HEIGHT} C ${from.x + NODE_WIDTH / 2} ${from.y + NODE_HEIGHT + 56}, ${to.x + NODE_WIDTH / 2} ${to.y - 56}, ${to.x + NODE_WIDTH / 2} ${to.y}`} fill="none" stroke="var(--space-brand-highlight)" strokeWidth="2" strokeDasharray="7 6" />;
                  })}
                </svg>
                {layout.nodes.map((node) => (
                  <div key={node.id} className="absolute" style={{ left: node.x, top: node.y, width: NODE_WIDTH, minHeight: NODE_HEIGHT, zIndex: nodeDrag?.movingIds.has(node.id) ? 10 : 1 }}>
                    <NodeEditor
                      node={node}
                      root={node.parentId === null}
                      highlighted={highlightIds.has(node.id)}
                      relationSource={relationFrom === node.id}
                      moveSource={moveFrom === node.id}
                      onText={(text) => updateText(node.id, text)}
                      onAddChild={() => addChild(node.id)}
                      onAddSibling={() => addSibling(node.id)}
                      onDelete={() => deleteNode(node.id)}
                      onRelation={() => handleRelation(node.id)}
                      onMove={() => handleMove(node.id)}
                      dragging={nodeDrag?.nodeId === node.id && nodeDrag.moved}
                      onPointerDown={(event) => startNodeDrag(event, node.id)}
                      shouldSuppressEdit={() => shouldSuppressNodeEdit(node.id)}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute bottom-3 left-3 rounded-lg bg-[var(--space-surface-card)] px-2.5 py-1.5 text-[9px] text-[var(--space-text-muted)] shadow-sm">Drag a node to move its subtree · Drag empty canvas to pan · Ctrl/⌘ + wheel to zoom</div>
            </div>

            <div className="space-y-2 bg-[var(--space-surface-page)] p-3 lg:hidden" data-testid="structures-mobile-editor">
              <p className="rounded-xl bg-[var(--space-surface-accent-soft)] p-3 text-xs leading-5 text-[var(--space-text-secondary)]">Mobile vertical editor: indentation shows hierarchy. Use Sub-issue or Related issue, the move button to reconnect a subtree, and the link button for dashed relationships. Drag-and-drop also works where touch dragging is supported.</p>
              {linearize(draft.nodes).map(({ node, depth }) => (
                <div key={node.id} draggable={node.parentId !== null} onDragStart={(event) => event.dataTransfer.setData('text/plain', node.id)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const moving = event.dataTransfer.getData('text/plain'); if (moving) moveNode(moving, node.id, event.shiftKey); }} style={{ marginLeft: `${Math.min(depth, 5) * 14}px` }}>
                  <NodeEditor node={node} root={node.parentId === null} highlighted={highlightIds.has(node.id)} relationSource={relationFrom === node.id} moveSource={moveFrom === node.id} onText={(text) => updateText(node.id, text)} onAddChild={() => addChild(node.id)} onAddSibling={() => addSibling(node.id)} onDelete={() => deleteNode(node.id)} onRelation={() => handleRelation(node.id)} onMove={() => handleMove(node.id)} />
                </div>
              ))}
            </div>
          </section>

          {draft.crossLinks.length ? (
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]"><Unlink className="h-3.5 w-3.5" /> Cross-branch relationships · dashed, never hierarchy</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {draft.crossLinks.map((link) => <button key={link.id} type="button" onClick={() => commit({ ...draft, crossLinks: draft.crossLinks.filter((item) => item.id !== link.id) })} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[var(--space-brand-highlight)] px-2.5 py-1.5 text-[10px] text-[var(--space-text-secondary)]" title="Remove relationship">{draft.nodes.find((node) => node.id === link.from)?.text.slice(0, 24)} ↔ {draft.nodes.find((node) => node.id === link.to)?.text.slice(0, 24)} <X className="h-3 w-3" /></button>)}
              </div>
            </section>
          ) : null}

          {error ? <p className="rounded-xl border border-[var(--space-semantic-danger)] bg-[var(--space-surface-card)] p-3 text-xs text-[var(--space-semantic-danger)]" role="alert">{error}</p> : null}

          <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">3 · Submit for case-specific feedback</p><p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">Mate evaluates your actual nodes, accepts multiple valid structures, and highlights the branches it discusses. No model tree is revealed before submission.</p></div>
              <button type="button" onClick={submit} disabled={submitting || draft.nodes.length < 2} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-4 text-sm font-bold text-[var(--space-text-on-primary)] disabled:opacity-45" data-testid="button-submit-structure-tree">{submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{submitting ? 'Mate is assessing…' : submissions.length ? 'Submit revised tree' : 'Submit my tree'}</button>
            </div>
          </section>

          {latest && viewState === 'feedback' ? (
            <section className="rounded-2xl border-2 border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] p-4" data-testid="structures-feedback">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">4 · Feedback mode · Version {submissions.length}</p><p className="mt-1 max-w-3xl text-sm leading-6 text-[var(--space-text-primary)]">{latest.feedback.summary}</p></div>
                <button type="button" onClick={() => { setViewState('editing'); setHighlightIds(new Set()); }} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-semibold text-[var(--space-text-secondary)]"><RotateCcw className="h-4 w-4" /> Revise tree</button>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {([
                  ['What works', latest.feedback.strengths, 'var(--space-semantic-success)'],
                  ['Improve next', latest.feedback.improvements, 'var(--space-semantic-warning)'],
                  ['Investigate first', latest.feedback.priorities, 'var(--space-brand-primary)'],
                ] as const).map(([label, items, tone]) => (
                  <div key={label} className="rounded-xl bg-[var(--space-surface-muted)] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: tone }}>{label}</p>
                    <div className="mt-2 space-y-2">
                      {items.length ? items.map((item, index) => <button key={`${item.title}-${index}`} type="button" onClick={() => setHighlightIds(new Set(item.nodeIds))} className="block w-full rounded-lg bg-[var(--space-surface-card)] p-2.5 text-left"><span className="block text-xs font-bold text-[var(--space-text-primary)]">{item.title}</span><span className="mt-1 block text-[11px] leading-4 text-[var(--space-text-secondary)]">{item.detail}</span>{item.nodeIds.length ? <span className="mt-1 block text-[9px] font-bold text-[var(--space-text-brand)]">Highlight {item.nodeIds.length} node{item.nodeIds.length === 1 ? '' : 's'}</span> : null}</button>) : <p className="text-[11px] text-[var(--space-text-muted)]">No item returned in this category.</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {submissions.length ? (
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">5 · Compare versions</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Submission snapshots stay locked while the current tree remains editable.</p></div><button type="button" onClick={() => setViewState(viewState === 'compare' ? 'editing' : 'compare')} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-semibold text-[var(--space-text-secondary)]"><History className="h-4 w-4" /> {viewState === 'compare' ? 'Hide comparison' : 'Compare versions'}</button></div>
              {viewState === 'compare' ? <div className="mt-3 grid gap-3 lg:grid-cols-3">{submissions.slice(-2).map((submission, index, shown) => <VersionCard key={submission.id} submission={submission} label={shown.length === 1 ? 'First submission' : index === 0 ? `Earlier · Version ${Math.max(1, submissions.length - 1)}` : `Latest · Version ${submissions.length}`} />)}<DraftVersionCard draft={draft} /></div> : null}
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
