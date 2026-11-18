import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ClipboardPaste, Copy, Plus, Redo2, Trash2, Undo2 } from 'lucide-react';

export const NODE_WIDTH = 200;
export const NODE_HEIGHT = 104;
export const HORIZONTAL_GAP = 44;
export const VERTICAL_GAP = 168;
export const LAYOUT_PADDING = 36;
export const ROOT_WIDTH = 380;
export const ROOT_MIN_HEIGHT = 120;

export interface TreeNode {
  id: string;
  parentId: string | null;
  text: string;
  order: number;
  x?: number;
  y?: number;
}

export interface CrossLink {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface TreeDraft {
  nodes: TreeNode[];
  crossLinks: CrossLink[];
}

export interface LayoutNode extends TreeNode {
  x: number;
  y: number;
  w: number;
  h: number;
  depth: number;
}

export function treeUid(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function childrenOf(nodes: TreeNode[], parentId: string | null): TreeNode[] {
  return nodes.filter((node) => node.parentId === parentId).sort((a, b) => a.order - b.order);
}

export function descendantsOf(nodes: TreeNode[], nodeId: string): Set<string> {
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

export function normalizeOrders(nodes: TreeNode[]): TreeNode[] {
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

export function layoutTree(
  nodes: TreeNode[],
  rootWidth: number = ROOT_WIDTH,
  rootHeight: number = ROOT_MIN_HEIGHT,
): { nodes: LayoutNode[]; width: number; height: number } {
  const positioned = new Map<string, LayoutNode>();
  const knownIds = new Set(nodes.map((node) => node.id));
  const roots = nodes.filter((node) => node.parentId === null || !knownIds.has(node.parentId));
  const fallbackRoots = roots.length ? roots : nodes.slice(0, 1);
  const primaryRootId = fallbackRoots[0]?.id;
  const primaryRootHeight = Math.max(ROOT_MIN_HEIGHT, rootHeight);
  const primaryRootWidth = Math.max(NODE_WIDTH, rootWidth);
  let cursor = LAYOUT_PADDING;
  let maxDepth = 0;

  const widthOf = (node: TreeNode) => (node.id === primaryRootId ? primaryRootWidth : NODE_WIDTH);
  const heightOf = (node: TreeNode) => (node.id === primaryRootId ? primaryRootHeight : NODE_HEIGHT);
  // Depth-1 nodes sit a fixed clearance below the (variable-height) root; deeper levels keep the standard step.
  const yForDepth = (depth: number) => {
    if (depth === 0) return LAYOUT_PADDING;
    return LAYOUT_PADDING + primaryRootHeight + (VERTICAL_GAP - NODE_HEIGHT) + (depth - 1) * VERTICAL_GAP;
  };
  const childrenBlockWidth = (children: TreeNode[]): number =>
    children.reduce((sum, child) => sum + subtreeWidth(child), 0) + HORIZONTAL_GAP * (children.length - 1);

  function subtreeWidth(node: TreeNode): number {
    const children = childrenOf(nodes, node.id);
    if (!children.length) return widthOf(node);
    return Math.max(widthOf(node), childrenBlockWidth(children));
  }

  const place = (node: TreeNode, depth: number, left: number): number => {
    const children = childrenOf(nodes, node.id);
    const width = subtreeWidth(node);
    let center = left + width / 2;
    if (children.length) {
      let childLeft = left + (width - childrenBlockWidth(children)) / 2;
      const childCenters = children.map((child) => {
        const childWidth = subtreeWidth(child);
        const childCenter = place(child, depth + 1, childLeft);
        childLeft += childWidth + HORIZONTAL_GAP;
        return childCenter;
      });
      center = (childCenters[0] + childCenters[childCenters.length - 1]) / 2;
    }
    maxDepth = Math.max(maxDepth, depth);
    positioned.set(node.id, {
      ...node,
      x: center - widthOf(node) / 2,
      y: yForDepth(depth),
      w: widthOf(node),
      h: heightOf(node),
      depth,
    });
    return center;
  };

  fallbackRoots.forEach((root) => {
    const width = subtreeWidth(root);
    place(root, 0, cursor);
    cursor += width + HORIZONTAL_GAP;
  });
  nodes.filter((node) => !positioned.has(node.id)).forEach((node) => {
    positioned.set(node.id, { ...node, x: cursor, y: LAYOUT_PADDING, w: NODE_WIDTH, h: NODE_HEIGHT, depth: 0 });
    cursor += NODE_WIDTH + HORIZONTAL_GAP;
  });

  let resolved = Array.from(positioned.values());
  const minX = resolved.reduce((value, node) => Math.min(value, node.x), Infinity);
  if (Number.isFinite(minX) && minX < LAYOUT_PADDING) {
    const shift = LAYOUT_PADDING - minX;
    resolved = resolved.map((node) => ({ ...node, x: node.x + shift }));
  }
  const contentWidth = resolved.reduce((value, node) => Math.max(value, node.x + node.w + LAYOUT_PADDING), 0);
  const contentHeight = resolved.reduce((value, node) => Math.max(value, node.y + node.h + LAYOUT_PADDING), 0);
  return {
    nodes: resolved,
    width: Math.max(NODE_WIDTH + LAYOUT_PADDING * 2, contentWidth),
    height: Math.max(LAYOUT_PADDING * 2 + NODE_HEIGHT, contentHeight),
  };
}

export function NodeEditor({
  node,
  root,
  highlighted,
  selected,
  copied,
  pasted,
  canPaste,
  readOnly,
  extraActions,
  formatDisplay,
  onSelect,
  onText,
  onAddBelow,
  onAddBeside,
  onCopy,
  onPaste,
  onDelete,
  onMeasure,
}: {
  node: TreeNode;
  root: boolean;
  highlighted: boolean;
  selected: boolean;
  copied: boolean;
  pasted: boolean;
  canPaste: boolean;
  readOnly?: boolean;
  extraActions?: ReactNode;
  formatDisplay?: (text: string) => string;
  onSelect: () => void;
  onText: (text: string) => void;
  onAddBelow: () => void;
  onAddBeside: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onDelete: () => void;
  onMeasure?: (height: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(node.text);
  const large = root && !!onMeasure;
  const articleRef = useRef<HTMLElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => setValue(node.text), [node.text]);
  useEffect(() => {
    const element = articleRef.current;
    if (!large || !element || !onMeasure) return;
    const measure = () => onMeasure(element.offsetHeight);
    measure();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(element);
    return () => observer?.disconnect();
  }, [large, onMeasure]);
  useLayoutEffect(() => {
    const area = textareaRef.current;
    if (!large || !editing || !area) return;
    area.style.height = 'auto';
    area.style.height = `${area.scrollHeight}px`;
  }, [large, editing, value]);
  const commit = () => {
    const next = value.trim();
    if (next && next !== node.text) onText(next);
    else setValue(node.text);
    setEditing(false);
  };
  const startEditing = () => { if (!readOnly) setEditing(true); };
  const actionClass = 'inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--space-neutral-700)] text-[var(--space-neutral-0)] transition-colors hover:bg-[var(--space-brand-primary)] disabled:cursor-not-allowed disabled:opacity-35';
  return (
    <article
      ref={articleRef}
      onClick={onSelect}
      onDoubleClick={startEditing}
      className={`relative border-2 border-[var(--space-brand-primary)] bg-white text-[var(--space-text-primary)] shadow-sm transition-shadow ${large ? 'min-h-[120px] p-4' : 'h-[104px] p-3'} ${
        selected
          ? 'shadow-[0_0_0_4px_color-mix(in_srgb,var(--space-brand-primary-500)_30%,transparent)] hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--space-brand-primary-500)_38%,transparent)]'
          : pasted
            ? 'shadow-[0_0_0_4px_color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)] hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--space-brand-primary-500)_28%,transparent)]'
            : copied
              ? 'border-dashed shadow-[0_0_0_3px_color-mix(in_srgb,var(--space-brand-primary-500)_12%,transparent)] hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--space-brand-primary-500)_22%,transparent)]'
              : highlighted
                ? 'shadow-[0_0_0_4px_color-mix(in_srgb,var(--space-semantic-warning)_24%,transparent)] hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--space-semantic-warning)_32%,transparent)]'
                : 'hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--space-brand-primary-500)_16%,transparent)]'
      }`}
      data-node-id={node.id}
      data-testid={`structure-node-${node.id}`}
      aria-selected={selected}
    >
      {editing ? (
        <textarea
          ref={textareaRef}
          autoFocus
          value={value}
          onClick={(event) => event.stopPropagation()}
          onDoubleClick={(event) => event.stopPropagation()}
          onChange={(event) => setValue(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') commit();
            if (event.key === 'Escape') { setValue(node.text); setEditing(false); }
          }}
          rows={3}
          className={large
            ? 'block min-h-[84px] w-full resize-none overflow-hidden rounded-md border-2 border-[var(--space-brand-primary)] bg-white p-2 text-sm leading-6 text-[var(--space-text-primary)] outline-none'
            : 'h-full w-full resize-none rounded-md border-2 border-[var(--space-brand-primary)] bg-white p-2 text-xs leading-5 text-[var(--space-text-primary)] outline-none'}
          aria-label="Edit branch text"
        />
      ) : (
        <button
          type="button"
          onClick={(event) => { event.stopPropagation(); if (selected) startEditing(); else onSelect(); }}
          className={large
            ? 'flex min-h-[84px] w-full items-center justify-center whitespace-pre-wrap break-words text-center text-sm font-semibold leading-6 text-[var(--space-text-primary)] [overflow-wrap:anywhere]'
            : 'flex h-full w-full items-center justify-center overflow-hidden text-center text-xs font-semibold leading-5 text-[var(--space-text-primary)]'}
          title="Select; click again or double-click to edit"
        >
          {formatDisplay ? formatDisplay(node.text) : node.text}
        </button>
      )}
      {selected && !editing && !readOnly ? (
        <div data-node-action className="absolute -bottom-9 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-1 shadow-lg" onClick={(event) => event.stopPropagation()}>
          <button type="button" onClick={onAddBelow} className={actionClass} title="Add branch below" aria-label="Add branch below"><span className="relative"><Plus className="h-3.5 w-3.5" /><ArrowDown className="absolute -bottom-1.5 -right-1.5 h-2.5 w-2.5" /></span></button>
          {!root ? <button type="button" onClick={onAddBeside} className={actionClass} title="Add one next to this" aria-label="Add one next to this"><span className="relative"><Plus className="h-3.5 w-3.5" /><ArrowRight className="absolute -bottom-1.5 -right-1.5 h-2.5 w-2.5" /></span></button> : null}
          <button type="button" onClick={onCopy} className={actionClass} title="Copy" aria-label="Copy"><Copy className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={onPaste} disabled={!canPaste} className={actionClass} title="Paste" aria-label="Paste"><ClipboardPaste className="h-3.5 w-3.5" /></button>
          {!root ? <button type="button" onClick={onDelete} className={`${actionClass} hover:bg-[var(--space-semantic-danger)]`} title="Delete" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button> : null}
          {extraActions}
        </div>
      ) : null}
    </article>
  );
}

export const treeActionButtonClass = 'inline-flex h-7 items-center justify-center rounded-md bg-[var(--space-neutral-700)] px-2 text-[10px] font-bold text-[var(--space-neutral-0)] transition-colors hover:bg-[var(--space-brand-primary)] disabled:cursor-not-allowed disabled:opacity-35';

export interface StructureTreeEditing {
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  copiedSubtree: TreeNode[];
  pastedNodeIds: Set<string>;
  commitDraft: (next: TreeDraft) => void;
  addBelow: (parentId: string) => void;
  addBeside: (nodeId: string) => void;
  deleteNode: (nodeId: string) => void;
  updateText: (nodeId: string, text: string) => void;
  copyBranch: (nodeId: string) => void;
  pasteBranch: (requestedTargetId?: string | null) => void;
}

export function useStructureTreeEditing({
  draft,
  commit,
  undo,
  redo,
  enabled = true,
}: {
  draft: TreeDraft;
  commit: (next: TreeDraft) => void;
  undo: () => void;
  redo: () => void;
  enabled?: boolean;
}): StructureTreeEditing {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [copiedSubtree, setCopiedSubtree] = useState<TreeNode[]>([]);
  const [pastedNodeIds, setPastedNodeIds] = useState<Set<string>>(new Set());

  const commitDraft = (next: TreeDraft) => {
    commit(next);
    setPastedNodeIds(new Set());
  };

  useEffect(() => {
    if (selectedNodeId && !draft.nodes.some((node) => node.id === selectedNodeId)) setSelectedNodeId(null);
  }, [draft.nodes, selectedNodeId]);

  const addBelow = (parentId: string) => {
    const id = treeUid('node');
    commitDraft({
      ...draft,
      nodes: [...draft.nodes, {
        id,
        parentId,
        text: 'New branch',
        order: childrenOf(draft.nodes, parentId).length,
      }],
    });
    setSelectedNodeId(id);
  };

  const addBeside = (nodeId: string) => {
    const node = draft.nodes.find((item) => item.id === nodeId);
    if (!node || node.parentId === null) return;
    const id = treeUid('node');
    commitDraft({
      ...draft,
      nodes: [...draft.nodes, {
        id,
        parentId: node.parentId,
        text: 'New branch',
        order: childrenOf(draft.nodes, node.parentId).length,
      }],
    });
    setSelectedNodeId(id);
  };

  const deleteNode = (nodeId: string) => {
    const node = draft.nodes.find((item) => item.id === nodeId);
    if (!node || node.parentId === null) return;
    const removing = descendantsOf(draft.nodes, nodeId);
    if (removing.size > 1 && !window.confirm('Delete this branch and everything below it?')) return;
    commitDraft({
      nodes: draft.nodes.filter((item) => !removing.has(item.id)),
      crossLinks: draft.crossLinks.filter((link) => !removing.has(link.from) && !removing.has(link.to)),
    });
    setSelectedNodeId(node.parentId);
  };

  const updateText = (nodeId: string, text: string) => commitDraft({ ...draft, nodes: draft.nodes.map((node) => node.id === nodeId ? { ...node, text } : node) });

  const copyBranch = (nodeId: string) => {
    const ids = descendantsOf(draft.nodes, nodeId);
    const copied = draft.nodes
      .filter((node) => ids.has(node.id))
      .map((node) => ({ ...node, parentId: node.id === nodeId ? null : node.parentId }));
    setCopiedSubtree(copied);
    setPastedNodeIds(new Set());
  };

  const pasteBranch = (requestedTargetId?: string | null) => {
    if (!copiedSubtree.length) return;
    const root = draft.nodes.find((node) => node.parentId === null) || draft.nodes[0];
    const targetId = requestedTargetId && draft.nodes.some((node) => node.id === requestedTargetId)
      ? requestedTargetId
      : root?.id;
    if (!targetId) return;
    const sourceRoot = copiedSubtree.find((node) => node.parentId === null) || copiedSubtree[0];
    const idMap = new Map(copiedSubtree.map((node) => [node.id, treeUid('node')]));
    const pasted = copiedSubtree.map((node) => ({
      id: idMap.get(node.id) as string,
      parentId: node.id === sourceRoot.id ? targetId : idMap.get(node.parentId as string) || targetId,
      text: node.text,
      order: node.id === sourceRoot.id ? childrenOf(draft.nodes, targetId).length : node.order,
    }));
    commitDraft({ ...draft, nodes: [...draft.nodes, ...pasted] });
    setPastedNodeIds(new Set(pasted.map((node) => node.id)));
    setSelectedNodeId(idMap.get(sourceRoot.id) || targetId);
  };

  useEffect(() => {
    if (!enabled) return undefined;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      const key = event.key.toLowerCase();
      if (event.ctrlKey || event.metaKey) {
        if (key === 'z' && !event.shiftKey) { event.preventDefault(); undo(); return; }
        if (key === 'y' || (key === 'z' && event.shiftKey)) { event.preventDefault(); redo(); return; }
        if (key === 'c' && selectedNodeId) { event.preventDefault(); copyBranch(selectedNodeId); return; }
        if (key === 'v' && copiedSubtree.length) { event.preventDefault(); pasteBranch(selectedNodeId); }
        return;
      }
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNodeId) {
        const selected = draft.nodes.find((node) => node.id === selectedNodeId);
        if (selected?.parentId !== null) {
          event.preventDefault();
          deleteNode(selectedNodeId);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled, undo, redo, selectedNodeId, copiedSubtree, draft]);

  return { selectedNodeId, setSelectedNodeId, copiedSubtree, pastedNodeIds, commitDraft, addBelow, addBeside, deleteNode, updateText, copyBranch, pasteBranch };
}

export function StructureTreeCanvas({
  draft,
  editor,
  highlightIds,
  readOnly,
  renderExtraActions,
  eyebrow = '2 · Build your tree',
  description = 'Select a box to show actions. Click it again or double-click to edit. The layout updates automatically.',
  headerActions,
  testId = 'structures-canvas',
  formatDisplay,
}: {
  draft: TreeDraft;
  editor: StructureTreeEditing;
  highlightIds?: Set<string>;
  readOnly?: boolean;
  formatDisplay?: (text: string) => string;
  renderExtraActions?: (node: TreeNode) => ReactNode;
  eyebrow?: string;
  description?: string;
  headerActions?: ReactNode;
  testId?: string;
}) {
  const { selectedNodeId, setSelectedNodeId, copiedSubtree, pastedNodeIds } = editor;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [hostWidth, setHostWidth] = useState(1200);
  const [rootHeight, setRootHeight] = useState(ROOT_MIN_HEIGHT);
  const handleRootMeasure = useCallback((height: number) => {
    setRootHeight((current) => (Math.abs(current - height) >= 1 ? Math.max(ROOT_MIN_HEIGHT, height) : current));
  }, []);
  const rootWidth = hostWidth < 640 ? Math.max(NODE_WIDTH, Math.min(ROOT_WIDTH, hostWidth - 32 - LAYOUT_PADDING * 2)) : ROOT_WIDTH;
  const layout = useMemo(() => layoutTree(draft.nodes, rootWidth, rootHeight), [draft.nodes, rootWidth, rootHeight]);
  const nodeMap = useMemo(() => new Map(layout.nodes.map((node) => [node.id, node])), [layout.nodes]);
  const layoutScale = Math.min(1, Math.max(hostWidth < 640 ? 0.8 : 0.7, (hostWidth - 32) / layout.width));
  const renderedWidth = Math.ceil(layout.width * layoutScale);
  const renderedHeight = Math.ceil((layout.height + 48) * layoutScale);
  const centeredRef = useRef(false);
  useEffect(() => { centeredRef.current = false; }, [hostWidth]);
  useEffect(() => {
    const host = canvasRef.current;
    if (!host || centeredRef.current || host.scrollWidth <= host.clientWidth) return;
    host.scrollLeft = (host.scrollWidth - host.clientWidth) / 2;
    centeredRef.current = true;
  }, [hostWidth, renderedWidth]);

  useEffect(() => {
    const host = canvasRef.current;
    if (!host) return undefined;
    const update = () => setHostWidth(host.clientWidth || 1200);
    update();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    observer?.observe(host);
    window.addEventListener('resize', update);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const primaryRootId = layout.nodes.find((item) => item.parentId === null)?.id;

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
      <div className="flex flex-wrap items-start gap-3 border-b border-[var(--space-border-default)] p-3">
        <div className="mr-auto min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">{eyebrow}</p>
          <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">{description}</p>
        </div>
        <div className="rounded-lg bg-[var(--space-surface-muted)] px-3 py-2 text-[10px] leading-4 text-[var(--space-text-secondary)]">
          Ctrl/⌘ C copies · Ctrl/⌘ V pastes · Delete removes
        </div>
        {headerActions}
      </div>

      <div
        ref={canvasRef}
        className="w-full overflow-x-auto overflow-y-hidden bg-[var(--space-surface-page)] px-2 py-4 sm:px-4"
        onClick={(event) => {
          if (!(event.target as HTMLElement).closest('[data-node-id]')) setSelectedNodeId(null);
        }}
        data-testid={testId}
      >
        <div className="relative mx-auto" style={{ width: renderedWidth, height: renderedHeight }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: layout.width, height: layout.height + 48, transform: `scale(${layoutScale})` }}>
            <svg className="pointer-events-none absolute inset-0 overflow-visible" width={layout.width} height={layout.height} aria-hidden="true">
              {layout.nodes.filter((node) => node.parentId).map((node) => {
                const parent = nodeMap.get(node.parentId as string);
                if (!parent) return null;
                const x1 = parent.x + parent.w / 2;
                const y1 = parent.y + parent.h;
                const x2 = node.x + node.w / 2;
                const y2 = node.y;
                const midY = y1 + (y2 - y1) / 2;
                return <path key={`hierarchy-${node.id}`} d={`M ${x1} ${y1} V ${midY} H ${x2} V ${y2}`} fill="none" stroke="var(--space-brand-primary)" strokeWidth="2" strokeLinejoin="round" />;
              })}
              {draft.crossLinks.map((link) => {
                const from = nodeMap.get(link.from);
                const to = nodeMap.get(link.to);
                if (!from || !to) return null;
                return <path key={link.id} d={`M ${from.x + from.w / 2} ${from.y + from.h} C ${from.x + from.w / 2} ${from.y + from.h + 44}, ${to.x + to.w / 2} ${to.y - 44}, ${to.x + to.w / 2} ${to.y}`} fill="none" stroke="var(--space-brand-primary)" strokeWidth="2" strokeDasharray="7 6" />;
              })}
            </svg>
            {layout.nodes.map((node) => (
              <div key={node.id} className="absolute" style={{ left: node.x, top: node.y, width: node.w, height: node.h, zIndex: selectedNodeId === node.id ? 10 : 1 }}>
                <NodeEditor
                  node={node}
                  root={node.parentId === null}
                  highlighted={!!highlightIds?.has(node.id)}
                  selected={selectedNodeId === node.id}
                  copied={copiedSubtree.some((copiedNode) => copiedNode.id === node.id)}
                  pasted={pastedNodeIds.has(node.id)}
                  canPaste={copiedSubtree.length > 0}
                  readOnly={readOnly}
                  extraActions={node.parentId === null ? undefined : renderExtraActions?.(node)}
                  formatDisplay={formatDisplay}
                  onSelect={() => setSelectedNodeId(node.id)}
                  onText={(text) => editor.updateText(node.id, text)}
                  onAddBelow={() => editor.addBelow(node.id)}
                  onAddBeside={() => editor.addBeside(node.id)}
                  onCopy={() => editor.copyBranch(node.id)}
                  onPaste={() => editor.pasteBranch(node.id)}
                  onDelete={() => editor.deleteNode(node.id)}
                  onMeasure={node.id === primaryRootId ? handleRootMeasure : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function useStructureTreeHistory(draft: TreeDraft, onChange: (next: TreeDraft) => void) {
  const [undoStack, setUndoStack] = useState<TreeDraft[]>([]);
  const [redoStack, setRedoStack] = useState<TreeDraft[]>([]);
  const commit = useCallback((next: TreeDraft) => {
    setUndoStack((stack) => [...stack.slice(-49), draft]);
    setRedoStack([]);
    onChange({ nodes: normalizeOrders(next.nodes), crossLinks: next.crossLinks });
  }, [draft, onChange]);
  const undo = useCallback(() => {
    const previous = undoStack[undoStack.length - 1];
    if (!previous) return;
    setUndoStack((stack) => stack.slice(0, -1));
    setRedoStack((stack) => [...stack, draft]);
    onChange(previous);
  }, [draft, onChange, undoStack]);
  const redo = useCallback(() => {
    const next = redoStack[redoStack.length - 1];
    if (!next) return;
    setRedoStack((stack) => stack.slice(0, -1));
    setUndoStack((stack) => [...stack, draft]);
    onChange(next);
  }, [draft, onChange, redoStack]);
  return { commit, undo, redo, canUndo: undoStack.length > 0, canRedo: redoStack.length > 0 };
}

export function StructureTreeUndoRedo({ onUndo, onRedo, canUndo, canRedo }: { onUndo: () => void; onRedo: () => void; canUndo: boolean; canRedo: boolean }) {
  return (
    <div className="flex gap-1">
      <button type="button" onClick={onUndo} disabled={!canUndo} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--space-border-default)] disabled:opacity-35" title="Undo (Ctrl+Z)"><Undo2 className="h-4 w-4" /></button>
      <button type="button" onClick={onRedo} disabled={!canRedo} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--space-border-default)] disabled:opacity-35" title="Redo (Ctrl+Y)"><Redo2 className="h-4 w-4" /></button>
    </div>
  );
}

export function StructureTreeEditor({
  draft,
  onChange,
  disabled,
  renderExtraActions,
  eyebrow,
  description,
  testId,
  formatDisplay,
}: {
  draft: TreeDraft;
  onChange: (next: TreeDraft) => void;
  disabled?: boolean;
  renderExtraActions?: (node: TreeNode) => ReactNode;
  eyebrow?: string;
  description?: string;
  testId?: string;
  formatDisplay?: (text: string) => string;
}) {
  const history = useStructureTreeHistory(draft, onChange);
  const editor = useStructureTreeEditing({ draft, commit: history.commit, undo: history.undo, redo: history.redo, enabled: !disabled });
  return (
    <StructureTreeCanvas
      draft={draft}
      editor={editor}
      readOnly={disabled}
      renderExtraActions={renderExtraActions}
      eyebrow={eyebrow}
      description={description}
      testId={testId}
      formatDisplay={formatDisplay}
      headerActions={<StructureTreeUndoRedo onUndo={history.undo} onRedo={history.redo} canUndo={history.canUndo} canRedo={history.canRedo} />}
    />
  );
}
