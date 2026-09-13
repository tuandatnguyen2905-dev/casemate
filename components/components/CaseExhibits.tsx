/**
 * CaseExhibits.tsx — the shared exhibit renderer for both Case Drill and Case
 * Pool. Every prebuilt case's data passes through here.
 *
 * IRON RULE (per the brief): never show raw JSON or comma-separated strings
 * where a table or chart belongs.
 *   • table       → an HTML table with a header and alternating row stripes
 *   • chart_data  → column (comparison) / bar (ranking) / line (trend) / donut (composition)
 *   • metric      → a metric card: big number + label + context
 *
 * NARROW SCREENS: a four-column exhibit cannot fit beside the agent panel or
 * on a phone, and hiding half the numbers behind a horizontal scrollbar makes
 * the case unreadable. Below the `sm` breakpoint each table row therefore
 * becomes its own stacked card (row label on top, one label/value line per
 * remaining column) so every figure is visible without sideways scrolling;
 * the real table returns at `sm` and up.
 *
 * Charts are drawn with plain SVG/CSS — exactly how every other chart in this
 * space works (see ExhibitBars/ExhibitPie in apps/CaseDrillLog and DrillChart
 * in apps/CaseDrill). That way charts inherit the `--space-*` tokens, stay
 * sharp at any zoom, and add zero library bytes to the customer bundle.
 */

import { BarChart3, Gauge, Table2, TrendingUp } from 'lucide-react';
import type { CaseExhibit, ExhibitChart, ExhibitMetric, ExhibitTable } from '../lib/caseLibraryShared';

const SLICE_COLORS = [
  'var(--space-brand-primary-600)',
  'var(--space-brand-primary-200)',
  'var(--space-brand-primary-700)',
  'var(--space-brand-primary-100)',
  'var(--space-brand-primary-500)',
  'var(--space-brand-primary-900)',
];

/** Vietnamese-style number formatting: dots for thousands, comma for decimals. */
function fmt(value: number): string {
  if (!Number.isFinite(value)) return '—';
  const rounded = Math.round(value);
  if (Math.abs(value - rounded) < 1e-9) return rounded.toLocaleString('de-DE');
  const [whole, frac] = value.toFixed(1).split('.');
  return Number(whole).toLocaleString('de-DE') + ',' + frac;
}

/** Numeric cells are right-aligned with tabular figures; text cells left-aligned. */
function isNumericCell(cell: string | number): boolean {
  if (typeof cell === 'number') return true;
  const text = String(cell ?? '').trim();
  if (!text) return false;
  return /^[-+]?[\d.,]+\s*%?$/.test(text);
}

function ExhibitFrame({
  index,
  title,
  icon,
  children,
  note,
}: {
  index?: number;
  title: string;
  icon: 'table' | 'bar' | 'line' | 'pie' | 'metric';
  children: React.ReactNode;
  note?: string;
}) {
  const Icon = icon === 'table' ? Table2 : icon === 'line' ? TrendingUp : icon === 'metric' ? Gauge : BarChart3;
  return (
    <div
      className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3.5"
      data-testid={`case-exhibit-${icon}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">
          {typeof index === 'number' ? `Exhibit ${index + 1}` : 'Exhibit'}
        </p>
        <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-muted)]" aria-hidden="true" />
      </div>
      <h4 className="mt-1 text-sm font-semibold leading-5 text-[var(--space-text-primary)]">{title}</h4>
      <div className="mt-3">{children}</div>
      {note ? <p className="mt-2.5 text-[10px] leading-4 text-[var(--space-text-muted)]">{note}</p> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Data table
 * ----------------------------------------------------------------------- */

function TableExhibit({ exhibit, index }: { exhibit: ExhibitTable; index?: number }) {
  // Columns that are all numbers get right-aligned headers and cells — easier to scan down.
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
        <div className="space-y-2 sm:hidden" data-testid="case-exhibit-table-stacked">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
            {exhibit.columns[0]}
          </p>
          {exhibit.rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-2.5 py-2"
            >
              <p className="text-xs font-bold leading-4 text-[var(--space-text-primary)]">
                {cellText(row[0]) || `Row ${rowIndex + 1}`}
              </p>
              <dl className="mt-1.5 space-y-1">
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
        <table className="w-full min-w-full border-collapse text-xs" data-testid="case-exhibit-table">
          <thead>
            <tr>
              {exhibit.columns.map((column, columnIndex) => (
                <th
                  key={`${column}-${columnIndex}`}
                  scope="col"
                  className={`break-words border-b-2 border-[var(--space-border-strong)] px-2 py-2 text-[10px] font-bold uppercase leading-3 tracking-wider text-[var(--space-text-muted)] ${
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
                    className={`border-b border-[var(--space-border-default)] px-2 py-2 leading-4 ${
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

type ResolvedChartType = 'column' | 'bar' | 'line' | 'pie';

function inferChartType(exhibit: ExhibitChart, values: number[]): ResolvedChartType {
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

function ColumnChartExhibit({ labels, values, unit }: { labels: string[]; values: number[]; unit?: string }) {
  const width = 360;
  const height = 180;
  const padLeft = 32;
  const padRight = 12;
  const padTop = 28;
  const padBottom = 42;
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const span = max - min || 1;
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;
  const step = plotWidth / Math.max(values.length, 1);
  const barWidth = Math.min(42, Math.max(12, step * 0.58));
  const yFor = (value: number) => padTop + ((max - value) / span) * plotHeight;
  const baseline = yFor(0);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={labels.map((label, i) => `${label}: ${fmt(values[i])}`).join(', ')}
      data-testid="case-exhibit-columns"
    >
      <line x1={padLeft} x2={width - padRight} y1={baseline} y2={baseline} stroke="var(--space-border-strong)" strokeWidth="1" />
      {unit ? <text x={padLeft} y={12} fontSize="9" fill="var(--space-text-muted)">{unit}</text> : null}
      {values.map((value, index) => {
        const x = padLeft + index * step + (step - barWidth) / 2;
        const valueY = yFor(value);
        const y = Math.min(valueY, baseline);
        const barHeight = Math.max(2, Math.abs(baseline - valueY));
        const center = x + barWidth / 2;
        return (
          <g key={`${labels[index]}-${index}`}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx="4"
              fill={value < 0 ? 'var(--space-semantic-danger)' : 'var(--space-brand-primary-600)'}
            >
              <title>{`${labels[index]}: ${fmt(value)}${unit ? ` ${unit}` : ''}`}</title>
            </rect>
            <text
              x={center}
              y={value >= 0 ? Math.max(13, y - 6) : Math.min(height - padBottom + 12, y + barHeight + 12)}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="var(--space-text-primary)"
            >
              {fmt(value)}
            </text>
            <text x={center} y={height - padBottom + 16} textAnchor="middle" fontSize="9" fill="var(--space-text-muted)">
              {labels[index].length > 10 ? `${labels[index].slice(0, 9)}…` : labels[index]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function BarChartExhibit({ labels, values, unit }: { labels: string[]; values: number[]; unit?: string }) {
  const max = Math.max(...values.map((value) => Math.abs(value)), 1);
  const hasNegative = values.some((value) => value < 0);
  return (
    <ul
      className="space-y-2"
      role="img"
      aria-label={labels.map((label, i) => `${label}: ${fmt(values[i])}`).join(', ')}
      data-testid="case-exhibit-bars"
    >
      {labels.map((label, i) => {
        const value = values[i];
        const width = Math.max(3, (Math.abs(value) / max) * 100);
        return (
          <li key={`${label}-${i}`} title={`${label}: ${fmt(value)}${unit ? ` ${unit}` : ''}`}>
            <div className="flex items-baseline justify-between gap-2 text-[11px] leading-4">
              <span className="min-w-0 truncate text-[var(--space-text-secondary)]">{label}</span>
              <span className="shrink-0 font-semibold tabular-nums text-[var(--space-text-primary)]">
                {fmt(value)}
                {unit ? <span className="ml-1 font-normal text-[var(--space-text-muted)]">{unit}</span> : null}
              </span>
            </div>
            <div className={`mt-1 h-3 overflow-hidden rounded-full bg-[var(--space-surface-muted)] ${hasNegative ? 'flex' : ''}`}>
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

function LineChartExhibit({ labels, values, unit }: { labels: string[]; values: number[]; unit?: string }) {
  const width = 320;
  const height = 140;
  const padX = 30;
  const padTop = 24;
  const padBottom = 28;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || Math.abs(max) || 1;
  const xFor = (index: number) => padX + (index / Math.max(values.length - 1, 1)) * (width - padX * 2);
  const yFor = (value: number) => padTop + (1 - (value - min) / span) * (height - padTop - padBottom);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={labels.map((label, i) => `${label}: ${fmt(values[i])}`).join(', ')}
      data-testid="case-exhibit-line"
    >
      <line
        x1={padX}
        x2={width - padX}
        y1={height - padBottom}
        y2={height - padBottom}
        stroke="var(--space-border-strong)"
        strokeWidth="1"
      />
      <polyline
        points={values.map((value, index) => `${xFor(index)},${yFor(value)}`).join(' ')}
        fill="none"
        stroke="var(--space-brand-primary-600)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {values.map((value, index) => (
        <g key={index}>
          <circle cx={xFor(index)} cy={yFor(value)} r="3.5" fill="var(--space-brand-primary-700)">
            <title>{`${labels[index]}: ${fmt(value)}${unit ? ` ${unit}` : ''}`}</title>
          </circle>
          <text
            x={xFor(index)}
            y={yFor(value) - 9}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--space-text-primary)"
          >
            {fmt(value)}
          </text>
          <text
            x={xFor(index)}
            y={height - padBottom + 14}
            textAnchor="middle"
            fontSize="9"
            fill="var(--space-text-muted)"
          >
            {labels[index].length > 10 ? `${labels[index].slice(0, 9)}…` : labels[index]}
          </text>
        </g>
      ))}
      {unit ? (
        <text x={padX} y={12} fontSize="9" fill="var(--space-text-muted)">
          {unit}
        </text>
      ) : null}
    </svg>
  );
}

function PieChartExhibit({ labels, values, unit }: { labels: string[]; values: number[]; unit?: string }) {
  const total = values.reduce((sum, value) => sum + Math.max(0, value), 0);
  if (total <= 0) return <BarChartExhibit labels={labels} values={values} unit={unit} />;
  const size = 124;
  const stroke = 26;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let acc = 0;

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5" data-testid="case-exhibit-pie">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shrink-0"
        role="img"
        aria-label={labels.map((label, i) => `${label} ${Math.round((values[i] / total) * 100)} percent`).join(', ')}
      >
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {values.map((value, index) => {
            const fraction = Math.max(0, value) / total;
            const offset = -acc * circumference;
            acc += fraction;
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={SLICE_COLORS[index % SLICE_COLORS.length]}
                strokeWidth={stroke}
                strokeDasharray={`${fraction * circumference} ${circumference}`}
                strokeDashoffset={offset}
              >
                <title>{`${labels[index]}: ${fmt(value)} · ${Math.round(fraction * 100)}%`}</title>
              </circle>
            );
          })}
        </g>
      </svg>
      <ul className="w-full min-w-0 flex-1 space-y-1.5">
        {labels.map((label, index) => (
          <li key={`${label}-${index}`} className="flex items-center gap-2 text-[11px]">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: SLICE_COLORS[index % SLICE_COLORS.length] }}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 truncate text-[var(--space-text-secondary)]">{label}</span>
            <span className="shrink-0 font-semibold tabular-nums text-[var(--space-text-primary)]">{fmt(values[index])}</span>
            <span className="w-9 shrink-0 text-right text-[var(--space-text-muted)]">
              {Math.round((Math.max(0, values[index]) / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChartExhibit({ exhibit, index }: { exhibit: ExhibitChart; index?: number }) {
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
          rows: labels.map((label, i) => [label, values[i] ?? '—']),
        }}
      />
    );
  }
  const chartType = inferChartType(exhibit, values);

  return (
    <ExhibitFrame
      index={index}
      title={exhibit.title}
      icon={chartType === 'line' ? 'line' : chartType === 'pie' ? 'pie' : 'bar'}
      note={exhibit.unit && chartType !== 'bar' ? `Unit: ${exhibit.unit}` : undefined}
    >
      {chartType === 'line' ? (
        <LineChartExhibit labels={labels} values={values} unit={exhibit.unit} />
      ) : chartType === 'pie' ? (
        <PieChartExhibit labels={labels} values={values} unit={exhibit.unit} />
      ) : chartType === 'bar' ? (
        <BarChartExhibit labels={labels} values={values} unit={exhibit.unit} />
      ) : (
        <ColumnChartExhibit labels={labels} values={values} unit={exhibit.unit} />
      )}
    </ExhibitFrame>
  );
}

/* -------------------------------------------------------------------------
 * Metric card
 * ----------------------------------------------------------------------- */

function MetricExhibit({ exhibit, index }: { exhibit: ExhibitMetric; index?: number }) {
  return (
    <div
      className="rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-3.5"
      data-testid="case-exhibit-metric"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">
          {typeof index === 'number' ? `Exhibit ${index + 1}` : 'Exhibit'}
        </p>
        <Gauge className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" aria-hidden="true" />
      </div>
      <p className="mt-1 text-xs font-medium text-[var(--space-text-secondary)]">{exhibit.label}</p>
      <p className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-[var(--space-text-primary)]">
        {exhibit.value}
      </p>
      <p className="mt-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">{exhibit.context}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Public API
 * ----------------------------------------------------------------------- */

export function CaseExhibitCard({ exhibit, index }: { exhibit: CaseExhibit; index?: number }) {
  if (!exhibit) return null;
  if (exhibit.type === 'table') return <TableExhibit exhibit={exhibit} index={index} />;
  if (exhibit.type === 'chart_data') return <ChartExhibit exhibit={exhibit} index={index} />;
  if (exhibit.type === 'metric') return <MetricExhibit exhibit={exhibit} index={index} />;
  return null;
}

/**
 * Render all exhibits for a case. On wide screens, two exhibits sit side by
 * side so the candidate reads the table and chart together like a real handout.
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
      <div className={`grid gap-3 ${list.length > 1 ? 'lg:grid-cols-2' : ''}`}>
        {list.map((exhibit, index) => (
          <CaseExhibitCard key={index} exhibit={exhibit} index={index} />
        ))}
      </div>
    </div>
  );
}

export default CaseExhibitList;
