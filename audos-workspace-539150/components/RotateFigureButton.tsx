import { RotateCw } from 'lucide-react';

/**
 * Rotate control for exhibit figures. Render it inside <FigureRotateBar> directly
 * above the figure so it never covers the picture and is never clipped by the
 * figure frame. Each click turns the figure 90 degrees clockwise; the owner of the
 * rotation state decides when to reset it. The button is icon-only; its name is
 * exposed through aria-label and the title tooltip.
 */
export default function RotateFigureButton({ onClick, rotation = 0 }: { onClick: () => void; rotation?: number }) {
  const angle = ((rotation % 360) + 360) % 360;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Xoay 90°"
      title="Xoay 90°"
      data-testid="button-rotate-figure"
      data-rotation={angle}
      className="inline-flex h-11 min-h-[36px] w-11 min-w-[36px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] text-[var(--space-text-brand)] shadow-sm transition hover:bg-[var(--space-surface-accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--space-brand-primary)] sm:h-10 sm:w-10"
      style={{ touchAction: 'manipulation' }}
    >
      <RotateCw className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

/** Right-aligned toolbar row that sits directly above a figure's top-right corner. */
export function FigureRotateBar({ onRotate, rotation }: { onRotate: () => void; rotation: number }) {
  return (
    <div className="mb-1.5 flex items-center justify-end">
      <RotateFigureButton onClick={onRotate} rotation={rotation} />
    </div>
  );
}
