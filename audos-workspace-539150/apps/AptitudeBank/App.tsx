// Casemate — Bank of Aptitude Question.
//
// Every question from the five aptitude parts of "Ultimate Aptitude Tests"
// (Jim Barrett): abstract visual, abstract numerical, abstract verbal, physical
// and spatial tests, grouped under our Logical, Numerical, Verbal, Mechanical
// and Spatial Reasoning families. The book is stored as one PDF; every figure is
// drawn from the right page region with pdf.js (components/PdfCropFigure.tsx),
// while text questions, options, answers and explanations come from
// data/aptitude-bank-*.json. This is a practice bank: pick an answer, check it,
// and read the book's answer and explanation. Nothing is timed or scored in the
// database; the practice marks stay on this device.

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { BookOpen, Brain, Calculator, CheckCircle2, ChevronLeft, ChevronRight, Clock, Cog, Diamond, Eye, LayoutGrid, RotateCcw, Target, XCircle } from 'lucide-react';
import PaywallGate from '../../components/PaywallGate';
import PdfCropFigure from '../../components/PdfCropFigure';
import { tw } from '../../lib/colors';
import logicalData from '../../data/aptitude-bank-logical.json';
import numericalData from '../../data/aptitude-bank-numerical.json';
import verbalData from '../../data/aptitude-bank-verbal.json';
import mechanicalData from '../../data/aptitude-bank-mechanical.json';
import spatialData from '../../data/aptitude-bank-spatial.json';

const BOOK_URL = 'https://storage.googleapis.com/audos-images/attachments/general/382d4067-15e4-4a29-aca9-aa4b2603c4b7.pdf';
const STORE_KEY = 'casemate-aptitude-bank-v1';

/** [pdf page, x0, y0, x1, y1] in PDF points. */
type Crop = [number, number, number, number, number];

interface Part {
  l: string;
  o?: string[];
  ot?: string[];
  a: string[];
  m?: number;
  num?: boolean;
}

interface Item {
  n: number | string;
  q?: string;
  stem?: string[];
  g?: string;
  pg?: Crop[];
  leg?: Crop[];
  parts?: Part[];
  a?: string;
  x?: string;
}

interface Group {
  ctx: string;
  x: Crop[];
}

interface Sheet {
  pg: Crop[];
  from: number;
  to: number;
}

interface Test {
  id: string;
  family: string;
  no: number;
  name: string;
  minutes: number;
  task: string;
  guide: Crop[];
  groups?: Record<string, Group>;
  sheets?: Sheet[];
  items: Item[];
  o?: string[];
  count: number;
}

interface Family {
  id: string;
  name: string;
  part: string;
  icon: ComponentType<{ className?: string }>;
  tests: Test[];
}

const FAMILIES: Family[] = [
  { id: 'logical', name: 'Logical Reasoning', part: 'Part one · Abstract visual tests', icon: LayoutGrid, tests: (logicalData as unknown as { tests: Test[] }).tests },
  { id: 'numerical', name: 'Numerical Reasoning', part: 'Part two · Abstract numerical tests', icon: Calculator, tests: (numericalData as unknown as { tests: Test[] }).tests },
  { id: 'verbal', name: 'Verbal Reasoning', part: 'Part three · Abstract verbal tests', icon: BookOpen, tests: (verbalData as unknown as { tests: Test[] }).tests },
  { id: 'mechanical', name: 'Mechanical Reasoning', part: 'Part four · Physical tests', icon: Cog, tests: (mechanicalData as unknown as { tests: Test[] }).tests },
  { id: 'spatial', name: 'Spatial Reasoning', part: 'Part five · Spatial tests', icon: Diamond, tests: (spatialData as unknown as { tests: Test[] }).tests },
];

interface Saved {
  answers: Record<string, string[]>;
  checked: Record<string, boolean>;
}

function loadSaved(): Saved {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    return { answers: parsed.answers || {}, checked: parsed.checked || {} };
  } catch (error) {
    return { answers: {}, checked: {} };
  }
}

const norm = (value: string, numeric?: boolean) => {
  const text = value.trim().toLowerCase();
  return numeric ? text.replace(/[,\s]/g, '') : text;
};

function partCorrect(part: Part, value: string[] | undefined): boolean {
  if (!value || !value.length || !value[0].trim()) return false;
  const want = part.a.map((x) => norm(x, part.num));
  if (part.m) {
    const got = new Set(value.map((v) => norm(v)));
    return got.size === want.length && want.every((w) => got.has(w));
  }
  return want.includes(norm(value[0], part.num));
}

function itemParts(test: Test, item: Item): Part[] {
  if (item.parts) return item.parts;
  return [{ l: '', o: test.o, a: [item.a || ''] }];
}

function itemLabel(test: Test, item: Item): string {
  if (test.id === 't1') return `Row ${item.n}`;
  if (test.id === 't10') {
    const n = Number(item.n);
    return `Set ${n} · shapes ${n * 5 - 4} to ${n * 5}`;
  }
  return `Question ${item.n}`;
}

function answerText(part: Part): string {
  return part.a
    .map((key) => {
      const index = part.o ? part.o.indexOf(key) : -1;
      const text = index >= 0 && part.ot ? part.ot[index] : '';
      return text ? `${key}) ${text}` : key;
    })
    .join(' and ');
}

function partsHaveAnswer(test: Test, item: Item, saved: Saved): boolean {
  return itemParts(test, item).some((_, i) => (saved.answers[`${test.id}:${item.n}:${i}`] || []).some((v) => v.trim()));
}

function LazyCrop({ crop, maxWidth }: { crop: Crop; maxWidth?: number }) {
  const holder = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [page, x0, y0, x1, y1] = crop;
  const width = maxWidth ?? Math.min(720, Math.round((x1 - x0) * 1.6));

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
      { rootMargin: '500px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={holder} className="mx-auto w-full" style={{ maxWidth: width }}>
      {visible ? (
        <PdfCropFigure source={{ url: BOOK_URL, page, box: [x0, y0, x1, y1] }} maxWidth={width} alt={`Figure from Ultimate Aptitude Tests, page ${page}`} />
      ) : (
        <div className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)]" style={{ aspectRatio: `${x1 - x0} / ${y1 - y0}` }} />
      )}
    </div>
  );
}

const pill = 'inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold';

function optionClass(selected: boolean, state: 'idle' | 'right' | 'wrong' | 'key') {
  if (state === 'right') return 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_12%,transparent)]';
  if (state === 'wrong') return 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)]';
  if (state === 'key') return 'border-[var(--space-semantic-success)] bg-[var(--space-surface-card)]';
  return selected
    ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
    : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary)]';
}

function PartControl({
  part,
  options,
  value,
  revealed,
  onChange,
}: {
  part: Part;
  options?: string[];
  value: string[];
  revealed: boolean;
  onChange: (next: string[]) => void;
}) {
  const keys = part.o || options;
  const right = partCorrect(part, value);
  const answered = value.length > 0 && Boolean(value[0]?.trim());

  const stateOf = (key: string) => {
    if (!revealed) return 'idle' as const;
    const isKey = part.a.map((x) => norm(x)).includes(norm(key));
    const isPicked = value.map((x) => norm(x)).includes(norm(key));
    if (isKey && isPicked) return 'right' as const;
    if (isPicked) return 'wrong' as const;
    if (isKey) return 'key' as const;
    return 'idle' as const;
  };

  const toggle = (key: string) => {
    if (revealed) return;
    if (part.m) onChange(value.includes(key) ? value.filter((v) => v !== key) : [...value, key]);
    else onChange([key]);
  };

  const verdict = revealed && answered ? (
    right ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" /> : <XCircle className="h-4 w-4 shrink-0 text-[var(--space-semantic-danger)]" />
  ) : null;

  if (!keys) {
    return (
      <div className="flex items-center gap-2">
        {part.l ? <span className="w-6 text-xs font-bold text-[var(--space-text-secondary)]">{part.l}</span> : null}
        <input
          type="text"
          inputMode={part.num ? 'decimal' : 'text'}
          maxLength={part.num ? 8 : 2}
          autoComplete="off"
          spellCheck={false}
          disabled={revealed}
          value={value[0] || ''}
          onChange={(event) => onChange([event.target.value])}
          placeholder={part.num ? 'Number' : 'Letter'}
          aria-label={part.l ? `Answer ${part.l}` : 'Your answer'}
          className={`w-24 rounded-lg border-2 px-3 py-2 text-sm font-semibold text-[var(--space-text-primary)] outline-none transition focus:border-[var(--space-brand-primary)] ${revealed ? (right ? 'border-[var(--space-semantic-success)]' : answered ? 'border-[var(--space-semantic-danger)]' : 'border-[var(--space-border-default)]') : 'border-[var(--space-border-default)]'} bg-[var(--space-surface-card)]`}
        />
        {verdict}
      </div>
    );
  }

  if (part.ot) {
    return (
      <div className="space-y-1.5">
        {part.l ? <p className="text-xs font-bold text-[var(--space-text-secondary)]">{part.l}</p> : null}
        <div className="flex flex-col gap-1.5" role={part.m ? 'group' : 'radiogroup'}>
          {keys.map((key, index) => (
            <button
              key={key}
              type="button"
              role={part.m ? 'checkbox' : 'radio'}
              aria-checked={value.includes(key)}
              onClick={() => toggle(key)}
              className={`flex items-start gap-2 rounded-xl border-2 px-3 py-2 text-left transition ${optionClass(value.includes(key), stateOf(key))} ${revealed ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--space-border-strong)] text-[11px] font-bold text-[var(--space-text-secondary)]">{key}</span>
              <span className="min-w-0 flex-1 text-sm font-medium leading-6 text-[var(--space-text-primary)]">{part.ot?.[index]}</span>
            </button>
          ))}
        </div>
        {part.m ? <p className="text-[11px] text-[var(--space-text-muted)]">Choose both answers.</p> : null}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {part.l ? <span className="w-8 text-xs font-bold text-[var(--space-text-secondary)]">{part.l}</span> : null}
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          role="radio"
          aria-checked={value.includes(key)}
          onClick={() => toggle(key)}
          className={`min-w-[2.5rem] rounded-lg border-2 px-3 py-1.5 text-sm font-bold text-[var(--space-text-primary)] transition ${optionClass(value.includes(key), stateOf(key))} ${revealed ? 'cursor-default' : 'cursor-pointer'}`}
        >
          {key}
        </button>
      ))}
      {verdict}
    </div>
  );
}

function Question({
  test,
  item,
  saved,
  setAnswer,
  setChecked,
  clear,
  forceReveal,
}: {
  test: Test;
  item: Item;
  saved: Saved;
  setAnswer: (key: string, value: string[]) => void;
  setChecked: (key: string, value: boolean) => void;
  clear: (itemKey: string, count: number) => void;
  forceReveal: boolean;
}) {
  const itemKey = `${test.id}:${item.n}`;
  const parts = itemParts(test, item);
  const checked = Boolean(saved.checked[itemKey]);
  const revealed = checked || forceReveal;
  const anyAnswer = partsHaveAnswer(test, item, saved);
  const group = item.g && test.groups ? test.groups[item.g] : null;

  return (
    <section id={`bank-${itemKey}`} className="scroll-mt-4 space-y-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-4" data-testid={`question-${itemKey}`}>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-bold text-[var(--space-text-primary)]">{itemLabel(test, item)}</p>
        {item.g ? <span className={`${pill} bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]`}>Set {item.g}</span> : null}
      </div>

      {group ? (
        <div className="rounded-xl bg-[var(--space-surface-muted)] p-3">
          <p className="text-sm leading-6 text-[var(--space-text-primary)]">{group.ctx}</p>
        </div>
      ) : null}

      {item.stem ? (
        <div className="flex flex-wrap gap-2">
          {item.stem.map((pair, i) => (
            <span key={`${pair}-${i}`} className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-1.5 text-base font-bold tabular-nums text-[var(--space-text-primary)]">{pair}</span>
          ))}
        </div>
      ) : null}

      {item.q ? <p className="text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{item.q}</p> : null}

      {item.pg ? (
        <div className="space-y-2">
          {item.pg.map((crop, i) => (
            <LazyCrop key={`${crop.join('-')}-${i}`} crop={crop} />
          ))}
        </div>
      ) : null}

      {item.leg && item.leg.length ? (
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Possible answers</p>
          {item.leg.map((crop, i) => (
            <LazyCrop key={`${crop.join('-')}-${i}`} crop={crop} />
          ))}
        </div>
      ) : null}

      <div className="space-y-2.5 border-t border-[var(--space-border-default)] pt-3">
        {parts.map((part, i) => (
          <PartControl
            key={i}
            part={part}
            options={test.o}
            value={saved.answers[`${itemKey}:${i}`] || []}
            revealed={revealed}
            onChange={(next) => setAnswer(`${itemKey}:${i}`, next)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {!checked ? (
          <button
            type="button"
            onClick={() => setChecked(itemKey, true)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold ${tw.button.primary}`}
            data-testid={`button-check-${itemKey}`}
          >
            <Eye className="h-4 w-4" />
            {anyAnswer ? 'Check answer' : 'Show answer'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => clear(itemKey, parts.length)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold ${tw.button.secondary}`}
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
        )}
      </div>

      {revealed ? (
        <div className="space-y-2 rounded-xl border border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_8%,transparent)] p-3">
          <p className="text-xs font-bold text-[var(--space-text-primary)]">Answer</p>
          {parts.map((part, i) => (
            <p key={i} className="text-sm leading-6 text-[var(--space-text-primary)]">
              {part.l ? <span className="font-semibold">{part.l}: </span> : null}
              {answerText(part)}
            </p>
          ))}
          {item.x ? <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{item.x}</p> : null}
          {group && group.x.length ? (
            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Working for set {item.g}</p>
              {group.x.map((crop, i) => (
                <LazyCrop key={`${crop.join('-')}-${i}`} crop={crop} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function SheetBlock({
  test,
  sheet,
  saved,
  setAnswer,
  setChecked,
  clear,
  forceReveal,
}: {
  test: Test;
  sheet: Sheet;
  saved: Saved;
  setAnswer: (key: string, value: string[]) => void;
  setChecked: (key: string, value: boolean) => void;
  clear: (itemKey: string, count: number) => void;
  forceReveal: boolean;
}) {
  const items = test.items.filter((item) => Number(item.n) >= sheet.from && Number(item.n) <= sheet.to);
  const keys = items.map((item) => `${test.id}:${item.n}`);
  const checked = keys.every((key) => saved.checked[key]);
  const revealed = checked || forceReveal;
  const right = items.filter((item) => partCorrect(itemParts(test, item)[0], saved.answers[`${test.id}:${item.n}:0`])).length;

  return (
    <section className="space-y-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-4" data-testid={`sheet-${test.id}-${sheet.from}`}>
      <p className="text-sm font-bold text-[var(--space-text-primary)]">Questions {sheet.from} to {sheet.to}</p>
      <div className="space-y-2">
        {sheet.pg.map((crop, i) => (
          <LazyCrop key={i} crop={crop} maxWidth={560} />
        ))}
      </div>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {items.map((item) => {
          const part = itemParts(test, item)[0];
          const key = `${test.id}:${item.n}`;
          return (
            <div key={key} id={`bank-${key}`} className="flex items-center gap-2 rounded-lg border border-[var(--space-border-default)] px-2 py-1.5">
              <span className="w-7 text-right text-xs font-bold text-[var(--space-text-secondary)]">{item.n}</span>
              <PartControl part={part} options={test.o} value={saved.answers[`${key}:0`] || []} revealed={revealed} onChange={(next) => setAnswer(`${key}:0`, next)} />
              {revealed ? <span className="ml-auto text-xs font-semibold text-[var(--space-text-muted)]">{part.a[0]}</span> : null}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {!checked ? (
          <button type="button" onClick={() => keys.forEach((key) => setChecked(key, true))} className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold ${tw.button.primary}`}>
            <Eye className="h-4 w-4" />
            Check this page
          </button>
        ) : (
          <>
            <span className="text-sm font-semibold text-[var(--space-text-primary)]">{right} of {items.length} correct</span>
            <button type="button" onClick={() => keys.forEach((key) => clear(key, 1))} className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold ${tw.button.secondary}`}>
              <RotateCcw className="h-4 w-4" />
              Try again
            </button>
          </>
        )}
      </div>
    </section>
  );
}

function BankInner() {
  const [family, setFamily] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [saved, setSaved] = useState<Saved>(() => loadSaved());
  const [showAll, setShowAll] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(saved));
    } catch (error) {
      /* storage unavailable: marks stay in memory */
    }
  }, [saved]);

  const allTests = useMemo(() => FAMILIES.flatMap((f) => f.tests.map((test) => ({ test, family: f }))), []);
  const totalQuestions = useMemo(() => allTests.reduce((sum, entry) => sum + entry.test.count, 0), [allTests]);

  const setAnswer = (key: string, value: string[]) => setSaved((prev) => ({ ...prev, answers: { ...prev.answers, [key]: value } }));
  const setChecked = (key: string, value: boolean) => setSaved((prev) => ({ ...prev, checked: { ...prev.checked, [key]: value } }));
  const clear = (itemKey: string, count: number) =>
    setSaved((prev) => {
      const answers = { ...prev.answers };
      for (let i = 0; i < count; i += 1) delete answers[`${itemKey}:${i}`];
      const checked = { ...prev.checked };
      delete checked[itemKey];
      return { answers, checked };
    });
  const resetTest = (test: Test) =>
    setSaved((prev) => {
      const prefix = `${test.id}:`;
      const answers = Object.fromEntries(Object.entries(prev.answers).filter(([key]) => !key.startsWith(prefix)));
      const checked = Object.fromEntries(Object.entries(prev.checked).filter(([key]) => !key.startsWith(prefix)));
      return { answers, checked };
    });

  const stats = (test: Test) => {
    let graded = 0;
    let right = 0;
    test.items.forEach((item) => {
      if (!saved.checked[`${test.id}:${item.n}`]) return;
      itemParts(test, item).forEach((part, i) => {
        const value = saved.answers[`${test.id}:${item.n}:${i}`];
        if (value && value.some((v) => v.trim())) {
          graded += 1;
          if (partCorrect(part, value)) right += 1;
        }
      });
    });
    return { graded, right };
  };

  const shell = (children: ReactNode) => (
    <div className="min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
      <div className="mx-auto w-full max-w-5xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">{children}</div>
    </div>
  );

  const open = openId ? allTests.find((entry) => entry.test.id === openId) : null;

  if (open) {
    const { test, family: fam } = open;
    const { graded, right } = stats(test);
    const jumpState = (item: Item) => {
      const key = `${test.id}:${item.n}`;
      if (saved.checked[key]) {
        const parts = itemParts(test, item);
        const ok = parts.every((part, i) => partCorrect(part, saved.answers[`${key}:${i}`]));
        const any = partsHaveAnswer(test, item, saved);
        return any ? (ok ? 'right' : 'wrong') : 'shown';
      }
      return partsHaveAnswer(test, item, saved) ? 'picked' : 'idle';
    };
    const jumpTo = (item: Item) => {
      const node = document.getElementById(`bank-${test.id}:${item.n}`);
      if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const jumpClass = (state: string) =>
      state === 'right'
        ? 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_14%,transparent)]'
        : state === 'wrong'
          ? 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_12%,transparent)]'
          : state === 'picked'
            ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
            : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]';

    return shell(
      <>
        <button
          type="button"
          onClick={() => {
            setOpenId(null);
            setShowAll(false);
            setGuideOpen(false);
          }}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          All tests
        </button>

        <header className="space-y-2 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">{fam.part}</p>
          <h1 className="text-lg font-bold text-[var(--space-text-primary)] sm:text-xl">Test {test.no} · {test.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`${pill} bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]`}>{fam.name}</span>
            <span className={`${pill} border border-[var(--space-border-default)] text-[var(--space-text-secondary)]`}>{test.count} questions</span>
            <span className={`${pill} border border-[var(--space-border-default)] text-[var(--space-text-secondary)]`}>Book timing: {test.minutes} min</span>
            {graded > 0 ? <span className={`${pill} bg-[var(--space-semantic-success-100)] text-[var(--space-neutral-800)]`}>{right} of {graded} correct so far</span> : null}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => setGuideOpen((value) => !value)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${tw.button.secondary}`} aria-expanded={guideOpen}>
              {guideOpen ? 'Hide instructions' : 'Instructions and examples'}
            </button>
            <button type="button" onClick={() => setShowAll((value) => !value)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${tw.button.secondary}`}>
              {showAll ? 'Hide all answers' : 'Show all answers'}
            </button>
            <button type="button" onClick={() => resetTest(test)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${tw.button.ghost}`}>
              Clear my answers
            </button>
          </div>
        </header>

        {guideOpen ? (
          <div className="space-y-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-4">
            <p className="text-sm leading-6 text-[var(--space-text-secondary)]">{test.task}</p>
            {test.guide.map((crop, i) => (
              <LazyCrop key={i} crop={crop} maxWidth={720} />
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-1.5" aria-label="Jump to a question">
          {test.items.map((item) => (
            <button
              key={String(item.n)}
              type="button"
              onClick={() => jumpTo(item)}
              className={`flex h-8 min-w-[2rem] items-center justify-center rounded-lg border px-1 text-xs font-bold text-[var(--space-text-secondary)] ${jumpClass(jumpState(item))}`}
              aria-label={`Jump to ${itemLabel(test, item)}`}
            >
              {item.n}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {test.sheets
            ? test.sheets.map((sheet) => (
                <SheetBlock key={sheet.from} test={test} sheet={sheet} saved={saved} setAnswer={setAnswer} setChecked={setChecked} clear={clear} forceReveal={showAll} />
              ))
            : test.items.map((item) => (
                <Question key={String(item.n)} test={test} item={item} saved={saved} setAnswer={setAnswer} setChecked={setChecked} clear={clear} forceReveal={showAll} />
              ))}
        </div>
      </>,
    );
  }

  const visible = allTests.filter((entry) => family === 'all' || entry.family.id === family);

  const tile = (id: string, label: string, count: number, Icon: ComponentType<{ className?: string }>) => {
    const selected = family === id;
    return (
      <button
        key={id}
        type="button"
        role="tab"
        aria-selected={selected}
        onClick={() => setFamily(id)}
        className={`flex min-h-20 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-colors ${selected ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-600)]'}`}
        data-testid={`bank-tile-${id}`}
      >
        <Icon className="h-5 w-5" />
        <span className="text-xs font-bold leading-4">{label}</span>
        <span className={`text-[10px] font-semibold ${selected ? 'opacity-80' : 'text-[var(--space-text-muted)]'}`}>{count} questions</span>
      </button>
    );
  };

  return shell(
    <>
      <header className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] sm:h-10 sm:w-10">
          <Brain className="h-4 w-4 text-[var(--space-text-brand)] sm:h-5 sm:w-5" />
        </div>
        <h1 className="text-lg font-bold text-[var(--space-text-primary)] sm:text-xl">Bank of Aptitude Question</h1>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6" role="tablist" aria-label="Test types">
        {tile('all', 'All types', totalQuestions, Brain)}
        {FAMILIES.map((f) => tile(f.id, f.name, f.tests.reduce((sum, test) => sum + test.count, 0), f.icon))}
      </div>

      <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ test, family: fam }) => {
          const { graded, right } = stats(test);
          const Icon = fam.icon;
          return (
            <li key={test.id}>
              <button
                type="button"
                onClick={() => {
                  setOpenId(test.id);
                  setShowAll(false);
                  setGuideOpen(false);
                  if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
                }}
                className="group flex h-full w-full items-start gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3.5 text-left transition-all hover:border-[var(--space-brand-primary-600)] hover:shadow-md"
                data-testid={`bank-test-${test.id}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold leading-5 text-[var(--space-text-primary)]">Test {test.no} · {test.name}</span>
                  <span className="mt-1.5 flex flex-wrap gap-1.5">
                    {family === 'all' ? <span className={`${pill} bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]`}>{fam.name}</span> : null}
                    <span className={`${pill} border border-[var(--space-border-default)] text-[var(--space-text-secondary)]`}>
                      <Target className="mr-1 h-3 w-3" />
                      {test.count} questions
                    </span>
                    <span className={`${pill} border border-[var(--space-border-default)] text-[var(--space-text-secondary)]`}>
                      <Clock className="mr-1 h-3 w-3" />
                      {test.minutes} min
                    </span>
                    {graded > 0 ? <span className={`${pill} bg-[var(--space-semantic-success-100)] text-[var(--space-neutral-800)]`}>{right}/{graded} correct</span> : null}
                  </span>
                </span>
                <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-[var(--space-text-muted)] transition-transform group-hover:translate-x-0.5" />
              </button>
            </li>
          );
        })}
      </ul>
    </>,
  );
}

export default function AptitudeBank() {
  return (
    <PaywallGate appId="aptitude-test" appName="Bank of Aptitude Question">
      <BankInner />
    </PaywallGate>
  );
}
