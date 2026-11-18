import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { CheckCircle2, ChevronLeft, Eye, HelpCircle, Lightbulb } from 'lucide-react';
import PdfCropFigure from './PdfCropFigure';

// A study key built from screenshots of a real test. The screenshots live in one
// PDF (data.url, one page per screenshot) and are drawn page by page with pdf.js.

export type KeyStatus = 'checked' | 'keyonly' | 'shown' | 'derived' | 'disputed' | 'missing';

export interface KeyItem {
  n: number;
  kind: string;
  title: string;
  ask?: string;
  pages: number[];
  answer: string;
  how?: string;
  vn?: string;
  status: KeyStatus;
}

export interface KeyData {
  url: string;
  pages: Array<[number, number]>;
  items: KeyItem[];
}

export interface KeyConfig {
  eyebrow: string;
  heading: string;
  intro?: string;
  kindLabels: Record<string, string>;
  kindOrder: string[];
  testId: string;
}

const STATUS_LABEL: Record<KeyStatus, string> = {
  checked: 'Matches the key\u2019s note and re-derived by Casemate',
  keyonly: 'Taken from the key\u2019s note, not re-derived',
  shown: 'Answer is shown in the screenshot',
  derived: 'Not in the key: worked out by Casemate, check it',
  disputed: 'The key\u2019s note and our working disagree',
  missing: 'No answer recorded in the key',
};

function StatusIcon({ status }: { status: KeyStatus }) {
  if (status === 'checked') return <CheckCircle2 className="h-3.5 w-3.5 text-[var(--space-semantic-success)]" />;
  if (status === 'derived') return <Lightbulb className="h-3.5 w-3.5 text-[var(--space-semantic-warning)]" />;
  if (status === 'disputed' || status === 'missing') return <HelpCircle className="h-3.5 w-3.5 text-[var(--space-semantic-danger)]" />;
  return <Eye className="h-3.5 w-3.5" />;
}

function LazyFigure({ data, page, maxWidth }: { data: KeyData; page: number; maxWidth: number }) {
  const holder = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [w, h] = data.pages[page - 1];

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
        <PdfCropFigure source={{ url: data.url, page, box: [0, 0, w, h] }} maxWidth={maxWidth} alt={`Screenshot ${page} from the answer key`} />
      ) : (
        <div className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)]" style={{ aspectRatio: `${w} / ${h}` }} />
      )}
    </div>
  );
}

function Box({ icon, title, tone, children }: { icon: ReactNode; title: string; tone: 'answer' | 'warn' | 'plain'; children: ReactNode }) {
  const frame =
    tone === 'answer'
      ? 'border border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_9%,transparent)]'
      : tone === 'warn'
        ? 'border border-[var(--space-semantic-warning)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_10%,transparent)]'
        : 'bg-[var(--space-surface-muted)]';
  return (
    <div className={`rounded-lg p-3 ${frame}`}>
      <p className="flex items-center gap-1.5 text-xs font-semibold text-[var(--space-text-primary)]">
        {icon}
        {title}
      </p>
      <div className="mt-1 whitespace-pre-line text-xs leading-5 text-[var(--space-text-secondary)] sm:text-[13px] sm:leading-6">{children}</div>
    </div>
  );
}

export default function ScreenshotAnswerKey({ data, config, onBack }: { data: KeyData; config: KeyConfig; onBack?: () => void }) {
  const [filter, setFilter] = useState<string>('all');
  const items = data.items;
  const visibleItems = useMemo(() => items.filter((item) => filter === 'all' || item.kind === filter), [items, filter]);
  const counts = useMemo(() => {
    const result: Record<string, number> = { all: items.length };
    items.forEach((item) => {
      result[item.kind] = (result[item.kind] || 0) + 1;
    });
    return result;
  }, [items]);

  const jump = (n: number) => {
    const node = document.getElementById(`${config.testId}-item-${n}`);
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
        <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">{config.eyebrow}</p>
        <h1 className="text-xl font-bold text-[var(--space-text-primary)]">{config.heading.replace('{count}', String(items.length))}</h1>
        {config.intro ? <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">{config.intro}</p> : null}
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
          <li className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--space-semantic-success)]" />Matches the key and re-derived</li>
          <li className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" />From the key or shown in the screenshot</li>
          <li className="inline-flex items-center gap-1"><Lightbulb className="h-3.5 w-3.5 text-[var(--space-semantic-warning)]" />Derived by Casemate, check it</li>
          <li className="inline-flex items-center gap-1"><HelpCircle className="h-3.5 w-3.5 text-[var(--space-semantic-danger)]" />Disputed or no answer recorded</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by item type">
        <button type="button" onClick={() => setFilter('all')} className={chip(filter === 'all')} data-testid={`button-${config.testId}-filter-all`}>
          All ({counts.all})
        </button>
        {config.kindOrder.map((kind) => (
          <button key={kind} type="button" onClick={() => setFilter(kind)} className={chip(filter === kind)} data-testid={`button-${config.testId}-filter-${kind}`}>
            {config.kindLabels[kind]} ({counts[kind] || 0})
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
            id={`${config.testId}-item-${item.n}`}
            className="scroll-mt-4 space-y-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-bold text-[var(--space-text-primary)]">Item {item.n}</p>
              <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                {config.kindLabels[item.kind] || item.kind}
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-[var(--space-text-muted)]">
                <StatusIcon status={item.status} />
                {STATUS_LABEL[item.status]}
              </span>
            </div>
            <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{item.title}</h2>
            {item.ask ? <p className="text-xs leading-5 text-[var(--space-text-secondary)] sm:text-sm sm:leading-6">{item.ask}</p> : null}

            <div className="space-y-2">
              {item.pages.map((page) => (
                <LazyFigure key={page} data={data} page={page} maxWidth={820} />
              ))}
            </div>

            <Box
              icon={<CheckCircle2 className="h-4 w-4 text-[var(--space-semantic-success)]" />}
              title={item.status === 'missing' ? 'Answer' : 'Answer'}
              tone={item.status === 'disputed' || item.status === 'missing' ? 'warn' : 'answer'}
            >
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
