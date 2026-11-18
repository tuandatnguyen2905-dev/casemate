/**
 * CaseExhibits.tsx - the shared exhibit renderer for both Case Drill and Case
 * Pool. Every prebuilt case's data passes through here.
 *
 * IRON RULE (per the brief): never show raw JSON or comma-separated strings
 * where a table or chart belongs.
 *   • table       → a compact HTML table with a header and alternating row stripes
 *   • chart_data  → column (comparison) / bar (ranking) / line (trend) / donut (composition)
 *   • metric      → a metric card: big number + label + context
 *
 * SIZING: charts are drawn in real CSS pixels - the SVG is as wide as the
 * measured card, so a 14px label stays 14px whether the card is one third of a
 * wide screen or the whole row. Charts are tall (360-420px) and fill the card;
 * tables are deliberately compact (11px figures, tight padding) so they never
 * out-weigh the charts beside them.
 *
 * NARROW SCREENS: a four-column exhibit cannot fit beside the agent panel or
 * on a phone, and hiding half the numbers behind a horizontal scrollbar makes
 * the case unreadable. Below the `sm` breakpoint each table row therefore
 * becomes its own stacked card (row label on top, one label/value line per
 * remaining column) so every figure is visible without sideways scrolling;
 * the real table returns at `sm` and up.
 *
 * Charts use plain SVG/CSS so they inherit the `--space-*` tokens, stay sharp
 * at any zoom, and add zero library bytes to the customer bundle.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { BarChart3, Gauge, Maximize2, Table2, TrendingUp, X } from 'lucide-react';
import type { CaseExhibit, ExhibitChart, ExhibitMetric, ExhibitTable } from '../lib/caseLibraryShared';
import { dedupeColumnUnits } from '../lib/exhibitTableUnits';
import { clarifyUnitLabel, clarifyUnitText, clarifyUnitsDeep } from '../lib/unitLabels';

const SLICE_COLORS = [
  'var(--space-brand-primary-600)',
  'var(--space-brand-primary-200)',
  'var(--space-brand-primary-700)',
  'var(--space-brand-primary-100)',
  'var(--space-brand-primary-500)',
  'var(--space-brand-primary-900)',
];

/** Readable floor for every number and label drawn inside a chart (CSS px). */
const FS = 14;
/** Average advance of one 14px chart glyph; label layout is sized with it before anything is drawn. */
const CHAR = 8.2;
const ROTATION = (35 * Math.PI) / 180;
const PLOT_HEIGHT = 360;
const PIE_HEIGHT = 420;

/** Display-only numeric formatting; stored chart values are never changed. */
function fmt(value: number): string {
  if (!Number.isFinite(value)) return '-';
  return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function shorten(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, Math.max(max - 1, 1))}…` : value;
}

function wrapWords(value: string, max: number): string[] {
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

/** Numeric cells are right-aligned with tabular figures; text cells left-aligned. */
function isNumericCell(cell: string | number): boolean {
  if (typeof cell === 'number') return true;
  const text = String(cell ?? '').trim();
  if (!text) return false;
  return /^[-+]?[\d.,]+\s*%?$/.test(text);
}

function useBoxWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => setWidth(Math.round(element.getBoundingClientRect().width));
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
  return { ref, width };
}

function ExhibitFrame({
  index,
  title,
  icon,
  children,
  note,
  onExpand,
}: {
  index?: number;
  title: string;
  icon: 'table' | 'bar' | 'line' | 'pie' | 'metric';
  children: React.ReactNode;
  note?: string;
  onExpand?: () => void;
}) {
  const Icon = icon === 'table' ? Table2 : icon === 'line' ? TrendingUp : icon === 'metric' ? Gauge : BarChart3;
  return (
    <div
      className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3"
      data-testid={`case-exhibit-${icon}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">
          {typeof index === 'number' ? `Exhibit ${index + 1}` : 'Exhibit'}
        </p>
        {onExpand ? (
          <button type="button" onClick={onExpand} className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 text-[11px] font-bold text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]" aria-label={`Expand ${title}`}>
            <Maximize2 className="h-3.5 w-3.5" /> Expand
          </button>
        ) : (
          <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-muted)]" aria-hidden="true" />
        )}
      </div>
      <h4 className="mt-1 break-words text-sm font-semibold leading-5 text-[var(--space-text-primary)]">{title}</h4>
      <div className="mt-2.5">{children}</div>
      {note ? <p className="mt-2 text-[11px] leading-4 text-[var(--space-text-muted)]">{note}</p> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Data table (compact)
 * ----------------------------------------------------------------------- */

function TableExhibit({ exhibit: sourceExhibit, index }: { exhibit: ExhibitTable; index?: number }) {
  // A unit that every cell in a column repeats is stated once, in the header.
  const exhibit: ExhibitTable = { ...sourceExhibit, ...dedupeColumnUnits(sourceExhibit.columns, sourceExhibit.rows) };
  // Columns that are all numbers get right-aligned headers and cells - easier to scan down.
  const numericColumns = exhibit.columns.map((_, columnIndex) =>
    columnIndex > 0 && exhibit.rows.every((row) => isNumericCell(row[columnIndex])),
  );
  const cellText = (cell: string | number | undefined) =>
    typeof cell === 'number' ? fmt(cell) : String(cell ?? '');
  // A single-column table has nothing to stack into label/value pairs.
  const stackable = exhibit.columns.length > 1;

  return (
    <ExhibitFrame index={index} title={exhibit.title} icon="table" note={exhibit.note}>
      {stackable ? (
        <div className="space-y-1.5 sm:hidden" data-testid="case-exhibit-table-stacked">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
            {exhibit.columns[0]}
          </p>
          {exhibit.rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-2 py-1.5"
            >
              <p className="text-[11px] font-bold leading-4 text-[var(--space-text-primary)]">
                {cellText(row[0]) || `Row ${rowIndex + 1}`}
              </p>
              <dl className="mt-1 space-y-0.5">
                {exhibit.columns.slice(1).map((column, offset) => {
                  const cellIndex = offset + 1;
                  return (
                    <div key={cellIndex} className="flex items-baseline justify-between gap-3">
                      <dt className="min-w-0 text-[10px] uppercase leading-4 tracking-wider text-[var(--space-text-muted)]">
                        {column}
                      </dt>
                      <dd
                        className={`shrink-0 text-[11px] font-semibold leading-4 text-[var(--space-text-primary)] ${
                          numericColumns[cellIndex] ? 'tabular-nums' : ''
                        }`}
                      >
                        {cellText(row[cellIndex])}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>
      ) : null}

      <div className={`${stackable ? 'hidden sm:block' : ''} -mx-1 overflow-x-auto px-1`}>
        <table className="w-full min-w-full border-collapse text-[11px]" data-testid="case-exhibit-table">
          <thead>
            <tr>
              {exhibit.columns.map((column, columnIndex) => (
                <th
                  key={`${column}-${columnIndex}`}
                  scope="col"
                  className={`break-words border-b-2 border-[var(--space-border-strong)] px-1.5 py-1 text-[10px] font-bold uppercase leading-3 tracking-wider text-[var(--space-text-muted)] ${
                    numericColumns[columnIndex] ? 'text-right' : 'text-left'
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exhibit.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 1 ? 'bg-[var(--space-surface-muted)]' : 'bg-transparent'}
              >
                {exhibit.columns.map((_, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`border-b border-[var(--space-border-default)] px-1.5 py-1 text-[11px] leading-4 ${
                      numericColumns[cellIndex]
                        ? 'whitespace-nowrap text-right font-semibold tabular-nums text-[var(--space-text-primary)]'
                        : cellIndex === 0
                          ? 'text-left font-medium text-[var(--space-text-primary)]'
                          : 'text-left text-[var(--space-text-secondary)]'
                    }`}
                  >
                    {cellText(row[cellIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ExhibitFrame>
  );
}

/* -------------------------------------------------------------------------
 * Charts
 * ----------------------------------------------------------------------- */

export type CaseChartKind = 'column' | 'bar' | 'line' | 'pie';

function inferChartType(exhibit: ExhibitChart, values: number[]): CaseChartKind {
  const title = String(exhibit.title || '').toLowerCase();
  const labelText = (exhibit.labels || []).join(' ').toLowerCase();
  const allPositive = values.every((value) => value > 0);
  const total = values.reduce((sum, value) => sum + value, 0);
  const shareLike =
    /share|mix|composition|split|contribution|breakdown|portfolio|segment|tỷ trọng|cơ cấu/.test(title) ||
    (String(exhibit.unit || '').includes('%') && total >= 95 && total <= 105);
  if (exhibit.chart_type === 'pie' && allPositive) return 'pie';
  if (shareLike && allPositive && values.length <= 8) return 'pie';

  const timeLike =
    /trend|over time|growth|monthly|quarterly|annual|theo thời gian|tăng trưởng/.test(title) ||
    /\b20\d{2}\b|\bq[1-4]\b|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b|tháng|quý|năm/.test(labelText);
  if (exhibit.chart_type === 'line' || timeLike) return 'line';

  const rankingLike = /rank|ranking|top\s|bottom\s|highest|lowest|leader|xếp hạng|cao nhất|thấp nhất/.test(title);
  if (rankingLike) return 'bar';

  // Generic numeric comparisons default to columns, per the exhibit brief.
  return 'column';
}

function CategoryText({ labels, width, slot, rotate, baseY }: { labels: string[]; width: number; slot: number; rotate: boolean; baseY: number }) {
  const padX = 10;
  const maxChars = Math.max(3, Math.floor((slot - 6) / CHAR));
  return (
    <g>
      {labels.map((rawLabel, index) => {
        const x = padX + (index + 0.5) * slot;
        if (rotate) {
          // Rotated text runs down and left from its anchor, so it is shortened to stay inside the chart.
          const room = Math.min((x - 12) / Math.cos(ROTATION), 70 / Math.sin(ROTATION));
          return (
            <text key={`${rawLabel}-${index}`} transform={`rotate(-35 ${x} ${baseY})`} x={x} y={baseY} textAnchor="end" fontSize={FS} fill="var(--space-text-muted)">
              <title>{rawLabel}</title>
              {shorten(rawLabel, Math.max(4, Math.min(15, Math.floor(room / CHAR))))}
            </text>
          );
        }
        const wrapped = wrapWords(rawLabel, maxChars);
        const lines = (wrapped.length > 3 ? [wrapped[0], wrapped[1], `${wrapped[2]}…`] : wrapped).map((line) => shorten(line, maxChars));
        return (
          <text key={`${rawLabel}-${index}`} x={Math.min(Math.max(x, 0), width)} y={baseY} textAnchor="middle" fontSize={FS} fill="var(--space-text-muted)">
            <title>{rawLabel}</title>
            {lines.map((line, lineIndex) => (
              <tspan key={`${line}-${lineIndex}`} x={x} dy={lineIndex === 0 ? 0 : 15}>{line}</tspan>
            ))}
          </text>
        );
      })}
    </g>
  );
}

function ColumnChartExhibit({ labels, values, unit, width }: { labels: string[]; values: number[]; unit?: string; width: number }) {
  const height = PLOT_HEIGHT;
  const padX = 10;
  const padTop = 34;
  const slot = (width - padX * 2) / Math.max(values.length, 1);
  const rotate = slot < 54;
  const padBottom = rotate ? 88 : 66;
  const lowest = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  // Negative bars keep room below them for their value label, clear of the category names.
  const min = lowest < 0 ? lowest - (max - lowest) * 0.14 : lowest;
  const span = max - min || 1;
  const plotHeight = height - padTop - padBottom;
  const barWidth = Math.min(72, Math.max(14, slot * 0.6));
  const yFor = (value: number) => padTop + ((max - value) / span) * plotHeight;
  const baseline = yFor(0);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={labels.map((label, i) => `${label}: ${fmt(values[i])}`).join(', ')}
      data-testid="case-exhibit-columns"
      className="block"
    >
      <line x1={padX} x2={width - padX} y1={baseline} y2={baseline} stroke="var(--space-border-strong)" strokeWidth="1" />
      {unit ? <text x={padX} y={14} fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{shorten(unit, Math.floor(width / 7.5))}</text> : null}
      {values.map((value, index) => {
        const center = padX + (index + 0.5) * slot;
        const valueY = yFor(value);
        const y = Math.min(valueY, baseline);
        const barHeight = Math.max(2, Math.abs(baseline - valueY));
        return (
          <g key={`${labels[index]}-${index}`}>
            <rect x={center - barWidth / 2} y={y} width={barWidth} height={barHeight} rx="4" fill={value < 0 ? 'var(--space-semantic-danger)' : 'var(--space-brand-primary-600)'}>
              <title>{clarifyUnitText(`${labels[index]}: ${fmt(value)}${unit ? ` ${unit}` : ''}`)}</title>
            </rect>
            {slot >= 34 ? (
              <text
                x={center}
                y={value >= 0 ? Math.max(30, y - 6) : y + barHeight + 16}
                textAnchor="middle"
                fontSize={FS}
                fontWeight="700"
                fill="var(--space-text-primary)"
              >
                {fmt(value)}
              </text>
            ) : null}
          </g>
        );
      })}
      <CategoryText labels={labels} width={width} slot={slot} rotate={rotate} baseY={height - padBottom + (rotate ? 14 : 20)} />
    </svg>
  );
}

function BarChartExhibit({ labels, values, unit }: { labels: string[]; values: number[]; unit?: string }) {
  const max = Math.max(...values.map((value) => Math.abs(value)), 1);
  const hasNegative = values.some((value) => value < 0);
  return (
    <ul
      className="space-y-3"
      role="img"
      aria-label={labels.map((label, i) => `${label}: ${fmt(values[i])}`).join(', ')}
      data-testid="case-exhibit-bars"
    >
      {labels.map((label, i) => {
        const value = values[i];
        const width = Math.max(3, (Math.abs(value) / max) * 100);
        return (
          <li key={`${label}-${i}`} title={clarifyUnitText(`${label}: ${fmt(value)}${unit ? ` ${unit}` : ''}`)}>
            <div className="flex items-baseline justify-between gap-3 text-[14px] leading-5">
              <span className="min-w-0 break-words text-[var(--space-text-secondary)]">{label}</span>
              <span className="shrink-0 font-bold tabular-nums text-[var(--space-text-primary)]">
                {fmt(value)}
                {unit ? <span className="ml-1 font-normal text-[var(--space-text-muted)]">{unit}</span> : null}
              </span>
            </div>
            <div className={`mt-1 h-4 overflow-hidden rounded-full bg-[var(--space-surface-muted)] ${hasNegative ? 'flex' : ''}`}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${width}%`,
                  background: value < 0 ? 'var(--space-semantic-danger)' : 'var(--space-brand-primary-600)',
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function LineChartExhibit({ labels, values, unit, width }: { labels: string[]; values: number[]; unit?: string; width: number }) {
  const height = PLOT_HEIGHT;
  const padX = 10;
  const padTop = 40;
  const slot = (width - padX * 2) / Math.max(values.length, 1);
  const rotate = slot < 54;
  const padBottom = rotate ? 88 : 66;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || Math.abs(max) || 1;
  const plotTop = padTop;
  const plotBottom = height - padBottom - 10;
  const xFor = (index: number) => padX + (index + 0.5) * slot;
  const yFor = (value: number) => plotTop + (1 - (value - min) / span) * (plotBottom - plotTop);
  const labelEvery = slot >= 44 ? 1 : slot >= 26 ? 2 : 0;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={labels.map((label, i) => `${label}: ${fmt(values[i])}`).join(', ')}
      data-testid="case-exhibit-line"
      className="block"
    >
      <line x1={padX} x2={width - padX} y1={height - padBottom} y2={height - padBottom} stroke="var(--space-border-strong)" strokeWidth="1" />
      <polyline
        points={values.map((value, index) => `${xFor(index)},${yFor(value)}`).join(' ')}
        fill="none"
        stroke="var(--space-brand-primary-600)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {values.map((value, index) => (
        <g key={index}>
          <circle cx={xFor(index)} cy={yFor(value)} r="5" fill="var(--space-brand-primary-700)" stroke="var(--space-surface-card)" strokeWidth="1.5">
            <title>{clarifyUnitText(`${labels[index]}: ${fmt(value)}${unit ? ` ${unit}` : ''}`)}</title>
          </circle>
          {labelEvery > 0 && index % labelEvery === 0 ? (
            <text
              x={xFor(index)}
              y={Math.max(30, yFor(value) - 11)}
              textAnchor="middle"
              fontSize={FS}
              fontWeight="700"
              fill="var(--space-text-primary)"
              stroke="var(--space-surface-card)"
              strokeWidth="4"
              paintOrder="stroke"
            >
              {fmt(value)}
            </text>
          ) : null}
        </g>
      ))}
      {unit ? <text x={padX} y={14} fontSize={FS} fontWeight="600" fill="var(--space-text-muted)">{shorten(unit, Math.floor(width / 7.5))}</text> : null}
      <CategoryText labels={labels} width={width} slot={slot} rotate={rotate} baseY={height - padBottom + (rotate ? 14 : 20)} />
    </svg>
  );
}

function PieChartExhibit({ labels, values, unit, width }: { labels: string[]; values: number[]; unit?: string; width: number }) {
  const total = values.reduce((sum, value) => sum + Math.max(0, value), 0);
  if (total <= 0) return <BarChartExhibit labels={labels} values={values} unit={unit} />;
  const sideBySide = width >= 560;
  const legendHeight = labels.length * 26 + 4;
  const available = sideBySide ? Math.min(PIE_HEIGHT - 12, width * 0.46) : Math.min(width - 16, PIE_HEIGHT - legendHeight - 12);
  const size = Math.round(Math.max(1, Math.min(available, 400)));
  const centre = size / 2;
  const radius = size / 2 - 3;
  const hole = radius * 0.5;
  const labelRadius = (radius + hole) / 2;
  let angle = -Math.PI / 2;
  const slices = values.map((value, index) => {
    const fraction = Math.max(0, value) / total;
    const start = angle;
    const end = angle + fraction * Math.PI * 2;
    angle = end;
    const point = (theta: number, r: number) => `${centre + r * Math.cos(theta)} ${centre + r * Math.sin(theta)}`;
    const large = end - start > Math.PI ? 1 : 0;
    const path = fraction >= 0.9999
      ? `M ${centre - radius} ${centre} A ${radius} ${radius} 0 1 1 ${centre + radius} ${centre} A ${radius} ${radius} 0 1 1 ${centre - radius} ${centre} Z`
      : `M ${point(start, radius)} A ${radius} ${radius} 0 ${large} 1 ${point(end, radius)} L ${point(end, hole)} A ${hole} ${hole} 0 ${large} 0 ${point(start, hole)} Z`;
    const mid = (start + end) / 2;
    return { index, fraction, path, labelX: centre + labelRadius * Math.cos(mid), labelY: centre + labelRadius * Math.sin(mid) };
  });

  return (
    <div
      className={`flex w-full items-center justify-center gap-4 overflow-hidden ${sideBySide ? 'flex-row px-2' : 'flex-col'}`}
      style={{ minHeight: PIE_HEIGHT }}
      data-testid="case-exhibit-pie"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block shrink-0"
        role="img"
        aria-label={labels.map((label, i) => `${label} ${Math.round((values[i] / total) * 100)} percent`).join(', ')}
      >
        {slices.map((slice) => (
          <path key={slice.index} d={slice.path} fill={SLICE_COLORS[slice.index % SLICE_COLORS.length]} stroke="var(--space-surface-card)" strokeWidth="2">
            <title>{`${labels[slice.index]}: ${fmt(values[slice.index])} · ${Number((slice.fraction * 100).toFixed(1))}%`}</title>
          </path>
        ))}
        {slices.filter((slice) => slice.fraction >= 0.06).map((slice) => (
          <text
            key={`p-${slice.index}`}
            x={slice.labelX}
            y={slice.labelY + 5}
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill={slice.index % SLICE_COLORS.length === 1 || slice.index % SLICE_COLORS.length === 3 ? 'var(--space-neutral-900)' : '#ffffff'}
          >
            {Number((slice.fraction * 100).toFixed(1))}%
          </text>
        ))}
      </svg>
      <ul className={`min-w-0 space-y-1 ${sideBySide ? 'flex-1' : 'w-full'}`}>
        {labels.map((label, index) => (
          <li key={`${label}-${index}`} className="flex items-start gap-2 text-[14px] leading-5" title={label}>
            <span
              className="mt-1 h-3 w-3 shrink-0 rounded-sm"
              style={{ backgroundColor: SLICE_COLORS[index % SLICE_COLORS.length] }}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 break-words text-[var(--space-text-secondary)]">{label}</span>
            <span className="shrink-0 font-bold tabular-nums text-[var(--space-text-primary)]">{fmt(values[index])}</span>
            <span className="w-14 shrink-0 text-right tabular-nums text-[var(--space-text-muted)]">
              {Number(((Math.max(0, values[index]) / total) * 100).toFixed(1))}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The shared chart body used by every exhibit card (Case Drill, Case Pool and
 * the generated-case exhibit in Case Pool's drill log).
 */
export function CaseChartVisual({
  kind,
  labels: sourceLabels,
  values,
  unit: sourceUnit,
}: {
  kind: CaseChartKind;
  labels: string[];
  values: number[];
  unit?: string;
}) {
  const labels = useMemo(() => clarifyUnitsDeep(sourceLabels), [sourceLabels]);
  const unit = clarifyUnitLabel(sourceUnit) || undefined;
  const { ref, width } = useBoxWidth();
  const ready = width >= 120;
  const minWidth = kind === 'column' || kind === 'line' ? labels.length * 88 + 20 : 0;
  return (
    <div className="w-full overflow-x-auto" data-testid="case-chart-visual" aria-label={minWidth ? 'Scrollable chart area' : undefined}>
      <div ref={ref} style={{ minWidth: minWidth || undefined }}>
        {kind === 'bar' ? (
          <BarChartExhibit labels={labels} values={values} unit={unit} />
        ) : !ready ? (
          <div style={{ height: kind === 'pie' ? PIE_HEIGHT : PLOT_HEIGHT }} />
        ) : kind === 'line' ? (
          <LineChartExhibit labels={labels} values={values} unit={unit} width={width} />
        ) : kind === 'pie' ? (
          <PieChartExhibit labels={labels} values={values} unit={unit} width={width} />
        ) : (
          <ColumnChartExhibit labels={labels} values={values} unit={unit} width={width} />
        )}
      </div>
    </div>
  );
}

function ChartExhibit({ exhibit, index }: { exhibit: ExhibitChart; index?: number }) {
  const [expanded, setExpanded] = useState(false);
  const labels = exhibit.labels || [];
  const values = (exhibit.values || []).map((value) => Number(value));
  // A chart without enough data degrades to a label/value table rather than drawing wrong.
  if (labels.length < 2 || labels.length !== values.length || values.some((value) => !Number.isFinite(value))) {
    return (
      <TableExhibit
        index={index}
        exhibit={{
          type: 'table',
          title: exhibit.title,
          columns: ['Item', exhibit.unit ? `Value (${exhibit.unit})` : 'Value'],
          rows: labels.map((label, i) => [label, values[i] ?? '-']),
        }}
      />
    );
  }
  const chartType = inferChartType(exhibit, values);
  const icon = chartType === 'line' ? 'line' : chartType === 'pie' ? 'pie' : 'bar';
  const note = exhibit.unit && chartType !== 'bar' ? `Unit: ${exhibit.unit}` : undefined;
  const chartBody = <CaseChartVisual kind={chartType} labels={labels} values={values} unit={exhibit.unit} />;
  // Always shown: every plotted category and value as selectable text, so no number depends on reading the chart.
  const valueList = (
    <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-2.5" data-testid="case-exhibit-values">
      <p className="text-xs font-bold text-[var(--space-text-primary)]">Every category and value</p>
      <ul className="mt-2 grid gap-1 sm:grid-cols-2">
        {labels.map((label, valueIndex) => <li key={`${label}-${valueIndex}`} className="flex items-start justify-between gap-3 text-xs leading-5"><span className="min-w-0 break-words text-[var(--space-text-secondary)]">{label}</span><span className="shrink-0 font-bold tabular-nums text-[var(--space-text-primary)]">{clarifyUnitText(`${fmt(values[valueIndex])}${exhibit.unit ? (exhibit.unit.trim() === '%' ? '%' : ` ${exhibit.unit}`) : ''}`)}</span></li>)}
      </ul>
    </div>
  );

  return (
    <>
      <ExhibitFrame index={index} title={exhibit.title} icon={icon} note={note} onExpand={() => setExpanded(true)}>
        {chartBody}
        {valueList}
      </ExhibitFrame>
      {expanded ? (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-[color-mix(in_srgb,var(--space-neutral-950)_72%,transparent)] p-3 sm:p-8" role="dialog" aria-modal="true" aria-label={`Expanded ${exhibit.title}`}>
          <div className="w-full">
            <div className="mb-3 flex justify-end">
              <button type="button" onClick={() => setExpanded(false)} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--space-surface-card)] px-4 text-sm font-bold text-[var(--space-text-primary)]"><X className="h-4 w-4" /> Close</button>
            </div>
            <ExhibitFrame index={index} title={exhibit.title} icon={icon} note={note}>
              <div className="w-full">{chartBody}{valueList}</div>
            </ExhibitFrame>
          </div>
        </div>
      ) : null}
    </>
  );
}

/* -------------------------------------------------------------------------
 * Metric card
 * ----------------------------------------------------------------------- */

function MetricExhibit({ exhibit, index }: { exhibit: ExhibitMetric; index?: number }) {
  return (
    <div
      className="rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-3"
      data-testid="case-exhibit-metric"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">
          {typeof index === 'number' ? `Exhibit ${index + 1}` : 'Exhibit'}
        </p>
        <Gauge className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" aria-hidden="true" />
      </div>
      <p className="mt-1 text-xs font-medium text-[var(--space-text-secondary)]">{exhibit.label}</p>
      <p className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-[var(--space-text-primary)]">
        {exhibit.value}
      </p>
      <p className="mt-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">{exhibit.context}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Public API
 * ----------------------------------------------------------------------- */

export function CaseExhibitCard({ exhibit: sourceExhibit, index }: { exhibit: CaseExhibit; index?: number }) {
  const exhibit = useMemo(() => clarifyUnitsDeep(sourceExhibit), [sourceExhibit]);
  if (!exhibit) return null;
  if (exhibit.type === 'table') return <TableExhibit exhibit={exhibit} index={index} />;
  if (exhibit.type === 'chart_data') return <ChartExhibit exhibit={exhibit} index={index} />;
  if (exhibit.type === 'metric') return <MetricExhibit exhibit={exhibit} index={index} />;
  return null;
}

/**
 * Render all exhibits for a case. One exhibit fills the row, two split it
 * evenly, and sets of three or more use aligned rows of three on desktop.
 * Mobile collapses to one column; incomplete final rows keep the same card
 * width as the preceding row instead of becoming oversized.
 */
export function CaseExhibitList({
  exhibits,
  heading = 'Case data',
  className = '',
}: {
  exhibits: CaseExhibit[];
  heading?: string | null;
  className?: string;
}) {
  const list = (exhibits || []).filter(Boolean);
  if (list.length === 0) return null;
  return (
    <div className={className} data-testid="case-exhibit-list">
      {heading ? (
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{heading}</p>
      ) : null}
      <div
        className={`grid w-full gap-3 ${
          list.length === 1
            ? 'grid-cols-1'
            : list.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
        data-exhibit-layout={list.length === 1 ? 'one-column' : list.length === 2 ? 'two-column' : 'three-column'}
      >
        {list.map((exhibit, index) => (
          <div key={index} className="min-w-0 w-full">
            <CaseExhibitCard exhibit={exhibit} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CaseExhibitList;
