import { Component, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Maximize2, X } from 'lucide-react';
import type { ExhibitKind, ExhibitSeries, LibraryExhibit } from '../lib/skillQuestionLibrary';

const DEFAULT_PALETTE = [
  'var(--space-brand-primary-700)',
  '#1d4ed8',
  'var(--space-semantic-success-700)',
  '#6d28d9',
  'var(--space-semantic-warning-700)',
  '#0e7490',
];

const TABLE_KINDS = new Set<ExhibitKind>([
  'table',
  'financial-table',
  'market-sizing-table',
  'sensitivity-table',
  'kpi-scorecard',
]);

/** Readable floor for every number and label drawn inside a chart (CSS px). */
const FS = 14;
const STANDARD_CHART_HEIGHT = 'h-[420px]';
const ADVANCED_CHART_HEIGHT = 'h-[500px]';

interface CanonicalExhibit extends LibraryExhibit {
  categories: string[];
  series: ExhibitSeries[];
}

type ExhibitDisplayMode = 'standard' | 'advanced';

interface ExhibitRendererProps {
  exhibits: LibraryExhibit[];
  onLogEvent?: (eventName: 'chart_render_failed', details: Record<string, unknown>) => void;
  displayMode?: ExhibitDisplayMode;
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

const FREE_KINDS = new Set<string>(['scatter', 'bubble', 'horizontal-bar', 'heatmap', 'treemap', 'pie', 'donut']);

function buildDims(width: number, height: number, kind: string, count: number, hasXLabel: boolean): Dims {
  const W = Math.max(width, 1);
  const H = Math.max(height, 1);
  const dual = kind === 'combo' || kind === 'dual-axis' || kind === 'pareto';
  const point = kind === 'scatter' || kind === 'bubble';
  const left = point ? 76 : W < 400 ? 62 : 72;
  const right = dual ? (W < 400 ? 52 : 60) : point ? 26 : 18;
  const top = point ? 34 : 30;
  const n = Math.max(count, 1);
  const slot = (W - left - right) / n;
  const rotate = !FREE_KINDS.has(kind) && slot < 54;
  const bottom = point ? (hasXLabel ? 66 : 46) : (rotate ? 96 : 68) + (hasXLabel ? 20 : 0);
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

const ChartDimsContext = createContext<Dims>(buildDims(480, 400, 'vertical-bar', 5, false));
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
  const digits = absolute > 0 && absolute < 10 ? 1 : 0;
  const number = absolute.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const signed = value < 0 ? `(${number})` : number;
  if (/percent|%/i.test(unit)) return `${signed}%`;
  return unit ? `${signed} ${unit}` : signed;
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
        : absolute.toLocaleString(undefined, { minimumFractionDigits: absolute > 0 && absolute < 10 ? 1 : 0, maximumFractionDigits: absolute > 0 && absolute < 10 ? 1 : 0 });
  return value < 0 ? `(${compact})` : compact;
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
      if (exhibit.kind === 'bubble' && (!series.sizes || series.sizes.length !== series.values.length || series.sizes.some((value) => !Number.isFinite(Number(value)) || Number(value) < 0))) {
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
function CompactTable({ columns, rows, minWidth = 0 }: { columns: string[]; rows: Array<Array<string | number>>; minWidth?: number }) {
  const numeric = columns.map((_, columnIndex) => columnIndex > 0 && rows.length > 0 && rows.every((row) => isNumericText(row[columnIndex])));
  return (
    <div className="overflow-x-auto" data-testid="exhibit-compact-table">
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
  );
}

function DataFallback({ exhibit, reason }: { exhibit: CanonicalExhibit; reason: string }) {
  const columns = exhibit.columns?.length
    ? exhibit.columns
    : ['Category', ...exhibit.series.map((series) => series.name)];
  const rows = exhibit.rows?.length
    ? exhibit.rows
    : exhibit.categories.map((category, index) => [
        category,
        ...exhibit.series.map((series) => series.displayValues?.[index] || formatValue(series.values[index], series.unit || exhibit.unit)),
      ]);
  return (
    <div className="rounded-xl border border-[var(--space-semantic-warning)] bg-[var(--space-surface-muted)] p-3" role="status" data-testid="exhibit-data-fallback">
      <p className="text-sm font-bold text-[var(--space-text-primary)]">Chart unavailable - showing the underlying data</p>
      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{reason}</p>
      <div className="mt-2"><CompactTable columns={columns} rows={rows} minWidth={320} /></div>
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

function Legend({ exhibit }: { exhibit: CanonicalExhibit }) {
  const spacious = useContext(SpaciousChartLayoutContext);
  // Advanced tables and scorecards do not encode their rows with series
  // colors, so a colored legend would imply a mapping that is not present.
  if ((spacious && (TABLE_KINDS.has(exhibit.kind) || exhibit.kind === 'heatmap')) || exhibit.legendConfig?.show === false || exhibit.series.length <= 1) return null;
  const palette = paletteOf(exhibit);
  return <div className="mb-2 flex flex-wrap justify-center gap-x-4 gap-y-1">{exhibit.series.map((series, index) => <span key={series.name} className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--space-text-secondary)]"><span className="h-3 w-3 rounded-sm" style={{ background: series.color || palette[index % palette.length] }} />{series.name}{series.axis === 'right' ? ' (right axis)' : ''}</span>)}</div>;
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
    <text x={M.left + PW / 2} y={H - 8} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{label(exhibit.axisConfig?.xLabel || '', Math.floor(PW / 7.5))}</text>
    <text transform={`translate(15 ${M.top + PH / 2}) rotate(-90)`} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{label(yLabel, maxChars)}</text>
    {exhibit.axisConfig?.rightYLabel ? <text transform={`translate(${W - 14} ${M.top + PH / 2}) rotate(90)`} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{label(exhibit.axisConfig.rightYLabel, maxChars)}</text> : null}
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

function CategoryLabels({ categories }: { categories: string[] }) {
  const { M, H, PW, slot, rotate } = useDims();
  const baseY = H - M.bottom + 20;
  return <g>{categories.map((category, index) => {
    const x = M.left + (index + 0.5) * PW / categories.length;
    if (rotate) {
      return <text key={`${category}-${index}`} transform={`rotate(-35 ${x} ${baseY - 6})`} x={x} y={baseY - 6} textAnchor="end" fontSize={FS} fill="var(--space-text-muted)"><title>{category}</title>{label(category, 15)}</text>;
    }
    const maxChars = Math.max(5, Math.floor(slot / 7.4));
    const wrapped = wrapLabel(category, maxChars);
    const lines = (wrapped.length > 3 ? [wrapped[0], wrapped[1], `${wrapped[2]}…`] : wrapped).map((line) => label(line, maxChars + 2));
    return <text key={`${category}-${index}`} x={x} y={baseY} textAnchor="middle" fontSize={FS} fill="var(--space-text-muted)"><title>{category}</title>{lines.map((line, lineIndex) => <tspan key={`${line}-${lineIndex}`} x={x} dy={lineIndex === 0 ? 0 : 15}>{line}</tspan>)}</text>;
  })}</g>;
}

/** Bars never stretch into slabs on wide cards: they share a bounded, centred band inside each category slot. */
function barBand(groupWidth: number, count: number, maxEach = 64) {
  const inner = Math.min(groupWidth * 0.74, count * maxEach);
  return { slot: inner / count, offset: (groupWidth - inner) / 2 };
}

function BarChart({ exhibit, mode }: { exhibit: CanonicalExhibit; mode: 'vertical' | 'grouped' | 'stacked' | 'stacked-100' }) {
  const { M, PW, PH } = useDims();
  const palette = paletteOf(exhibit);
  const totals = exhibit.categories.map((_, index) => exhibit.series.reduce((sum, series) => sum + Math.max(0, series.values[index]), 0));
  const allValues = exhibit.series.flatMap((series) => series.values);
  const maximum = mode === 'stacked-100' ? 100 : mode === 'stacked' ? niceMax(totals) : niceMax(allValues);
  const minimum = mode === 'stacked-100' || mode === 'stacked' ? 0 : Math.min(0, ...allValues);
  const span = maximum - minimum || 1;
  const baseline = M.top + maximum / span * PH;
  const groupWidth = PW / exhibit.categories.length;
  const stacked = mode === 'stacked' || mode === 'stacked-100';
  return <Svg title={exhibit.title}><Grid max={maximum} min={minimum} />{exhibit.categories.map((category, categoryIndex) => {
    const total = totals[categoryIndex] || 1;
    if (stacked) {
      const width = Math.min(groupWidth * 0.62, 90);
      const x = M.left + categoryIndex * groupWidth + (groupWidth - width) / 2;
      let cumulative = 0;
      return <g key={category}>{exhibit.series.map((series, seriesIndex) => {
        const raw = Math.max(0, series.values[categoryIndex]);
        const value = mode === 'stacked-100' ? raw / total * 100 : raw;
        const height = value / maximum * PH;
        const y = M.top + PH - cumulative / maximum * PH - height;
        cumulative += value;
        return <rect key={series.name} x={x} y={y} width={width} height={Math.max(1, height)} fill={series.color || palette[seriesIndex % palette.length]}><title>{`${category} - ${series.name}: ${formatValue(raw, series.unit || exhibit.unit)}`}</title></rect>;
      })}{mode === 'stacked' && width >= 34 ? <text x={x + width / 2} y={Math.max(14, M.top + PH - cumulative / maximum * PH - 6)} textAnchor="middle" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)">{formatAxisTick(totals[categoryIndex])}</text> : null}</g>;
    }
    const { slot, offset } = barBand(groupWidth, exhibit.series.length);
    return <g key={category}>{exhibit.series.map((series, seriesIndex) => {
      const value = series.values[categoryIndex];
      const height = Math.abs(value) / span * PH;
      const valueY = M.top + (maximum - value) / span * PH;
      const top = Math.min(valueY, baseline);
      const x = M.left + categoryIndex * groupWidth + offset + seriesIndex * slot;
      return <g key={series.name}>
        <rect x={x + slot * 0.09} y={top} width={Math.max(4, slot * 0.82)} height={Math.max(1, height)} rx="3" fill={series.color || palette[seriesIndex % palette.length]}><title>{`${category} - ${series.name}: ${formatValue(value, series.unit || exhibit.unit)}`}</title></rect>
        {slot >= 36 || (exhibit.series.length === 1 && groupWidth >= 38) ? <text x={x + slot / 2} y={value >= 0 ? Math.max(14, top - 6) : top + height + 16} textAnchor="middle" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)">{formatAxisTick(value)}</text> : null}
      </g>;
    })}</g>;
  })}<CategoryLabels categories={exhibit.categories} /><AxisLabels exhibit={exhibit} /></Svg>;
}

function HorizontalBarChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { W, H } = useDims();
  const series = exhibit.series[0];
  const maximum = niceMax(series.values);
  const minimum = Math.min(0, ...series.values);
  const span = maximum - minimum || 1;
  const sorted = exhibit.categories.map((category, index) => ({ category, value: series.values[index] })).sort((a, b) => b.value - a.value);
  const longest = Math.max(...sorted.map((item) => item.category.length), 4);
  const left = Math.round(Math.min(Math.max(longest * 7.4 + 16, 90), W * 0.4));
  const right = 60;
  const top = 14;
  const bottom = exhibit.axisConfig?.xLabel || exhibit.unit ? 46 : 24;
  const plotWidth = W - left - right;
  const plotHeight = H - top - bottom;
  const row = plotHeight / sorted.length;
  const barHeight = Math.min(row * 0.64, 34);
  const maxChars = Math.max(6, Math.floor((left - 16) / 7.4));
  const color = series.color || paletteOf(exhibit)[0];
  const zeroX = left + (0 - minimum) / span * plotWidth;
  return <Svg title={exhibit.title}>{sorted.map((item, index) => {
    const valueX = left + (item.value - minimum) / span * plotWidth;
    const barWidth = Math.max(1, Math.abs(valueX - zeroX));
    const centre = top + index * row + row / 2;
    return <g key={item.category}>
      <text x={left - 10} y={centre + 4.5} textAnchor="end" fontSize={FS} fontWeight="600" fill="var(--space-text-secondary)"><title>{item.category}</title>{label(item.category, maxChars)}</text>
      <rect x={Math.min(valueX, zeroX)} y={centre - barHeight / 2} width={barWidth} height={barHeight} rx="4" fill={color}><title>{`${item.category}: ${formatValue(item.value, exhibit.unit)}`}</title></rect>
      <text x={item.value >= 0 ? valueX + 8 : zeroX + 8} y={centre + 4.5} textAnchor="start" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)">{formatAxisTick(item.value)}</text>
    </g>;
  })}<text x={left + plotWidth / 2} y={H - 12} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{exhibit.axisConfig?.xLabel || exhibit.unit}</text></Svg>;
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
  const values = exhibit.series[0].values;
  const cumulative: number[] = [];
  values.forEach((value, index) => cumulative.push(index === 0 ? value : cumulative[index - 1] + value));
  const maximum = niceMax([...cumulative, ...values]);
  const minimum = Math.min(0, ...cumulative, ...values);
  const span = maximum - minimum || 1;
  const yFor = (value: number) => M.top + (maximum - value) / span * PH;
  const group = PW / values.length;
  const { slot, offset } = barBand(group, 1, 76);
  return <Svg title={exhibit.title}><Grid max={maximum} min={minimum} />{values.map((value, index) => {
    const start = index === 0 ? 0 : cumulative[index - 1];
    const end = cumulative[index];
    const top = Math.max(start, end);
    const bottom = Math.min(start, end);
    const y = yFor(top);
    const height = Math.max(2, (top - bottom) / span * PH);
    const x = M.left + index * group + offset + slot * 0.1;
    return <g key={exhibit.categories[index]}>
      {index > 0 ? <line x1={M.left + (index - 1) * group + offset + slot * 0.9} x2={x} y1={yFor(start)} y2={yFor(start)} stroke="var(--space-border-strong)" strokeDasharray="4 3" /> : null}
      <rect x={x} y={y} width={slot * 0.8} height={height} rx="3" fill={index === 0 ? 'var(--space-brand-primary-700)' : value >= 0 ? 'var(--space-semantic-success-600)' : 'var(--space-semantic-danger-600)'}><title>{`${exhibit.categories[index]}: ${formatValue(value, exhibit.unit)}; running total ${formatValue(end, exhibit.unit)}`}</title></rect>
      {slot >= 32 ? <text x={x + slot * 0.4} y={Math.max(14, y - 6)} textAnchor="middle" fontSize={FS} fontWeight="700" fill="var(--space-text-primary)">{value > 0 && index > 0 ? '+' : ''}{formatAxisTick(value)}</text> : null}
    </g>;
  })}<CategoryLabels categories={exhibit.categories} /><AxisLabels exhibit={exhibit} /></Svg>;
}

function ScatterBubbleChart({ exhibit, bubble }: { exhibit: CanonicalExhibit; bubble: boolean }) {
  const { W, H, M, PW, PH } = useDims();
  const allX = exhibit.series.flatMap((series) => series.xValues || []);
  const allY = exhibit.series.flatMap((series) => series.values);
  const maxX = niceMax(allX);
  const minX = Math.min(0, ...allX);
  const spanX = maxX - minX || 1;
  const maxY = niceMax(allY);
  const minY = Math.min(0, ...allY);
  const spanY = maxY - minY || 1;
  const maxSize = Math.max(...exhibit.series.flatMap((series) => series.sizes || [1]), 1);
  const palette = paletteOf(exhibit);
  return <Svg title={exhibit.title}>
    {[0, 1, 2, 3, 4].map((tick) => { const y = M.top + tick * PH / 4; const value = maxY - tick * spanY / 4; return <g key={tick}><line x1={M.left} x2={W - M.right} y1={y} y2={y} stroke="var(--space-border-default)" /><text x={M.left - 8} y={y + 4.5} textAnchor="end" fontSize={FS} fill="var(--space-text-muted)">{formatAxisTick(value)}</text></g>; })}
    {[0, 1, 2, 3, 4].map((tick) => <text key={`x-${tick}`} x={M.left + tick * PW / 4} y={M.top + PH + 20} textAnchor="middle" fontSize={FS} fill="var(--space-text-muted)">{formatAxisTick(minX + tick * spanX / 4)}</text>)}
    {exhibit.series.flatMap((series, seriesIndex) => series.values.map((y, index) => {
      const x = Number(series.xValues?.[index] || 0);
      const size = Number(series.sizes?.[index] || 1);
      const radius = bubble ? 10 + Math.sqrt(size / maxSize) * 22 : 9;
      const pointX = M.left + (x - minX) / spanX * PW;
      const pointY = M.top + (maxY - y) / spanY * PH;
      const direction = pointX > W - M.right - 130 ? -1 : 1;
      const labelX = pointX + direction * (radius + 8);
      const preferredY = pointY + (index % 2 === 0 ? -(radius + 6) : radius + 14);
      const labelY = Math.max(18, Math.min(M.top + PH + 4, preferredY));
      const category = exhibit.categories[index];
      return <g key={`${series.name}-${index}`}><circle cx={pointX} cy={pointY} r={radius} fill={series.color || palette[seriesIndex % palette.length]} opacity="0.82" stroke="var(--space-surface-card)" strokeWidth="3"><title>{`${category} - X: ${x}; Y: ${formatValue(y, exhibit.unit)}${bubble ? `; size: ${size}` : ''}`}</title></circle><text x={labelX} y={labelY} textAnchor={direction > 0 ? 'start' : 'end'} fontSize={FS} fontWeight="700" fill="var(--space-text-primary)" stroke="var(--space-surface-card)" strokeWidth="5" paintOrder="stroke">{label(category, 16)}</text></g>;
    }))}
    <text x={M.left + PW / 2} y={H - 10} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{exhibit.axisConfig?.xLabel || ''}</text>
    <text transform={`translate(15 ${M.top + PH / 2}) rotate(-90)`} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{label(exhibit.axisConfig?.yLabel || exhibit.unit || '', Math.max(6, Math.floor(PH / 8)))}</text>
  </Svg>;
}

function PieChart({ exhibit, donut }: { exhibit: CanonicalExhibit; donut: boolean }) {
  const { W, H } = useDims();
  const values = exhibit.series[0].values;
  const total = values.reduce((sum, value) => sum + value, 0);
  const palette = paletteOf(exhibit);
  const count = values.length;
  const sideBySide = W >= 560;
  const legendHeight = count * 26 + 4;
  const available = sideBySide ? Math.min(H - 12, W * 0.46) : Math.min(W - 16, H - legendHeight - 12);
  const size = Math.round(Math.max(1, Math.min(available, 400)));
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
  return <div className={`flex h-full w-full items-center justify-center gap-4 overflow-hidden ${sideBySide ? 'flex-row px-2' : 'flex-col'}`} data-testid="exhibit-pie">
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block shrink-0" role="img" aria-label={exhibit.title}>
      {slices.map((slice) => <path key={exhibit.categories[slice.index]} d={slice.path} fill={palette[slice.index % palette.length]} stroke="var(--space-surface-card)" strokeWidth="3"><title>{`${exhibit.categories[slice.index]}: ${formatValue(values[slice.index], exhibit.unit)}`}</title></path>)}
      {donut ? <circle cx={centre} cy={centre} r={hole} fill="var(--space-surface-card)" /> : null}
      {slices.filter((slice) => slice.fraction >= 0.06).map((slice) => <text key={`p-${slice.index}`} x={slice.labelX} y={slice.labelY + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="#ffffff" stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" paintOrder="stroke">{Math.round(slice.fraction * 100)}%</text>)}
    </svg>
    <ul className={`min-w-0 space-y-1 ${sideBySide ? 'flex-1' : 'w-full'}`}>
      {exhibit.categories.map((category, index) => <li key={`${category}-${index}`} className="flex items-start gap-2 text-[14px] leading-5" title={category}>
        <span className="mt-1 h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: palette[index % palette.length] }} aria-hidden="true" />
        <span className="min-w-0 flex-1 break-words text-[var(--space-text-secondary)] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] overflow-hidden">{category}</span>
        <span className="shrink-0 font-bold tabular-nums text-[var(--space-text-primary)]">{formatValue(values[index], exhibit.unit)}</span>
      </li>)}
    </ul>
  </div>;
}

function HeatmapChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { W, H } = useDims();
  const values = exhibit.series.flatMap((series) => series.values);
  const min = Math.min(...values); const max = Math.max(...values); const span = max - min || 1;
  const left = Math.round(Math.min(130, W * 0.28));
  const top = 44;
  const right = 10;
  const bottom = 10;
  const cellW = (W - left - right) / exhibit.series.length;
  const cellH = (H - top - bottom) / exhibit.categories.length;
  return <Svg title={exhibit.title}>{exhibit.categories.map((category, row) => <g key={category}><text x={left - 8} y={top + (row + 0.5) * cellH + 4.5} textAnchor="end" fontSize={FS} fill="var(--space-text-secondary)"><title>{category}</title>{label(category, Math.floor((left - 12) / 7.4))}</text>{exhibit.series.map((series, column) => { const value = series.values[row]; const intensity = 18 + (value - min) / span * 72; return <g key={series.name}><rect x={left + column * cellW} y={top + row * cellH} width={cellW - 3} height={cellH - 3} rx="4" fill={`color-mix(in srgb, var(--space-brand-primary-700) ${intensity}%, var(--space-surface-card))`}><title>{`${category} - ${series.name}: ${formatValue(value, exhibit.unit)}`}</title></rect><text x={left + (column + 0.5) * cellW} y={top + (row + 0.5) * cellH + 4.5} textAnchor="middle" fontSize={FS} fontWeight="700" fill={intensity > 55 ? '#ffffff' : 'var(--space-text-primary)'}>{formatValue(value, exhibit.unit)}</text></g>; })}</g>)}{exhibit.series.map((series, index) => <text key={series.name} x={left + (index + 0.5) * cellW} y={top - 12} textAnchor="middle" fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{label(series.name, Math.max(4, Math.floor(cellW / 7.4)))}</text>)}</Svg>;
}

function TreemapChart({ exhibit }: { exhibit: CanonicalExhibit }) {
  const { M, PW, PH } = useDims();
  const values = exhibit.series[0].values;
  const total = values.reduce((sum, value) => sum + Math.max(0, value), 0) || 1;
  const palette = paletteOf(exhibit);
  let x = M.left;
  return <Svg title={exhibit.title}>{values.map((value, index) => { const width = Math.max(2, value / total * PW); const currentX = x; x += width; return <g key={exhibit.categories[index]}><rect x={currentX} y={M.top} width={width - 3} height={PH} rx="4" fill={palette[index % palette.length]}><title>{`${exhibit.categories[index]}: ${formatValue(value, exhibit.unit)}`}</title></rect>{width > 64 ? <><text x={currentX + width / 2} y={M.top + PH / 2 - 6} textAnchor="middle" fontSize={FS} fontWeight="700" fill="#ffffff">{label(exhibit.categories[index], Math.max(4, Math.floor(width / 8)))}</text><text x={currentX + width / 2} y={M.top + PH / 2 + 16} textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffffff">{formatValue(value, exhibit.unit)}</text></> : null}</g>; })}</Svg>;
}

function DataTable({ exhibit }: { exhibit: CanonicalExhibit }) {
  if (exhibit.kind === 'kpi-scorecard') return <div className="grid grid-cols-2 gap-2">{exhibit.categories.map((category, index) => <div key={category} className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-2.5"><p className="text-[11px] font-semibold leading-4 text-[var(--space-text-muted)]">{category}</p><p className="mt-1 text-lg font-extrabold tabular-nums text-[var(--space-text-primary)]">{exhibit.series[0].displayValues?.[index] || formatValue(exhibit.series[0].values[index], exhibit.series[0].unit || exhibit.unit)}</p>{exhibit.series[1] ? <p className="mt-0.5 text-[11px] text-[var(--space-text-secondary)]">{exhibit.series[1].name}: {formatValue(exhibit.series[1].values[index], exhibit.series[1].unit || '')}</p> : null}</div>)}</div>;
  const isPointChart = exhibit.kind === 'scatter' || exhibit.kind === 'bubble';
  const columns = exhibit.columns?.length ? exhibit.columns : isPointChart ? ['Category', 'Series', exhibit.axisConfig?.xLabel || 'X', exhibit.axisConfig?.yLabel || exhibit.unit || 'Y', ...(exhibit.kind === 'bubble' ? ['Size'] : [])] : ['Category', ...exhibit.series.map((series) => series.name)];
  const rows = exhibit.rows?.length ? exhibit.rows : isPointChart ? exhibit.series.flatMap((series) => series.values.map((value, index) => [exhibit.categories[index], series.name, formatAxisTick(Number(series.xValues?.[index] || 0)), formatValue(value, series.unit || exhibit.unit), ...(exhibit.kind === 'bubble' ? [formatAxisTick(Number(series.sizes?.[index] || 0))] : [])])) : exhibit.categories.map((category, index) => [category, ...exhibit.series.map((series) => series.displayValues?.[index] || formatValue(series.values[index], series.unit || exhibit.unit))]);
  return <CompactTable columns={columns} rows={rows} minWidth={columns.length > 3 ? 360 : 0} />;
}

function ChartBody({ exhibit }: { exhibit: CanonicalExhibit }) {
  const effectiveKind: ExhibitKind = (exhibit.kind === 'pie' || exhibit.kind === 'donut') && exhibit.categories.length > 6 ? 'horizontal-bar' : exhibit.kind;
  if (TABLE_KINDS.has(effectiveKind)) return <DataTable exhibit={exhibit} />;
  if (effectiveKind === 'horizontal-bar') return <HorizontalBarChart exhibit={exhibit} />;
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
  if (effectiveKind === 'bubble') return <ScatterBubbleChart exhibit={exhibit} bubble />;
  if (effectiveKind === 'heatmap') return <HeatmapChart exhibit={exhibit} />;
  if (effectiveKind === 'treemap') return <TreemapChart exhibit={exhibit} />;
  if (effectiveKind === 'pie' || effectiveKind === 'donut') return <PieChart exhibit={exhibit} donut={effectiveKind === 'donut'} />;
  throw new Error(`Unsupported chart type: ${effectiveKind}`);
}

function ExhibitCard({ source, index, onLogEvent, onExpand, displayMode = 'standard' }: { source: LibraryExhibit; index: number; onLogEvent?: ExhibitRendererProps['onLogEvent']; onExpand?: () => void; displayMode?: ExhibitDisplayMode }) {
  const exhibit = useMemo(() => canonicalise(source), [source]);
  const errors = useMemo(() => validationErrors(exhibit), [exhibit]);
  const { ref, size } = useMeasuredSize();
  useEffect(() => { if (errors.length > 0) reportFailure(exhibit, errors.join(' '), onLogEvent); }, [errors.join('|')]);
  const isTable = TABLE_KINDS.has(exhibit.kind);
  const spacious = displayMode === 'advanced';
  const measurable = size.width >= 180 && size.height >= 120;
  const dims = useMemo(
    () => buildDims(size.width, size.height, exhibit.kind, exhibit.categories.length, Boolean(exhibit.axisConfig?.xLabel)),
    [size.width, size.height, exhibit.kind, exhibit.categories.length, exhibit.axisConfig?.xLabel],
  );
  const chartHeight = spacious ? ADVANCED_CHART_HEIGHT : STANDARD_CHART_HEIGHT;
  return <SpaciousChartLayoutContext.Provider value={spacious}><ChartDimsContext.Provider value={dims}><section className="h-full overflow-hidden rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] shadow-sm" data-testid={`question-library-exhibit-${index + 1}`}>
    <div className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3.5 py-2.5 sm:px-4"><div className="flex items-center justify-between gap-3"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Exhibit {index + 1}</p>{onExpand ? <button type="button" onClick={onExpand} className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 text-[11px] font-bold text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]" aria-label={`Expand Exhibit ${index + 1}`}><Maximize2 className="h-3.5 w-3.5" /> Expand</button> : null}</div><div className="mt-1 flex flex-wrap items-end justify-between gap-2"><div className="min-w-0"><h2 className="break-words text-base font-bold leading-6 text-[var(--space-text-primary)]">{exhibit.title}</h2>{exhibit.subtitle ? <p className="mt-0.5 break-words text-xs leading-5 text-[var(--space-text-secondary)]">{exhibit.subtitle}</p> : null}</div><span className="break-words text-xs font-medium text-[var(--space-text-muted)]">{[exhibit.unit, exhibit.timePeriod].filter(Boolean).join(' · ')}</span></div></div>
    <div className="p-3"><Legend exhibit={exhibit} /><div ref={ref} className={isTable ? 'min-h-[100px]' : `${chartHeight} overflow-hidden`}>{errors.length > 0 ? <DataFallback exhibit={exhibit} reason={errors.join(' ')} /> : !isTable && !measurable ? <div className={`flex h-full items-center justify-center rounded-xl bg-[var(--space-surface-muted)] text-sm text-[var(--space-text-muted)]`}>Preparing exhibit…</div> : <ChartErrorBoundary exhibit={exhibit} onLogEvent={onLogEvent}><ChartBody exhibit={exhibit} /></ChartErrorBoundary>}</div>{!isTable && errors.length === 0 ? <details className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-2.5"><summary className="cursor-pointer text-xs font-bold text-[var(--space-text-primary)]">View data table</summary><div className="mt-2"><DataTable exhibit={exhibit} /></div></details> : null}{exhibit.analyticalPurpose ? <p className="mt-3 text-xs leading-5 text-[var(--space-text-secondary)]"><span className="font-bold">Analytical purpose:</span> {exhibit.analyticalPurpose}</p> : null}{exhibit.footnote ? <p className="mt-2 text-[11px] leading-5 text-[var(--space-text-muted)]">Note: {exhibit.footnote}</p> : null}{exhibit.sourceNote ? <p className="text-[11px] leading-5 text-[var(--space-text-muted)]">Source: {exhibit.sourceNote}</p> : null}</div>
  </section></ChartDimsContext.Provider></SpaciousChartLayoutContext.Provider>;
}

export default function ExhibitRenderer({ exhibits, onLogEvent, displayMode = 'standard' }: ExhibitRendererProps) {
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
          <ExhibitCard source={exhibit} index={index} onLogEvent={onLogEvent} onExpand={() => setExpandedIndex(index)} displayMode={displayMode} />
        </div>
      ))}
    </div>
    {expanded ? <div className="fixed inset-0 z-[100] overflow-y-auto bg-[color-mix(in_srgb,var(--space-neutral-950)_72%,transparent)] p-3 sm:p-8" role="dialog" aria-modal="true" aria-label={`Expanded ${expanded.title}`}><div className="w-full"><div className="mb-3 flex justify-end"><button type="button" onClick={() => setExpandedIndex(null)} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--space-surface-card)] px-4 text-sm font-bold text-[var(--space-text-primary)]"><X className="h-4 w-4" /> Close</button></div><ExhibitCard source={expanded} index={expandedIndex || 0} onLogEvent={onLogEvent} displayMode="advanced" /></div></div> : null}
  </div>;
}
