/**
 * ConsultingToolkit.tsx — the framework reference area inside Case Pool.
 *
 * Each framework is an expandable card containing: when to use it, a visual
 * diagram, application steps, a Vietnam-context example, and common mistakes.
 * Content lives in lib/consultingFrameworks.ts; this file only handles display.
 *
 * DIAGRAMS: drawn with pure SVG and CSS per the brief — no static images. Each
 * diagram kind (tree, 2x2 matrix, hub, chevron chain, partition, double funnel,
 * pillars, stages, cashflow) has its own renderer and shares the `--space-*`
 * tokens, so colors follow the space theme automatically.
 */

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Compass, Flag, Lightbulb, ListChecks, Search, Star, Wrench } from 'lucide-react';
import { tw } from '../lib/colors';
import {
  CONSULTING_FRAMEWORKS,
  FRAMEWORK_CATEGORIES,
  searchFrameworks,
} from '../lib/consultingFrameworks';
import type { ConsultingFramework, FrameworkDiagram } from '../lib/consultingFrameworks';

/* =========================================================================
 * Diagrams
 * ======================================================================= */

function DiagramShell({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
      {children}
      {caption ? <p className="mt-2 text-[10px] leading-4 text-[var(--space-text-muted)]">{caption}</p> : null}
    </div>
  );
}

function TreeDiagram({ root, branches }: { root: string; branches: Array<{ label: string; children: string[] }> }) {
  return (
    <div className="flex flex-col items-center" data-testid="diagram-tree">
      <span className="rounded-lg bg-[var(--space-brand-primary-600)] px-3 py-1.5 text-center text-xs font-bold text-[var(--space-text-on-primary)]">
        {root}
      </span>
      <span className="h-3 w-px bg-[var(--space-border-strong)]" />
      <div className="grid w-full gap-3 sm:grid-cols-2">
        {branches.map((branch) => (
          <div key={branch.label} className="flex flex-col items-center">
            <span className="rounded-lg border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] px-3 py-1.5 text-center text-[11px] font-semibold text-[var(--space-text-brand)]">
              {branch.label}
            </span>
            <span className="h-2.5 w-px bg-[var(--space-border-strong)]" />
            <ul className="w-full space-y-1">
              {branch.children.map((child) => (
                <li
                  key={child}
                  className="rounded-md border-l-2 border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] px-2.5 py-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]"
                >
                  {child}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatrixDiagram({
  xLabel,
  yLabel,
  xLow,
  xHigh,
  yLow,
  yHigh,
  cells,
}: Extract<FrameworkDiagram, { kind: 'matrix' }>) {
  return (
    <div className="flex gap-2" data-testid="diagram-matrix">
      <div className="flex flex-col items-center justify-center">
        <span
          className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {yLabel}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex">
          <div className="w-14 shrink-0" />
          <div className="grid flex-1 grid-cols-2 gap-1 pb-1 text-center text-[9px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
            <span>{xLow}</span>
            <span>{xHigh}</span>
          </div>
        </div>
        {[0, 1].map((rowIndex) => (
          <div key={rowIndex} className="flex items-stretch">
            <div className="flex w-14 shrink-0 items-center justify-end pr-1.5 text-right text-[9px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
              {rowIndex === 0 ? yHigh : yLow}
            </div>
            <div className="grid flex-1 grid-cols-2 gap-1">
              {[0, 1].map((columnIndex) => {
                const cell = cells[rowIndex * 2 + columnIndex];
                if (!cell) return <div key={columnIndex} />;
                return (
                  <div
                    key={columnIndex}
                    className="rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] p-2"
                    style={{ minHeight: '80px' }}
                  >
                    <p className="text-[11px] font-bold leading-4 text-[var(--space-text-brand)]">{cell.label}</p>
                    <p className="mt-1 text-[10px] leading-4 text-[var(--space-text-secondary)]">{cell.note}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <p className="mt-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
          {xLabel}
        </p>
      </div>
    </div>
  );
}

function HubDiagram({ center, nodes }: Extract<FrameworkDiagram, { kind: 'hub' }>) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 96;
  return (
    <div data-testid="diagram-hub">
      <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-56 w-full max-w-xs" role="img" aria-label={center}>
        {nodes.map((node, index) => {
          const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          return (
            <g key={node.label}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--space-border-strong)" strokeWidth="1.5" />
              <circle cx={x} cy={y} r="22" fill="var(--space-surface-card)" stroke="var(--space-brand-primary-600)" strokeWidth="1.5" />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill="var(--space-text-brand)"
              >
                {index + 1}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="40" fill="var(--space-brand-primary-600)" />
        <text x={cx} y={cy + 3} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--space-text-on-primary)">
          {center.length > 16 ? `${center.slice(0, 15)}…` : center}
        </text>
      </svg>
      <ol className="mt-1 space-y-1.5">
        {nodes.map((node, index) => (
          <li key={node.label} className="flex gap-2 text-[11px] leading-4">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[9px] font-bold text-[var(--space-text-brand)]">
              {index + 1}
            </span>
            <span className="min-w-0">
              <span className="font-semibold text-[var(--space-text-primary)]">{node.label}</span>
              <span className="text-[var(--space-text-secondary)]"> — {node.note}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ChevronsDiagram({ support, primary }: Extract<FrameworkDiagram, { kind: 'chevrons' }>) {
  return (
    <div className="space-y-2" data-testid="diagram-chevrons">
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
        {support.map((item) => (
          <span
            key={item}
            className="rounded-md border border-dashed border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-2 py-1.5 text-center text-[10px] leading-3 text-[var(--space-text-secondary)]"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="text-center text-[9px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
        Support activities (cross-cutting)
      </p>
      <div className="flex flex-wrap items-stretch gap-1">
        {primary.map((item, index) => (
          <span
            key={item}
            className="flex-1 rounded-md px-2 py-2 text-center text-[10px] font-semibold leading-3 text-[var(--space-text-on-primary)]"
            style={{
              background: 'var(--space-brand-primary-600)',
              opacity: 0.62 + index * 0.09,
              minWidth: '84px',
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <p className="text-center text-[9px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
        Primary activities — value flows left to right
      </p>
    </div>
  );
}

function PartitionDiagram({ whole, parts }: Extract<FrameworkDiagram, { kind: 'partition' }>) {
  return (
    <div data-testid="diagram-partition">
      <div className="rounded-lg bg-[var(--space-brand-primary-600)] px-3 py-1.5 text-center text-xs font-bold text-[var(--space-text-on-primary)]">
        {whole}
      </div>
      <div className="mx-auto h-3 w-px bg-[var(--space-border-strong)]" />
      <div className="flex gap-1">
        {parts.map((part) => (
          <div
            key={part}
            className="flex-1 rounded-lg border-2 border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] px-2 py-2 text-center text-[10px] font-medium leading-4 text-[var(--space-text-secondary)]"
          >
            {part}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] leading-4 text-[var(--space-text-muted)]">
        No overlaps · together they cover everything
      </p>
    </div>
  );
}

function FunnelsDiagram({ left, right }: Extract<FrameworkDiagram, { kind: 'funnels' }>) {
  const column = (title: string, steps: string[], flip: boolean) => (
    <div className="min-w-0 flex-1">
      <p className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
        {title}
      </p>
      <div className="space-y-1">
        {steps.map((step, index) => {
          const shrink = flip ? index : steps.length - 1 - index;
          const width = 100 - shrink * 9;
          return (
            <div key={step} className="flex justify-center">
              <span
                className="rounded-md bg-[var(--space-surface-card)] px-2 py-1.5 text-center text-[10px] leading-3 text-[var(--space-text-secondary)]"
                style={{ width: `${Math.max(52, width)}%`, border: '1px solid var(--space-brand-primary-200)' }}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
  return (
    <div className="flex gap-3" data-testid="diagram-funnels">
      {column(left.title, left.steps, false)}
      <div className="w-px shrink-0 bg-[var(--space-border-strong)]" />
      {column(right.title, right.steps, true)}
    </div>
  );
}

function PillarsDiagram({ pillars }: Extract<FrameworkDiagram, { kind: 'pillars' }>) {
  return (
    <div data-testid="diagram-pillars">
      <div className={`grid gap-1.5 ${pillars.length >= 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}>
        {pillars.map((pillar) => (
          <div
            key={pillar.label}
            className="rounded-lg border-t-4 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-card)] p-2"
          >
            <p className="text-[11px] font-bold leading-4 text-[var(--space-text-brand)]">{pillar.label}</p>
            <p className="mt-1 text-[10px] leading-4 text-[var(--space-text-secondary)]">{pillar.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-[var(--space-brand-primary-200)]" />
    </div>
  );
}

function StagesDiagram({ stages }: Extract<FrameworkDiagram, { kind: 'stages' }>) {
  return (
    <ol className="space-y-1.5" data-testid="diagram-stages">
      {stages.map((stage, index) => (
        <li key={stage.label} className="flex gap-2">
          <div className="flex flex-col items-center">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--space-brand-primary-600)] text-[10px] font-bold text-[var(--space-text-on-primary)]">
              {index + 1}
            </span>
            {index < stages.length - 1 ? <span className="mt-0.5 w-px flex-1 bg-[var(--space-border-strong)]" /> : null}
          </div>
          <div className="min-w-0 flex-1 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 py-1.5">
            <p className="text-[11px] font-bold leading-4 text-[var(--space-text-primary)]">{stage.label}</p>
            <p className="mt-0.5 text-[10px] leading-4 text-[var(--space-text-secondary)]">{stage.note}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function CashflowDiagram({ periods, note }: Extract<FrameworkDiagram, { kind: 'cashflow' }>) {
  const max = Math.max(...periods.map((period) => Math.abs(period.value)), 1);
  return (
    <div data-testid="diagram-cashflow">
      <div className="flex items-end justify-between gap-1.5" style={{ height: '132px' }}>
        {periods.map((period) => {
          const positive = period.value >= 0;
          const height = (Math.abs(period.value) / max) * 52;
          return (
            <div key={period.label} className="flex min-w-0 flex-1 flex-col items-center justify-center" style={{ height: '100%' }}>
              <div className="flex w-full flex-1 flex-col items-center justify-end">
                {positive ? (
                  <>
                    <span className="text-[9px] font-bold text-[var(--space-text-primary)]">{period.value}</span>
                    <div
                      className="w-full rounded-t bg-[var(--space-brand-primary-600)]"
                      style={{ height: `${height}%` }}
                    />
                  </>
                ) : null}
              </div>
              <div className="h-px w-full bg-[var(--space-border-strong)]" />
              <div className="flex w-full flex-1 flex-col items-center justify-start">
                {!positive ? (
                  <>
                    <div
                      className="w-full rounded-b bg-[var(--space-semantic-danger)]"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[9px] font-bold text-[var(--space-semantic-danger)]">{period.value}</span>
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex justify-between gap-1.5">
        {periods.map((period) => (
          <span key={period.label} className="min-w-0 flex-1 truncate text-center text-[9px] text-[var(--space-text-muted)]">
            {period.label}
          </span>
        ))}
      </div>
      {note ? <p className="mt-2 text-[10px] leading-4 text-[var(--space-text-muted)]">{note}</p> : null}
    </div>
  );
}

function FrameworkDiagramView({ diagram }: { diagram: FrameworkDiagram }) {
  if (diagram.kind === 'tree') {
    return (
      <DiagramShell caption="Drill into each branch until you reach a number you can verify.">
        <TreeDiagram root={diagram.root} branches={diagram.branches} />
      </DiagramShell>
    );
  }
  if (diagram.kind === 'matrix') {
    return (
      <DiagramShell>
        <MatrixDiagram {...diagram} />
      </DiagramShell>
    );
  }
  if (diagram.kind === 'hub') {
    return (
      <DiagramShell>
        <HubDiagram {...diagram} />
      </DiagramShell>
    );
  }
  if (diagram.kind === 'chevrons') {
    return (
      <DiagramShell>
        <ChevronsDiagram {...diagram} />
      </DiagramShell>
    );
  }
  if (diagram.kind === 'partition') {
    return (
      <DiagramShell>
        <PartitionDiagram {...diagram} />
      </DiagramShell>
    );
  }
  if (diagram.kind === 'funnels') {
    return (
      <DiagramShell caption="Two paths running in opposite directions — use the second to cross-check your result.">
        <FunnelsDiagram {...diagram} />
      </DiagramShell>
    );
  }
  if (diagram.kind === 'pillars') {
    return (
      <DiagramShell>
        <PillarsDiagram {...diagram} />
      </DiagramShell>
    );
  }
  if (diagram.kind === 'stages') {
    return (
      <DiagramShell>
        <StagesDiagram {...diagram} />
      </DiagramShell>
    );
  }
  return (
    <DiagramShell>
      <CashflowDiagram {...diagram} />
    </DiagramShell>
  );
}

/* =========================================================================
 * Framework card
 * ======================================================================= */

const PRIORITY_FRAMEWORK_PATTERNS = [
  /issue\s*tree|mece/,
  /profitabil/,
  /market\s*sizing/,
  /porter.*(?:5|five).*forces?/,
  /mckinsey.*7[\s-]*s|\b7[\s-]*s\b/,
  /value\s*chain/,
  /bcg|growth[\s-]*share/,
];

function isPriorityFramework(framework: ConsultingFramework): boolean {
  const searchable = `${framework.id} ${framework.name} ${framework.nameEn}`.toLowerCase();
  return PRIORITY_FRAMEWORK_PATTERNS.some((pattern) => pattern.test(searchable));
}

function FrameworkCard({
  framework,
  expanded,
  onToggle,
}: {
  framework: ConsultingFramework;
  expanded: boolean;
  onToggle: () => void;
}) {
  const priority = isPriorityFramework(framework);
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-[var(--space-surface-card)] ${
        priority ? 'border-[var(--space-brand-primary-200)]' : 'border-[var(--space-border-default)]'
      }`}
      data-testid={`framework-card-${framework.id}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--space-surface-card-hover)]"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold leading-5 text-[var(--space-text-primary)]">{framework.name}</p>
            {priority ? (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-[var(--space-brand-primary-600)] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-[var(--space-text-on-primary)]"
                data-testid={`framework-priority-${framework.id}`}
              >
                <Star className="h-2.5 w-2.5 fill-current" /> Most Used
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-[11px] font-medium text-[var(--space-text-muted)]">{framework.nameEn}</p>
          <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">{framework.summary}</p>
        </div>
        {expanded ? (
          <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-[var(--space-text-muted)]" />
        ) : (
          <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[var(--space-text-muted)]" />
        )}
      </button>

      {expanded ? (
        <div className="space-y-4 border-t border-[var(--space-border-default)] px-4 py-4">
          <section>
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
              <Compass className="h-3.5 w-3.5 shrink-0" />
              When to use
            </p>
            <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">{framework.whenToUse}</p>
            <ul className="mt-2 space-y-1">
              {framework.triggers.map((trigger) => (
                <li
                  key={trigger}
                  className="rounded-lg bg-[var(--space-surface-muted)] px-2.5 py-1.5 text-[11px] italic leading-4 text-[var(--space-text-secondary)]"
                >
                  “{trigger}”
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Diagram</p>
            <FrameworkDiagramView diagram={framework.diagram} />
          </section>

          <section>
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
              <ListChecks className="h-3.5 w-3.5 shrink-0" />
              How to apply it
            </p>
            <ol className="mt-2 space-y-1.5">
              {framework.steps.map((step, index) => (
                <li key={index} className="flex gap-2 text-xs leading-5 text-[var(--space-text-secondary)]">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[9px] font-bold text-[var(--space-text-brand)]">
                    {index + 1}
                  </span>
                  <span className="min-w-0">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
              <Lightbulb className="h-3.5 w-3.5 shrink-0" />
              Example — {framework.example.title}
            </p>
            <div className="mt-2 space-y-2">
              {framework.example.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-xs leading-6 text-[var(--space-text-secondary)]">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section>
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-semantic-warning)]">
              <Flag className="h-3.5 w-3.5 shrink-0" />
              Common mistakes
            </p>
            <ul className="mt-1.5 space-y-1">
              {framework.mistakes.map((mistake, index) => (
                <li key={index} className="flex gap-2 text-xs leading-5 text-[var(--space-text-secondary)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--space-semantic-warning)]" />
                  <span className="min-w-0">{mistake}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}
    </div>
  );
}

/* =========================================================================
 * Reference area
 * ======================================================================= */

export default function ConsultingToolkit({ initialFrameworkId }: { initialFrameworkId?: string }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [openId, setOpenId] = useState<string | null>(initialFrameworkId || null);

  const results = useMemo(() => searchFrameworks(query, category), [query, category]);

  return (
    <div className="space-y-4" data-testid="consulting-toolkit">
      <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]">
            <Wrench className="h-5 w-5 text-[var(--space-text-brand)]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-[var(--space-text-primary)]">Consulting Toolkit</h2>
            <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">
              The full {CONSULTING_FRAMEWORKS.length}-framework consulting library — from the interview classics to strategy, growth, business-model, innovation, and operations tools. Each comes with a diagram, application steps, a Vietnamese business example, and common mistakes.
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold leading-4 text-[var(--space-text-brand)]">
              <Star className="h-3.5 w-3.5 fill-current" />
              Frameworks marked ★ are most commonly tested in MT and consulting interviews.
            </p>
          </div>
        </div>

        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by framework name or situation: profitability, market entry, pricing…"
            aria-label="Search frameworks"
            className={`${tw.input.base} ${tw.input.default} py-2.5 pl-9 text-sm`}
            data-testid="input-framework-search"
          />
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {FRAMEWORK_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                category === item.id
                  ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                  : 'border border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'
              }`}
              data-testid={`framework-category-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-8 text-center">
          <p className="text-sm font-semibold text-[var(--space-text-primary)]">No frameworks match</p>
          <p className="mt-1 text-xs text-[var(--space-text-secondary)]">
            Try a shorter keyword, or clear the category filter to see all {CONSULTING_FRAMEWORKS.length} frameworks.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            className={`mt-3 rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.secondary}`}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-[11px] text-[var(--space-text-muted)]">
            {results.length} frameworks · tap a card to open its diagram and example
          </p>
          <div className="space-y-2.5">
            {results.map((framework) => (
              <FrameworkCard
                key={framework.id}
                framework={framework}
                expanded={openId === framework.id}
                onToggle={() => setOpenId((current) => (current === framework.id ? null : framework.id))}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
