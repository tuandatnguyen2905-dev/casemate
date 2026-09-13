// Casemate — Diagrammatic Reasoning SVG renderer.
//
// Every figure in the Aptitude Test app is drawn LIVE from structured data
// (lib/diagrammatic.ts) — there is not a single scanned image or bitmap in the
// question bank. That is what lets the same shape appear as a grid cell, as an
// answer option and again in the results review at three different pixel sizes
// without ever going blurry, and it is why a rule like "rotate 90° each step"
// is guaranteed to match the picture: the picture IS the rule, evaluated.
//
// Geometry convention: every glyph is drawn centred on (0,0) inside a 100x100
// user-space cell, sized by a nominal radius r. Callers translate the group to
// the right anchor point and the glyph handles its own flip + rotation.

import type {
  ColorName,
  DiagramShape,
  FillStyle,
  PositionName,
  ScatterShape,
  ShapeType,
  SizeName,
} from '../lib/diagrammatic';

/* ========================================================================== *
 * Palette + fill patterns
 * ========================================================================== */

export const COLOR_HEX: Record<ColorName, string> = {
  ink: '#111827',
  red: '#dc2626',
  blue: '#2563eb',
  green: '#16a34a',
  amber: '#d97706',
};

export const COLOR_NAMES: ColorName[] = ['ink', 'red', 'blue', 'green', 'amber'];

/**
 * Striped / dotted / half fills are SVG paint servers, and a paint server has
 * to live in the document to be referenced by `url(#id)`. This sprite is
 * mounted once by the app; it is positioned off-layout rather than
 * `display:none` because a hidden subtree stops some browsers resolving the
 * reference.
 */
export function DiagramPatternDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        {COLOR_NAMES.map((name) => {
          const hex = COLOR_HEX[name];
          return (
            <g key={name}>
              <pattern
                id={`casemate-diag-striped-${name}`}
                patternUnits="userSpaceOnUse"
                width="5"
                height="5"
                patternTransform="rotate(45)"
              >
                <rect width="5" height="5" fill="#ffffff" />
                <rect width="2.2" height="5" fill={hex} />
              </pattern>
              <pattern
                id={`casemate-diag-dotted-${name}`}
                patternUnits="userSpaceOnUse"
                width="5"
                height="5"
              >
                <rect width="5" height="5" fill="#ffffff" />
                <circle cx="2.5" cy="2.5" r="1.25" fill={hex} />
              </pattern>
              <linearGradient id={`casemate-diag-half-${name}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="50%" stopColor={hex} />
                <stop offset="50%" stopColor="#ffffff" />
              </linearGradient>
            </g>
          );
        })}
      </defs>
    </svg>
  );
}

function paintFor(fill: FillStyle, color: ColorName): string {
  const hex = COLOR_HEX[color];
  switch (fill) {
    case 'solid':
      return hex;
    case 'outline':
      return 'none';
    case 'striped':
      return `url(#casemate-diag-striped-${color})`;
    case 'dotted':
      return `url(#casemate-diag-dotted-${color})`;
    case 'half':
      return `url(#casemate-diag-half-${color})`;
    default:
      return hex;
  }
}

/* ========================================================================== *
 * Glyph geometry — every shape type the question bank can ask for
 * ========================================================================== */

function points(list: number[][]): string {
  return list.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}

function regularPolygon(sides: number, r: number, startDeg = -90): number[][] {
  const out: number[][] = [];
  for (let i = 0; i < sides; i += 1) {
    const angle = ((startDeg + (360 / sides) * i) * Math.PI) / 180;
    out.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }
  return out;
}

function star(tips: number, r: number, innerRatio: number): number[][] {
  const out: number[][] = [];
  for (let i = 0; i < tips * 2; i += 1) {
    const radius = i % 2 === 0 ? r : r * innerRatio;
    const angle = ((-90 + (360 / (tips * 2)) * i) * Math.PI) / 180;
    out.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
  }
  return out;
}

/**
 * Archimedean spiral, 2.4 turns — always stroked, never filled. A bare spiral
 * is almost rotationally featureless, which would make a "rotates 45° each
 * step" rule impossible to read, so the outer end carries a solid cap dot
 * (see END_ANGLE below) that shows the orientation at a glance.
 */
function spiralPath(r: number): string {
  const steps = 84;
  const turns = 2.4;
  const parts: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = t * turns * 2 * Math.PI - Math.PI / 2;
    const radius = r * t;
    parts.push(`${(radius * Math.cos(angle)).toFixed(2)},${(radius * Math.sin(angle)).toFixed(2)}`);
  }
  return `M${parts.join('L')}`;
}

/** Spirals carry their fill rule in the stroke instead (a line has no inside). */
function spiralStrokeStyle(
  fill: FillStyle,
  r: number,
): { width: number; dash?: string; cap?: 'round' | 'butt' } {
  const unit = Math.max(1.4, r * 0.1);
  switch (fill) {
    case 'solid':
      return { width: unit * 2.4 };
    case 'outline':
      return { width: unit };
    case 'striped':
      return { width: unit * 1.8, dash: `${unit * 3} ${unit * 2}` };
    case 'dotted':
      return { width: unit * 1.8, dash: `0.1 ${unit * 2.6}`, cap: 'round' };
    case 'half':
      return { width: unit * 2.4, dash: `${r * 3.6} ${r * 8}` };
    default:
      return { width: unit };
  }
}

interface GlyphProps {
  type: ShapeType;
  r: number;
  fill: FillStyle;
  color: ColorName;
  strokeWidth: number;
}

function GlyphBody({ type, r, fill, color, strokeWidth }: GlyphProps) {
  const hex = COLOR_HEX[color];
  const paint = paintFor(fill, color);
  const common = {
    fill: paint,
    stroke: hex,
    strokeWidth,
    strokeLinejoin: 'round' as const,
  };

  switch (type) {
    case 'circle':
      return <circle cx={0} cy={0} r={r} {...common} />;
    case 'square':
      return (
        <rect x={-r * 0.84} y={-r * 0.84} width={r * 1.68} height={r * 1.68} rx={r * 0.06} {...common} />
      );
    case 'rectangle':
      return <rect x={-r} y={-r * 0.6} width={r * 2} height={r * 1.2} rx={r * 0.06} {...common} />;
    case 'triangle':
      return <polygon points={points(regularPolygon(3, r))} {...common} />;
    case 'pentagon':
      return <polygon points={points(regularPolygon(5, r))} {...common} />;
    case 'hexagon':
      return <polygon points={points(regularPolygon(6, r))} {...common} />;
    case 'diamond':
      return <polygon points={points(regularPolygon(4, r))} {...common} />;
    case 'star4':
      return <polygon points={points(star(4, r, 0.36))} {...common} />;
    case 'star5':
      return <polygon points={points(star(5, r, 0.46))} {...common} />;
    case 'star6':
      return <polygon points={points(star(6, r, 0.56))} {...common} />;
    case 'cross': {
      const a = r * 0.32;
      const e = r * 0.92;
      return (
        <polygon
          points={points([
            [-a, -e], [a, -e], [a, -a], [e, -a], [e, a], [a, a],
            [a, e], [-a, e], [-a, a], [-e, a], [-e, -a], [-a, -a],
          ])}
          {...common}
        />
      );
    }
    case 'lshape':
      return (
        <polygon
          points={points([
            [-0.8 * r, -0.9 * r], [-0.1 * r, -0.9 * r], [-0.1 * r, 0.25 * r],
            [0.85 * r, 0.25 * r], [0.85 * r, 0.9 * r], [-0.8 * r, 0.9 * r],
          ])}
          {...common}
        />
      );
    case 'tshape':
      return (
        <polygon
          points={points([
            [-0.88 * r, -0.85 * r], [0.88 * r, -0.85 * r], [0.88 * r, -0.2 * r],
            [0.3 * r, -0.2 * r], [0.3 * r, 0.9 * r], [-0.3 * r, 0.9 * r],
            [-0.3 * r, -0.2 * r], [-0.88 * r, -0.2 * r],
          ])}
          {...common}
        />
      );
    case 'arrow':
      return (
        <polygon
          points={points([
            [0, -r], [0.62 * r, -0.2 * r], [0.24 * r, -0.2 * r], [0.24 * r, r],
            [-0.24 * r, r], [-0.24 * r, -0.2 * r], [-0.62 * r, -0.2 * r],
          ])}
          {...common}
        />
      );
    case 'spiral': {
      const style = spiralStrokeStyle(fill, r);
      const endAngle = 2.4 * 2 * Math.PI - Math.PI / 2;
      return (
        <g>
          <path
            d={spiralPath(r)}
            fill="none"
            stroke={hex}
            strokeWidth={style.width}
            strokeDasharray={style.dash}
            strokeLinecap={style.cap || 'butt'}
          />
          <circle
            cx={r * Math.cos(endAngle)}
            cy={r * Math.sin(endAngle)}
            r={Math.max(2.4, style.width * 1.25)}
            fill={hex}
          />
        </g>
      );
    }
    default:
      return <circle cx={0} cy={0} r={r} {...common} />;
  }
}

/* ========================================================================== *
 * Laying shapes out inside a 100x100 cell
 * ========================================================================== */

const BASE_RADIUS: Record<SizeName, number> = { small: 13, medium: 19, large: 26 };

/** Several instances of a shape have to shrink to keep the cell readable. */
const COUNT_SCALE: Record<number, number> = { 1: 1, 2: 0.72, 3: 0.6, 4: 0.53 };

const ANCHOR: Record<PositionName, [number, number]> = {
  center: [50, 50],
  'top-left': [30, 30],
  'top-right': [70, 30],
  'bottom-left': [30, 70],
  'bottom-right': [70, 70],
};

const LAYOUT: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, 0], [1, 0]],
  3: [[0, -1], [-0.92, 0.72], [0.92, 0.72]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
};

/** All instances of one DiagramShape, laid out inside a 100x100 cell. */
export function ShapeGroup({ shape }: { shape: DiagramShape }) {
  const count = Math.min(4, Math.max(1, Math.round(shape.count || 1)));
  const r = BASE_RADIUS[shape.size] * (COUNT_SCALE[count] || 1);
  const spread = r * 1.25;
  // A corner anchor has to drift back toward the middle as the count grows,
  // otherwise four large shapes stacked in a corner get clipped by the cell.
  const [rawX, rawY] = ANCHOR[shape.position] || ANCHOR.center;
  const pull = count >= 3 ? 0.35 : count === 2 ? 0.15 : 0;
  const ax = rawX + (50 - rawX) * pull;
  const ay = rawY + (50 - rawY) * pull;
  const slots = LAYOUT[count] || LAYOUT[1];
  const strokeWidth = Math.max(1.4, r * 0.11);
  const mirror = shape.flip === 'horizontal' ? -1 : 1;

  return (
    <g>
      {slots.map(([dx, dy], index) => (
        <g
          key={index}
          transform={`translate(${(ax + dx * spread).toFixed(2)} ${(ay + dy * spread).toFixed(2)}) rotate(${shape.rotation}) scale(${mirror} 1)`}
        >
          <GlyphBody type={shape.type} r={r} fill={shape.fill} color={shape.color} strokeWidth={strokeWidth} />
        </g>
      ))}
    </g>
  );
}

/* ========================================================================== *
 * Boxes: one cell, the missing cell, a scattered set_ab figure
 * ========================================================================== */

export type BoxTone = 'plain' | 'question' | 'correct' | 'wrong' | 'selected';

const BOX_TONE: Record<BoxTone, { border: string; background: string; width: number }> = {
  plain: { border: 'var(--space-border-strong)', background: 'var(--space-surface-card)', width: 1 },
  question: { border: 'var(--space-brand-primary)', background: 'var(--space-surface-accent-soft)', width: 2 },
  correct: { border: 'var(--space-semantic-success)', background: 'var(--space-surface-card)', width: 2 },
  wrong: { border: 'var(--space-semantic-danger)', background: 'var(--space-surface-card)', width: 2 },
  selected: { border: 'var(--space-brand-primary)', background: 'var(--space-surface-card)', width: 2 },
};

interface FigureBoxProps {
  shape?: DiagramShape | null;
  scatter?: ScatterShape[] | null;
  tone?: BoxTone;
  /** Rendered pixel size of the square cell. */
  size?: number;
  label?: string;
}

/** One bordered figure box: a single laid-out shape, a scatter, or a "?". */
export function FigureBox({ shape, scatter, tone = 'plain', size = 86, label }: FigureBoxProps) {
  const style = BOX_TONE[tone];
  // A "how many shapes are in this box?" rule is unanswerable if a crowded
  // box overlaps into a blob, so shapes shrink as the box fills up.
  const density = !scatter ? 1 : scatter.length >= 7 ? 0.66 : scatter.length >= 5 ? 0.82 : 1;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={label || 'Figure'}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      <rect
        x={style.width / 2}
        y={style.width / 2}
        width={100 - style.width}
        height={100 - style.width}
        rx={6}
        fill={style.background}
        stroke={style.border}
        strokeWidth={style.width}
        strokeDasharray={tone === 'question' ? '5 4' : undefined}
      />
      {shape ? <ShapeGroup shape={shape} /> : null}
      {scatter
        ? scatter.map((item, index) => (
            <g key={index} transform={`translate(${item.x} ${item.y}) rotate(${item.rotation})`}>
              <GlyphBody
                type={item.type}
                r={(item.size === 'large' ? 20 : item.size === 'medium' ? 15 : 12) * density}
                fill={item.fill}
                color={item.color}
                strokeWidth={Math.max(1.2, 1.6 * density)}
              />
            </g>
          ))
        : null}
      {!shape && !scatter ? (
        <text
          x={50}
          y={50}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={38}
          fontWeight={700}
          fill="var(--space-brand-primary)"
        >
          ?
        </text>
      ) : null}
    </svg>
  );
}

/* ========================================================================== *
 * Question layouts
 * ========================================================================== */

/** 3x3 matrix with the bottom-right cell missing (or revealed, in review). */
export function MatrixGrid({
  cells,
  answer,
  cellSize = 86,
}: {
  cells: DiagramShape[];
  /** Pass the correct shape to reveal the missing cell on the results screen. */
  answer?: DiagramShape | null;
  cellSize?: number;
}) {
  return (
    <div
      className="inline-grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(3, minmax(0, ${cellSize}px))` }}
    >
      {cells.map((cell, index) => (
        <FigureBox key={index} shape={cell} size={cellSize} label={`Cell ${index + 1}`} />
      ))}
      <FigureBox
        shape={answer || undefined}
        tone={answer ? 'correct' : 'question'}
        size={cellSize}
        label={answer ? 'Missing cell — the correct answer' : 'Missing cell'}
      />
    </div>
  );
}

/** A 4- or 5-step horizontal sequence, last step missing. */
export function SequenceStrip({
  cells,
  answer,
  cellSize = 86,
}: {
  cells: DiagramShape[];
  answer?: DiagramShape | null;
  cellSize?: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {cells.map((cell, index) => (
        <FigureBox key={index} shape={cell} size={cellSize} label={`Step ${index + 1}`} />
      ))}
      <FigureBox
        shape={answer || undefined}
        tone={answer ? 'correct' : 'question'}
        size={cellSize}
        label={answer ? 'Missing step — the correct answer' : 'Missing step'}
      />
    </div>
  );
}

/** One labelled row of Set A / Set B example figures. */
export function SetFigureRow({
  title,
  boxes,
  cellSize = 86,
  accent,
}: {
  title: string;
  boxes: ScatterShape[][];
  cellSize?: number;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={`text-xs font-bold uppercase tracking-wide ${
          accent ? 'text-[var(--space-text-brand)]' : 'text-[var(--space-text-muted)]'
        }`}
      >
        {title}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {boxes.map((box, index) => (
          <FigureBox key={index} scatter={box} size={cellSize} label={`${title} — figure ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export { GlyphBody };
