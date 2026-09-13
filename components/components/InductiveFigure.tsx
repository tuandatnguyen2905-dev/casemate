// Casemate — Inductive Reasoning SVG renderer.
//
// The companion of components/DiagramFigure.tsx for the Inductive Reasoning
// section of the Aptitude Test app. Every figure is a flat list of resolved
// primitives produced by lib/inductive.ts (positions, radii, rotations already
// computed), so a figure renders identically as a sequence panel (~100px) and
// as an answer option (~78px) without ever going blurry, and the picture can
// never disagree with the rule that generated it.

import type { Fill, Figure, Prim } from '../lib/inductive';

const INK = '#111827';

/* -------------------------------------------------------------------------- *
 * Fill paint servers (striped + half) — mounted once by the app.
 * -------------------------------------------------------------------------- */

export function InductivePatternDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <pattern id="casemate-ind-striped" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
          <rect width="5" height="5" fill="#ffffff" />
          <rect width="2.3" height="5" fill={INK} />
        </pattern>
        <linearGradient id="casemate-ind-half" x1="0" y1="0" x2="1" y2="0">
          <stop offset="50%" stopColor={INK} />
          <stop offset="50%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function paint(fill: Fill): string {
  switch (fill) {
    case 'solid':
      return INK;
    case 'none':
      return 'none';
    case 'striped':
      return 'url(#casemate-ind-striped)';
    case 'half':
      return 'url(#casemate-ind-half)';
    default:
      return INK;
  }
}

/* -------------------------------------------------------------------------- *
 * Geometry helpers
 * -------------------------------------------------------------------------- */

function polyPoints(sides: number, r: number, cx: number, cy: number, startDeg = -90): string {
  const out: string[] = [];
  for (let i = 0; i < sides; i += 1) {
    const a = ((startDeg + (360 / sides) * i) * Math.PI) / 180;
    out.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return out.join(' ');
}

function starPoints(tips: number, r: number, inner: number, cx: number, cy: number): string {
  const out: string[] = [];
  for (let i = 0; i < tips * 2; i += 1) {
    const radius = i % 2 === 0 ? r : r * inner;
    const a = ((-90 + (360 / (tips * 2)) * i) * Math.PI) / 180;
    out.push(`${(cx + radius * Math.cos(a)).toFixed(2)},${(cy + radius * Math.sin(a)).toFixed(2)}`);
  }
  return out.join(' ');
}

// Arrow pointing up, centred on the origin, total height = 2r.
function arrowPoints(r: number): string {
  return [
    [0, -r], [0.6 * r, -0.18 * r], [0.24 * r, -0.18 * r], [0.24 * r, r],
    [-0.24 * r, r], [-0.24 * r, -0.18 * r], [-0.6 * r, -0.18 * r],
  ]
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');
}

// L-shape centred on the origin (chiral — the mirror image looks different).
function lshapePoints(r: number): string {
  return [
    [-0.8 * r, -0.9 * r], [-0.1 * r, -0.9 * r], [-0.1 * r, 0.25 * r],
    [0.85 * r, 0.25 * r], [0.85 * r, 0.9 * r], [-0.8 * r, 0.9 * r],
  ]
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');
}

function segWedge(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const p0x = cx + r * Math.cos((a0 * Math.PI) / 180);
  const p0y = cy + r * Math.sin((a0 * Math.PI) / 180);
  const p1x = cx + r * Math.cos((a1 * Math.PI) / 180);
  const p1y = cy + r * Math.sin((a1 * Math.PI) / 180);
  return `M${cx.toFixed(2)},${cy.toFixed(2)} L${p0x.toFixed(2)},${p0y.toFixed(2)} A${r} ${r} 0 0 1 ${p1x.toFixed(2)},${p1y.toFixed(2)} Z`;
}

/* -------------------------------------------------------------------------- *
 * Primitive renderer
 * -------------------------------------------------------------------------- */

function renderPrim(prim: Prim, index: number) {
  const stroke = INK;
  const common = { stroke, strokeWidth: 2, strokeLinejoin: 'round' as const };
  switch (prim.k) {
    case 'circle':
      return <circle key={index} cx={prim.cx} cy={prim.cy} r={prim.r} fill={paint(prim.fill)} {...common} />;
    case 'dot':
      return <circle key={index} cx={prim.cx} cy={prim.cy} r={prim.r} fill={prim.fill === 'none' ? '#ffffff' : INK} stroke={INK} strokeWidth={1} />;
    case 'poly':
      return (
        <polygon
          key={index}
          points={polyPoints(prim.sides, prim.r, prim.cx, prim.cy, -90 + prim.rot)}
          fill={paint(prim.fill)}
          {...common}
        />
      );
    case 'star':
      return (
        <g key={index} transform={`rotate(${prim.rot} ${prim.cx} ${prim.cy})`}>
          <polygon points={starPoints(prim.tips, prim.r, 0.46, prim.cx, prim.cy)} fill={paint(prim.fill)} {...common} />
        </g>
      );
    case 'rect':
      return (
        <g key={index} transform={`rotate(${prim.rot} ${prim.cx} ${prim.cy})`}>
          <rect
            x={prim.cx - prim.w / 2}
            y={prim.cy - prim.h / 2}
            width={prim.w}
            height={prim.h}
            fill={paint(prim.fill)}
            {...common}
          />
        </g>
      );
    case 'line':
      return (
        <line key={index} x1={prim.x1} y1={prim.y1} x2={prim.x2} y2={prim.y2} stroke={INK} strokeWidth={prim.w || 2} strokeLinecap="round" />
      );
    case 'text':
      return (
        <text
          key={index}
          x={prim.cx}
          y={prim.cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={prim.size}
          fontWeight={700}
          fill={INK}
        >
          {prim.s}
        </text>
      );
    case 'arrow': {
      const r = prim.len / 2;
      const notchEls = [];
      const n = prim.notches || 0;
      for (let i = 0; i < n; i += 1) {
        const y = -0.02 * r + (i + 1) * (r * 0.9) / (n + 1);
        notchEls.push(
          <line key={`n${i}`} x1={-0.24 * r} y1={y} x2={0.24 * r} y2={y} stroke="#ffffff" strokeWidth={1.6} />,
        );
      }
      return (
        <g key={index} transform={`translate(${prim.cx} ${prim.cy}) rotate(${prim.rot})`}>
          <polygon points={arrowPoints(r)} fill={paint(prim.fill)} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          {notchEls}
        </g>
      );
    }
    case 'lshape':
      return (
        <g key={index} transform={`translate(${prim.cx} ${prim.cy}) rotate(${prim.rot}) scale(${prim.flip} 1)`}>
          <polygon points={lshapePoints(prim.r)} fill={paint(prim.fill)} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        </g>
      );
    case 'seg': {
      const els = [];
      const per = 360 / prim.segs;
      for (let i = 0; i < prim.segs; i += 1) {
        if (prim.shaded.includes(i)) {
          els.push(
            <path
              key={`w${i}`}
              d={segWedge(prim.cx, prim.cy, prim.r, prim.startDeg + i * per, prim.startDeg + (i + 1) * per)}
              fill={INK}
            />,
          );
        }
      }
      const spokes = [];
      for (let i = 0; i < prim.segs; i += 1) {
        const a = ((prim.startDeg + i * per) * Math.PI) / 180;
        spokes.push(
          <line
            key={`s${i}`}
            x1={prim.cx}
            y1={prim.cy}
            x2={prim.cx + prim.r * Math.cos(a)}
            y2={prim.cy + prim.r * Math.sin(a)}
            stroke={INK}
            strokeWidth={1}
          />,
        );
      }
      return (
        <g key={index}>
          {els}
          <circle cx={prim.cx} cy={prim.cy} r={prim.r} fill="none" stroke={INK} strokeWidth={2} />
          {spokes}
        </g>
      );
    }
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- *
 * Figure box
 * -------------------------------------------------------------------------- */

export type IndTone = 'plain' | 'question' | 'correct' | 'wrong' | 'selected';

const TONE: Record<IndTone, { border: string; background: string; width: number; dash?: string }> = {
  plain: { border: 'var(--space-border-strong)', background: 'var(--space-surface-card)', width: 1 },
  question: { border: 'var(--space-brand-primary)', background: 'var(--space-surface-accent-soft)', width: 2, dash: '5 4' },
  correct: { border: 'var(--space-semantic-success)', background: 'var(--space-surface-card)', width: 2 },
  wrong: { border: 'var(--space-semantic-danger)', background: 'var(--space-surface-card)', width: 2 },
  selected: { border: 'var(--space-brand-primary)', background: 'var(--space-surface-card)', width: 2 },
};

export function InductiveFigureSVG({
  figure,
  size = 96,
  tone = 'plain',
  label,
}: {
  figure?: Figure | null;
  size?: number;
  tone?: IndTone;
  label?: string;
}) {
  const style = TONE[tone];
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
        strokeDasharray={style.dash}
      />
      {figure ? figure.prims.map((prim, i) => renderPrim(prim, i)) : (
        <text x={50} y={50} textAnchor="middle" dominantBaseline="central" fontSize={38} fontWeight={700} fill="var(--space-brand-primary)">
          ?
        </text>
      )}
    </svg>
  );
}

/* -------------------------------------------------------------------------- *
 * Sequence strip: five figures, a connector, then the "?" box
 * -------------------------------------------------------------------------- */

export function InductiveSequence({
  sequence,
  answer,
  cellSize = 92,
}: {
  sequence: Figure[];
  /** Review mode: fill the final box with the correct next figure. */
  answer?: Figure | null;
  cellSize?: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {sequence.map((figure, index) => (
        <InductiveFigureSVG key={index} figure={figure} size={cellSize} label={`Sequence figure ${index + 1}`} />
      ))}
      <span className="px-1 text-lg font-bold text-[var(--space-text-muted)]" aria-hidden="true">
        →
      </span>
      <InductiveFigureSVG
        figure={answer || undefined}
        size={cellSize}
        tone={answer ? 'correct' : 'question'}
        label={answer ? 'The correct next figure' : 'The figure that comes next'}
      />
    </div>
  );
}
