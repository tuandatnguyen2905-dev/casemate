import { CAREER_APTITUDE_PDF_URL } from '../lib/careerAptitudeBook';
import type { CareerAptitudeQuestion } from '../lib/careerAptitudeBook';

export default function CareerAptitudeSourceFigure({
  question,
  compact = false,
}: {
  question: CareerAptitudeQuestion;
  compact?: boolean;
}) {
  const left = Math.max(0, Math.round(question.crop.x * 336));
  const top = Math.max(0, Math.round(question.crop.y * 526));
  const zoom = compact ? 145 : 190;
  const height = compact
    ? Math.max(280, Math.min(500, Math.round(question.crop.height * 760)))
    : Math.max(400, Math.min(760, Math.round(question.crop.height * 1080)));
  const source = `${CAREER_APTITUDE_PDF_URL}#page=${question.pdfPage}&zoom=${zoom},${left},${top}&toolbar=0&navpanes=0`;

  return (
    <figure className="overflow-hidden rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-4 py-3">
        <div>
          <p className="text-sm font-bold text-[var(--space-text-primary)]">Question {question.questionNumber}</p>
          <p className="text-[11px] text-[var(--space-text-muted)]">Source page {question.pdfPage} · original book exhibit</p>
        </div>
        <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-1 text-[11px] font-semibold capitalize text-[var(--space-text-brand)]">
          {question.aptitudeCategory.replaceAll('_', ' ')}
        </span>
      </figcaption>
      <iframe
        title={`Career aptitude source, question ${question.questionNumber}`}
        src={source}
        className="w-full border-0 bg-white"
        style={{ height }}
        loading="lazy"
      />
      <p className="border-t border-[var(--space-border-default)] px-3 py-2 text-[10px] leading-4 text-[var(--space-text-muted)]">
        The original page is shown to preserve symbols, diagrams and layout that cannot be reproduced reliably from text extraction alone.
      </p>
    </figure>
  );
}
