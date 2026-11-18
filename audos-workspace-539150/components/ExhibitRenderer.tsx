import { Component, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Maximize2, X } from 'lucide-react';
import type { ExhibitKind, ExhibitSeries, LibraryExhibit } from '../lib/skillQuestionLibrary';
import { dedupeColumnUnits, headerWithUnit } from '../lib/exhibitTableUnits';
import { clarifyUnitText, clarifyUnitsDeep } from '../lib/unitLabels';

const DEFAULT_PALETTE = [
  'var(--space-brand-primary-700)',
  '#1d4ed8',
  'var(--space-semantic-success-700)',
  '#6d28d9',
  'var(--space-semantic-warning-700)',
  '#0e7490',
  '#be185d',
  '#4d7c0f',
  '#475569',
];

const STACKED_KINDS = new Set<ExhibitKind>(['stacked-bar', 'stacked-100', 'stacked-area']);
const MULTI_BAR_KINDS = new Set<ExhibitKind>(['grouped-bar', 'vertical-bar', 'bar']);
const LINE_KINDS = new Set<ExhibitKind>(['line', 'multi-line', 'area', 'stacked-area', 'slope']);

const TABLE_KINDS = new Set<ExhibitKind>([
  'table',
  'financial-table',
  'market-sizing-table',
  'sensitivity-table',
  'kpi-scorecard',
]);

/** Readable floor for every number and label drawn inside a chart (CSS px). */
const FS = 14;
/** Average advance of one 14px chart glyph. Label layout is sized with it before anything is drawn. */
const CHAR = 8.2;
const ROTATION = (35 * Math.PI) / 180;
const STANDARD_CHART_HEIGHT = 'h-[420px]';
const ADVANCED_CHART_HEIGHT = 'h-[500px]';

/** Text and outline colours that stay readable on top of a chart fill (hex fills are measured; theme variables are the dark brand shades, so they get white text). */
function onColor(fill: string): { text: string; halo: string } {
  const match = /^#([0-9a-f]{6})$/i.exec(String(fill).trim());
  if (match) {
    const value = parseInt(match[1], 16);
    const channel = (shift: number) => {
      const s = ((value >> shift) & 255) / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const luminance = 0.2126 * channel(16) + 0.7152 * channel(8) + 0.0722 * channel(0);
    if (1.05 / (luminance + 0.05) < (luminance + 0.05) / 0.059) return { text: '#111827', halo: 'rgba(255,255,255,0.55)' };
  }
  return { text: '#ffffff', halo: 'rgba(0,0,0,0.35)' };
}

interface CanonicalExhibit extends LibraryExhibit {
  categories: string[];
  series: ExhibitSeries[];
}

type ExhibitDisplayMode = 'standard' | 'advanced';

interface ExhibitRendererProps {
  exhibits: LibraryExhibit[];
  onLogEvent?: (eventName: 'chart_render_failed', details: Record<string, unknown>) => void;
  displayMode?: ExhibitDisplayMode;
  /** Single-chart question layouts: shorter plot area and tighter card chrome. Expand still opens the full-size view. */
  compact?: boolean;
}

const SpaciousChartLayoutContext = createContext(false);

/**
 * Charts are drawn in real CSS pixels: the SVG viewBox equals the measured card
 * size, so a 14px label is a 14px label at any card width (a fixed viewBox that
 * is scaled down to a one-third-width card shrinks every number with it).
 */
interface Dims {
  W: number;
  H: number;
  M: { left: number; right: number; top: number; bottom: number };
  PW: number;
  PH: number;
  slot: number;
  rotate: boolean;
}

const FREE_KINDS = new Set<string>(['scatter', 'bubble', 'horizontal-bar', 'heatmap', 'treemap', 'pie', 'donut', 'funnel', 'bullet']);

interface DimsLabels {
  hasXLabel: boolean;
  /** Characters in the longest category label; 0 keeps the slot-width rotation rule. */
  longestLabel?: number;
  xLabel?: string;
  yLabel?: string;
  /** Characters in the widest y-axis tick, so ticks never run into the rotated axis title. */
  tickChars?: number;
}

/** Point charts wrap long axis titles onto two lines rather than cutting off the unit. */
function axisTitleLines(text: string, width: number): string[] {
  const maxChars = Math.max(12, Math.floor((width - 16) / 7.6));
  const lines = wrapLabel(text, maxChars);
  return lines.length > 2 ? [lines[0], label(lines.slice(1).join(' '), maxChars)] : lines;
}

function buildDims(width: number, height: number, kind: string, count: number, labels: DimsLabels): Dims {
  const W = Math.max(width, 1);
  const H = Math.max(height, 1);
  const { hasXLabel, longestLabel = 0, tickChars = 0 } = labels;
  const dual = kind === 'combo' || kind === 'dual-axis' || kind === 'pareto';
  const point = kind === 'scatter' || kind === 'bubble';
  const left = point ? 56 : Math.max(W < 400 ? 62 : 72, Math.ceil(tickChars * CHAR + 34));
  const right = dual ? (W < 400 ? 52 : 60) : point ? 26 : 18;
  const yTitleLines = point && labels.yLabel ? axisTitleLines(labels.yLabel, W).length : 0;
  const xTitleLines = point && labels.xLabel ? axisTitleLines(labels.xLabel, W).length : 0;
  const top = point ? 20 + yTitleLines * 16 : 30;
  const n = Math.max(count, 1);
  const slot = (W - left - right) / n;
  const rotate = !FREE_KINDS.has(kind) && slot < 54 && (longestLabel === 0 || longestLabel * CHAR + 6 > slot);
  const bottom = point ? (hasXLabel ? 34 + xTitleLines * 16 : 46) : (rotate ? 96 : 68) + (hasXLabel ? 20 : 0);
  return {
    W,
    H,
    M: { left, right, top, bottom },
    PW: Math.max(W - left - right, 40),
    PH: Math.max(H - top - bottom, 80),
    slot,
    rotate,
  };
}

const ChartDimsContext = createContext<Dims>(buildDims(480, 400, 'vertical-bar', 5, { hasXLabel: false }));
const useDims = () => useContext(ChartDimsContext);

interface DuplicateWarning {
  firstId: string;
  secondId: string;
  metrics: string[];
}

function canonicalise(exhibit: LibraryExhibit): CanonicalExhibit {
  const categories = (exhibit.categories || exhibit.labels || []).map((item) => String(item));
  const series = exhibit.series && exhibit.series.length > 0
    ? exhibit.series.map((item) => ({ ...item, values: item.values.map(Number) }))
    : exhibit.values
      ? [{ name: exhibit.metrics?.[0] || exhibit.unit || 'Value', values: exhibit.values.map(Number) }]
      : [];
  const kind = exhibit.kind === 'bar' ? 'vertical-bar' : exhibit.kind;
  return { ...exhibit, kind, categories, series };
}

/**
 * Stacking only reads well when each category is a whole made of parts. A
 * single stacked column (e.g. seven days inside one "Week" bar) hides the
 * comparison between its parts, so it is drawn as one bar per part; negative
 * parts cannot be stacked without misstating totals, so they are drawn side by
 * side. Source values are never changed - only the chart form.
 */
function resolveChartForm(exhibit: CanonicalExhibit): CanonicalExhibit {
  if (!STACKED_KINDS.has(exhibit.kind)) return exhibit;
  if (exhibit.categories.length === 1 && exhibit.series.length > 1) {
    const sharedUnit = exhibit.series.every((series) => (series.unit || '') === (exhibit.series[0].unit || '')) ? exhibit.series[0].unit : undefined;
    return {
      ...exhibit,
      kind: 'vertical-bar',
      categories: exhibit.series.map((series) => series.name),
      series: [{ name: exhibit.categories[0], unit: sharedUnit, values: exhibit.series.map((series) => series.values[0]) }],
      axisConfig: { ...exhibit.axisConfig, xLabel: exhibit.categories[0] },
    };
  }
  if (exhibit.series.some((series) => series.values.some((value) => value < 0))) {
    return { ...exhibit, kind: exhibit.kind === 'stacked-area' ? 'multi-line' : 'grouped-bar' };
  }
  return exhibit;
}

function normaliseSet(values: Array<string | undefined>): Set<string> {
  return new Set(values.map((value) => String(value || '').toLowerCase().trim()).filter(Boolean));
}

function overlap(first: Set<string>, second: Set<string>): number {
  if (first.size === 0 && second.size === 0) return 1;
  if (first.size === 0 || second.size === 0) return 0;
  const matches = [...first].filter((value) => second.has(value)).length;
  return matches / Math.min(first.size, second.size);
}

function valueSet(exhibit: CanonicalExhibit): Set<string> {
  return new Set(exhibit.series.flatMap((series) => series.values).map((value) => Number(value).toFixed(4)));
}

export function detectDuplicateExhibits(exhibits: LibraryExhibit[]): DuplicateWarning[] {
  const canonical = exhibits.map(canonicalise);
  const warnings: DuplicateWarning[] = [];
  for (let first = 0; first < canonical.length; first += 1) {
    for (let second = first + 1; second < canonical.length; second += 1) {
      const a = canonical[first];
      const b = canonical[second];
      const categoriesOverlap = overlap(normaliseSet(a.categories), normaliseSet(b.categories));
      const aMetrics = normaliseSet([...(a.metrics || []), ...a.series.map((series) => series.name), ...(a.columns || []).slice(1)]);
      const bMetrics = normaliseSet([...(b.metrics || []), ...b.series.map((series) => series.name), ...(b.columns || []).slice(1)]);
      const metricsOverlap = overlap(aMetrics, bMetrics);
      const periodsOverlap = overlap(normaliseSet([a.timePeriod, ...(a.periods || [])]), normaliseSet([b.timePeriod, ...(b.periods || [])]));
      const valuesOverlap = overlap(valueSet(a), valueSet(b));
      if (categoriesOverlap >= 0.65 && metricsOverlap >= 0.5 && periodsOverlap >= 0.5 && valuesOverlap >= 0.6) {
        warnings.push({
          firstId: a.id || `Exhibit ${first + 1}`,
          secondId: b.id || `Exhibit ${second + 1}`,
          metrics: [...aMetrics].filter((metric) => bMetrics.has(metric)).slice(0, 4),
        });
      }
    }
  }
  return warnings;
}

function formatValue(value: number, unit: string): string {
  if (!Number.isFinite(value)) return '-';
  const absolute = Math.abs(value);
  // Charts, tooltips and the data table share one number format, whatever the browser language.
  const number = absolute.toLocaleString('en-US', { maximumFractionDigits: 2 });
  const signed = value < 0 ? `(${number})` : number;
  if (/percent|%/i.test(unit)) return `${signed}%`;
  return unit ? clarifyUnitText(`${signed} ${unit}`) : signed;
}

// Axis ticks stay numeric while the unit lives in the axis title. This keeps
// long units such as "VND bn" from colliding with the title or plot area.
function formatAxisTick(value: number): string {
  if (!Number.isFinite(value)) return '-';
  const absolute = Math.abs(value);
  const compact = absolute >= 1_000_000_000
    ? `${Number((absolute / 1_000_000_000).toFixed(1))}B`
    : absolute >= 1_000_000
      ? `${Number((absolute / 1_000_000).toFixed(1))}M`
      : absolute >= 1_000
        ? `${Number((absolute / 1_000).toFixed(1))}K`
        : absolute.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return value < 0 ? `(${compact})` : compact;
}

/** Bubble area only carries meaning when the exhibit names the variable it represents. */
function hasSizeDefinition(exhibit: LibraryExhibit): boolean {
  return exhibit.kind === 'bubble' && Boolean(exhibit.sizeConfig?.label?.trim());
}

function sizeHeader(exhibit: LibraryExhibit): string {
  const label = exhibit.sizeConfig?.label?.trim() || '';
  const unit = exhibit.sizeConfig?.unit?.trim();
  return clarifyUnitText(unit ? `${label} (${unit})` : label);
}

/** Table cell: the number only. The unit lives once in the column header. */
function formatCell(value: number): string {
  if (!Number.isFinite(value)) return '-';
  const number = Math.abs(value).toLocaleString('en-US', { maximumFractionDigits: 2 });
  return value < 0 ? `(${number})` : number;
}

const WATERFALL_ROUNDING_TOLERANCE = 0.11;
const WATERFALL_ENDING_LABEL = /\b(?:ending|closing|final|end value|at test|year[- ]three target|addressable students|store profit|gross profit|net debt|operating profit|arr|ebit|ebitda|revenue)\b/i;

type WaterfallRole = 'beginning' | 'delta' | 'ending';

interface WaterfallPoint {
  label: string;
  sourceLabel: string;
  value: number;
  role: WaterfallRole;
  start: number;
  end: number;
}

interface WaterfallLayout {
  points: WaterfallPoint[];
  hasExplicitEnding: boolean;
  calculatedEnding: number;
  suppliedEnding: number;
  mismatch: number;
}

/**
 * Waterfall data has existed in two compatible shapes: newer cases include an
 * explicit closing total, while older audited cases store only the opening
 * value and signed movements. Normalise both shapes here so every rendered
 * chart has Beginning and Ending total bars without changing source figures.
 */
function buildWaterfallLayout(exhibit: CanonicalExhibit): WaterfallLayout {
  const sourceLabels = exhibit.categories.map(String);
  const values = (exhibit.series[0]?.values || []).map(Number);
  if (values.length === 0) {
    return { points: [], hasExplicitEnding: false, calculatedEnding: 0, suppliedEnding: 0, mismatch: 0 };
  }

  const lastIndex = values.length - 1;
  const calculatedBeforeLast = values.slice(0, -1).reduce((sum, value) => sum + value, 0);
  const lastLooksLikeEnding = WATERFALL_ENDING_LABEL.test(sourceLabels[lastIndex] || '');
  const lastReconcilesAsEnding = lastIndex > 0 && Math.abs(values[lastIndex] - calculatedBeforeLast) <= WATERFALL_ROUNDING_TOLERANCE;
  const hasExplicitEnding = lastIndex > 0 && (lastLooksLikeEnding || lastReconcilesAsEnding);
  const lastDeltaIndex = hasExplicitEnding ? lastIndex - 1 : lastIndex;
  const points: WaterfallPoint[] = [];
  let running = values[0];

  points.push({
    label: `Beginning — ${sourceLabels[0] || 'Starting value'}`,
    sourceLabel: sourceLabels[0] || 'Starting value',
    value: values[0],
    role: 'beginning',
    start: 0,
    end: values[0],
  });

  for (let index = 1; index <= lastDeltaIndex; index += 1) {
    const start = running;
    running += values[index];
    points.push({
      label: sourceLabels[index] || `Step ${index}`,
      sourceLabel: sourceLabels[index] || `Step ${index}`,
      value: values[index],
      role: 'delta',
      start,
      end: running,
    });
  }

  const suppliedEnding = hasExplicitEnding ? values[lastIndex] : running;
  points.push({
    label: `Ending — ${hasExplicitEnding ? sourceLabels[lastIndex] || 'Closing value' : 'Calculated closing value'}`,
    sourceLabel: hasExplicitEnding ? sourceLabels[lastIndex] || 'Closing value' : 'Calculated closing value',
    value: suppliedEnding,
    role: 'ending',
    start: 0,
    end: suppliedEnding,
  });

  return {
    points,
    hasExplicitEnding,
    calculatedEnding: running,
    suppliedEnding,
    mismatch: suppliedEnding - running,
  };
}

function formatWaterfallCell(point: WaterfallPoint): string {
  const value = formatCell(point.value);
  return point.role === 'delta' && point.value > 0 ? `+${value}` : value;
}

function buildTableData(exhibit: CanonicalExhibit): { columns: string[]; rows: Array<Array<string | number>>; caption?: string } {
  if (exhibit.columns?.length && exhibit.rows?.length) return { columns: exhibit.columns, rows: exhibit.rows };
  if (exhibit.kind === 'waterfall') {
    const layout = buildWaterfallLayout(exhibit);
    const valueHeader = headerWithUnit(exhibit.series[0]?.name || 'Value', exhibit.series[0]?.unit || exhibit.unit);
    return {
      columns: ['Stage', valueHeader],
      rows: layout.points.map((point) => [point.label, formatWaterfallCell(point)]),
    };
  }
  if (exhibit.kind === 'scatter' || exhibit.kind === 'bubble') {
    const multiSeries = exhibit.series.length > 1;
    const sized = hasSizeDefinition(exhibit);
    const yBase = exhibit.axisConfig?.yLabel || exhibit.unit || 'Y';
    const columns = [
      'Category',
      ...(multiSeries ? ['Series'] : []),
      exhibit.axisConfig?.xLabel || 'X',
      headerWithUnit(yBase, exhibit.series[0]?.unit),
      ...(sized ? [sizeHeader(exhibit)] : []),
    ];
    const rows = exhibit.series.flatMap((series) => series.values.map((value, index) => [
      exhibit.categories[index],
      ...(multiSeries ? [series.name] : []),
      formatCell(Number(series.xValues?.[index] || 0)),
      formatCell(value),
      ...(sized ? [formatCell(Number(series.sizes?.[index] || 0))] : []),
    ]));
    return { columns, rows };
  }
  // Value columns that share one unit state it once above the table instead of in every header.
  const seriesUnits = exhibit.series.map((series) => String(series.unit || exhibit.unit || '').trim());
  const sharedUnit = exhibit.series.length > 1 && seriesUnits.every((unit) => unit && unit === seriesUnits[0]) ? seriesUnits[0].replace(/^percent\b/i, '%') : '';
  // Stacked parts that share one unit get a Total column, so the stack height can be checked against the data.
  const withTotal = STACKED_KINDS.has(exhibit.kind) && exhibit.series.length > 1 && new Set(seriesUnits).size === 1;
  const columns = ['Category', ...exhibit.series.map((series) => (sharedUnit ? series.name : headerWithUnit(series.name, series.unit || exhibit.unit))), ...(withTotal ? ['Total'] : [])];
  const rows = exhibit.categories.map((category, index) => [
    category,
    ...exhibit.series.map((series) => series.displayValues?.[index] || formatCell(series.values[index])),
    ...(withTotal ? [formatCell(Number(exhibit.series.reduce((sum, series) => sum + series.values[index], 0).toFixed(4)))] : []),
  ]);
  return { columns, rows, caption: sharedUnit ? `All value columns: ${sharedUnit}` : undefined };
}

interface PlotPoint {
  key: string;
  number: number;
  seriesName: string;
  category: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

/** One numbered entry per plotted point; the chart markers, the legend and the tooltip all use this order. */
function plotPointsOf(exhibit: CanonicalExhibit): PlotPoint[] {
  const palette = paletteOf(exhibit);
  let number = 0;
  return exhibit.series.flatMap((series, seriesIndex) => series.values.map((y, index) => {
    number += 1;
    return {
      key: `${series.name}-${index}`,
      number,
      seriesName: series.name,
      category: exhibit.categories[index],
      x: Number(series.xValues?.[index] || 0),
      y: Number(y),
      size: Number(series.sizes?.[index] || 0),
      color: series.color || palette[seriesIndex % palette.length],
    };
  }));
}

/** Bubble AREA is proportional to the size value: radius = largest radius × √(value ÷ largest value). */
function bubbleMaxRadius(plotWidth: number, plotHeight: number): number {
  return Math.round(Math.max(16, Math.min(40, Math.min(plotWidth, plotHeight) * 0.12)));
}

function bubbleRadius(size: number, largest: number, maxRadius: number): number {
  return maxRadius * Math.sqrt(Math.max(0, size) / (largest || 1));
}

function BubblePointLegend({ exhibit }: { exhibit: CanonicalExhibit }) {
  const xName = exhibit.axisConfig?.xLabel || 'X';
  const yName = exhibit.axisConfig?.yLabel || exhibit.unit || 'Y';
  const multiSeries = exhibit.series.length > 1;
  const sized = hasSizeDefinition(exhibit);
  return (
    <ol className="mt-3 grid gap-1.5 sm:grid-cols-2" aria-label="Numbered list of plotted points" data-testid="exhibit-bubble-point-legend">
      {plotPointsOf(exhibit).map((point) => (
        <li key={point.key} className="flex min-w-0 items-start gap-2 rounded-lg bg-[var(--space-surface-muted)] px-2.5 py-2 text-xs leading-5">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 bg-[var(--space-surface-card)] text-[11px] font-bold text-[var(--space-text-primary)]" style={{ borderColor: point.color }} aria-hidden="true">{point.number}</span>
          <span className="min-w-0 flex-1 break-words text-[var(--space-text-secondary)]">
            <strong className="text-[var(--space-text-primary)]">{point.number}. {point.category}</strong>{multiSeries ? ` (${point.seriesName})` : ''}
            <br />{xName}: {formatCell(point.x)} · {yName}: {formatCell(point.y)}
            {sized ? ` · ${sizeHeader(exhibit)}: ${formatCell(point.size)}` : ''}
          </span>
        </li>
      ))}
    </ol>
  );
}

function BubbleSizeNote({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { PW, PH } = useDims();
  const largest = Math.max(0, ...exhibit.series.flatMap((series) => (series.sizes || []).map(Number)).filter(Number.isFinite));
  const maxRadius = bubbleMaxRadius(PW, PH);
  const half = largest / 2;
  const halfRadius = bubbleRadius(half, largest, maxRadius);
  const width = maxRadius * 2 + halfRadius * 2 + 10;
  return (
    <div className="mt-2 flex items-center gap-3 text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="exhibit-bubble-size-note">
      <svg width={width} height={maxRadius * 2 + 2} viewBox={`0 0 ${width} ${maxRadius * 2 + 2}`} className="shrink-0" aria-hidden="true">
        <circle cx={maxRadius + 1} cy={maxRadius + 1} r={maxRadius} fill="var(--space-brand-primary-600)" opacity="0.3" stroke="var(--space-brand-primary-700)" />
        <circle cx={maxRadius * 2 + 8 + halfRadius} cy={maxRadius * 2 + 1 - halfRadius} r={halfRadius} fill="var(--space-brand-primary-600)" opacity="0.3" stroke="var(--space-brand-primary-700)" />
      </svg>
      <span><span className="font-bold">Bubble area:</span> {sizeHeader(exhibit)}. Area, not width, is proportional to the value: the larger circle is the biggest value ({formatCell(largest)}); the smaller circle has half its area ({formatCell(half)}).</span>
    </div>
  );
}

function reportFailure(exhibit: LibraryExhibit, reason: string, onLogEvent?: ExhibitRendererProps['onLogEvent']): void {
  const details = { exhibit_id: exhibit.id || null, title: exhibit.title, chart_type: exhibit.kind, reason };
  console.warn('chart_render_failed', details);
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('chart_render_failed', { detail: details }));
  onLogEvent?.('chart_render_failed', details);
}

function validationErrors(exhibit: CanonicalExhibit): string[] {
  const errors: string[] = [];
  if (!exhibit.title.trim()) errors.push('Exhibit title is missing.');
  if (TABLE_KINDS.has(exhibit.kind)) {
    if (exhibit.kind === 'kpi-scorecard') {
      if (exhibit.categories.length === 0 || exhibit.series.length === 0) errors.push('KPI data is missing.');
    } else if (!exhibit.columns?.length || !exhibit.rows?.length) {
      errors.push('Table columns or rows are missing.');
    }
    return errors;
  }
  if (exhibit.categories.length === 0 || exhibit.series.length === 0) errors.push('Chart data is missing.');
  exhibit.series.forEach((series) => {
    if (series.values.length !== exhibit.categories.length) errors.push(`${series.name}: category and value counts do not match.`);
    if (series.values.some((value) => !Number.isFinite(value))) errors.push(`${series.name}: values must all be numeric.`);
  });
  if (exhibit.kind === 'scatter' || exhibit.kind === 'bubble') {
    exhibit.series.forEach((series) => {
      if (!series.xValues || series.xValues.length !== series.values.length || series.xValues.some((value) => !Number.isFinite(Number(value)))) {
        errors.push(`${series.name}: scatter X values are invalid.`);
      }
      if (hasSizeDefinition(exhibit) && (!series.sizes || series.sizes.length !== series.values.length || series.sizes.some((value) => !Number.isFinite(Number(value)) || Number(value) < 0))) {
        errors.push(`${series.name}: bubble sizes are invalid.`);
      }
    });
  }
  if (exhibit.kind === 'pie' || exhibit.kind === 'donut') {
    const values = exhibit.series[0]?.values || [];
    const total = values.reduce((sum, value) => sum + value, 0);
    if (values.length < 2 || total <= 0) errors.push('Composition charts require at least two positive slices.');
    if (values.some((value) => value < 0)) errors.push('Composition values cannot be negative.');
    if (new Set(exhibit.categories.map((value) => value.toLowerCase().trim())).size !== exhibit.categories.length || exhibit.mutuallyExclusive === false) errors.push('Composition categories must be mutually exclusive.');
    if (/percent|%/i.test(exhibit.unit) && (total < 98 || total > 102)) errors.push(`Percentage composition totals ${total.toFixed(1)}%, not approximately 100%.`);
  }
  return errors;
}

function isNumericText(cell: unknown): boolean {
  const text = String(cell ?? '').trim();
  return /^[(+-]?[\d.,]+\)?\s?(%|[A-Za-z]{0,4})$/.test(text);
}

/** Compact table: small padding, 11px figures, right-aligned numeric columns, scrolls sideways when narrow. */
function CompactTable({ columns: rawColumns, rows: rawRows, minWidth = 0, caption, stackOnMobile = false }: { columns: string[]; rows: Array<Array<string | number>>; minWidth?: number; caption?: string; stackOnMobile?: boolean }) {
  const { columns, rows } = useMemo(() => dedupeColumnUnits(rawColumns, rawRows), [rawColumns, rawRows]);
  const numeric = columns.map((_, columnIndex) => columnIndex > 0 && rows.length > 0 && rows.every((row) => isNumericText(row[columnIndex])));
  // Below `sm` a wide data view becomes one card per row, so every value is visible without sideways scrolling.
  const stacked = stackOnMobile && columns.length > 3;
  return (
    <div data-testid="exhibit-compact-table">
      {caption ? <p className="mb-1 text-[11px] font-semibold leading-4 text-[var(--space-text-muted)]" data-testid="exhibit-table-unit">{caption}</p> : null}
      {stacked ? (
        <div className="space-y-1.5 sm:hidden" data-testid="exhibit-compact-table-stacked">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2 py-1.5">
              <p className="text-[11px] font-bold leading-4 text-[var(--space-text-primary)]">{row[0]}</p>
              <dl className="mt-1 space-y-0.5">
                {columns.slice(1).map((column, offset) => (
                  <div key={`${column}-${offset}`} className="flex items-baseline justify-between gap-3">
                    <dt className="min-w-0 text-[10px] uppercase leading-4 tracking-wide text-[var(--space-text-muted)]">{column}</dt>
                    <dd className="shrink-0 text-[11px] font-semibold tabular-nums leading-4 text-[var(--space-text-primary)]">{row[offset + 1]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      ) : null}
      <div className={`overflow-x-auto ${stacked ? 'hidden sm:block' : ''}`}>
      <table className="w-full border-collapse text-left text-[11px]" style={minWidth ? { minWidth } : undefined}>
        <thead>
          <tr className="border-b-2 border-[var(--space-border-strong)]">
            {columns.map((column, columnIndex) => (
              <th key={`${column}-${columnIndex}`} className={`px-1.5 py-1 text-[10px] font-bold uppercase leading-3 tracking-wide text-[var(--space-text-muted)] ${numeric[columnIndex] ? 'text-right' : 'text-left'}`}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`border-b border-[var(--space-border-default)] last:border-b-0 ${rowIndex % 2 === 1 ? 'bg-[var(--space-surface-muted)]' : ''}`}>
              {columns.map((_, cellIndex) => (
                <td key={cellIndex} className={`px-1.5 py-1 text-[11px] leading-4 ${numeric[cellIndex] ? 'whitespace-nowrap text-right tabular-nums text-[var(--space-text-secondary)]' : cellIndex === 0 ? 'font-semibold text-[var(--space-text-primary)]' : 'tabular-nums text-[var(--space-text-secondary)]'}`}>{row[cellIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

function DataFallback({ exhibit, reason }: { exhibit: CanonicalExhibit; reason: string }) {
  const { columns, rows, caption } = buildTableData(exhibit);
  return (
    <div className="rounded-xl border border-[var(--space-semantic-warning)] bg-[var(--space-surface-muted)] p-3" role="status" data-testid="exhibit-data-fallback">
      <p className="text-sm font-bold text-[var(--space-text-primary)]">Chart unavailable - showing the underlying data</p>
      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{reason}</p>
      <div className="mt-2"><CompactTable columns={columns} rows={rows} caption={caption} minWidth={320} /></div>
    </div>
  );
}

class ChartErrorBoundary extends Component<{ exhibit: CanonicalExhibit; onLogEvent?: ExhibitRendererProps['onLogEvent']; children: ReactNode }, { error: string }> {
  state = { error: '' };
  static getDerivedStateFromError(error: Error) { return { error: error.message || 'Unexpected rendering error.' }; }
  componentDidCatch(error: Error, info: ErrorInfo) { reportFailure(this.props.exhibit, `${error.message}; ${info.componentStack || ''}`, this.props.onLogEvent); }
  render() { return this.state.error ? <DataFallback exhibit={this.props.exhibit} reason={this.state.error} /> : this.props.children; }
}

function useMeasuredSize() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => {
      const rect = element.getBoundingClientRect();
      setSize((current) => {
        const next = { width: Math.round(rect.width), height: Math.round(rect.height) };
        return current.width === next.width && current.height === next.height ? current : next;
      });
    };
    measure();
    const Observer = (window as any).ResizeObserver;
    if (!Observer) {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new Observer(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, size };
}

function paletteOf(exhibit: CanonicalExhibit): string[] {
  return exhibit.colorConfig?.palette?.length ? exhibit.colorConfig.palette : DEFAULT_PALETTE;
}

function niceMax(values: number[]): number {
  const maximum = Math.max(...values.map((value) => Math.abs(value)), 1);
  const power = 10 ** Math.floor(Math.log10(maximum));
  return Math.ceil(maximum / power) * power;
}

function label(value: string, max = 13): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

/** Shortens an axis title from the name side so a trailing "(unit)" is never cut. */
function fitAxisTitle(value: string, max: number): string {
  if (value.length <= max) return value;
  const match = /^(.*\S)\s*(\([^()]+\))$/.exec(value);
  if (!match || match[2].length + 2 > max) return label(value, max);
  return `${label(match[1], max - match[2].length - 1)} ${match[2]}`;
}

function Legend({ exhibit }: { exhibit: CanonicalExhibit }) {
  // Tables, scorecards and heatmaps do not encode their series with colors,
  // so a colored legend would imply a mapping that is not present.
  if (TABLE_KINDS.has(exhibit.kind) || exhibit.kind === 'heatmap' || exhibit.legendConfig?.show === false || exhibit.series.length <= 1) return null;
  const palette = paletteOf(exhibit);
  return <div className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">{STACKED_KINDS.has(exhibit.kind) ? <span className="text-[12px] font-semibold text-[var(--space-text-muted)]">Stacked bottom to top:</span> : null}{exhibit.series.map((series, index) => <span key={series.name} className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--space-text-secondary)]"><span className="h-3 w-3 rounded-sm" style={{ background: series.color || palette[index % palette.length] }} />{series.name}{series.axis === 'right' ? ' (right axis)' : ''}</span>)}</div>;
}

function Svg({ title, children }: { title: string; children: ReactNode }) {
  const { W, H } = useDims();
  return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block" role="img" aria-label={title}>{children}</svg>;
}

function Grid({ max, min = 0 }: { max: number; min?: number; unit?: string }) {
  const { M, W, PH } = useDims();
  const span = max - min || 1;
  return <g>{[0, 1, 2, 3, 4].map((index) => {
    const y = M.top + index * PH / 4;
    const value = max - index * span / 4;
    return <g key={index}><line x1={M.left} x2={W - M.right} y1={y} y2={y} stroke="var(--space-border-default)" /><text x={M.left - 8} y={y + 4.5} textAnchor="end" fontSize={FS} fill="var(--space-text-muted)">{formatAxisTick(value)}</text></g>;
  })}</g>;
}

function AxisLabels({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { W, H, M, PW, PH } = useDims();
  const yLabel = exhibit.axisConfig?.yLabel || exhibit.unit || '';
  const maxChars = Math.max(6, Math.floor(PH / 8));
  return <g>
    <text x={M.left + PW / 2} y={H - 8} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{fitAxisTitle(exhibit.axisConfig?.xLabel || '', Math.floor(PW / 7.5))}</text>
    <text transform={`translate(15 ${M.top + PH / 2}) rotate(-90)`} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{fitAxisTitle(yLabel, maxChars)}</text>
    {exhibit.axisConfig?.rightYLabel ? <text transform={`translate(${W - 14} ${M.top + PH / 2}) rotate(90)`} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{fitAxisTitle(exhibit.axisConfig.rightYLabel, maxChars)}</text> : null}
  </g>;
}

function wrapLabel(value: string, max = 18): string[] {
  const words = value.split(/\s+/).filter(Boolean);
  if (words.length <= 1 || value.length <= max) return [value];
  const lines: string[] = [];
  words.forEach((word) => {
    const current = lines[lines.length - 1];
    if (!current || `${current} ${word}`.length > max) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  });
  return lines;
}

function CategoryLabels({ categories, shift = 0 }: { categories: string[]; shift?: number }) {
  const { M, H, PW, slot, rotate } = useDims();
  const baseY = H - M.bottom + 20;
  return <g>{categories.map((category, index) => {
    const x = M.left + (index + 0.5) * PW / categories.length + shift;
    if (rotate) {
      // Rotated text runs down and left from its anchor: it must end inside the chart's left edge and above the axis title.
      const room = Math.min((x - 12) / Math.cos(ROTATION), 72 / Math.sin(ROTATION));
      return <text key={`${category}-${index}`} transform={`rotate(-35 ${x} ${baseY})`} x={x} y={baseY} textAnchor="end" fontSize={FS} fill="var(--space-text-muted)"><title>{category}</title>{label(category, Math.max(4, Math.min(15, Math.floor(room / CHAR))))}</text>;
    }
    const maxChars = Math.max(3, Math.floor((slot - 6) / CHAR));
    const wrapped = wrapLabel(category, maxChars);
    const lines = (wrapped.length > 3 ? [wrapped[0], wrapped[1], `${wrapped[2]}…`] : wrapped).map((line) => label(line, maxChars));
    return <text key={`${category}-${index}`} x={x} y={baseY} textAnchor="middle" fontSize={FS} fill="var(--space-text-muted)"><title>{category}</title>{lines.map((line, lineIndex) => <tspan key={`${line}-${lineIndex}`} x={x} dy={lineIndex === 0 ? 0 : 15}>{line}</tspan>)}</text>;
  })}</g>;
}

/** Bars never stretch into slabs on wide cards: they share a bounded, centred band inside each category slot. */
function barBand(groupWidth: number, count: number, maxEach = 64) {
  const inner = Math.min(groupWidth * 0.74, count * maxEach);
  return { slot: inner / count, offset: (groupWidth - inner) / 2 };
}

/** Width of a bold 14px chart number. */
const boldTextWidth = (text: string) => text.length * 8.4;
/** A segment holds its number with 3px either side. */
const segmentTextWidth = (text: string) => boldTextWidth(text) + 6;
/** Shortest stacked segment that holds a 14px number inside it. */
const MIN_INSIDE_SEGMENT = 17;
/** Leader line plus gap before a side label. */
const SIDE_LABEL_OFFSET = 10;

/**
 * Every non-zero stacked segment prints its exact number: inside the segment when it is tall and
 * wide enough, otherwise beside the column on a leader line. Room for side labels is reserved from
 * the shortest plot the card can have (rotated category labels), so the layout never flips as the
 * card is resized.
 */
function stackedLabelPlan(exhibit: CanonicalExhibit, percent: boolean, chartHeight: number) {
  const totals = exhibit.categories.map((_, index) => exhibit.series.reduce((sum, series) => sum + Math.max(0, series.values[index]), 0));
  const maximum = percent ? 100 : niceMax(totals);
  const segments = exhibit.categories.map((_, categoryIndex) => exhibit.series.map((series) => {
    const raw = Math.max(0, series.values[categoryIndex]);
    const value = percent ? raw / (totals[categoryIndex] || 1) * 100 : raw;
    return { raw, value, text: percent ? `${Number(value.toFixed(1))}%` : formatCell(raw) };
  }));
  const shown = segments.flat().filter((segment) => segment.raw > 0);
  const widest = Math.max(20, ...shown.map((segment) => segmentTextWidth(segment.text)));
  const shortestPlot = Math.max(80, chartHeight - 30 - 96 - (exhibit.axisConfig?.xLabel ? 20 : 0));
  const short = shown.filter((segment) => segment.value / maximum * shortestPlot < MIN_INSIDE_SEGMENT);
  const sideFor = (items: typeof shown) => (items.length ? Math.ceil(SIDE_LABEL_OFFSET + Math.max(...items.map((segment) => boldTextWidth(segment.text))) + 4) : 0);
  const sideRoom = sideFor(short);
  const wideNeed = Math.ceil(widest + sideRoom + 6);
  // On a narrow card a thin column with every number beside it needs less width than a column wide enough to hold its numbers.
  const thinSideRoom = sideFor(shown);
  const thinNeed = 14 + thinSideRoom + 6;
  const fitsBeside = exhibit.series.length * 17 <= shortestPlot;
  return { totals, maximum, segments, widest, sideRoom, wideNeed, thinSideRoom, slotNeed: fitsBeside ? Math.min(wideNeed, thinNeed) : wideNeed };
}

/** Spreads side labels at least one line apart while keeping each as close to its segment as possible. */
function spreadLabels(targets: number[], min: number, max: number, gap = 17): number[] {
  const placed = targets.map((target) => Math.min(max, Math.max(min, target)));
  for (let index = 1; index < placed.length; index += 1) placed[index] = Math.max(placed[index], placed[index - 1] + gap);
  if (placed.length && placed[placed.length - 1] > max) {
    placed[placed.length - 1] = max;
    for (let index = placed.length - 2; index >= 0; index -= 1) placed[index] = Math.min(placed[index], placed[index + 1] - gap);
  }
  return placed;
}

function BarChart({ exhibit, mode }: { exhibit: CanonicalExhibit; mode: 'vertical' | 'grouped' | 'stacked' | 'stacked-100' }) {
  const { M, H, PW, PH } = useDims();
  const palette = paletteOf(exhibit);
  const totals = exhibit.categories.map((_, index) => exhibit.series.reduce((sum, series) => sum + Math.max(0, series.values[index]), 0));
  const plan = mode === 'stacked' || mode === 'stacked-100' ? stackedLabelPlan(exhibit, mode === 'stacked-100', H) : null;
  const allValues = exhibit.series.flatMap((series) => series.values);
  const maximum = mode === 'stacked-100' ? 100 : mode === 'stacked' ? niceMax(totals) : niceMax(allValues);
  const lowest = mode === 'stacked-100' || mode === 'stacked' ? 0 : Math.min(0, ...allValues);
  // Negative bars keep room below them for their value label, clear of the category names.
  const minimum = lowest < 0 ? lowest - (maximum - lowest) * 0.14 : lowest;
  const span = maximum - minimum || 1;
  const baseline = M.top + maximum / span * PH;
  const groupWidth = PW / exhibit.categories.length;
  const thin = plan ? groupWidth < plan.wideNeed && plan.slotNeed < plan.wideNeed : false;
  const sideRoom = plan ? (thin ? plan.thinSideRoom : plan.sideRoom) : 0;
  return <Svg title={exhibit.title}><Grid max={maximum} min={minimum} />{exhibit.categories.map((category, categoryIndex) => {
    if (plan) {
      const width = thin ? Math.max(14, groupWidth - sideRoom - 6) : Math.max(14, Math.min(Math.max(Math.min(groupWidth * 0.62 - sideRoom / 2, 90), plan.widest), groupWidth - sideRoom - 6));
      const x = M.left + categoryIndex * groupWidth + (groupWidth - width - sideRoom) / 2;
      let cumulative = 0;
      const pieces = exhibit.series.map((series, seriesIndex) => {
        const segment = plan.segments[categoryIndex][seriesIndex];
        const height = segment.value / maximum * PH;
        const y = M.top + PH - cumulative / maximum * PH - height;
        cumulative += segment.value;
        const inside = height >= MIN_INSIDE_SEGMENT && segmentTextWidth(segment.text) <= width;
        return { series, segment, height, y, fill: series.color || palette[seriesIndex % palette.length], inside };
      });
      const outside = pieces.filter((piece) => piece.segment.raw > 0 && !piece.inside).reverse();
      const outsideY = spreadLabels(outside.map((piece) => piece.y + piece.height / 2), M.top + 7, M.top + PH - 9);
      return <g key={category}>{pieces.map(({ series, segment, height, y, fill, inside }) => <g key={series.name}><rect x={x} y={y} width={width} height={Math.max(segment.raw > 0 ? 1 : 0, height)} fill={fill}><title>{`${category} - ${series.name}: ${formatValue(segment.raw, series.unit || exhibit.unit)}${mode === 'stacked-100' ? ` (${segment.value.toFixed(1)}% of ${category})` : ''}`}</title></rect>{inside && segment.raw > 0 ? <text x={x + width / 2} y={y + height / 2 + 5} textAnchor="middle" fontSize={FS} fontWeight="700" fill={onColor(fill).text} pointerEvents="none">{segment.text}</text> : null}</g>)}
        {outside.map((piece, index) => <g key={`side-${piece.series.name}`} pointerEvents="none"><polyline points={`${x + width},${piece.y + piece.height / 2} ${x + width + 4},${piece.y + piece.height / 2} ${x + width + SIDE_LABEL_OFFSET - 2},${outsideY[index]}`} fill="none" stroke={piece.fill} strokeWidth="1.5" /><text x={x + width + SIDE_LABEL_OFFSET} y={outsideY[index] + 5} textAnchor="start" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)" stroke="var(--space-surface-card)" strokeWidth="4" paintOrder="stroke">{piece.segment.text}</text></g>)}
        {mode === 'stacked' ? <text x={x + width / 2} y={Math.max(14, M.top + PH - cumulative / maximum * PH - 6)} textAnchor="middle" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)" stroke="var(--space-surface-card)" strokeWidth="4" paintOrder="stroke">{formatCell(plan.totals[categoryIndex])}</text> : null}</g>;
    }
    const { slot, offset } = barBand(groupWidth, exhibit.series.length);
    // Value labels appear on every bar or on none, so a lone label never reads as a highlight.
    const valueLabelsFit = allValues.every((value) => boldTextWidth(formatAxisTick(value)) + 2 <= (exhibit.series.length === 1 ? groupWidth : slot));
    // A single series never drops its numbers: when they cannot sit across the bars they stand upright on them.
    const upright = exhibit.series.length === 1 && !valueLabelsFit;
    return <g key={category}>{exhibit.series.map((series, seriesIndex) => {
      const value = series.values[categoryIndex];
      const height = Math.abs(value) / span * PH;
      const valueY = M.top + (maximum - value) / span * PH;
      const top = Math.min(valueY, baseline);
      const x = M.left + categoryIndex * groupWidth + offset + seriesIndex * slot;
      return <g key={series.name}>
        <rect x={x + slot * 0.09} y={top} width={Math.max(4, slot * 0.82)} height={Math.max(1, height)} rx="3" fill={series.color || palette[seriesIndex % palette.length]}><title>{`${category} - ${series.name}: ${formatValue(value, series.unit || exhibit.unit)}`}</title></rect>
        {upright ? (() => {
          const text = formatAxisTick(value);
          const fill = series.color || palette[seriesIndex % palette.length];
          const centre = x + slot / 2 + 5;
          const inside = height >= boldTextWidth(text) + 10;
          const anchorY = value >= 0 ? (inside ? top + 6 : top - 6) : (inside ? top + height - 6 : top + height + 6);
          const anchor = (value >= 0) === inside ? 'end' : 'start';
          return <text transform={`rotate(-90 ${centre} ${anchorY})`} x={centre} y={anchorY} textAnchor={anchor} fontSize={FS} fontWeight="700" fill={inside ? onColor(fill).text : 'var(--space-text-primary)'} stroke={inside ? 'none' : 'var(--space-surface-card)'} strokeWidth="4" paintOrder="stroke" pointerEvents="none">{text}</text>;
        })() : slot >= 36 || valueLabelsFit ? (() => {
          const text = formatAxisTick(value);
          const crowded = exhibit.series.length > 1 && text.length * 8.6 > slot;
          const lift = crowded ? (seriesIndex % 2) * 17 : 0;
          return <text x={x + slot / 2} y={value >= 0 ? Math.max(14, top - 6 - lift) : top + height + 16 + lift} textAnchor="middle" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)" stroke="var(--space-surface-card)" strokeWidth="4" paintOrder="stroke">{text}</text>;
        })() : null}
      </g>;
    })}</g>;
  })}<CategoryLabels categories={exhibit.categories} shift={-sideRoom / 2} /><AxisLabels exhibit={exhibit} /></Svg>;
}

function HorizontalBarChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { W, H } = useDims();
  const series = exhibit.series[0];
  const maximum = niceMax(series.values);
  const minimum = Math.min(0, ...series.values);
  const span = maximum - minimum || 1;
  const sorted = exhibit.categories.map((category, index) => ({ category, value: series.values[index] })).sort((a, b) => b.value - a.value);
  const longest = Math.max(...sorted.map((item) => item.category.length), 4);
  const left = Math.round(Math.min(Math.max(longest * CHAR + 16, 90), W * 0.4));
  const right = 60;
  const top = 14;
  const bottom = exhibit.axisConfig?.xLabel || exhibit.unit ? 46 : 24;
  const plotWidth = W - left - right;
  const plotHeight = H - top - bottom;
  const row = plotHeight / sorted.length;
  const barHeight = Math.min(row * 0.64, 34);
  const maxChars = Math.max(6, Math.floor((left - 16) / 8.2));
  const color = series.color || paletteOf(exhibit)[0];
  const zeroX = left + (0 - minimum) / span * plotWidth;
  return <Svg title={exhibit.title}>{sorted.map((item, index) => {
    const valueX = left + (item.value - minimum) / span * plotWidth;
    const barWidth = Math.max(1, Math.abs(valueX - zeroX));
    const centre = top + index * row + row / 2;
    return <g key={item.category}>
      <text x={left - 10} y={centre + 4.5 - (Math.min(2, wrapLabel(item.category, maxChars).length) - 1) * 7.5} textAnchor="end" fontSize={FS} fontWeight="600" fill="var(--space-text-secondary)"><title>{item.category}</title>{wrapLabel(item.category, maxChars).slice(0, 2).map((line, lineIndex) => <tspan key={`${line}-${lineIndex}`} x={left - 10} dy={lineIndex === 0 ? 0 : 15}>{label(lineIndex === 1 && wrapLabel(item.category, maxChars).length > 2 ? `${line}…` : line, maxChars)}</tspan>)}</text>
      <rect x={Math.min(valueX, zeroX)} y={centre - barHeight / 2} width={barWidth} height={barHeight} rx="4" fill={color}><title>{`${item.category}: ${formatValue(item.value, exhibit.unit)}`}</title></rect>
      <text x={item.value >= 0 ? valueX + 8 : zeroX + 8} y={centre + 4.5} textAnchor="start" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)">{formatAxisTick(item.value)}</text>
    </g>;
  })}<text x={left + plotWidth / 2} y={H - 12} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{exhibit.axisConfig?.xLabel || exhibit.unit}</text></Svg>;
}

/** Width a vertical grouped-bar layout needs before its bars and labels collide. */
function groupedVerticalWidth(exhibit: CanonicalExhibit, margins: number): number {
  return exhibit.categories.length * (exhibit.series.length * 28 + 20) + margins;
}

/**
 * Grouped bars turned on their side for narrow cards: categories keep their
 * source order (no sorting), each category gets one bar per series, and the
 * category label wraps instead of rotating.
 */
function HorizontalGroupedBarChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { W, H } = useDims();
  const palette = paletteOf(exhibit);
  const values = exhibit.series.flatMap((series) => series.values);
  const maximum = niceMax(values);
  const minimum = Math.min(0, ...values);
  const span = maximum - minimum || 1;
  const longest = Math.max(...exhibit.categories.map((category) => category.length), 4);
  const left = Math.round(Math.min(Math.max(longest * CHAR + 16, 72), W * 0.34));
  const right = 48;
  const top = 6;
  const axisTitle = exhibit.axisConfig?.yLabel || exhibit.unit || '';
  const bottom = axisTitle ? 28 : 8;
  const plotWidth = Math.max(W - left - right, 40);
  const row = (H - top - bottom) / Math.max(exhibit.categories.length, 1);
  const bar = Math.max(6, Math.min(24, (row - 10) / exhibit.series.length));
  const zeroX = left + (0 - minimum) / span * plotWidth;
  const maxChars = Math.max(6, Math.floor((left - 12) / CHAR));
  return <Svg title={exhibit.title}>
    <line x1={zeroX} x2={zeroX} y1={top} y2={H - bottom} stroke="var(--space-border-strong)" />
    {exhibit.categories.map((category, categoryIndex) => {
      const rowTop = top + categoryIndex * row;
      const groupTop = rowTop + (row - bar * exhibit.series.length) / 2;
      const wrapped = wrapLabel(category, maxChars);
      const lines = (wrapped.length > 2 ? [wrapped[0], `${wrapped[1]}…`] : wrapped).map((line) => label(line, maxChars));
      return <g key={`${category}-${categoryIndex}`}>
        <text x={left - 8} y={rowTop + row / 2 + 4.5 - (lines.length - 1) * 7.5} textAnchor="end" fontSize={FS} fontWeight="600" fill="var(--space-text-secondary)"><title>{category}</title>{lines.map((line, lineIndex) => <tspan key={`${line}-${lineIndex}`} x={left - 8} dy={lineIndex === 0 ? 0 : 15}>{line}</tspan>)}</text>
        {exhibit.series.map((series, seriesIndex) => {
          const value = series.values[categoryIndex];
          const valueX = left + (value - minimum) / span * plotWidth;
          const y = groupTop + seriesIndex * bar;
          return <g key={series.name}>
            <rect x={Math.min(valueX, zeroX)} y={y + 1} width={Math.max(1, Math.abs(valueX - zeroX))} height={Math.max(2, bar - 2)} rx="3" fill={series.color || palette[seriesIndex % palette.length]}><title>{`${category} - ${series.name}: ${formatValue(value, series.unit || exhibit.unit)}`}</title></rect>
            {bar >= 15 ? <text x={(value >= 0 ? valueX : zeroX) + 6} y={y + bar / 2 + 4.5} fontSize={FS} fontWeight="700" fill="var(--space-text-primary)">{formatAxisTick(value)}</text> : null}
          </g>;
        })}
      </g>;
    })}
    {axisTitle ? <text x={W / 2} y={H - 8} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{fitAxisTitle(axisTitle, Math.floor((W - 16) / 7.6))}</text> : null}
  </Svg>;
}

function LineAreaChart({ exhibit, area, stacked }: { exhibit: CanonicalExhibit; area: boolean; stacked: boolean }) {
  const { M, PW, PH, slot } = useDims();
  const palette = paletteOf(exhibit);
  const totals = exhibit.categories.map((_, index) => exhibit.series.reduce((sum, series) => sum + series.values[index], 0));
  const chartValues = stacked ? totals : exhibit.series.flatMap((series) => series.values);
  const maximum = niceMax(chartValues);
  const minimum = stacked ? 0 : Math.min(0, ...chartValues);
  const span = maximum - minimum || 1;
  const yFor = (value: number) => M.top + (maximum - value) / span * PH;
  const xFor = (index: number) => M.left + (index + 0.5) * PW / exhibit.categories.length;
  const pointsOf = (values: number[]) => values.map((value, index) => `${xFor(index)},${yFor(value)}`).join(' ');
  const labelEvery = slot >= 44 ? 1 : slot >= 26 ? 2 : 0;
  let previous = new Array(exhibit.categories.length).fill(0);
  return <Svg title={exhibit.title}><Grid max={maximum} min={minimum} />{exhibit.series.map((series, seriesIndex) => {
    const color = series.color || palette[seriesIndex % palette.length];
    const values = stacked ? series.values.map((value, index) => value + previous[index]) : series.values;
    const points = pointsOf(values);
    const baseline = stacked ? [...previous].reverse().map((value, reverseIndex) => { const index = values.length - reverseIndex - 1; return `${xFor(index)},${yFor(value)}`; }).join(' ') : `${xFor(values.length - 1)},${yFor(0)} ${xFor(0)},${yFor(0)}`;
    previous = values;
    return <g key={series.name}>
      {area ? <polygon points={`${points} ${baseline}`} fill={color} opacity={stacked ? 0.72 : 0.2} /> : null}
      <polyline points={points} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((value, index) => <circle key={index} cx={xFor(index)} cy={yFor(value)} r="5" fill={color} stroke="var(--space-surface-card)" strokeWidth="1.5"><title>{`${exhibit.categories[index]} - ${series.name}: ${formatValue(series.values[index], series.unit || exhibit.unit)}`}</title></circle>)}
      {exhibit.series.length === 1 && !stacked && labelEvery > 0 ? values.map((value, index) => index % labelEvery === 0 ? <text key={`v-${index}`} x={xFor(index)} y={Math.max(14, yFor(value) - 11)} textAnchor="middle" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)" stroke="var(--space-surface-card)" strokeWidth="4" paintOrder="stroke">{formatAxisTick(value)}</text> : null) : null}
    </g>;
  })}<CategoryLabels categories={exhibit.categories} /><AxisLabels exhibit={exhibit} /></Svg>;
}

function ComboChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { M, W, PW, PH } = useDims();
  const bars = exhibit.series.filter((series) => series.axis !== 'right');
  const lines = exhibit.series.filter((series) => series.axis === 'right');
  const leftValues = bars.flatMap((series) => series.values);
  const rightValues = lines.flatMap((series) => series.values);
  const leftMax = niceMax(leftValues);
  const leftMin = Math.min(0, ...leftValues);
  const leftSpan = leftMax - leftMin || 1;
  const leftBaseline = M.top + leftMax / leftSpan * PH;
  const rightMax = niceMax(rightValues);
  const rightMin = Math.min(0, ...rightValues);
  const rightSpan = rightMax - rightMin || 1;
  const palette = paletteOf(exhibit);
  const colorFor = (series: ExhibitSeries) => series.color || palette[exhibit.series.indexOf(series) % palette.length];
  const withRightAxis: CanonicalExhibit = { ...exhibit, axisConfig: { ...exhibit.axisConfig, rightYLabel: exhibit.axisConfig?.rightYLabel || lines[0]?.unit || 'Right axis' } };
  const groupWidth = PW / exhibit.categories.length;
  const { slot, offset } = barBand(groupWidth, Math.max(bars.length, 1));
  const xFor = (index: number) => M.left + (index + 0.5) * groupWidth;
  return <Svg title={exhibit.title}><Grid max={leftMax} min={leftMin} />{bars.map((series, seriesIndex) => exhibit.categories.map((category, index) => {
    const value = series.values[index];
    const height = Math.abs(value) / leftSpan * PH;
    const valueY = M.top + (leftMax - value) / leftSpan * PH;
    return <rect key={`${series.name}-${category}`} x={M.left + index * groupWidth + offset + seriesIndex * slot + slot * 0.07} y={Math.min(valueY, leftBaseline)} width={slot * 0.86} height={Math.max(1, height)} rx="3" fill={colorFor(series)}><title>{`${category} - ${series.name}: ${formatValue(value, series.unit || exhibit.unit)}`}</title></rect>;
  }))}{lines.map((series) => {
    const points = series.values.map((value, index) => `${xFor(index)},${M.top + (rightMax - value) / rightSpan * PH}`).join(' ');
    return <g key={series.name}><polyline points={points} fill="none" stroke={colorFor(series)} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />{series.values.map((value, index) => <circle key={index} cx={xFor(index)} cy={M.top + (rightMax - value) / rightSpan * PH} r="4.5" fill={colorFor(series)} stroke="var(--space-surface-card)" strokeWidth="1.5"><title>{`${exhibit.categories[index]} - ${series.name}: ${formatValue(value, series.unit || exhibit.unit)}`}</title></circle>)}</g>;
  })}{lines.length > 0 ? [0, 1, 2, 3, 4].map((index) => <text key={index} x={W - M.right + 8} y={M.top + index * PH / 4 + 4.5} fontSize={FS} fill="var(--space-text-muted)">{formatAxisTick(rightMax - index * rightSpan / 4)}</text>) : null}<CategoryLabels categories={exhibit.categories} /><AxisLabels exhibit={withRightAxis} /></Svg>;
}

function ParetoChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { M, W, PW, PH } = useDims();
  const series = exhibit.series[0];
  const values = series.values.map((value) => Math.max(0, value));
  const total = values.reduce((sum, value) => sum + value, 0) || 1;
  let running = 0;
  const cumulative = values.map((value) => {
    running += value;
    return running / total * 100;
  });
  const maximum = niceMax(values);
  const groupWidth = PW / values.length;
  const { slot, offset } = barBand(groupWidth, 1, 72);
  const barColor = series.color || paletteOf(exhibit)[0];
  const lineColor = paletteOf(exhibit)[1];
  const xFor = (index: number) => M.left + (index + 0.5) * groupWidth;
  const yFor = (value: number) => M.top + (100 - value) / 100 * PH;
  const withRightAxis: CanonicalExhibit = { ...exhibit, axisConfig: { ...exhibit.axisConfig, rightYLabel: exhibit.axisConfig?.rightYLabel || 'Cumulative %' } };
  return <Svg title={exhibit.title}><Grid max={maximum} /><g transform={`translate(${M.left} 3)`}><rect width="12" height="12" rx="2" fill={barColor} /><text x="18" y="11" fontSize={FS} fill="var(--space-text-secondary)">{label(series.name, 14)}</text><line x1="130" x2="152" y1="6" y2="6" stroke={lineColor} strokeWidth="3" /><text x="158" y="11" fontSize={FS} fill="var(--space-text-secondary)">Cumulative %</text></g>{values.map((value, index) => { const height = value / maximum * PH; return <rect key={`${exhibit.categories[index]}-${index}`} x={M.left + index * groupWidth + offset + slot * 0.1} y={M.top + PH - height} width={slot * 0.8} height={Math.max(1, height)} rx="3" fill={barColor}><title>{`${exhibit.categories[index]}: ${formatValue(series.values[index], series.unit || exhibit.unit)}`}</title></rect>; })}<polyline points={cumulative.map((value, index) => `${xFor(index)},${yFor(value)}`).join(' ')} fill="none" stroke={lineColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />{cumulative.map((value, index) => <circle key={index} cx={xFor(index)} cy={yFor(value)} r="4.5" fill={lineColor}><title>{`${exhibit.categories[index]} cumulative: ${value.toFixed(1)}%`}</title></circle>)}{[0, 25, 50, 75, 100].map((value) => <text key={value} x={W - M.right + 8} y={yFor(value) + 4.5} fontSize={FS} fill="var(--space-text-muted)">{value}</text>)}<CategoryLabels categories={exhibit.categories} /><AxisLabels exhibit={withRightAxis} /></Svg>;
}

function WaterfallChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { M, PW, PH } = useDims();
  const layout = buildWaterfallLayout(exhibit);
  const points = layout.points;
  const levels = points.flatMap((point) => [point.start, point.end]);
  const highest = Math.max(0, ...levels);
  const maximum = highest > 0 ? niceMax([highest]) : 0;
  const minimum = Math.min(0, ...levels);
  const span = maximum - minimum || 1;
  const yFor = (value: number) => M.top + (maximum - value) / span * PH;
  const group = PW / Math.max(points.length, 1);
  const { slot, offset } = barBand(group, 1, 76);
  const chartCategories = points.map((point) => point.label);

  return <Svg title={exhibit.title}><Grid max={maximum} min={minimum} />{points.map((point, index) => {
    const top = Math.max(point.start, point.end);
    const bottom = Math.min(point.start, point.end);
    const y = yFor(top);
    const height = Math.max(2, (top - bottom) / span * PH);
    const x = M.left + index * group + offset + slot * 0.1;
    const previous = points[index - 1];
    const fill = point.role === 'beginning' || point.role === 'ending'
      ? 'var(--space-brand-primary-700)'
      : point.value >= 0
        ? 'var(--space-semantic-success-600)'
        : 'var(--space-semantic-danger-600)';
    const valueLabel = point.role === 'delta' && point.value > 0 ? `+${formatAxisTick(point.value)}` : formatAxisTick(point.value);
    const valueLabelY = point.role === 'delta' && point.value < 0
      ? Math.min(M.top + PH + 18, y + height + 16)
      : Math.max(14, y - 6);
    return <g key={`${point.role}-${point.sourceLabel}-${index}`}>
      {previous ? <line x1={M.left + (index - 1) * group + offset + slot * 0.9} x2={x} y1={yFor(previous.end)} y2={yFor(previous.end)} stroke="var(--space-border-strong)" strokeDasharray="4 3" /> : null}
      <rect x={x} y={y} width={slot * 0.8} height={height} rx="3" fill={fill}><title>{point.role === 'delta' ? `${point.sourceLabel}: ${formatValue(point.value, exhibit.unit)}; running total ${formatValue(point.end, exhibit.unit)}` : `${point.label}: ${formatValue(point.value, exhibit.unit)}`}</title></rect>
      {slot >= 32 ? <text x={x + slot * 0.4} y={valueLabelY} textAnchor="middle" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)">{valueLabel}</text> : null}
    </g>;
  })}<CategoryLabels categories={chartCategories} /><AxisLabels exhibit={exhibit} /></Svg>;
}

function niceStep(raw: number): number {
  const power = 10 ** Math.floor(Math.log10(Math.max(raw, 1e-9)));
  return ([1, 2, 2.5, 5, 10].find((multiple) => multiple * power >= raw) || 10) * power;
}

/**
 * Position scale for a point chart. Data that starts near zero keeps a zero
 * origin; data clustered far from zero (e.g. indices around 100) gets a padded
 * range so the points do not collapse into one corner. Bars need a zero
 * baseline; positions on a scatter do not.
 */
function pointDomain(values: number[]): { min: number; max: number; ticks: number[] } {
  const low = Math.min(...values);
  const high = Math.max(...values);
  if (low >= 0 && low <= high * 0.5) {
    const max = niceMax([high]);
    return { min: 0, max, ticks: [0, 1, 2, 3, 4].map((tick) => tick * max / 4) };
  }
  const spread = high - low || Math.abs(high) || 1;
  const step = niceStep(spread / 4);
  const min = Math.floor((low - spread * 0.1) / step) * step;
  const max = Math.ceil((high + spread * 0.1) / step) * step;
  const ticks: number[] = [];
  for (let tick = min; tick <= max + step / 2; tick += step) ticks.push(Number(tick.toFixed(6)));
  return { min, max, ticks };
}

interface Box { x1: number; y1: number; x2: number; y2: number }

const boxesOverlap = (a: Box, b: Box) => a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;

function boxHitsCircle(box: Box, cx: number, cy: number, r: number): boolean {
  const nearestX = Math.max(box.x1, Math.min(cx, box.x2));
  const nearestY = Math.max(box.y1, Math.min(cy, box.y2));
  return (nearestX - cx) ** 2 + (nearestY - cy) ** 2 < r * r;
}

function ScatterBubbleChart({ exhibit, bubble }: { exhibit: CanonicalExhibit; bubble: boolean }) {
  const { W, H, M, PW, PH } = useDims();
  const numbered = exhibit.kind === 'bubble';
  const points = plotPointsOf(exhibit);
  const largest = Math.max(0, ...points.map((point) => point.size)) || 1;
  const maxRadius = bubble ? bubbleMaxRadius(PW, PH) : 9;
  const radiusOf = (size: number) => (bubble ? Math.max(3, bubbleRadius(size, largest, maxRadius)) : 9);
  const inset = bubble ? Math.round(maxRadius * 0.8) : 12;
  const xDomain = pointDomain(points.map((point) => point.x));
  const yDomain = pointDomain(points.map((point) => point.y));
  const xPix = (value: number) => M.left + inset + (value - xDomain.min) / (xDomain.max - xDomain.min || 1) * (PW - inset * 2);
  const yPix = (value: number) => M.top + inset + (yDomain.max - value) / (yDomain.max - yDomain.min || 1) * (PH - inset * 2);
  const xName = exhibit.axisConfig?.xLabel || 'X';
  const yName = exhibit.axisConfig?.yLabel || exhibit.unit || 'Y';
  const placed = points.map((point) => ({ ...point, cx: xPix(point.x), cy: yPix(point.y), r: radiusOf(point.size) }));
  const circles = [...placed].sort((a, b) => b.r - a.r);

  // Numbered markers sit on the bubble centre and step aside only when two centres nearly coincide.
  const badgeBoxes: Box[] = [];
  const badges = placed.map((point) => {
    if (!numbered) return null;
    const half = point.number >= 10 ? 12 : 10;
    const offsets = [0, -22, 22, -44, 44];
    const offset = offsets.find((dy) => !badgeBoxes.some((box) => boxesOverlap(box, { x1: point.cx - half, y1: point.cy + dy - 10, x2: point.cx + half, y2: point.cy + dy + 10 }))) ?? 0;
    const box = { x1: point.cx - half, y1: point.cy + offset - 10, x2: point.cx + half, y2: point.cy + offset + 10 };
    badgeBoxes.push(box);
    return { point, x: point.cx, y: point.cy + offset, half };
  });

  // Category names go where they collide with nothing; otherwise the numbered marker and legend identify the point.
  const labelBoxes: Box[] = [];
  const bounds: Box = { x1: M.left + 2, y1: M.top - 4, x2: W - 2, y2: M.top + PH + 2 };
  const labels = placed.map((point) => {
    const text = label(point.category, 20);
    const width = text.length * 8 + 4;
    const gap = point.r + (numbered ? 4 : 6);
    const candidates: Array<{ x: number; y: number; anchor: 'start' | 'end' | 'middle'; box: Box }> = [
      { x: point.cx + gap, y: point.cy + 5, anchor: 'start', box: { x1: point.cx + gap, y1: point.cy - 9, x2: point.cx + gap + width, y2: point.cy + 9 } },
      { x: point.cx - gap, y: point.cy + 5, anchor: 'end', box: { x1: point.cx - gap - width, y1: point.cy - 9, x2: point.cx - gap, y2: point.cy + 9 } },
      { x: point.cx, y: point.cy - point.r - 7, anchor: 'middle', box: { x1: point.cx - width / 2, y1: point.cy - point.r - 22, x2: point.cx + width / 2, y2: point.cy - point.r - 3 } },
      { x: point.cx, y: point.cy + point.r + 17, anchor: 'middle', box: { x1: point.cx - width / 2, y1: point.cy + point.r + 3, x2: point.cx + width / 2, y2: point.cy + point.r + 21 } },
    ];
    const clear = (box: Box) => box.x1 >= bounds.x1 && box.x2 <= bounds.x2 && box.y1 >= bounds.y1 && box.y2 <= bounds.y2
      && !labelBoxes.some((other) => boxesOverlap(other, box))
      && !badgeBoxes.some((other) => boxesOverlap(other, box))
      && !placed.some((other) => boxHitsCircle(box, other.cx, other.cy, other.r));
    const inBounds = (box: Box) => box.x1 >= bounds.x1 && box.x2 <= bounds.x2 && box.y1 >= bounds.y1 && box.y2 <= bounds.y2 && !labelBoxes.some((other) => boxesOverlap(other, box));
    const chosen = candidates.find((candidate) => clear(candidate.box)) || (numbered ? undefined : candidates.find((candidate) => inBounds(candidate.box)));
    if (!chosen) return null;
    labelBoxes.push(chosen.box);
    return { key: point.key, text, ...chosen };
  });

  const yTitle = axisTitleLines(yName, W);
  const xTitle = exhibit.axisConfig?.xLabel ? axisTitleLines(exhibit.axisConfig.xLabel, W) : [];
  const tooltip = (point: typeof placed[number]) => clarifyUnitText(`${numbered ? `${point.number}. ` : ''}${point.category} - ${xName}: ${formatCell(point.x)}; ${yName}: ${formatCell(point.y)}${bubble ? `; ${sizeHeader(exhibit)}: ${formatCell(point.size)}` : ''}`);
  return <Svg title={exhibit.title}>
    {yDomain.ticks.map((tick) => <g key={`y-${tick}`}><line x1={M.left} x2={W - M.right} y1={yPix(tick)} y2={yPix(tick)} stroke="var(--space-border-default)" /><text x={M.left - 8} y={yPix(tick) + 4.5} textAnchor="end" fontSize={FS} fill="var(--space-text-muted)">{formatAxisTick(tick)}</text></g>)}
    {xDomain.ticks.map((tick) => <text key={`x-${tick}`} x={xPix(tick)} y={M.top + PH + 20} textAnchor="middle" fontSize={FS} fill="var(--space-text-muted)">{formatAxisTick(tick)}</text>)}
    {circles.map((point) => <circle key={point.key} cx={point.cx} cy={point.cy} r={point.r} fill={point.color} opacity={bubble ? 0.72 : 0.85} stroke="var(--space-surface-card)" strokeWidth="2"><title>{tooltip(point)}</title></circle>)}
    {badges.map((badge) => badge ? <g key={`n-${badge.point.key}`} pointerEvents="none"><circle cx={badge.x} cy={badge.y} r={badge.half} fill="var(--space-surface-card)" stroke={badge.point.color} strokeWidth="2.5" /><text x={badge.x} y={badge.y + 5} textAnchor="middle" fontSize={FS} fontWeight="800" fill="var(--space-text-primary)">{badge.point.number}</text></g> : null)}
    {labels.map((item) => item ? <text key={`l-${item.key}`} x={item.x} y={item.y} textAnchor={item.anchor} fontSize={FS} fontWeight="700" fill="var(--space-text-primary)" stroke="var(--space-surface-card)" strokeWidth="4" paintOrder="stroke" pointerEvents="none">{item.text}</text> : null)}
    {xTitle.map((line, index) => <text key={`xt-${index}`} x={M.left + PW / 2} y={M.top + PH + 40 + index * 16} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{line}</text>)}
    {yTitle.map((line, index) => <text key={`yt-${index}`} x={8} y={16 + index * 16} textAnchor="start" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{line}</text>)}
  </Svg>;
}

function PieChart({ exhibit, donut }: { exhibit: CanonicalExhibit; donut: boolean }) {
  const { W } = useDims();
  const values = exhibit.series[0].values;
  const total = values.reduce((sum, value) => sum + value, 0);
  const palette = paletteOf(exhibit);
  const sideBySide = W >= 560;
  // The pie card grows with its legend, so the circle is sized from the width alone and no legend row is ever cut off.
  const size = Math.round(Math.max(120, Math.min(sideBySide ? W * 0.42 : W - 16, 340)));
  const centre = size / 2;
  const radius = size / 2 - 3;
  const hole = donut ? radius * 0.5 : 0;
  const labelRadius = donut ? (radius + hole) / 2 : radius * 0.64;
  let angle = -Math.PI / 2;
  const slices = values.map((value, index) => {
    const fraction = value / total;
    const start = angle;
    const end = angle + fraction * Math.PI * 2;
    angle = end;
    const point = (theta: number) => `${centre + radius * Math.cos(theta)} ${centre + radius * Math.sin(theta)}`;
    const path = fraction >= 0.9999
      ? `M ${centre - radius} ${centre} A ${radius} ${radius} 0 1 1 ${centre + radius} ${centre} A ${radius} ${radius} 0 1 1 ${centre - radius} ${centre} Z`
      : `M ${centre} ${centre} L ${point(start)} A ${radius} ${radius} 0 ${end - start > Math.PI ? 1 : 0} 1 ${point(end)} Z`;
    const mid = (start + end) / 2;
    return { index, fraction, path, labelX: centre + labelRadius * Math.cos(mid), labelY: centre + labelRadius * Math.sin(mid) };
  });
  return <div className={`flex w-full items-center justify-center gap-4 py-2 ${sideBySide ? 'flex-row px-2' : 'flex-col'}`} data-testid="exhibit-pie">
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block shrink-0" role="img" aria-label={exhibit.title}>
      {slices.map((slice) => <path key={exhibit.categories[slice.index]} d={slice.path} fill={palette[slice.index % palette.length]} stroke="var(--space-surface-card)" strokeWidth="3"><title>{`${exhibit.categories[slice.index]}: ${formatValue(values[slice.index], exhibit.unit)}`}</title></path>)}
      {donut ? <circle cx={centre} cy={centre} r={hole} fill="var(--space-surface-card)" /> : null}
      {slices.filter((slice) => slice.fraction >= 0.06).map((slice) => <text key={`p-${slice.index}`} x={slice.labelX} y={slice.labelY + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={onColor(palette[slice.index % palette.length]).text} stroke={onColor(palette[slice.index % palette.length]).halo} strokeWidth="2.5" paintOrder="stroke">{Number((slice.fraction * 100).toFixed(1))}%</text>)}
    </svg>
    <ul className={`min-w-0 space-y-1 ${sideBySide ? 'flex-1' : 'w-full'}`}>
      {exhibit.categories.map((category, index) => <li key={`${category}-${index}`} className="flex items-start gap-2 text-[14px] leading-5" title={category}>
        <span className="mt-1 h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: palette[index % palette.length] }} aria-hidden="true" />
        <span className="min-w-0 flex-1 break-words text-[var(--space-text-secondary)]">{category}</span>
        <span className="shrink-0 font-bold tabular-nums text-[var(--space-text-primary)]">{formatValue(values[index], exhibit.unit)}</span>
      </li>)}
    </ul>
  </div>;
}

/** Heatmap row-label column: two wrapped lines of the longest row name, within a third of the card. */
function heatmapLeft(categories: string[], width: number): number {
  const longest = Math.max(4, ...categories.map((category) => category.length));
  return Math.round(Math.min(Math.max(Math.ceil(longest / 2) * CHAR + 24, 84), 160, width * 0.34));
}

/** Narrowest heatmap cell that still prints its number in full. */
function heatmapCellWidth(exhibit: CanonicalExhibit): number {
  const widest = Math.max(1, ...exhibit.series.flatMap((series) => series.values.map((value) => formatCell(value).length)));
  return Math.max(48, Math.ceil(widest * 8.8 + 14));
}

function HeatmapChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { W, H } = useDims();
  const values = exhibit.series.flatMap((series) => series.values);
  const min = Math.min(...values); const max = Math.max(...values); const span = max - min || 1;
  const left = heatmapLeft(exhibit.categories, W);
  const top = 52;
  const right = 10;
  const bottom = 10;
  const cellW = (W - left - right) / exhibit.series.length;
  const cellH = (H - top - bottom) / exhibit.categories.length;
  const rowChars = Math.max(4, Math.floor((left - 14) / CHAR));
  const columnChars = Math.max(3, Math.floor((cellW - 8) / CHAR));
  // The unit is stated in the exhibit header and the data table, so each cell prints the number alone.
  return <Svg title={exhibit.title}>{exhibit.categories.map((category, row) => {
    const rowLines = wrapLabel(category, rowChars);
    const shown = (rowLines.length > 2 ? [rowLines[0], `${rowLines[1]}…`] : rowLines).map((line) => label(line, rowChars));
    return <g key={category}><text x={left - 8} y={top + (row + 0.5) * cellH + 4.5 - (shown.length - 1) * 7.5} textAnchor="end" fontSize={FS} fill="var(--space-text-secondary)"><title>{category}</title>{shown.map((line, lineIndex) => <tspan key={`${line}-${lineIndex}`} x={left - 8} dy={lineIndex === 0 ? 0 : 15}>{line}</tspan>)}</text>{exhibit.series.map((series, column) => { const value = series.values[row]; const intensity = 18 + (value - min) / span * 72; const text = formatCell(value); const fits = text.length * 8.8 + 6 <= cellW - 3 && cellH >= 22; return <g key={series.name}><rect x={left + column * cellW} y={top + row * cellH} width={Math.max(1, cellW - 3)} height={Math.max(1, cellH - 3)} rx="4" fill={`color-mix(in srgb, var(--space-brand-primary-700) ${intensity}%, var(--space-surface-card))`}><title>{`${category} - ${series.name}: ${formatValue(value, series.unit || exhibit.unit)}`}</title></rect>{fits ? <text x={left + column * cellW + (cellW - 3) / 2} y={top + (row + 0.5) * cellH + 3} textAnchor="middle" fontSize={FS} fontWeight="700" fill={intensity > 55 ? '#ffffff' : 'var(--space-text-primary)'}>{text}</text> : null}</g>; })}</g>;
  })}{exhibit.series.map((series, index) => {
    const lines = wrapLabel(series.name, columnChars);
    const shown = (lines.length > 2 ? [lines[0], `${lines[1]}…`] : lines).map((line) => label(line, columnChars));
    return <text key={series.name} x={left + index * cellW + (cellW - 3) / 2} y={top - 10 - (shown.length - 1) * 15} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)"><title>{series.name}</title>{shown.map((line, lineIndex) => <tspan key={`${line}-${lineIndex}`} x={left + index * cellW + (cellW - 3) / 2} dy={lineIndex === 0 ? 0 : 15}>{line}</tspan>)}</text>;
  })}</Svg>;
}

interface TreemapTile { index: number; x: number; y: number; w: number; h: number }

/** Squarified treemap: tiles stay close to square, so small parts keep room for a name and a number. */
function squarify(values: number[], x: number, y: number, w: number, h: number): TreemapTile[] {
  const total = values.reduce((sum, value) => sum + Math.max(0, value), 0);
  if (total <= 0) return [];
  const scale = (w * h) / total;
  const queue = values.map((value, index) => ({ index, area: Math.max(0, value) * scale })).filter((item) => item.area > 0).sort((a, b) => b.area - a.area);
  const tiles: TreemapTile[] = [];
  let free = { x, y, w, h };
  const worst = (row: typeof queue, side: number) => {
    const sum = row.reduce((total, item) => total + item.area, 0);
    const largest = Math.max(...row.map((item) => item.area));
    const smallest = Math.min(...row.map((item) => item.area));
    return Math.max((side * side * largest) / (sum * sum), (sum * sum) / (side * side * smallest));
  };
  const place = (row: typeof queue) => {
    const sum = row.reduce((total, item) => total + item.area, 0);
    if (free.w >= free.h) {
      const columnWidth = sum / free.h;
      let cursor = free.y;
      row.forEach((item) => { const tileHeight = item.area / columnWidth; tiles.push({ index: item.index, x: free.x, y: cursor, w: columnWidth, h: tileHeight }); cursor += tileHeight; });
      free = { x: free.x + columnWidth, y: free.y, w: free.w - columnWidth, h: free.h };
    } else {
      const rowHeight = sum / free.w;
      let cursor = free.x;
      row.forEach((item) => { const tileWidth = item.area / rowHeight; tiles.push({ index: item.index, x: cursor, y: free.y, w: tileWidth, h: rowHeight }); cursor += tileWidth; });
      free = { x: free.x, y: free.y + rowHeight, w: free.w, h: free.h - rowHeight };
    }
  };
  let row: typeof queue = [];
  queue.forEach((item) => {
    const side = Math.min(free.w, free.h);
    if (!row.length || worst([...row, item], side) <= worst(row, side)) row.push(item);
    else { place(row); row = [item]; }
  });
  if (row.length) place(row);
  return tiles;
}

/** Lines a tile prints, richest first. A name is printed whole or not at all - the key below the map always carries it. */
function treemapTileLines(name: string, value: number, unit: string, share: string | null, width: number, height: number): Array<{ text: string; strong: boolean }> {
  const innerWidth = width - 12;
  const fits = (text: string, glyph = CHAR) => text.length * glyph <= innerWidth;
  const nameLines = wrapLabel(name, Math.max(1, Math.floor(innerWidth / CHAR)));
  const nameFits = nameLines.length <= 3 && nameLines.every((line) => fits(line));
  const valueText = [formatValue(value, unit), formatCell(value)].find((text) => fits(text, 9));
  if (!valueText) return [];
  const names = nameFits ? nameLines.map((text) => ({ text, strong: false })) : [];
  const number = { text: valueText, strong: true };
  const shareLine = share && fits(share) ? [{ text: share, strong: false }] : [];
  const options = [[...names, number, ...shareLine], [...names, number], [number, ...shareLine], [number]];
  return options.find((lines) => lines.length * 18 + 8 <= height) || [];
}

function TreemapChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { W } = useDims();
  const spacious = useContext(SpaciousChartLayoutContext);
  const values = exhibit.series[0].values;
  const unit = exhibit.series[0].unit || exhibit.unit || '';
  const total = values.reduce((sum, value) => sum + Math.max(0, value), 0) || 1;
  // Parts that are already percentages of the whole would only repeat themselves as a share.
  const showShare = !/percent|%/i.test(unit);
  const shareOf = (value: number) => (showShare ? `${(Math.max(0, value) / total * 100).toFixed(1)}%` : null);
  const palette = paletteOf(exhibit);
  const height = Math.round(Math.min(spacious ? 460 : 340, Math.max(220, W * 0.56)));
  const tiles = squarify(values, 0, 0, W, height);
  return <div className="w-full" data-testid="exhibit-treemap">
    <svg width={W} height={height} viewBox={`0 0 ${W} ${height}`} className="block" role="img" aria-label={exhibit.title}>
      {tiles.map((tile) => {
        const fill = palette[tile.index % palette.length];
        const colours = onColor(fill);
        const lines = treemapTileLines(exhibit.categories[tile.index], values[tile.index], unit, shareOf(values[tile.index]), tile.w - 3, tile.h - 3);
        const centreX = tile.x + (tile.w - 3) / 2;
        const centreY = tile.y + (tile.h - 3) / 2;
        const firstY = centreY - (lines.length * 18) / 2 + 14;
        // A tall, narrow tile that cannot hold a horizontal number prints it vertically.
        const upright = !lines.length && tile.w - 3 >= 20 ? [formatValue(values[tile.index], unit), formatCell(values[tile.index])].find((text) => text.length * 9 + 12 <= tile.h - 3) : undefined;
        return <g key={`${exhibit.categories[tile.index]}-${tile.index}`}>
          <rect x={tile.x} y={tile.y} width={Math.max(1, tile.w - 3)} height={Math.max(1, tile.h - 3)} rx="4" fill={fill}><title>{`${exhibit.categories[tile.index]}: ${formatValue(values[tile.index], unit)}${showShare ? ` (${shareOf(values[tile.index])} of total)` : ''}`}</title></rect>
          {lines.map((line, index) => <text key={`${line.text}-${index}`} x={centreX} y={firstY + index * 18} textAnchor="middle" fontSize={line.strong ? 15 : FS} fontWeight={line.strong ? 800 : 700} fill={colours.text} pointerEvents="none">{line.text}</text>)}
          {upright ? <text transform={`rotate(-90 ${centreX} ${centreY})`} x={centreX} y={centreY + 5} textAnchor="middle" fontSize={FS} fontWeight={800} fill={colours.text} pointerEvents="none">{upright}</text> : null}
        </g>;
      })}
    </svg>
    <ul className={`mt-3 grid gap-x-6 gap-y-1 ${W >= 620 ? 'grid-cols-2' : 'grid-cols-1'}`} data-testid="exhibit-treemap-key">
      {exhibit.categories.map((category, index) => <li key={`${category}-${index}`} className="flex items-start gap-2 text-[14px] leading-5">
        <span className="mt-1 h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: palette[index % palette.length] }} aria-hidden="true" />
        <span className="min-w-0 flex-1 break-words text-[var(--space-text-secondary)]">{category}</span>
        <span className="shrink-0 font-bold tabular-nums text-[var(--space-text-primary)]">{formatValue(values[index], unit)}</span>
        {showShare ? <span className="w-14 shrink-0 text-right tabular-nums text-[var(--space-text-muted)]">{shareOf(values[index])}</span> : null}
      </li>)}
    </ul>
    {showShare ? <p className="mt-1.5 text-right text-[13px] font-semibold text-[var(--space-text-secondary)]">Total: <span className="tabular-nums text-[var(--space-text-primary)]">{formatValue(total, unit)}</span></p> : null}
  </div>;
}

function DataTable({ exhibit, stackOnMobile = false }: { exhibit: CanonicalExhibit; stackOnMobile?: boolean }) {
  if (exhibit.kind === 'kpi-scorecard') {
    // Every series is printed with its own stated value, so a comparison figure keeps its unit (e.g. "8%", not "8").
    const shown = (series: ExhibitSeries, index: number) => series.displayValues?.[index] || formatValue(series.values[index], series.unit || exhibit.unit);
    return <div className="grid grid-cols-2 gap-2">{exhibit.categories.map((category, index) => <div key={category} className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-2.5"><p className="text-[11px] font-semibold leading-4 text-[var(--space-text-muted)]">{category}</p><p className="mt-1 text-lg font-extrabold tabular-nums text-[var(--space-text-primary)]">{exhibit.series.length > 1 ? <span className="mr-1 text-[11px] font-semibold text-[var(--space-text-muted)]">{exhibit.series[0].name}:</span> : null}{shown(exhibit.series[0], index)}</p>{exhibit.series.slice(1).map((series) => <p key={series.name} className="mt-0.5 text-[11px] text-[var(--space-text-secondary)]">{series.name}: <span className="font-semibold tabular-nums">{shown(series, index)}</span></p>)}</div>)}</div>;
  }
  const { columns, rows, caption } = buildTableData(exhibit);
  return <CompactTable columns={columns} rows={rows} caption={caption} minWidth={columns.length > 3 ? 360 : 0} stackOnMobile={stackOnMobile} />;
}

function FunnelChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { W, H } = useDims();
  const series = exhibit.series[0];
  const palette = paletteOf(exhibit);
  const top = 8;
  const row = (H - top * 2) / Math.max(series.values.length, 1);
  const barHeight = Math.max(24, Math.min(row - 10, 60));
  const largest = Math.max(...series.values, 1);
  const fullWidth = Math.max(W - 24, 60);
  return <Svg title={exhibit.title}>{series.values.map((value, index) => {
    const text = `${exhibit.categories[index]} ${formatValue(value, '')}`;
    const width = Math.min(fullWidth, Math.max(text.length * 8.6 + 16, value / largest * fullWidth));
    const x = (W - width) / 2;
    const y = top + index * row + (row - barHeight) / 2;
    const fill = palette[index % palette.length];
    return <g key={`${exhibit.categories[index]}-${index}`}>
      <rect x={x} y={y} width={width} height={barHeight} rx="4" fill={fill}><title>{`${exhibit.categories[index]}: ${formatValue(value, series.unit || exhibit.unit)}`}</title></rect>
      <text x={W / 2} y={y + barHeight / 2 + 5} textAnchor="middle" fontSize={FS} fontWeight="700" fill={onColor(fill).text}>{text}</text>
    </g>;
  })}</Svg>;
}

function BulletChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { W, H } = useDims();
  const actual = exhibit.series[0];
  const target = exhibit.series[1];
  const palette = paletteOf(exhibit);
  const largest = Math.max(...actual.values, ...(target ? target.values : []), 1);
  const step = 10 ** Math.floor(Math.log10(largest)) / 2;
  const maximum = Math.ceil(largest * 1.08 / step) * step;
  const ticks = Array.from({ length: Math.round(maximum / step) + 1 }, (_, tick) => tick * step);
  const longest = Math.max(...exhibit.categories.map((category) => category.length), 4);
  const left = Math.round(Math.min(Math.max(longest * 7.4 + 16, 80), W * 0.3));
  const right = 84;
  const top = 12;
  const bottom = 34;
  const plotWidth = Math.max(W - left - right, 40);
  const row = (H - top - bottom) / Math.max(exhibit.categories.length, 1);
  const trackHeight = Math.min(row * 0.62, 36);
  const barHeight = trackHeight * 0.45;
  const xFor = (value: number) => left + value / maximum * plotWidth;
  const actualColor = actual.color || palette[0];
  const targetColor = target?.color || 'var(--space-semantic-danger-600)';
  return <Svg title={exhibit.title}>
    {ticks.map((value) => {
      return <g key={value}><line x1={xFor(value)} x2={xFor(value)} y1={top} y2={H - bottom} stroke="var(--space-border-default)" /><text x={xFor(value)} y={H - bottom + 18} textAnchor="middle" fontSize={FS} fill="var(--space-text-muted)">{formatAxisTick(value)}</text></g>;
    })}
    {exhibit.categories.map((category, index) => {
      const centre = top + index * row + row / 2;
      const reached = actual.values[index];
      const goal = target ? target.values[index] : undefined;
      return <g key={`${category}-${index}`}>
        <text x={left - 10} y={centre + 4.5} textAnchor="end" fontSize={FS} fontWeight="600" fill="var(--space-text-secondary)"><title>{category}</title>{label(category, Math.floor((left - 16) / 7.4))}</text>
        <rect x={left} y={centre - trackHeight / 2} width={plotWidth} height={trackHeight} rx="3" fill="var(--space-surface-muted)" />
        <rect x={left} y={centre - barHeight / 2} width={Math.max(1, xFor(reached) - left)} height={barHeight} rx="2" fill={actualColor}><title>{`${category} - ${actual.name}: ${formatValue(reached, actual.unit || exhibit.unit)}`}</title></rect>
        {goal !== undefined ? <rect x={xFor(goal) - 2} y={centre - trackHeight / 2} width="4" height={trackHeight} rx="1" fill={targetColor}><title>{`${category} - ${target.name}: ${formatValue(goal, target.unit || exhibit.unit)}`}</title></rect> : null}
        <text x={xFor(Math.max(reached, goal ?? 0)) + 10} y={centre + 4.5} textAnchor="start" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)">{goal !== undefined ? `${formatCell(reached)} vs ${formatCell(goal)}` : formatCell(reached)}</text>
      </g>;
    })}
  </Svg>;
}

function ChartBody({ exhibit }: { exhibit: CanonicalExhibit }) {
  const effectiveKind: ExhibitKind = (exhibit.kind === 'pie' || exhibit.kind === 'donut') && exhibit.categories.length > 6 ? 'horizontal-bar' : exhibit.kind;
  const { W, M } = useDims();
  if (TABLE_KINDS.has(effectiveKind)) return <DataTable exhibit={exhibit} />;
  if (effectiveKind === 'horizontal-bar') return <HorizontalBarChart exhibit={exhibit} />;
  if (MULTI_BAR_KINDS.has(effectiveKind) && exhibit.series.length > 1 && W < groupedVerticalWidth(exhibit, M.left + M.right)) return <HorizontalGroupedBarChart exhibit={exhibit} />;
  if (effectiveKind === 'vertical-bar' || effectiveKind === 'bar' || effectiveKind === 'histogram') return <BarChart exhibit={exhibit} mode="vertical" />;
  if (effectiveKind === 'grouped-bar') return <BarChart exhibit={exhibit} mode="grouped" />;
  if (effectiveKind === 'stacked-bar') return <BarChart exhibit={exhibit} mode="stacked" />;
  if (effectiveKind === 'stacked-100') return <BarChart exhibit={exhibit} mode="stacked-100" />;
  if (effectiveKind === 'line' || effectiveKind === 'multi-line') return <LineAreaChart exhibit={exhibit} area={false} stacked={false} />;
  if (effectiveKind === 'area') return <LineAreaChart exhibit={exhibit} area stacked={false} />;
  if (effectiveKind === 'stacked-area') return <LineAreaChart exhibit={exhibit} area stacked />;
  if (effectiveKind === 'combo' || effectiveKind === 'dual-axis') return <ComboChart exhibit={exhibit} />;
  if (effectiveKind === 'waterfall') return <WaterfallChart exhibit={exhibit} />;
  if (effectiveKind === 'slope') return <LineAreaChart exhibit={exhibit} area={false} stacked={false} />;
  if (effectiveKind === 'pareto') return <ParetoChart exhibit={exhibit} />;
  if (effectiveKind === 'scatter') return <ScatterBubbleChart exhibit={exhibit} bubble={false} />;
  if (effectiveKind === 'bubble') return <ScatterBubbleChart exhibit={exhibit} bubble={hasSizeDefinition(exhibit)} />;
  if (effectiveKind === 'heatmap') return <HeatmapChart exhibit={exhibit} />;
  if (effectiveKind === 'funnel') return <FunnelChart exhibit={exhibit} />;
  if (effectiveKind === 'bullet') return <BulletChart exhibit={exhibit} />;
  if (effectiveKind === 'treemap') return <TreemapChart exhibit={exhibit} />;
  if (effectiveKind === 'pie' || effectiveKind === 'donut') return <PieChart exhibit={exhibit} donut={effectiveKind === 'donut'} />;
  throw new Error(`Unsupported chart type: ${effectiveKind}`);
}

const AXIS_TICK_KINDS = new Set<ExhibitKind>(['vertical-bar', 'bar', 'histogram', 'grouped-bar', 'stacked-bar', 'stacked-100', 'line', 'multi-line', 'area', 'stacked-area', 'combo', 'dual-axis', 'waterfall', 'slope', 'pareto']);

/** Widest left-axis tick label the chart will print (Grid draws five ticks from the top value to the bottom value). */
function axisTickChars(exhibit: CanonicalExhibit): number {
  if (!AXIS_TICK_KINDS.has(exhibit.kind)) return 0;
  const bars = exhibit.kind === 'combo' || exhibit.kind === 'dual-axis' ? exhibit.series.filter((series) => series.axis !== 'right') : exhibit.series;
  const values = bars.flatMap((series) => series.values).filter(Number.isFinite);
  if (!values.length) return 0;
  const totals = STACKED_KINDS.has(exhibit.kind) ? exhibit.categories.map((_, index) => bars.reduce((sum, series) => sum + Math.max(0, series.values[index] || 0), 0)) : [];
  const high = exhibit.kind === 'stacked-100' ? 100 : niceMax(totals.length ? totals : values);
  const low = Math.min(0, ...values);
  const bottom = low < 0 ? low - (high - low) * 0.14 : low;
  return Math.max(...[0, 1, 2, 3, 4].map((index) => formatAxisTick(high - index * (high - bottom) / 4).length)) + 1;
}

function ExhibitCard({ source, index, onLogEvent, onExpand, displayMode = 'standard', compact = false }: { source: LibraryExhibit; index: number; onLogEvent?: ExhibitRendererProps['onLogEvent']; onExpand?: () => void; displayMode?: ExhibitDisplayMode; compact?: boolean }) {
  const exhibit = useMemo(() => resolveChartForm(canonicalise(source)), [source]);
  const errors = useMemo(() => validationErrors(exhibit), [exhibit]);
  const { ref, size } = useMeasuredSize();
  useEffect(() => { if (errors.length > 0) reportFailure(exhibit, errors.join(' '), onLogEvent); }, [errors.join('|')]);
  const isTable = TABLE_KINDS.has(exhibit.kind);
  const spacious = displayMode === 'advanced';
  const pieLike = (exhibit.kind === 'pie' || exhibit.kind === 'donut') && exhibit.categories.length <= 6;
  // Pies and treemaps size themselves from the card width and grow with their key, so no key row is ever cut off.
  const autoHeight = pieLike || exhibit.kind === 'treemap';
  const measurable = size.width >= 180 && (autoHeight || size.height >= 120);
  const chartCategoryLabels = exhibit.kind === 'waterfall' ? buildWaterfallLayout(exhibit).points.map((point) => point.label) : exhibit.categories;
  const chartCategoryCount = chartCategoryLabels.length;
  const longestCategory = Math.max(0, ...chartCategoryLabels.map((category) => category.length));
  const tickChars = useMemo(() => axisTickChars(exhibit), [exhibit]);
  const dims = useMemo(
    () => buildDims(size.width, size.height, exhibit.kind, chartCategoryCount, { hasXLabel: Boolean(exhibit.axisConfig?.xLabel), longestLabel: longestCategory, xLabel: exhibit.axisConfig?.xLabel, yLabel: exhibit.axisConfig?.yLabel || exhibit.unit, tickChars }),
    [size.width, size.height, exhibit.kind, chartCategoryCount, longestCategory, exhibit.axisConfig?.xLabel, exhibit.axisConfig?.yLabel, exhibit.unit, tickChars],
  );
  const tight = compact && !spacious && !isTable;
  const chartHeight = spacious ? ADVANCED_CHART_HEIGHT : tight ? 'h-[280px]' : STANDARD_CHART_HEIGHT;
  const chartHeightPixels = tight
    ? exhibit.kind === 'horizontal-bar'
      ? Math.min(320, Math.max(240, exhibit.categories.length * 38 + 60))
      : 280
    : exhibit.kind === 'horizontal-bar'
      ? Math.max(spacious ? 500 : 420, exhibit.categories.length * 48 + 70)
      : spacious ? 500 : 420;
  const denseAxisChart = ['vertical-bar', 'bar', 'histogram', 'grouped-bar', 'stacked-bar', 'stacked-100', 'line', 'multi-line', 'area', 'stacked-area', 'combo', 'dual-axis', 'waterfall', 'slope', 'pareto'].includes(exhibit.kind);
  // Stacked segments and lines share one slot per category, so only labels set their width. Side-by-side bars
  // need room per bar; multi-series bar charts instead switch to horizontal bars on narrow cards.
  // Long category labels rotate or wrap rather than widening the chart; waterfall and Pareto keep their wider slots.
  const barSeries = exhibit.kind === 'combo' || exhibit.kind === 'dual-axis' ? exhibit.series.filter((series) => series.axis !== 'right').length : exhibit.series.length;
  const legacySlots = exhibit.kind === 'waterfall' || exhibit.kind === 'pareto';
  const stackPlan = exhibit.kind === 'stacked-bar' || exhibit.kind === 'stacked-100' ? stackedLabelPlan(exhibit, exhibit.kind === 'stacked-100', chartHeightPixels) : null;
  const perCategory = legacySlots
    ? Math.max(88, exhibit.series.length * 68)
    : stackPlan
      ? Math.max(36, stackPlan.slotNeed)
    : STACKED_KINDS.has(exhibit.kind) || LINE_KINDS.has(exhibit.kind) || barSeries <= 1
      ? 36
      : MULTI_BAR_KINDS.has(exhibit.kind)
        ? 0
        : barSeries * 30 + 16;
  const minChartWidth = exhibit.kind === 'heatmap'
    ? heatmapLeft(exhibit.categories, 1200) + exhibit.series.length * heatmapCellWidth(exhibit) + 10
    : stackPlan ? chartCategoryCount * perCategory + dims.M.left + dims.M.right
    : denseAxisChart && perCategory ? chartCategoryCount * perCategory + (legacySlots ? 130 : 90) : 0;
  return <SpaciousChartLayoutContext.Provider value={spacious}><ChartDimsContext.Provider value={dims}><section className="h-full overflow-hidden rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] shadow-sm" data-testid={`question-library-exhibit-${index + 1}`}>
    <div className={`border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] ${tight ? 'px-3 py-1.5' : 'px-3.5 py-2.5 sm:px-4'}`}><div className="flex items-center justify-between gap-3"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Exhibit {index + 1}</p>{onExpand ? <button type="button" onClick={onExpand} className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 text-[11px] font-bold text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]" aria-label={`Expand Exhibit ${index + 1}`}><Maximize2 className="h-3.5 w-3.5" /> Expand</button> : null}</div><div className={`flex flex-wrap items-end justify-between gap-2 ${tight ? '' : 'mt-1'}`}><div className="min-w-0"><h2 className="break-words text-base font-bold leading-6 text-[var(--space-text-primary)]">{exhibit.title}</h2>{exhibit.subtitle ? <p className="mt-0.5 break-words text-xs leading-5 text-[var(--space-text-secondary)]">{exhibit.subtitle}</p> : null}</div><span className="break-words text-xs font-medium text-[var(--space-text-muted)]">{[exhibit.unit, exhibit.timePeriod].filter(Boolean).join(' · ')}</span></div></div>
    <div className={tight ? 'p-2' : 'p-3'}><Legend exhibit={exhibit} />{isTable ? <div ref={ref} className="min-h-[100px]">{errors.length > 0 ? <DataFallback exhibit={exhibit} reason={errors.join(' ')} /> : <ChartErrorBoundary exhibit={exhibit} onLogEvent={onLogEvent}><ChartBody exhibit={exhibit} /></ChartErrorBoundary>}</div> : <div className="overflow-x-auto" aria-label={minChartWidth ? 'Scrollable chart area' : undefined}><div ref={ref} className={autoHeight ? 'min-h-[200px]' : `${chartHeight} overflow-visible`} style={{ minWidth: minChartWidth || undefined, height: autoHeight ? undefined : chartHeightPixels }}>{errors.length > 0 ? <DataFallback exhibit={exhibit} reason={errors.join(' ')} /> : !measurable ? <div className="flex h-full items-center justify-center rounded-xl bg-[var(--space-surface-muted)] text-sm text-[var(--space-text-muted)]">Preparing exhibit…</div> : <ChartErrorBoundary exhibit={exhibit} onLogEvent={onLogEvent}><ChartBody exhibit={exhibit} /></ChartErrorBoundary>}</div></div>}{exhibit.structureRole ? <p className="mt-3 rounded-lg border-l-4 border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-2 text-xs leading-5 text-[var(--space-text-primary)]" data-testid="exhibit-structure-role"><span className="font-bold">Use in your issue tree:</span> {exhibit.structureRole}</p> : null}{!isTable && errors.length === 0 && exhibit.kind === 'bubble' ? <BubblePointLegend exhibit={exhibit} /> : null}{!isTable && errors.length === 0 && hasSizeDefinition(exhibit) ? <BubbleSizeNote exhibit={exhibit} /> : null}{!isTable && errors.length === 0 ? <details open className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-2.5"><summary className="cursor-pointer text-xs font-bold text-[var(--space-text-primary)]">Every category and value</summary><p className="mt-1 text-[11px] leading-4 text-[var(--space-text-muted)]">This full data view keeps labels and values readable when the chart is narrow or a segment is too small to label directly.</p><div className="mt-2"><DataTable exhibit={exhibit} stackOnMobile /></div></details> : null}{exhibit.analyticalPurpose ? <p className="mt-3 text-xs leading-5 text-[var(--space-text-secondary)]"><span className="font-bold">Analytical purpose:</span> {exhibit.analyticalPurpose}</p> : null}{exhibit.footnote ? <p className="mt-2 text-[11px] leading-5 text-[var(--space-text-muted)]">Note: {exhibit.footnote}</p> : null}{exhibit.sourceNote ? <p className="text-[11px] leading-5 text-[var(--space-text-muted)]">Source: {exhibit.sourceNote}</p> : null}</div>
  </section></ChartDimsContext.Provider></SpaciousChartLayoutContext.Provider>;
}

export default function ExhibitRenderer({ exhibits: sourceExhibits, onLogEvent, displayMode = 'standard', compact = false }: ExhibitRendererProps) {
  const exhibits = useMemo(() => sourceExhibits.map((exhibit) => clarifyUnitsDeep(exhibit)), [sourceExhibits]);
  const warnings = useMemo(() => detectDuplicateExhibits(exhibits), [exhibits]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const expanded = expandedIndex == null ? null : exhibits[expandedIndex];
  useEffect(() => {
    if (expandedIndex == null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedIndex(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expandedIndex]);
  return <div className="space-y-4" data-testid="shared-exhibit-renderer">
    {warnings.map((warning, index) => <div key={`${warning.firstId}-${warning.secondId}-${index}`} className="rounded-xl border border-[var(--space-semantic-warning)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_10%,transparent)] px-4 py-3 text-sm text-[var(--space-text-secondary)]" role="alert"><span className="font-bold text-[var(--space-text-primary)]">Potential duplicate exhibit detected</span> - overlapping metrics: {warning.metrics.length ? warning.metrics.join(', ') : 'same categories and values'} ({warning.firstId} / {warning.secondId}).</div>)}
    <div
      className={`grid w-full gap-4 ${
        exhibits.length === 1
          ? 'grid-cols-1'
          : exhibits.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}
      data-exhibit-layout={exhibits.length === 1 ? 'one-column' : exhibits.length === 2 ? 'two-column' : 'three-column'}
    >
      {exhibits.map((exhibit, index) => (
        <div key={exhibit.id || `${exhibit.title}-${index}`} className="min-w-0 w-full">
          <ExhibitCard source={exhibit} index={index} onLogEvent={onLogEvent} onExpand={() => setExpandedIndex(index)} displayMode={displayMode} compact={compact && exhibits.length === 1} />
        </div>
      ))}
    </div>
    {expanded ? <div className="fixed inset-0 z-[100] overflow-y-auto bg-[color-mix(in_srgb,var(--space-neutral-950)_72%,transparent)] p-3 sm:p-8" role="dialog" aria-modal="true" aria-label={`Expanded ${expanded.title}`}><div className="w-full"><div className="mb-3 flex justify-end"><button type="button" onClick={() => setExpandedIndex(null)} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--space-surface-card)] px-4 text-sm font-bold text-[var(--space-text-primary)]"><X className="h-4 w-4" /> Close</button></div><ExhibitCard source={expanded} index={expandedIndex || 0} onLogEvent={onLogEvent} displayMode="advanced" /></div></div> : null}
  </div>;
}
