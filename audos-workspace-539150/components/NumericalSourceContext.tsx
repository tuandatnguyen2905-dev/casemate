import type {
  NumericalQuestion,
  NumericalSourceAxis,
  NumericalSourceExhibit,
  NumericalSourceSeries,
} from '../lib/numericalReasoning';

const CHART_COLORS = ['#111827', '#6b7280', '#9ca3af', '#d1d5db'];
const VIEW_WIDTH = 720;
const VIEW_HEIGHT = 380;
const MARGIN = { top: 24, right: 28, bottom: 96, left: 68 };

/** Picks white or near-black text, whichever has the stronger contrast against a hex fill. */
function readableTextOn(fill: string): string {
  const match = /^#([0-9a-f]{6})$/i.exec(fill.trim());
  if (!match) return '#ffffff';
  const value = parseInt(match[1], 16);
  const channel = (shift: number) => {
    const s = ((value >> shift) & 255) / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(16) + 0.7152 * channel(8) + 0.0722 * channel(0);
  const whiteContrast = 1.05 / (luminance + 0.05);
  const darkContrast = (luminance + 0.05) / 0.059;
  return whiteContrast >= darkContrast ? '#ffffff' : '#111827';
}

function estimateTextWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.62;
}

interface LabelBox { x: number; y: number; w: number; h: number }
interface PlacedLineLabel extends LabelBox {
  key: string;
  text: string;
  seriesIndex: number;
  fill: string;
  textFill: string;
}

const LINE_LABEL_HEIGHT = 16;
const LINE_LABEL_FONT = 11;

function boxesOverlap(a: LabelBox, b: LabelBox, pad = 2): boolean {
  return a.x < b.x + b.w + pad && a.x + a.w + pad > b.x && a.y < b.y + b.h + pad && a.y + a.h + pad > b.y;
}

/**
 * Places one value tag next to every plotted point without letting two tags
 * (or a tag and another point) overlap. In each x column the highest point
 * keeps its tag above, the lowest below, and any in-between points go to the
 * side. Each tag is filled with its series colour so it stays tied to its line.
 */
function placeLineLabels(
  seriesPoints: Array<Array<{ x: number; y: number; value: number | string }>>,
  bounds: { top: number; bottom: number },
  colorFor: (seriesIndex: number) => string,
): PlacedLineLabel[] {
  const all = seriesPoints.flatMap((points, seriesIndex) => points.map((point, pointIndex) => ({ ...point, seriesIndex, pointIndex, text: String(point.value) })));
  const obstacles: LabelBox[] = all.map((point) => ({ x: point.x - 7, y: point.y - 7, w: 14, h: 14 }));
  const columns = new Map<number, typeof all>();
  all.forEach((point) => {
    const key = Math.round(point.x / 6);
    columns.set(key, [...(columns.get(key) || []), point]);
  });
  const placedBoxes: LabelBox[] = [];
  const result: PlacedLineLabel[] = [];
  const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));
  [...columns.values()].forEach((column) => {
    const ordered = [...column].sort((a, b) => a.y - b.y || a.seriesIndex - b.seriesIndex);
    ordered.forEach((point, rank) => {
      const w = Math.max(28, estimateTextWidth(point.text, LINE_LABEL_FONT) + 12);
      const h = LINE_LABEL_HEIGHT;
      const isFirst = rank === 0;
      const isLast = rank === ordered.length - 1 && ordered.length > 1;
      const order = ordered.length === 1
        ? ['above', 'below', 'right', 'left']
        : isFirst ? ['above', 'right', 'left', 'below'] : isLast ? ['below', 'right', 'left', 'above'] : ['right', 'left', 'above', 'below'];
      const tries: Array<[string, number]> = [
        ...order.map((side) => [side, 0] as [string, number]),
        ['above', 18], ['below', 18], ['above', 36], ['below', 36],
      ];
      const build = (side: string, lift: number): LabelBox => {
        let x: number;
        let y: number;
        if (side === 'above') { x = point.x - w / 2; y = point.y - 8 - h - lift; }
        else if (side === 'below') { x = point.x - w / 2; y = point.y + 8 + lift; }
        else if (side === 'right') { x = point.x + 9; y = point.y - h / 2 + lift; }
        else { x = point.x - 9 - w; y = point.y - h / 2 + lift; }
        return { x: clamp(x, 2, VIEW_WIDTH - w - 2), y: clamp(y, 2, bounds.bottom - h), w, h };
      };
      let chosen = build(tries[0][0], tries[0][1]);
      for (const [side, lift] of tries) {
        const box = build(side, lift);
        if (!placedBoxes.some((other) => boxesOverlap(box, other)) && !obstacles.some((other) => boxesOverlap(box, other, 0))) {
          chosen = box;
          break;
        }
      }
      placedBoxes.push(chosen);
      const fill = colorFor(point.seriesIndex);
      result.push({ ...chosen, key: `${point.seriesIndex}-${point.pointIndex}`, text: point.text, seriesIndex: point.seriesIndex, fill, textFill: readableTextOn(fill) });
    });
  });
  return result;
}

function BarValueLabel({ x, valueY, zeroY, value, barWidth, stagger }: { x: number; valueY: number; zeroY: number; value: number; barWidth: number; stagger: number }) {
  const text = String(value);
  const crowded = estimateTextWidth(text, 10) > barWidth;
  const lift = crowded ? stagger * 12 : 0;
  const y = value < 0 ? Math.max(valueY, zeroY) + 12 + lift : Math.max(12, Math.min(valueY, zeroY) - 5 - lift);
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--space-text-primary)" stroke="var(--space-surface-card)" strokeWidth="3" paintOrder="stroke">{text}</text>
  );
}

function wrapLabel(label: string, maxCharacters: number): string[] {
  if (label.length <= maxCharacters) return [label];
  const words = label.split(/\s+/);
  const lines: string[] = [];
  words.forEach((word) => {
    const current = lines[lines.length - 1];
    if (!current || `${current} ${word}`.length > maxCharacters) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  });
  return lines.slice(0, 3);
}

function SvgAxisLabel({
  label,
  x,
  y,
  maxCharacters = 13,
  textAnchor = 'middle',
}: {
  label: string;
  x: number;
  y: number;
  maxCharacters?: number;
  textAnchor?: 'start' | 'middle' | 'end';
}) {
  const lines = wrapLabel(label, maxCharacters);
  return (
    <text x={x} y={y} textAnchor={textAnchor} fontSize="9" fill="var(--space-text-muted)">
      {lines.map((line, index) => <tspan key={`${line}-${index}`} x={x} dy={index === 0 ? 0 : 11}>{line}</tspan>)}
    </text>
  );
}

function SourceTable({ exhibit }: { exhibit: NumericalSourceExhibit }) {
  const table = exhibit.table;
  if (!table) return null;
  return (
    <div className="max-w-full overflow-x-auto overscroll-x-contain" tabIndex={0} aria-label={`Scrollable table: ${exhibit.title}`}>
      <table className="w-full min-w-[640px] border-collapse text-left text-xs sm:text-sm">
        <thead>
          <tr className="bg-[var(--space-surface-accent-soft)]">
            {table.headers.map((header, index) => (
              <th key={`${header}-${index}`} scope="col" className="whitespace-nowrap border-b border-r border-[var(--space-border-default)] px-3 py-2 font-bold text-[var(--space-text-primary)] last:border-r-0">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 ? 'bg-[var(--space-surface-muted)]' : 'bg-[var(--space-surface-card)]'}>
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th key={cellIndex} scope="row" className="whitespace-nowrap border-b border-r border-[var(--space-border-default)] px-3 py-2 font-semibold text-[var(--space-text-primary)]">
                    {cell}
                  </th>
                ) : (
                  <td key={cellIndex} className="whitespace-nowrap border-b border-r border-[var(--space-border-default)] px-3 py-2 tabular-nums text-[var(--space-text-secondary)] last:border-r-0">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function axisRange(axis: NumericalSourceAxis | undefined, values: number[]): [number, number] {
  const finite = values.filter(Number.isFinite);
  let minimum = axis?.minimum ?? Math.min(0, ...finite);
  let maximum = axis?.maximum ?? Math.max(1, ...finite);
  if (minimum === maximum) maximum = minimum + 1;
  const padding = axis?.maximum == null ? (maximum - minimum) * 0.08 : 0;
  maximum += padding;
  return [minimum, maximum];
}

function axisTicks(minimum: number, maximum: number, interval?: number): number[] {
  if (interval && Number.isFinite(interval) && interval > 0) {
    const count = Math.floor((maximum - minimum) / interval) + 1;
    if (count >= 2 && count <= 25) {
      const ticks = Array.from({ length: count }, (_, index) => minimum + interval * index);
      if (Math.abs(ticks[ticks.length - 1] - maximum) > interval / 1000 && ticks.length < 25) ticks.push(maximum);
      return ticks;
    }
  }
  return Array.from({ length: 6 }, (_, index) => minimum + ((maximum - minimum) * index) / 5);
}

function ChartLegend({ series }: { series: NumericalSourceSeries[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 px-3 pb-3 text-[11px] text-[var(--space-text-secondary)]">
      {series.map((item, index) => (
        <span key={`${item.name}-${index}`} className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: CHART_COLORS[index % CHART_COLORS.length] }} />
          {item.name}
        </span>
      ))}
    </div>
  );
}

function StackedBarChart({ exhibit }: { exhibit: NumericalSourceExhibit }) {
  const series = exhibit.series || [];
  const labels = exhibit.xLabels || [];
  const positiveTotals = labels.map((_, index) => series.reduce((sum, item) => sum + Math.max(0, item.values?.[index] || 0), 0));
  const negativeTotals = labels.map((_, index) => series.reduce((sum, item) => sum + Math.min(0, item.values?.[index] || 0), 0));
  const [minimum, maximum] = axisRange(exhibit.yAxis, [...positiveTotals, ...negativeTotals]);
  const plotWidth = VIEW_WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = VIEW_HEIGHT - MARGIN.top - MARGIN.bottom;
  const y = (value: number) => MARGIN.top + ((maximum - value) / (maximum - minimum)) * plotHeight;
  const barWidth = Math.max(8, Math.min(42, plotWidth / Math.max(1, labels.length) - 12));
  return (
    <>
      <div className="max-w-full overflow-x-auto" tabIndex={0}>
        <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="min-w-[640px] w-full" role="img" aria-label={`Stacked bar chart: ${exhibit.title}`}>
          <line x1={MARGIN.left} x2={VIEW_WIDTH - MARGIN.right} y1={y(0)} y2={y(0)} stroke="#111827" />
          {labels.map((label, index) => {
            const center = MARGIN.left + ((index + 0.5) / Math.max(1, labels.length)) * plotWidth;
            let positive = 0;
            let negative = 0;
            return (
              <g key={`${label}-${index}`}>
                {series.map((item, seriesIndex) => {
                  const value = item.values?.[index] || 0;
                  const start = value >= 0 ? positive : negative;
                  const end = start + value;
                  if (value >= 0) positive = end;
                  else negative = end;
                  const segmentTop = Math.min(y(start), y(end));
                  const segmentHeight = Math.max(1, Math.abs(y(start) - y(end)));
                  return (
                    <g key={item.name}>
                      <rect x={center - barWidth / 2} y={segmentTop} width={barWidth} height={segmentHeight} fill={CHART_COLORS[seriesIndex % CHART_COLORS.length]} />
                      {segmentHeight >= 14 && barWidth >= estimateTextWidth(String(value), 10) + 4 ? <text x={center} y={segmentTop + segmentHeight / 2 + 3.5} textAnchor="middle" fontSize="10" fontWeight="700" fill={readableTextOn(CHART_COLORS[seriesIndex % CHART_COLORS.length])}>{value}</text> : null}
                    </g>
                  );
                })}
                <SvgAxisLabel label={label} x={center} y={VIEW_HEIGHT - MARGIN.bottom + 18} maxCharacters={11} />
              </g>
            );
          })}
          {exhibit.yAxis?.title ? <text x="14" y={MARGIN.top + plotHeight / 2} transform={`rotate(-90 14 ${MARGIN.top + plotHeight / 2})`} textAnchor="middle" fontSize="10" fill="var(--space-text-secondary)">{exhibit.yAxis.title}</text> : null}
        </svg>
      </div>
      <ChartLegend series={series} />
      {exhibit.annotations?.map((annotation) => <p key={annotation} className="px-3 pb-2 text-center text-[10px] text-[var(--space-text-muted)]">{annotation}</p>)}
    </>
  );
}

function HorizontalBarChart({ exhibit }: { exhibit: NumericalSourceExhibit }) {
  const series = exhibit.series || [];
  const labels = exhibit.xLabels || [];
  const values = series.flatMap((item) => item.values || []);
  const explicitlyHorizontal = exhibit.notes?.some((note) => /horizontal bars?/i.test(note)) || false;
  const numericAxis = explicitlyHorizontal ? exhibit.xAxis : exhibit.yAxis;
  const [minimum, maximum] = axisRange(numericAxis, values);
  const width = 840;
  const left = 265;
  const right = 58;
  const top = 24;
  const bottom = 58;
  const rowHeight = Math.max(46, 16 + series.length * 16);
  const height = top + bottom + labels.length * rowHeight;
  const plotWidth = width - left - right;
  const x = (value: number) => left + ((value - minimum) / (maximum - minimum)) * plotWidth;
  const zeroX = x(Math.max(minimum, Math.min(maximum, 0)));
  const ticks = axisTicks(minimum, maximum, numericAxis?.tickInterval);
  const barHeight = Math.max(7, Math.min(13, (rowHeight - 12) / Math.max(1, series.length) - 2));
  return (
    <>
      <div className="max-w-full overflow-x-auto" tabIndex={0}>
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[760px] w-full" role="img" aria-label={`Horizontal bar chart: ${exhibit.title}`}>
          {ticks.map((tick, index) => {
            const tickX = x(tick);
            return (
              <g key={index}>
                <line x1={tickX} x2={tickX} y1={top} y2={height - bottom} stroke="var(--space-border-default)" strokeWidth="1" />
                <text x={tickX} y={height - bottom + 18} textAnchor="middle" fontSize="9" fill="var(--space-text-muted)">{Number(tick.toFixed(1))}</text>
              </g>
            );
          })}
          {labels.map((label, labelIndex) => {
            const rowTop = top + labelIndex * rowHeight;
            const labelY = rowTop + rowHeight / 2 - (wrapLabel(label, 30).length - 1) * 5;
            return (
              <g key={`${label}-${labelIndex}`}>
                <SvgAxisLabel label={label} x={left - 14} y={labelY} maxCharacters={30} textAnchor="end" />
                {series.map((item, seriesIndex) => {
                  const value = item.values?.[labelIndex] || 0;
                  const valueX = x(value);
                  const barY = rowTop + 6 + seriesIndex * (barHeight + 3);
                  return (
                    <g key={`${item.name}-${seriesIndex}`}>
                      <rect x={Math.min(zeroX, valueX)} y={barY} width={Math.max(1, Math.abs(valueX - zeroX))} height={barHeight} fill={CHART_COLORS[seriesIndex % CHART_COLORS.length]} />
                      <text x={valueX + (value >= 0 ? 5 : -5)} y={barY + barHeight - 2} textAnchor={value >= 0 ? 'start' : 'end'} fontSize="9" fill="var(--space-text-secondary)">{value}</text>
                    </g>
                  );
                })}
              </g>
            );
          })}
          {numericAxis?.title ? <text x={left + plotWidth / 2} y={height - 12} textAnchor="middle" fontSize={numericAxis.title.length > 30 ? 8 : 10} fill="var(--space-text-secondary)">{numericAxis.title}{numericAxis.unit ? ` (${numericAxis.unit})` : ''}</text> : null}
        </svg>
      </div>
      <ChartLegend series={series} />
      {exhibit.annotations?.map((annotation) => <p key={annotation} className="px-3 pb-2 text-center text-[10px] text-[var(--space-text-muted)]">{annotation}</p>)}
    </>
  );
}

function CartesianChart({ exhibit }: { exhibit: NumericalSourceExhibit }) {
  const series = exhibit.series || [];
  const values = series.flatMap((item) => item.points?.map((point) => point[1]) || item.values || []);
  const [minimum, maximum] = axisRange(exhibit.yAxis, values);
  const plotWidth = VIEW_WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = VIEW_HEIGHT - MARGIN.top - MARGIN.bottom;
  const y = (value: number) => MARGIN.top + ((maximum - value) / (maximum - minimum)) * plotHeight;
  const labels = exhibit.xLabels || [];
  const xValues = series.flatMap((item) => item.points?.map((point) => point[0]) || []);
  const [xMinimum, xMaximum] = axisRange(exhibit.xAxis, xValues.length ? xValues : [0, Math.max(1, labels.length - 1)]);
  const xForValue = (value: number) => MARGIN.left + ((value - xMinimum) / (xMaximum - xMinimum)) * plotWidth;
  const xForIndex = (index: number, count = labels.length) =>
    MARGIN.left + (count <= 1 ? plotWidth / 2 : (index / (count - 1)) * plotWidth);
  const ticks = axisTicks(minimum, maximum, exhibit.yAxis?.tickInterval);
  const yAxisOnRight = exhibit.yAxis?.position === 'right';
  const labelStep = Math.max(1, Math.ceil(labels.length / 12));
  const isBar = exhibit.type === 'bar' || exhibit.type === 'stacked-bar';
  const groupedWidth = Math.max(2, Math.min(28, plotWidth / Math.max(1, labels.length * Math.max(1, series.length)) - 2));
  const linePointSets = series.map((item) => (item.points?.length
    ? item.points.map(([xValue, value]) => ({ x: xForValue(xValue), y: y(value), value }))
    : (item.values || []).map((value, index) => ({ x: xForIndex(index, item.values?.length || 1), y: y(value), value }))));
  const placedLabels = !isBar && linePointSets.every((points) => points.length <= 12)
    ? placeLineLabels(linePointSets, { top: MARGIN.top, bottom: VIEW_HEIGHT - MARGIN.bottom + 8 }, (seriesIndex) => CHART_COLORS[seriesIndex % CHART_COLORS.length])
    : [];

  return (
    <>
      <div className="max-w-full overflow-x-auto" tabIndex={0}>
        <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="min-w-[640px] w-full" role="img" aria-label={`${exhibit.type} chart: ${exhibit.title}`}>
          <rect x={MARGIN.left} y={MARGIN.top} width={plotWidth} height={plotHeight} fill="var(--space-surface-card)" />
          {ticks.map((tick, index) => {
            const tickY = y(tick);
            return (
              <g key={index}>
                <line x1={MARGIN.left} x2={VIEW_WIDTH - MARGIN.right} y1={tickY} y2={tickY} stroke="var(--space-border-default)" strokeWidth="1" />
                <text x={yAxisOnRight ? VIEW_WIDTH - MARGIN.right + 8 : MARGIN.left - 8} y={tickY + 4} textAnchor={yAxisOnRight ? 'start' : 'end'} fontSize="10" fill="var(--space-text-muted)">{Number(tick.toFixed(1))}</text>
              </g>
            );
          })}
          {isBar ? series.map((item, seriesIndex) =>
            (item.values || []).map((value, index) => {
              const groupWidth = groupedWidth * series.length + 4;
              const center = MARGIN.left + ((index + 0.5) / Math.max(1, labels.length)) * plotWidth;
              const barX = center - groupWidth / 2 + seriesIndex * groupedWidth;
              const zeroY = y(Math.max(minimum, Math.min(maximum, 0)));
              const valueY = y(value);
              return (
                <g key={`${seriesIndex}-${index}`}>
                  <rect x={barX} y={Math.min(zeroY, valueY)} width={groupedWidth - 1} height={Math.max(1, Math.abs(zeroY - valueY))} fill={CHART_COLORS[seriesIndex % CHART_COLORS.length]} />
                  {labels.length <= 12 ? <BarValueLabel x={barX + groupedWidth / 2} valueY={valueY} zeroY={zeroY} value={value} barWidth={groupedWidth} stagger={series.length > 1 ? seriesIndex % 2 : 0} /> : null}
                </g>
              );
            }),
          ) : series.map((item, seriesIndex) => {
            const points = item.points?.length
              ? item.points.map(([xValue, value]) => [xForValue(xValue), y(value)] as const)
              : (item.values || []).map((value, index) => [xForIndex(index, item.values?.length || 1), y(value)] as const);
            return (
              <g key={`${item.name}-${seriesIndex}`}>
                <polyline points={points.map((point) => point.join(',')).join(' ')} fill="none" stroke={CHART_COLORS[seriesIndex % CHART_COLORS.length]} strokeWidth={seriesIndex === 0 ? 3 : 2} strokeDasharray={seriesIndex > 1 ? '5 4' : undefined} />
                {points.map((point, index) => (
                  <g key={index}>
                    <circle cx={point[0]} cy={point[1]} r="3.5" fill={CHART_COLORS[seriesIndex % CHART_COLORS.length]} />
                  </g>
                ))}
              </g>
            );
          })}
          {placedLabels.map((tag) => (
            <g key={tag.key}>
              <title>{`${series[tag.seriesIndex]?.name}: ${tag.text}`}</title>
              <rect x={tag.x} y={tag.y} width={tag.w} height={tag.h} rx="4" fill={tag.fill} stroke="var(--space-surface-card)" strokeWidth="1.5" />
              <text x={tag.x + tag.w / 2} y={tag.y + tag.h / 2 + 4} textAnchor="middle" fontSize={LINE_LABEL_FONT} fontWeight="700" fill={tag.textFill}>{tag.text}</text>
            </g>
          ))}
          {labels.map((label, index) => index % labelStep === 0 ? (
            <SvgAxisLabel key={`${label}-${index}`} label={label} x={isBar ? MARGIN.left + ((index + 0.5) / Math.max(1, labels.length)) * plotWidth : xForIndex(index)} y={VIEW_HEIGHT - MARGIN.bottom + 18} maxCharacters={12} />
          ) : null)}
          {exhibit.yAxis?.title ? <text x={yAxisOnRight ? VIEW_WIDTH - 10 : 14} y={MARGIN.top + plotHeight / 2} transform={`rotate(${yAxisOnRight ? 90 : -90} ${yAxisOnRight ? VIEW_WIDTH - 10 : 14} ${MARGIN.top + plotHeight / 2})`} textAnchor="middle" fontSize={exhibit.yAxis.title.length > 28 ? 8 : 10} fill="var(--space-text-secondary)">{exhibit.yAxis.title}{exhibit.yAxis.unit ? ` (${exhibit.yAxis.unit})` : ''}</text> : null}
          {exhibit.xAxis?.title ? <text x={MARGIN.left + plotWidth / 2} y={VIEW_HEIGHT - 12} textAnchor="middle" fontSize={exhibit.xAxis.title.length > 30 ? 8 : 10} fill="var(--space-text-secondary)">{exhibit.xAxis.title}</text> : null}
        </svg>
      </div>
      <ChartLegend series={series} />
      {exhibit.annotations?.map((annotation) => <p key={annotation} className="px-3 pb-2 text-center text-[10px] text-[var(--space-text-muted)]">{annotation}</p>)}
    </>
  );
}

function ScatterChart({ exhibit }: { exhibit: NumericalSourceExhibit }) {
  const points = exhibit.scatter || [];
  const [xMinimum, xMaximum] = axisRange(exhibit.xAxis, points.map((point) => point.x));
  const [yMinimum, yMaximum] = axisRange(exhibit.yAxis, points.map((point) => point.y));
  const plotWidth = VIEW_WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = VIEW_HEIGHT - MARGIN.top - MARGIN.bottom;
  const x = (value: number) => MARGIN.left + ((value - xMinimum) / (xMaximum - xMinimum)) * plotWidth;
  const y = (value: number) => MARGIN.top + ((yMaximum - value) / (yMaximum - yMinimum)) * plotHeight;
  return (
    <div className="max-w-full overflow-x-auto" tabIndex={0}>
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="min-w-[640px] w-full" role="img" aria-label={`Scatter chart: ${exhibit.title}`}>
        <line x1={MARGIN.left} x2={MARGIN.left} y1={MARGIN.top} y2={VIEW_HEIGHT - MARGIN.bottom} stroke="#111827" />
        <line x1={MARGIN.left} x2={VIEW_WIDTH - MARGIN.right} y1={VIEW_HEIGHT - MARGIN.bottom} y2={VIEW_HEIGHT - MARGIN.bottom} stroke="#111827" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={x(point.x)} cy={y(point.y)} r="5" fill="#111827" />
            <text x={x(point.x) + 7} y={y(point.y) - 5} fontSize="9" fill="var(--space-text-secondary)">{point.label}</text>
          </g>
        ))}
        <text x={MARGIN.left + plotWidth / 2} y={VIEW_HEIGHT - 16} textAnchor="middle" fontSize="10" fill="var(--space-text-secondary)">{exhibit.xAxis?.title}</text>
        <text x="14" y={MARGIN.top + plotHeight / 2} transform={`rotate(-90 14 ${MARGIN.top + plotHeight / 2})`} textAnchor="middle" fontSize="10" fill="var(--space-text-secondary)">{exhibit.yAxis?.title}</text>
      </svg>
    </div>
  );
}

function PiePanels({ exhibit }: { exhibit: NumericalSourceExhibit }) {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2">
      {(exhibit.panels || []).map((panel) => {
        let cursor = 0;
        const stops = panel.values.map((item, index) => {
          const start = cursor;
          cursor += item.value;
          return `${CHART_COLORS[index % CHART_COLORS.length]} ${start}% ${cursor}%`;
        });
        return (
          <div key={panel.title} className="flex flex-col items-center gap-3 text-center">
            <div className="h-40 w-40 rounded-full border border-[var(--space-border-default)]" style={{ background: `conic-gradient(${stops.join(',')})` }} role="img" aria-label={`${panel.title}: ${panel.values.map((item) => `${item.label} ${item.displayValue}`).join(', ')}`} />
            <div>
              <p className="text-xs font-bold text-[var(--space-text-primary)]">{panel.title}</p>
              {panel.subtitle ? <p className="text-[10px] text-[var(--space-text-muted)]">{panel.subtitle}</p> : null}
            </div>
            <ul className="space-y-1 text-left text-[11px] text-[var(--space-text-secondary)]">
              {panel.values.map((item, index) => <li key={item.label} className="flex items-start gap-1.5"><span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: CHART_COLORS[index % CHART_COLORS.length] }} />{item.label}: <strong>{item.displayValue}</strong></li>)}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function FlowExhibit({ exhibit }: { exhibit: NumericalSourceExhibit }) {
  const table = exhibit.table;
  if (!table) return null;
  return (
    <div className="flex max-w-full items-stretch gap-2 overflow-x-auto p-4" tabIndex={0} aria-label={`Flow diagram: ${exhibit.title}`}>
      {table.rows.map((row, index) => (
        <div key={index} className="flex shrink-0 items-center gap-2">
          <div className="w-48 rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] p-3 text-center">
            <p className="text-xs font-semibold leading-5 text-[var(--space-text-primary)]">{row[0]}</p>
            <div className="mt-2 space-y-1">
              {row.slice(1).map((value, valueIndex) => <p key={valueIndex} className="text-[11px] text-[var(--space-text-secondary)]"><span className="font-medium">{table.headers[valueIndex + 1]}:</span> {value}</p>)}
            </div>
          </div>
          {index < table.rows.length - 1 ? <span className="text-xl text-[var(--space-text-muted)]" aria-hidden="true">→</span> : null}
        </div>
      ))}
    </div>
  );
}

function SourceExhibit({ exhibit }: { exhibit: NumericalSourceExhibit }) {
  const isHorizontalBar = exhibit.type === 'bar' && (
    (exhibit.xLabels || []).some((label) => label.length > 14)
    || Boolean(exhibit.notes?.some((note) => /horizontal bars?/i.test(note)))
  );
  return (
    <figure className="overflow-hidden rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
      <figcaption className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-4 py-3">
        <p className="text-sm font-bold text-[var(--space-text-primary)]">{exhibit.title}</p>
        {exhibit.subtitle ? <p className="mt-0.5 text-[11px] text-[var(--space-text-muted)]">{exhibit.subtitle}</p> : null}
      </figcaption>
      {exhibit.type === 'flow' ? <FlowExhibit exhibit={exhibit} /> : exhibit.table ? <SourceTable exhibit={exhibit} /> : exhibit.type === 'pie' ? <PiePanels exhibit={exhibit} /> : exhibit.type === 'scatter' ? <ScatterChart exhibit={exhibit} /> : exhibit.type === 'stacked-bar' ? <StackedBarChart exhibit={exhibit} /> : isHorizontalBar ? <HorizontalBarChart exhibit={exhibit} /> : <CartesianChart exhibit={exhibit} />}
      {exhibit.notes?.length ? (
        <div className="border-t border-[var(--space-border-default)] px-3 py-2 text-[10px] leading-4 text-[var(--space-text-muted)]">
          {exhibit.notes.map((note) => <p key={note}>{note}</p>)}
        </div>
      ) : null}
      <p className="border-t border-[var(--space-border-default)] px-3 py-2 text-[10px] text-[var(--space-text-muted)] sm:hidden">Swipe sideways to see the full exhibit.</p>
    </figure>
  );
}

export function NumericalSourceContext({ question }: { question: NumericalQuestion }) {
  if (!question.contextPassages?.length && !question.sourceExhibits?.length) return null;
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{question.sectionTitle}</p>
          <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-1 text-[11px] font-semibold text-[var(--space-text-brand)]">Nguồn: {question.sourceOrganization}</span>
        </div>
        <div className="mt-3 space-y-3">
          {question.contextPassages?.map((passage, index) => <p key={index} className="whitespace-pre-line text-sm leading-7 text-[var(--space-text-primary)]">{passage}</p>)}
        </div>
      </div>
      {question.sourceExhibits?.map((exhibit) => <SourceExhibit key={exhibit.id} exhibit={exhibit} />)}
    </div>
  );
}
