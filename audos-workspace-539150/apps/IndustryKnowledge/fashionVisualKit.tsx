import { useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';

export interface VisualRow { label: string; a: string; b: string }
export interface VisualStep { label: string; detail: string; tag?: string }
export interface VisualBar { label: string; value: number; display: string }
export interface VisualPoint { label: string; x: number; y: number }

/** A node in a process: a stage, a decision point or an outcome. */
export interface FlowNode { label: string; detail?: string; kind?: 'stage' | 'decision' | 'outcome'; owner?: string }
export interface DecisionBranch { condition: string; outcome: string; detail?: string; tone?: 'positive' | 'caution' | 'negative' }
export interface TaxonomyGroup { label: string; detail?: string; items?: string[] }
export type FlowType = 'money' | 'product' | 'information' | 'risk' | 'service' | 'oversight';
export interface EcosystemActor { label: string; relation: string; flows?: FlowType[] }
export interface WaterfallItem { label: string; value: number; kind: 'start' | 'add' | 'subtract' | 'total' }
export interface DriverNode { label: string; detail?: string; op?: string; children?: Array<{ label: string; detail?: string }> }
export interface TimelineEvent { period: string; label: string; detail?: string; status?: 'historical' | 'current' | 'forecast' }
export interface ScenarioInput { key: string; label: string; min: number; max: number; step: number; value: number; unit: string }
export interface ScenarioOutput { label: string; unit: string; digits?: number; compute: (values: Record<string, number>) => number }

interface Base { title: string; kicker: string; takeaway: string }

export type VisualSpec = Base & (
  | { layout: 'table'; headers: [string, string, string]; rows: VisualRow[]; note?: string }
  | { layout: 'compare'; leftTitle: string; rightTitle: string; rows: VisualRow[]; note?: string }
  | { layout: 'steps'; steps: VisualStep[]; note: string; tagLabel?: string }
  | { layout: 'cards'; tagLabel: string; rows: VisualRow[] }
  | { layout: 'mindmap'; variant?: 'sides' | 'tree' | 'orbit'; center: string; centerSub?: string; tagLabel: string; rows: VisualRow[] }
  | { layout: 'pyramid'; tagLabel: string; rows: VisualRow[] }
  | { layout: 'bars'; bars: VisualBar[]; note: string }
  | { layout: 'matrix'; xLabel: string; xLow: string; xHigh: string; yLabel: string; yLow: string; yHigh: string; points: VisualPoint[]; note: string }
  | { layout: 'flow'; steps: FlowNode[]; loop?: string; note?: string }
  | { layout: 'pathway'; trunk: FlowNode[]; optionsLabel: string; options: TaxonomyGroup[]; afterLabel?: string; after?: FlowNode[]; note?: string }
  | { layout: 'decision'; root: FlowNode; question: string; branches: DecisionBranch[]; note?: string }
  | { layout: 'taxonomy'; root: string; rootDetail?: string; groups: TaxonomyGroup[]; note?: string }
  | { layout: 'ecosystem'; center: FlowNode; actors: EcosystemActor[]; note?: string }
  | { layout: 'waterfall'; unit: string; basis: string; items: WaterfallItem[]; note?: string }
  | { layout: 'driverTree'; root: FlowNode; formula?: string; drivers: DriverNode[]; note?: string }
  | { layout: 'timeline'; events: TimelineEvent[]; note?: string }
  | { layout: 'scenario'; inputs: ScenarioInput[]; outputs: ScenarioOutput[]; assumption: string; note?: string }
);

type Of<L extends VisualSpec['layout']> = Extract<VisualSpec, { layout: L }>;

export interface RowsSource { title: string; kicker: string; headers: [string, string, string]; rows: VisualRow[]; takeaway: string }
export type RowsStyle =
  | { layout: 'table' }
  | { layout: 'compare' }
  | { layout: 'cards' }
  | { layout: 'pyramid' }
  | { layout: 'mindmap'; center: string; centerSub?: string }
  | { layout: 'steps'; note: string };

/** Re-presents a three-column table spec as a diagram without rewriting its content. */
export function restyleRows(source: RowsSource, style: RowsStyle): VisualSpec {
  const base = { title: source.title, kicker: source.kicker, takeaway: source.takeaway };
  const tagLabel = source.headers[2];
  switch (style.layout) {
    case 'compare':
      return { ...base, layout: 'compare', leftTitle: source.headers[1], rightTitle: source.headers[2], rows: source.rows };
    case 'cards':
      return { ...base, layout: 'cards', tagLabel, rows: source.rows };
    case 'pyramid':
      return { ...base, layout: 'pyramid', tagLabel, rows: source.rows };
    case 'mindmap':
      return { ...base, layout: 'mindmap', center: style.center, centerSub: style.centerSub, tagLabel, rows: source.rows };
    case 'steps':
      return { ...base, layout: 'steps', tagLabel, note: style.note, steps: source.rows.map((row) => ({ label: row.label, detail: row.a, tag: row.b })) };
    default:
      return { ...base, layout: 'table', headers: source.headers, rows: source.rows };
  }
}

/** The reader already prints the "Learning visual" label, heading and intro, so the frame carries only the diagram and a short interpretation. */
function Frame({ spec, children }: { spec: Base; children: ReactNode }) {
  return (
    <figure className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6" aria-label={spec.title}>
      {spec.kicker ? <p className="text-[11px] font-semibold text-slate-500">{spec.kicker}</p> : null}
      {children}
      {spec.takeaway ? (
        <figcaption className="mt-4 border-l-2 border-red-500 pl-3 text-xs leading-5 text-slate-600">{spec.takeaway}</figcaption>
      ) : null}
    </figure>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[11px] leading-4 text-slate-500">{children}</p>;
}

function Connector({ vertical = false, row = false }: { vertical?: boolean; row?: boolean }) {
  return (
    <span aria-hidden className={`flex shrink-0 items-center justify-center text-slate-400 ${vertical ? 'h-6' : row ? 'w-6' : 'h-6 md:h-auto md:w-6'}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" className={vertical ? 'rotate-90' : row ? '' : 'rotate-90 md:rotate-0'}>
        <path d="M1 8h12M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const NODE_STYLE: Record<NonNullable<FlowNode['kind']>, string> = {
  stage: 'border border-slate-300 bg-white text-slate-900',
  decision: 'border border-dashed border-red-400 bg-white text-slate-900',
  outcome: 'border border-slate-900 bg-slate-900 text-white',
};

function Node({ node, className = '' }: { node: FlowNode; className?: string }) {
  const kind = node.kind ?? 'stage';
  const muted = kind === 'outcome' ? 'text-slate-300' : 'text-slate-500';
  return (
    <div className={`rounded-lg px-3 py-2.5 ${NODE_STYLE[kind]} ${className}`}>
      {kind === 'decision' ? <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-red-500">Decision point</p> : null}
      <p className="text-xs font-bold leading-4">{node.label}</p>
      {node.detail ? <p className={`mt-1 text-[11px] leading-4 ${muted}`}>{node.detail}</p> : null}
      {node.owner ? <p className={`mt-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] ${kind === 'outcome' ? 'text-red-300' : 'text-red-600'}`}>{node.owner}</p> : null}
    </div>
  );
}

const MIN_ROW_STEP_WIDTH = 140;
const ROW_CONNECTOR_WIDTH = 24;

/** A process reads left to right only when every step fits the width; otherwise it stacks, so no step is hidden behind a scrollbar. */
function useRowFits(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const update = () => setWidth(element.clientWidth);
    update();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, horizontal: width >= count * MIN_ROW_STEP_WIDTH + Math.max(0, count - 1) * ROW_CONNECTOR_WIDTH };
}

function FlowRow({ steps }: { steps: FlowNode[] }) {
  const { ref, horizontal } = useRowFits(steps.length);
  return (
    <div ref={ref}>
      <ol className={horizontal ? 'flex flex-row items-stretch' : 'mx-auto flex w-full max-w-xl flex-col'}>
        {steps.map((step, index) => (
          <li key={step.label} className={horizontal ? 'flex min-w-0 flex-1 flex-row items-stretch' : 'flex flex-col'}>
            {index > 0 ? <Connector vertical={!horizontal} row={horizontal} /> : null}
            <Node node={step} className={horizontal ? 'min-w-0 flex-1' : ''} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function FlowView({ spec }: { spec: Of<'flow'> }) {
  return (
    <Frame spec={spec}>
      <div className="mt-2">
        <FlowRow steps={spec.steps} />
        {spec.loop ? (
          <p className="mt-3 flex items-start gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-[11px] leading-4 text-slate-600">
            <span aria-hidden className="text-sm leading-4 text-red-500">↺</span>
            <span><span className="font-bold text-slate-800">Feedback loop: </span>{spec.loop}</span>
          </p>
        ) : null}
        {spec.note ? <Note>{spec.note}</Note> : null}
      </div>
    </Frame>
  );
}

/** Children joined to one parent by a horizontal bus; on small screens they stack. */
function Fan({ children, count }: { children: ReactNode; count: number }) {
  const cols = Math.min(Math.max(count, 1), 4);
  return (
    <div className="relative">
      <span aria-hidden className="absolute left-1/2 top-0 hidden h-4 w-px -translate-x-1/2 bg-slate-300 md:block" />
      <div className="relative md:pt-8">
        {count > 1 ? <span aria-hidden className="absolute top-4 hidden h-px bg-slate-300 md:block" style={{ left: `${50 / cols}%`, right: `${50 / cols}%` }} /> : null}
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${cols >= 4 ? 150 : 180}px, 1fr))` }}>{children}</div>
      </div>
    </div>
  );
}

function FanItem({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <span aria-hidden className="absolute -top-4 left-1/2 hidden h-4 w-px -translate-x-1/2 bg-slate-300 md:block" />
      {children}
    </div>
  );
}

function PathwayView({ spec }: { spec: Of<'pathway'> }) {
  return (
    <Frame spec={spec}>
      <div className="mt-2 flex flex-col items-center">
        {spec.trunk.map((node, index) => (
          <div key={node.label} className="flex w-full max-w-sm flex-col items-center">
            {index > 0 ? <Connector vertical /> : null}
            <Node node={node} className="w-full text-center" />
          </div>
        ))}
        <Connector vertical />
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{spec.optionsLabel}</p>
      </div>
      <Fan count={spec.options.length}>
        {spec.options.map((option) => (
          <FanItem key={option.label}>
            <div className="h-full rounded-lg border border-red-200 bg-red-50/40 px-3 py-2.5">
              <p className="text-xs font-bold leading-4 text-slate-900">{option.label}</p>
              {option.detail ? <p className="mt-1 text-[11px] leading-4 text-slate-600">{option.detail}</p> : null}
            </div>
          </FanItem>
        ))}
      </Fan>
      {spec.after?.length ? (
        <div className="mt-5 border-t border-slate-200 pt-4">
          {spec.afterLabel ? <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{spec.afterLabel}</p> : null}
          <FlowRow steps={spec.after} />
        </div>
      ) : null}
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

const TONE: Record<NonNullable<DecisionBranch['tone']>, string> = {
  positive: 'border-slate-900',
  caution: 'border-slate-400 border-dashed',
  negative: 'border-red-500',
};

function DecisionView({ spec }: { spec: Of<'decision'> }) {
  return (
    <Frame spec={spec}>
      <div className="mt-2 flex flex-col items-center">
        <Node node={spec.root} className="w-full max-w-sm text-center" />
        <Connector vertical />
        <Node node={{ label: spec.question, kind: 'decision' }} className="w-full max-w-sm text-center" />
      </div>
      <Fan count={spec.branches.length}>
        {spec.branches.map((branch) => (
          <FanItem key={branch.condition}>
            <div className="flex h-full flex-col items-stretch">
              <span className="mx-auto mb-1.5 rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700">{branch.condition}</span>
              <div className={`flex-1 rounded-lg border-2 bg-white px-3 py-2.5 ${TONE[branch.tone ?? 'positive']}`}>
                <p className="text-xs font-bold leading-4 text-slate-900">{branch.outcome}</p>
                {branch.detail ? <p className="mt-1 text-[11px] leading-4 text-slate-600">{branch.detail}</p> : null}
              </div>
            </div>
          </FanItem>
        ))}
      </Fan>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

function TaxonomyView({ spec }: { spec: Of<'taxonomy'> }) {
  return (
    <Frame spec={spec}>
      <div className="mt-2 flex flex-col items-center">
        <div className="w-full max-w-sm rounded-lg border border-slate-900 bg-slate-900 px-3 py-2.5 text-center text-white">
          <p className="text-xs font-bold leading-4">{spec.root}</p>
          {spec.rootDetail ? <p className="mt-1 text-[11px] leading-4 text-slate-300">{spec.rootDetail}</p> : null}
        </div>
      </div>
      <Fan count={spec.groups.length}>
        {spec.groups.map((group) => (
          <FanItem key={group.label}>
            <div className="h-full rounded-lg border border-slate-200 bg-white px-3 py-2.5">
              <p className="border-b border-slate-200 pb-1.5 text-xs font-bold leading-4 text-slate-900">{group.label}</p>
              {group.detail ? <p className="mt-1.5 text-[11px] leading-4 text-slate-600">{group.detail}</p> : null}
              {group.items?.length ? (
                <ul className="mt-1.5 space-y-1">
                  {group.items.map((item) => <li key={item} className="flex gap-1.5 text-[11px] leading-4 text-slate-600"><span aria-hidden className="text-red-500">–</span>{item}</li>)}
                </ul>
              ) : null}
            </div>
          </FanItem>
        ))}
      </Fan>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

const FLOW_LABEL: Record<FlowType, string> = { money: 'Money', product: 'Product / credit', information: 'Information', risk: 'Risk', service: 'Service', oversight: 'Oversight' };
const FLOW_STYLE: Record<FlowType, string> = {
  money: 'border-red-300 text-red-700',
  product: 'border-slate-400 text-slate-800',
  information: 'border-sky-300 text-sky-800',
  risk: 'border-amber-300 text-amber-800',
  service: 'border-slate-300 text-slate-600',
  oversight: 'border-violet-300 text-violet-800',
};

function EcosystemView({ spec }: { spec: Of<'ecosystem'> }) {
  const half = Math.ceil(spec.actors.length / 2);
  const used = Array.from(new Set(spec.actors.flatMap((actor) => actor.flows ?? [])));
  const actor = (item: EcosystemActor, side: 'left' | 'right') => (
    <div key={item.label} className="relative">
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5">
        <p className="text-xs font-bold leading-4 text-slate-900">{item.label}</p>
        <p className="mt-1 text-[11px] leading-4 text-slate-600">{item.relation}</p>
        {item.flows?.length ? (
          <p className="mt-1.5 flex flex-wrap gap-1">
            {item.flows.map((flow) => <span key={flow} className={`rounded-full border px-1.5 py-px text-[9px] font-bold uppercase tracking-[0.06em] ${FLOW_STYLE[flow]}`}>{FLOW_LABEL[flow]}</span>)}
          </p>
        ) : null}
      </div>
      <span aria-hidden className={`absolute top-1/2 hidden h-px w-6 bg-slate-300 md:block ${side === 'left' ? '-right-6' : '-left-6'}`} />
    </div>
  );
  return (
    <Frame spec={spec}>
      <div className="mt-2 grid gap-3 md:grid-cols-[1fr_11rem_1fr] md:gap-x-6">
        <div className="flex flex-col justify-center gap-3">{spec.actors.slice(0, half).map((item) => actor(item, 'left'))}</div>
        <div className="order-first flex items-center md:order-none">
          <Node node={{ ...spec.center, kind: 'outcome' }} className="w-full text-center" />
        </div>
        <div className="flex flex-col justify-center gap-3">{spec.actors.slice(half).map((item) => actor(item, 'right'))}</div>
      </div>
      {used.length ? (
        <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
          <span className="font-semibold">Relationship types:</span>
          {used.map((flow) => <span key={flow} className={`rounded-full border px-1.5 py-px font-bold uppercase tracking-[0.06em] ${FLOW_STYLE[flow]}`}>{FLOW_LABEL[flow]}</span>)}
        </p>
      ) : null}
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

function WaterfallView({ spec }: { spec: Of<'waterfall'> }) {
  let running = 0;
  const bars = spec.items.map((item) => {
    if (item.kind === 'start' || item.kind === 'total') {
      running = item.kind === 'start' ? item.value : running;
      return { ...item, low: 0, high: item.kind === 'start' ? item.value : running, shown: item.kind === 'start' ? item.value : running };
    }
    const before = running;
    running += item.kind === 'add' ? item.value : -item.value;
    return { ...item, low: Math.min(before, running), high: Math.max(before, running), shown: item.value };
  });
  const max = Math.max(...bars.map((bar) => bar.high), 1);
  const fill = { start: 'bg-slate-800', total: 'bg-slate-900', add: 'bg-slate-400', subtract: 'bg-red-500' } as const;
  return (
    <Frame spec={spec}>
      <p className="mt-1 text-[11px] font-semibold text-slate-500">{spec.unit} · {spec.basis}</p>
      <div className="mt-3 overflow-x-auto">
        <div className="flex min-w-[520px] items-end gap-2">
          {bars.map((bar) => (
            <div key={bar.label} className="flex flex-1 flex-col items-center">
              <div className="relative h-44 w-full">
                <div className={`absolute inset-x-1 rounded-sm ${fill[bar.kind]}`} style={{ bottom: `${(bar.low / max) * 100}%`, height: `${Math.max(((bar.high - bar.low) / max) * 100, 1)}%` }} />
                <span className="absolute inset-x-0 text-center text-[11px] font-bold text-slate-800" style={{ bottom: `calc(${(bar.high / max) * 100}% + 2px)` }}>
                  {bar.kind === 'subtract' ? '−' : bar.kind === 'add' ? '+' : ''}{bar.shown.toLocaleString('en-US')}
                </span>
              </div>
              <p className="mt-1.5 text-center text-[10px] font-semibold leading-3 text-slate-600">{bar.label}</p>
            </div>
          ))}
        </div>
      </div>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

function DriverTreeView({ spec }: { spec: Of<'driverTree'> }) {
  return (
    <Frame spec={spec}>
      <div className="mt-2 grid gap-4 md:grid-cols-[minmax(150px,13rem)_1fr] md:items-center">
        <div>
          <Node node={{ ...spec.root, kind: 'outcome' }} />
          {spec.formula ? <p className="mt-2 rounded-md bg-slate-50 px-2 py-1.5 font-mono text-[11px] leading-4 text-slate-700">{spec.formula}</p> : null}
        </div>
        <div className="relative space-y-2.5 md:pl-6">
          <span aria-hidden className="absolute inset-y-4 left-0 hidden w-px bg-slate-300 md:block" />
          {spec.drivers.map((driver) => (
            <div key={driver.label} className="relative flex items-start gap-2">
              <span aria-hidden className="absolute -left-6 top-4 hidden h-px w-6 bg-slate-300 md:block" />
              <span className="mt-2 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white px-1 text-[11px] font-bold text-red-600">{driver.op ?? '•'}</span>
              <div className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <p className="text-xs font-bold leading-4 text-slate-900">{driver.label}</p>
                {driver.detail ? <p className="mt-0.5 text-[11px] leading-4 text-slate-600">{driver.detail}</p> : null}
                {driver.children?.length ? (
                  <p className="mt-1.5 flex flex-wrap gap-1">
                    {driver.children.map((child) => <span key={child.label} title={child.detail} className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">{child.label}</span>)}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

function TimelineView({ spec }: { spec: Of<'timeline'> }) {
  return (
    <Frame spec={spec}>
      <ol className="relative mt-3 space-y-3 border-l border-slate-300 pl-5 md:flex md:space-y-0 md:border-l-0 md:border-t md:pl-0 md:pt-5">
        {spec.events.map((event) => {
          const forecast = event.status === 'forecast';
          return (
            <li key={`${event.period}-${event.label}`} className="relative md:flex-1 md:pr-3">
              <span aria-hidden className={`absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full md:-top-[25px] md:left-0 ${forecast ? 'border border-dashed border-red-500 bg-white' : 'bg-red-500'}`} />
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-red-600">{event.period}{forecast ? ' · forecast' : ''}</p>
              <p className="mt-0.5 text-xs font-bold leading-4 text-slate-900">{event.label}</p>
              {event.detail ? <p className="mt-0.5 text-[11px] leading-4 text-slate-600">{event.detail}</p> : null}
            </li>
          );
        })}
      </ol>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

const stop = (event: MouseEvent | KeyboardEvent) => event.stopPropagation();

function ScenarioView({ spec }: { spec: Of<'scenario'> }) {
  const [values, setValues] = useState<Record<string, number>>(() => Object.fromEntries(spec.inputs.map((input) => [input.key, input.value])));
  return (
    <Frame spec={spec}>
      <p className="mt-1 inline-block rounded-full border border-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-amber-800">Hypothetical inputs</p>
      <div className="mt-3 grid gap-4 md:grid-cols-2" onClick={stop} onKeyDown={stop}>
        <div className="space-y-3">
          {spec.inputs.map((input) => (
            <label key={input.key} className="block">
              <span className="flex justify-between text-[11px] font-semibold text-slate-700">
                <span>{input.label}</span>
                <span className="font-bold text-slate-900">{values[input.key].toLocaleString('en-US')} {input.unit}</span>
              </span>
              <input
                type="range"
                min={input.min}
                max={input.max}
                step={input.step}
                value={values[input.key]}
                onChange={(event) => setValues((current) => ({ ...current, [input.key]: Number(event.target.value) }))}
                className="mt-1 w-full accent-red-600"
                aria-label={input.label}
              />
            </label>
          ))}
        </div>
        <dl className="grid content-start gap-2" aria-live="polite">
          {spec.outputs.map((output) => {
            const value = output.compute(values);
            return (
              <div key={output.label} className="flex items-baseline justify-between rounded-lg border border-slate-200 px-3 py-2">
                <dt className="text-[11px] font-semibold text-slate-600">{output.label}</dt>
                <dd className="text-sm font-black text-slate-900">{Number.isFinite(value) ? value.toLocaleString('en-US', { maximumFractionDigits: output.digits ?? 1, minimumFractionDigits: output.digits ?? 1 }) : '—'} <span className="text-[10px] font-semibold text-slate-500">{output.unit}</span></dd>
              </div>
            );
          })}
        </dl>
      </div>
      <Note>{spec.assumption}</Note>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

function TableView({ spec }: { spec: Of<'table'> }) {
  return (
    <Frame spec={spec}>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-300">
              {spec.headers.map((heading) => (
                <th key={heading} className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spec.rows.map((row) => (
              <tr key={row.label}>
                <td className="border-b border-slate-100 px-3 py-2.5 align-top text-xs font-bold text-slate-900">{row.label}</td>
                <td className="border-b border-slate-100 px-3 py-2.5 align-top text-xs leading-5 text-slate-600">{row.a}</td>
                <td className="border-b border-slate-100 px-3 py-2.5 align-top text-xs font-semibold leading-5 text-slate-800">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

function CompareView({ spec }: { spec: Of<'compare'> }) {
  return (
    <Frame spec={spec}>
      <div className="mt-2 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[150px_1fr_1fr] gap-3 border-b border-slate-300 pb-2 text-[10px] font-bold uppercase tracking-[0.1em]">
            <span className="text-slate-400">Dimension</span>
            <span className="text-red-600">{spec.leftTitle}</span>
            <span className="text-slate-900">{spec.rightTitle}</span>
          </div>
          {spec.rows.map((row) => (
            <div key={row.label} className="grid grid-cols-[150px_1fr_1fr] gap-3 border-b border-slate-100 py-2.5">
              <p className="text-xs font-bold leading-5 text-slate-900">{row.label}</p>
              <p className="text-xs leading-5 text-slate-700">{row.a}</p>
              <p className="text-xs leading-5 text-slate-700">{row.b}</p>
            </div>
          ))}
        </div>
      </div>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

function StepsView({ spec }: { spec: Of<'steps'> }) {
  const { ref, horizontal } = useRowFits(spec.steps.length);
  return (
    <Frame spec={spec}>
      <div ref={ref} className="mt-2">
        <ol className={horizontal ? 'flex flex-row items-stretch' : 'mx-auto flex w-full max-w-xl flex-col'}>
          {spec.steps.map((step, index) => (
            <li key={step.label} className={horizontal ? 'flex min-w-0 flex-1 flex-row items-stretch' : 'flex flex-col'}>
              {index > 0 ? <Connector vertical={!horizontal} row={horizontal} /> : null}
              <div className={`rounded-lg border border-slate-300 bg-white px-3 py-2.5 ${horizontal ? 'min-w-0 flex-1' : ''}`}>
                <p className="text-xs font-bold leading-4 text-slate-900">{step.label}</p>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">{step.detail}</p>
                {step.tag ? (
                  <p className="mt-1.5 text-[11px] font-semibold leading-4 text-slate-700">
                    {spec.tagLabel ? <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-red-600">{spec.tagLabel}: </span> : null}{step.tag}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

function CardsView({ spec }: { spec: Of<'cards'> }) {
  return (
    <Frame spec={spec}>
      <ul className="mt-2 grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
        {spec.rows.map((row) => (
          <li key={row.label} className="flex flex-col rounded-lg border border-slate-200 bg-white px-3 py-2.5">
            <p className="text-xs font-bold leading-4 text-slate-900">{row.label}</p>
            <p className="mt-1 flex-1 text-[11px] leading-4 text-slate-600">{row.a}</p>
            <p className="mt-1.5 text-[11px] font-semibold leading-4 text-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-red-600">{spec.tagLabel}: </span>{row.b}
            </p>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

const BRANCH_ACCENTS = ['border-l-red-500', 'border-l-slate-700', 'border-l-red-300', 'border-l-slate-400'];

function SidesMind({ spec }: { spec: Of<'mindmap'> }) {
  const half = Math.ceil(spec.rows.length / 2);
  const leftRows = spec.rows.slice(0, half);
  const rightRows = spec.rows.slice(half);
  const branch = (row: VisualRow, index: number, side: 'left' | 'right') => (
    <div key={row.label} className="relative">
      <div className={`rounded-lg border border-slate-200 border-l-4 ${BRANCH_ACCENTS[index % BRANCH_ACCENTS.length]} bg-white p-3`}>
        <BranchBody row={row} tagLabel={spec.tagLabel} />
      </div>
      <span aria-hidden className={`absolute top-1/2 hidden h-px w-8 -translate-y-1/2 bg-slate-300 md:block ${side === 'left' ? '-right-8' : '-left-8'}`} />
    </div>
  );
  return (
    <Frame spec={spec}>
      <div className="mt-2 grid gap-3 md:grid-cols-[1fr_10rem_1fr] md:gap-x-8">
        <div className="flex flex-col justify-center gap-3">{leftRows.map((row, index) => branch(row, index, 'left'))}</div>
        <div className="order-first flex items-center justify-center md:order-none">
          <CenterNode spec={spec} />
        </div>
        <div className="flex flex-col justify-center gap-3">{rightRows.map((row, index) => branch(row, index + half, 'right'))}</div>
      </div>
    </Frame>
  );
}

function BranchBody({ row, tagLabel }: { row: VisualRow; tagLabel: string }) {
  return (
    <>
      <p className="text-xs font-bold leading-4 text-slate-900">{row.label}</p>
      <p className="mt-1 text-[11px] leading-4 text-slate-600">{row.a}</p>
      <p className="mt-1.5 text-[11px] font-semibold leading-4 text-slate-700">
        <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-red-600">{tagLabel}: </span>{row.b}
      </p>
    </>
  );
}

function CenterNode({ spec }: { spec: Of<'mindmap'> }) {
  return (
    <div className="w-full max-w-xs rounded-lg bg-slate-900 px-4 py-3 text-center text-white">
      <span className="block text-xs font-bold leading-tight">{spec.center}</span>
      {spec.centerSub ? <span className="mt-1 block text-[10px] leading-tight text-slate-300">{spec.centerSub}</span> : null}
    </div>
  );
}

function TreeMind({ spec }: { spec: Of<'mindmap'> }) {
  return (
    <Frame spec={spec}>
      <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
        <div className="md:w-44 md:shrink-0"><CenterNode spec={spec} /></div>
        <span aria-hidden className="hidden h-px w-8 shrink-0 bg-slate-300 md:block" />
        <div className="relative flex-1 space-y-2.5 md:pl-6">
          <span aria-hidden className="absolute inset-y-5 left-0 hidden w-px bg-slate-300 md:block" />
          {spec.rows.map((row, index) => (
            <div key={row.label} className="relative">
              <span aria-hidden className="absolute -left-6 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-slate-300 md:block" />
              <div className={`rounded-lg border border-slate-200 border-l-4 ${BRANCH_ACCENTS[index % BRANCH_ACCENTS.length]} bg-white p-3 md:grid md:grid-cols-[9rem_1fr_11rem] md:items-start md:gap-4`}>
                <p className="text-xs font-bold leading-4 text-slate-900">{row.label}</p>
                <p className="mt-1 text-[11px] leading-4 text-slate-600 md:mt-0">{row.a}</p>
                <p className="mt-1.5 text-[11px] font-semibold leading-4 text-slate-700 md:mt-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-red-600">{spec.tagLabel}: </span>{row.b}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

const ORBIT_SLOTS: Record<number, number[]> = {
  3: [1, 6, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 3, 5, 7],
  6: [0, 2, 3, 5, 6, 8],
  7: [0, 1, 2, 3, 5, 6, 8],
  8: [0, 1, 2, 3, 5, 6, 7, 8],
};
const ORBIT_COORD = [16.67, 50, 83.33];

function OrbitMind({ spec }: { spec: Of<'mindmap'> }) {
  const slots = ORBIT_SLOTS[spec.rows.length];
  if (!slots) return <SidesMind spec={spec} />;
  return (
    <Frame spec={spec}>
      <div className="mt-2 space-y-3 md:hidden">
        <CenterNode spec={spec} />
        {spec.rows.map((row, index) => (
          <div key={row.label} className={`rounded-lg border border-slate-200 border-l-4 ${BRANCH_ACCENTS[index % BRANCH_ACCENTS.length]} bg-white p-3`}>
            <BranchBody row={row} tagLabel={spec.tagLabel} />
          </div>
        ))}
      </div>
      <div className="relative mt-2 hidden min-h-[560px] grid-cols-3 grid-rows-3 gap-3 md:grid">
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
          {slots.map((slot) => (
            <line key={slot} x1="50%" y1="50%" x2={`${ORBIT_COORD[slot % 3]}%`} y2={`${ORBIT_COORD[Math.floor(slot / 3)]}%`} stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          ))}
        </svg>
        <div className="relative z-10 flex items-center justify-center" style={{ gridColumn: 2, gridRow: 2 }}>
          <CenterNode spec={spec} />
        </div>
        {spec.rows.map((row, index) => {
          const slot = slots[index];
          return (
            <div key={row.label} className="relative z-10 flex items-center" style={{ gridColumn: (slot % 3) + 1, gridRow: Math.floor(slot / 3) + 1 }}>
              <div className="w-full rounded-lg border border-slate-200 bg-white p-3">
                <BranchBody row={row} tagLabel={spec.tagLabel} />
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

function MindmapView({ spec }: { spec: Of<'mindmap'> }) {
  if (spec.variant === 'tree') return <TreeMind spec={spec} />;
  if (spec.variant === 'orbit') return <OrbitMind spec={spec} />;
  return <SidesMind spec={spec} />;
}

const PYRAMID_TONES = ['bg-slate-900 text-white', 'bg-slate-700 text-white', 'bg-slate-500 text-white', 'bg-slate-200 text-slate-900', 'bg-slate-100 text-slate-900'];

function PyramidView({ spec }: { spec: Of<'pyramid'> }) {
  const count = spec.rows.length;
  return (
    <Frame spec={spec}>
      <div className="mt-2 space-y-1.5">
        {spec.rows.map((row, index) => {
          const tone = PYRAMID_TONES[Math.round((index * (PYRAMID_TONES.length - 1)) / Math.max(count - 1, 1))];
          const width = count === 1 ? 100 : 58 + (42 * index) / (count - 1);
          return (
            <div key={row.label} className={`mx-auto w-full rounded-md px-4 py-2.5 text-center md:w-[var(--w)] ${tone}`} style={{ '--w': `${width}%` } as CSSProperties}>
              <p className="text-xs font-bold leading-4">{row.label}</p>
              <p className="mt-0.5 text-[11px] leading-4 opacity-90">{row.a}</p>
              <p className="mt-1 text-[11px] font-semibold leading-4 opacity-90">{spec.tagLabel}: {row.b}</p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

function BarsView({ spec }: { spec: Of<'bars'> }) {
  const max = Math.max(...spec.bars.map((bar) => bar.value), 1);
  return (
    <Frame spec={spec}>
      <div className="mt-2 space-y-2.5">
        {spec.bars.map((bar) => (
          <div key={bar.label} className="grid grid-cols-[104px_1fr_52px] items-center gap-2">
            <p className="text-xs font-bold leading-4 text-slate-900">{bar.label}</p>
            <div className="h-4 overflow-hidden rounded-sm bg-slate-100">
              <div className="h-full rounded-sm bg-red-500" style={{ width: `${Math.max((bar.value / max) * 100, 2)}%` }} />
            </div>
            <p className="text-right text-xs font-bold text-slate-800">{bar.display}</p>
          </div>
        ))}
      </div>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

function MatrixView({ spec }: { spec: Of<'matrix'> }) {
  return (
    <Frame spec={spec}>
      <div className="mt-2 overflow-x-auto">
        <div className="min-w-[560px]">
          <div className="flex gap-2">
            <div className="flex w-16 flex-col justify-between py-1 text-right text-[10px] font-semibold leading-3 text-slate-500">
              <span>{spec.yHigh}</span>
              <span className="font-bold uppercase tracking-[0.08em] text-slate-700">↑ {spec.yLabel}</span>
              <span>{spec.yLow}</span>
            </div>
            <div className="relative h-[320px] flex-1 overflow-hidden rounded-lg border border-slate-200 bg-white">
              <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-slate-200" />
              <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
              {spec.points.map((point) => (
                <span
                  key={point.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-red-500 bg-white px-2.5 py-0.5 text-[11px] font-bold text-slate-900"
                  style={{ left: `${point.x}%`, top: `${100 - point.y}%` }}
                >
                  {point.label}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-1.5 flex items-center justify-between pl-[4.5rem] text-[10px] font-semibold text-slate-500">
            <span>{spec.xLow}</span>
            <span className="font-bold uppercase tracking-[0.08em] text-slate-700">{spec.xLabel} →</span>
            <span>{spec.xHigh}</span>
          </div>
        </div>
      </div>
      {spec.note ? <Note>{spec.note}</Note> : null}
    </Frame>
  );
}

export function VisualView({ spec }: { spec: VisualSpec }) {
  switch (spec.layout) {
    case 'compare': return <CompareView spec={spec} />;
    case 'steps': return <StepsView spec={spec} />;
    case 'cards': return <CardsView spec={spec} />;
    case 'mindmap': return <MindmapView spec={spec} />;
    case 'pyramid': return <PyramidView spec={spec} />;
    case 'bars': return <BarsView spec={spec} />;
    case 'matrix': return <MatrixView spec={spec} />;
    case 'flow': return <FlowView spec={spec} />;
    case 'pathway': return <PathwayView spec={spec} />;
    case 'decision': return <DecisionView spec={spec} />;
    case 'taxonomy': return <TaxonomyView spec={spec} />;
    case 'ecosystem': return <EcosystemView spec={spec} />;
    case 'waterfall': return <WaterfallView spec={spec} />;
    case 'driverTree': return <DriverTreeView spec={spec} />;
    case 'timeline': return <TimelineView spec={spec} />;
    case 'scenario': return <ScenarioView spec={spec} />;
    default: return <TableView spec={spec} />;
  }
}
