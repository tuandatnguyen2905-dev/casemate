// Domain Knowledge > Basic Economics. Opened from the Domain Knowledge home and from deep links
// (Case Pool "Suggested Framework", My Roadmap): opens one pillar, expands the requested card and
// scrolls it into view. Card text comes straight from basicEconomicsCards.ts; the Consulting Tools
// pillar renders the framework library from lib/consultingFrameworks.ts. Nothing is rewritten here.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { BASIC_ECONOMICS_CARD_SEEDS, BASIC_ECONOMICS_INDUSTRY } from './basicEconomicsCards';
import type { BasicEconomicsCardSeed } from './basicEconomicsCards';
import { BASIC_ECONOMICS_CONSULTING_TOOLS_PILLAR, BASIC_ECONOMICS_TOOLKITS_PILLAR } from '../../lib/domainKnowledgeRoute';
import ConsultingToolkit from '../../components/ConsultingToolkit';
import { CONSULTING_FRAMEWORKS } from '../../lib/consultingFrameworks';

export interface BasicEconomicsRoute {
  pillar?: string | null;
  cardTitle?: string;
  cardId?: string;
  /** Changes on every request so a repeated link to the same card re-scrolls and re-expands it. */
  nonce: number;
}

interface PillarMeta {
  id: string;
  label: string;
  blurb: string;
}

const PILLARS: PillarMeta[] = [
  { id: BASIC_ECONOMICS_TOOLKITS_PILLAR, label: 'Toolkit Cards', blurb: 'Short plain-English cards for 43 strategy, operations, and finance tools, plus four worked toolkits. For diagrams, step-by-step use and examples, open Consulting Tools.' },
  { id: BASIC_ECONOMICS_CONSULTING_TOOLS_PILLAR, label: 'Consulting Tools', blurb: `The full ${CONSULTING_FRAMEWORKS.length}-framework consulting library, each with when to use it, a diagram, how to apply it, a Vietnamese business example, and common mistakes.` },
  { id: 'economics-micro', label: 'Microeconomics', blurb: 'How buyers, firms, and markets make choices when resources are limited.' },
  { id: 'economics-macro', label: 'Macroeconomics', blurb: 'GDP, inflation, employment, policy, trade, and the economy-wide business cycle.' },
];

interface EconomicsEntry {
  id: string;
  title: string;
  front: string;
  back: string[];
  diagram?: string[];
}

const WORKED_PREFIX = 'Worked toolkit: ';
const WORKED_ANGLE_ORDER = ['product', 'operations', 'financial impact', 'market decision', 'career application', 'surprising insight'];

const normalise = (value: string): string => String(value || '')
  .toLowerCase()
  .replace(/[\u2019']/g, "'")
  .replace(/[^a-z0-9']+/g, ' ')
  .trim();

const slugOf = (value: string): string => normalise(value).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const entryId = (pillar: string, title: string): string => `basic-economics-${pillar}-${slugOf(title)}`;

function plainEntries(pillar: string): EconomicsEntry[] {
  return BASIC_ECONOMICS_CARD_SEEDS
    .filter((seed) => seed.topic === pillar)
    .map((seed) => ({
      id: entryId(pillar, seed.title),
      title: seed.title,
      front: seed.front,
      back: seed.back,
      ...(seed.diagram ? { diagram: seed.diagram } : {}),
    }));
}

// Each worked toolkit is authored once and published as six angle cards titled
// "Worked toolkit: <name>: <angle>" that reuse the same four statements. They are shown as one
// card under the toolkit's own title, listing every distinct statement once, in authored order.
function workedToolkitEntries(): EconomicsEntry[] {
  const byBase = new Map<string, BasicEconomicsCardSeed[]>();
  BASIC_ECONOMICS_CARD_SEEDS.forEach((seed) => {
    if (!seed.title.startsWith(WORKED_PREFIX)) return;
    const split = seed.title.lastIndexOf(': ');
    if (split < WORKED_PREFIX.length) return;
    const base = seed.title.slice(0, split);
    byBase.set(base, [...(byBase.get(base) || []), seed]);
  });
  return [...byBase.entries()].map(([base, angles]) => {
    const ordered = angles.slice().sort((a, b) => {
      const rank = (seed: BasicEconomicsCardSeed) => {
        const index = WORKED_ANGLE_ORDER.indexOf(seed.title.slice(base.length + 2));
        return index === -1 ? WORKED_ANGLE_ORDER.length : index;
      };
      return rank(a) - rank(b);
    });
    const statements: string[] = [];
    ordered.forEach((seed) => [seed.front, ...seed.back].forEach((line) => {
      if (line && !statements.includes(line)) statements.push(line);
    }));
    return { id: entryId(BASIC_ECONOMICS_TOOLKITS_PILLAR, base), title: base, front: statements[0] || '', back: statements.slice(1) };
  });
}

function entriesFor(pillar: string): EconomicsEntry[] {
  const own = plainEntries(pillar);
  if (pillar !== BASIC_ECONOMICS_TOOLKITS_PILLAR) return own;
  const known = new Set(own.map((entry) => normalise(entry.title)));
  return own.concat(workedToolkitEntries().filter((entry) => !known.has(normalise(entry.title))));
}

function findEntry(entries: EconomicsEntry[], route: Pick<BasicEconomicsRoute, 'cardId' | 'cardTitle'>): EconomicsEntry | null {
  if (route.cardId) {
    const byId = entries.find((entry) => entry.id === route.cardId);
    if (byId) return byId;
  }
  const wanted = normalise(route.cardTitle || '');
  if (!wanted) return null;
  return entries.find((entry) => normalise(entry.title) === wanted)
    || entries.find((entry) => normalise(entry.title).startsWith(`${wanted} `))
    || null;
}

export default function BasicEconomicsToolkits({ route, onBack }: { route: BasicEconomicsRoute; onBack: () => void }) {
  const entriesByPillar = useMemo(
    () => Object.fromEntries(PILLARS.map((pillar) => [pillar.id, entriesFor(pillar.id)])) as Record<string, EconomicsEntry[]>,
    [],
  );
  const [pillarId, setPillarId] = useState<string>(route.pillar && entriesByPillar[route.pillar] ? route.pillar : BASIC_ECONOMICS_TOOLKITS_PILLAR);
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  const [focusId, setFocusId] = useState<string | null>(null);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());

  useEffect(() => {
    if (route.pillar === BASIC_ECONOMICS_CONSULTING_TOOLS_PILLAR) {
      setPillarId(BASIC_ECONOMICS_CONSULTING_TOOLS_PILLAR);
      setOpenIds(new Set());
      setFocusId(null);
      return;
    }
    const preferred = route.pillar && entriesByPillar[route.pillar] ? route.pillar : BASIC_ECONOMICS_TOOLKITS_PILLAR;
    const searchOrder = [preferred, ...PILLARS.map((pillar) => pillar.id).filter((id) => id !== preferred)];
    for (const id of searchOrder) {
      const match = findEntry(entriesByPillar[id], route);
      if (match) {
        setPillarId(id);
        setOpenIds(new Set([match.id]));
        setFocusId(match.id);
        return;
      }
    }
    setPillarId(preferred);
    setOpenIds(new Set());
    setFocusId(null);
  }, [route.nonce, route.pillar, route.cardTitle, route.cardId, entriesByPillar]);

  useEffect(() => {
    if (!focusId) return undefined;
    const frame = window.requestAnimationFrame(() => {
      itemRefs.current.get(focusId)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
    const timer = window.setTimeout(() => setFocusId(null), 2600);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [focusId, pillarId]);

  const toggle = useCallback((id: string) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const pillar = PILLARS.find((item) => item.id === pillarId) || PILLARS[0];
  const entries = entriesByPillar[pillar.id] || [];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-7 sm:py-7 lg:px-10" data-testid="basic-economics-view">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 font-medium text-red-600 transition hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500" data-testid="basic-economics-back">
          <ArrowLeft className="h-3.5 w-3.5" />Domain Knowledge
        </button>
        <span className="text-slate-300" aria-hidden>/</span>
        <span className="font-medium text-slate-700">{BASIC_ECONOMICS_INDUSTRY.label}</span>
        <span className="text-slate-300" aria-hidden>/</span>
        <span className="font-medium text-slate-700">{pillar.label}</span>
      </nav>

      <header className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-red-500">{BASIC_ECONOMICS_INDUSTRY.badge}</p>
        <h1 className="mt-1 text-xl font-bold text-slate-900">{BASIC_ECONOMICS_INDUSTRY.label}</h1>
        <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500">{BASIC_ECONOMICS_INDUSTRY.tagline}</p>
      </header>

      <div className="mt-5 flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 sm:w-fit" role="tablist" aria-label="Basic Economics topics">
        {PILLARS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={pillar.id === item.id}
            onClick={() => setPillarId(item.id)}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${pillar.id === item.id ? 'bg-red-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            data-testid={`basic-economics-tab-${item.id}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500">{pillar.blurb}</p>

      {pillar.id === BASIC_ECONOMICS_CONSULTING_TOOLS_PILLAR ? (
        <section className="mt-5" aria-label="Consulting Tools" data-testid="basic-economics-consulting-tools">
          <ConsultingToolkit
            key={route.nonce}
            initialFrameworkId={route.pillar === BASIC_ECONOMICS_CONSULTING_TOOLS_PILLAR ? route.cardId : undefined}
          />
        </section>
      ) : (
      <ul className="mt-5 space-y-2.5" data-testid={`basic-economics-cards-${pillar.id}`}>
        {entries.map((entry) => {
          const open = openIds.has(entry.id);
          const focused = focusId === entry.id;
          return (
            <li
              key={entry.id}
              ref={(node) => {
                if (node) itemRefs.current.set(entry.id, node);
                else itemRefs.current.delete(entry.id);
              }}
              className={`scroll-mt-4 rounded-2xl border bg-white shadow-sm transition-shadow ${focused ? 'border-red-300 ring-2 ring-red-200' : 'border-slate-200'}`}
              data-testid={`basic-economics-card-${slugOf(entry.title)}`}
              data-card-title={entry.title}
              data-focused={focused ? 'true' : undefined}
            >
              <button
                type="button"
                onClick={() => toggle(entry.id)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <span className="text-sm font-bold text-slate-900">{entry.title}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open ? (
                <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                  <p className="text-sm font-semibold leading-6 text-slate-800">{entry.front}</p>
                  {entry.diagram?.length ? (
                    <ol className="mt-3 flex flex-wrap items-center gap-1.5" aria-label="Steps">
                      {entry.diagram.map((step, index) => (
                        <li key={`${step}-${index}`} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                          <span className="mr-1 font-bold text-red-600">{index + 1}</span>{step}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  <ul className="mt-3 space-y-2">
                    {entry.back.map((line, index) => (
                      <li key={index} className="text-sm leading-6 text-slate-600">{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      )}
    </main>
  );
}
