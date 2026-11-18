import { IQ_PUZZLES_PDF_URL } from '../lib/iqPuzzleBook';
import type { IqPuzzleQuestion } from '../lib/iqPuzzleBook';

export default function IqPuzzleSourceFigure({
  question,
  compact = false,
}: {
  question: IqPuzzleQuestion;
  compact?: boolean;
}) {
  const left = Math.max(0, Math.round(question.crop.x * 612));
  const top = Math.max(0, Math.round(question.crop.y * 792));
  const zoom = compact ? 120 : 165;
  const height = compact
    ? Math.max(300, Math.min(480, Math.round(question.crop.height * 720)))
    : Math.max(420, Math.min(700, Math.round(question.crop.height * 980)));
  const source = `${IQ_PUZZLES_PDF_URL}#page=${question.pdfPage}&zoom=${zoom},${left},${top}&toolbar=0&navpanes=0`;

  return (
    <figure className="overflow-hidden rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-4 py-3">
        <div>
          <p className="text-sm font-bold text-[var(--space-text-primary)]">Puzzle {question.puzzleNumber}</p>
          <p className="text-[11px] text-[var(--space-text-muted)]">Source page {question.pdfPage} · scanned source figure</p>
        </div>
        <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-1 text-[11px] font-semibold text-[var(--space-text-brand)]">
          {question.puzzleCategory.replace('_', ' ')}
        </span>
      </figcaption>
      <iframe
        title={`IQ Puzzles level source, puzzle ${question.puzzleNumber}`}
        src={source}
        className="w-full border-0 bg-white"
        style={{ height }}
        loading="lazy"
      />
      <p className="border-t border-[var(--space-border-default)] px-3 py-2 text-[10px] leading-4 text-[var(--space-text-muted)]">
        This scanned figure is embedded from the uploaded source because its mixed symbols and geometry cannot be reproduced reliably from OCR alone.
      </p>
    </figure>
  );
}
