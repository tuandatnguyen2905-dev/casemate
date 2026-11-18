import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { CheckCircle2, ChevronLeft, Eye, Lightbulb } from 'lucide-react';
import PdfCropFigure from './PdfCropFigure';
import keyData from '../data/hsbc-key.json';

// HSBC online assessment: answer key. Each item is a screenshot of a real
// interactive question with the correct answer drawn in, kept in one PDF
// (data/hsbc-key.json -> url) and drawn page by page with pdf.js.

type Kind = 'seq' | 'cal' | 'sched' | 'pie' | 'chart' | 'order';
type Status = 'checked' | 'shown' | 'derived';

interface KeyItem {
  n: number;
  kind: Kind;
  title: string;
  ask?: string;
  pages: number[];
  answer: string;
  how?: string;
  vn?: string;
  status: Status;
}

const DATA = keyData as unknown as { url: string; pages: Array<[number, number]>; items: KeyItem[] };

const KIND_LABEL: Record<Kind, string> = {
  seq: 'Visual sequences',
  cal: 'Calendar puzzles',
  sched: 'Schedules and rooms',
  pie: 'Pie charts',
  chart: 'Bar charts and graphs',
  order: 'Ordering puzzles',
};
const KIND_ORDER: Kind[] = ['seq', 'cal', 'sched', 'pie', 'chart', 'order'];

const STATUS_LABEL: Record<Status, string> = {
  checked: 'Re-derived from the question and matches the key',
  shown: 'Answer is shown in the screenshot',
  derived: 'Not in the key: worked out by Casemate, check it',
};

function LazyFigure({ page, maxWidth }: { page: number; maxWidth: number }) {
  const holder = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [w, h] = DATA.pages[page - 1];

  useEffect(() => {
    const node = holder.current;
    if (!node || visible) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={holder} className="mx-auto w-full" style={{ maxWidth }}>
      {visible ? (
        <PdfCropFigure source={{ url: DATA.url, page, box: [0, 0, w, h] }} maxWidth={maxWidth} alt={`Screenshot ${page} from the HSBC answer key`} />
      ) : (
        <div className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)]" style={{ aspectRatio: `${w} / ${h}` }} />
      )}
    </div>
  );
}

function Box({ icon, title, tone, children }: { icon: ReactNode; title: string; tone: 'answer' | 'plain'; children: ReactNode }) {
  return (
    <div
      className={`rounded-lg p-3 ${
        tone === 'answer'
          ? 'border border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_9%,transparent)]'
          : 'bg-[var(--space-surface-muted)]'
      }`}
    >
      <p className="flex items-center gap-1.5 text-xs font-semibold text-[var(--space-text-primary)]">
        {icon}
        {title}
      </p>
      <div className="mt-1 whitespace-pre-line text-xs leading-5 text-[var(--space-text-secondary)] sm:text-[13px] sm:leading-6">{children}</div>
    </div>
  );
}

export default function HsbcAnswerKey({ onBack }: { onBack?: () => void }) {
  const [filter, setFilter] = useState<Kind | 'all'>('all');
  const items = DATA.items;
  const visibleItems = useMemo(() => items.filter((item) => filter === 'all' || item.kind === filter), [items, filter]);
  const counts = useMemo(() => {
    const result: Record<string, number> = { all: items.length };
    items.forEach((item) => {
      result[item.kind] = (result[item.kind] || 0) + 1;
    });
    return result;
  }, [items]);

  const jump = (n: number) => {
    const node = document.getElementById(`hsbc-item-${n}`);
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
      active
        ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
        : 'border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary)]'
    }`;

  return (
    <>
      {onBack ? (
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline">
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      ) : null}

      <div className="space-y-2 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">HSBC online assessment</p>
        <h1 className="text-xl font-bold text-[var(--space-text-primary)]">Answer key: {items.length} items</h1>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
          <li className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--space-semantic-success)]" />Checked: we re-derived the answer from the question</li>
          <li className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" />Shown: the screenshot is the answer</li>
          <li className="inline-flex items-center gap-1"><Lightbulb className="h-3.5 w-3.5 text-[var(--space-semantic-warning)]" />Derived: not in the key, our working</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by item type">
        <button type="button" onClick={() => setFilter('all')} className={chip(filter === 'all')} data-testid="button-hsbc-filter-all">
          All ({counts.all})
        </button>
        {KIND_ORDER.map((kind) => (
          <button key={kind} type="button" onClick={() => setFilter(kind)} className={chip(filter === kind)} data-testid={`button-hsbc-filter-${kind}`}>
            {KIND_LABEL[kind]} ({counts[kind] || 0})
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5" aria-label="Jump to an item">
        {visibleItems.map((item) => (
          <button
            key={item.n}
            type="button"
            onClick={() => jump(item.n)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-xs font-bold text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary)]"
            aria-label={`Jump to item ${item.n}`}
          >
            {item.n}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visibleItems.map((item) => (
          <section
            key={item.n}
            id={`hsbc-item-${item.n}`}
            className="scroll-mt-4 space-y-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-bold text-[var(--space-text-primary)]">Item {item.n}</p>
              <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                {KIND_LABEL[item.kind]}
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-[var(--space-text-muted)]">
                {item.status === 'checked' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--space-semantic-success)]" />
                ) : item.status === 'derived' ? (
                  <Lightbulb className="h-3.5 w-3.5 text-[var(--space-semantic-warning)]" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
                {STATUS_LABEL[item.status]}
              </span>
            </div>
            <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{item.title}</h2>
            {item.ask ? <p className="text-xs leading-5 text-[var(--space-text-secondary)] sm:text-sm sm:leading-6">{item.ask}</p> : null}

            <div className="space-y-2">
              {item.pages.map((page) => (
                <LazyFigure key={page} page={page} maxWidth={820} />
              ))}
            </div>

            <Box icon={<CheckCircle2 className="h-4 w-4 text-[var(--space-semantic-success)]" />} title="Answer" tone="answer">
              {item.answer}
            </Box>
            {item.how ? (
              <Box icon={<Lightbulb className="h-4 w-4 text-[var(--space-semantic-warning)]" />} title="How to get there" tone="plain">
                {item.how}
              </Box>
            ) : null}
            {item.vn ? (
              <Box icon={<Eye className="h-4 w-4" />} title="Note written in the key" tone="plain">
                {item.vn}
              </Box>
            ) : null}
          </section>
        ))}
      </div>
    </>
  );
}
