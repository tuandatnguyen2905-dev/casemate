import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Award, BadgeCheck, Banknote, Beer, BookOpen, Briefcase, Building2, Check, CheckCircle2,
  ChevronRight, Cookie, CookingPot, Cpu, CupSoda, Factory, Flame, FlaskConical, Globe2, HeartPulse, Landmark, Layers3,
  Loader2, Lock, Milk, RotateCcw, ShieldCheck, ShoppingCart, Sparkles, Store, Target, Timer, Trophy, Truck, Users, X, Zap,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import PaywallGate from '../../components/PaywallGate';
import { resolveRoadmapIdentity } from '../../lib/prepRoadmap';
import {
  ALL_LEARNING_CARDS,
  INDUSTRY_DECKS,
  deckFor,
  topicSectionsFor,
} from './learningDecks';
import type { LearningCard, LearningCardType } from './learningDecks';
import { topicGroupMeta } from './topicGroups';
import {
  KNOWLEDGE_PILLARS,
  buildSubcategoryStudyMap,
  cardsForSubcategoryPillar,
  subcategoriesForIndustry,
  subcategoryById,
} from './industrySubcategories';
import type { PillarId } from './industrySubcategories';
import { FMCG_SUBINDUSTRY_SLUGS } from './fmcgSubindustryDecks';
import StudyModes from './StudyModes';
import type { StudyMode } from './StudyModes';

const ICONS: Record<string, typeof BookOpen> = {
  ShoppingCart, Landmark, Cpu, Store, Building2, Briefcase, Truck, ShieldCheck, HeartPulse,
  Milk, Beer, CupSoda, Cookie, CookingPot, Sparkles, Layers3,
  Globe2, Factory, FlaskConical, Banknote, Target, Users, Zap,
};

const TYPE_META: Record<LearningCardType, { label: string; icon: typeof BookOpen; emoji: string; badgeClass: string; surface: string }> = {
  fact: { label: 'Fact', icon: Zap, emoji: '📊', badgeClass: 'bg-[color-mix(in_srgb,var(--space-brand-primary-500)_10%,transparent)] text-[var(--space-text-brand)]', surface: 'color-mix(in srgb, var(--space-brand-primary-500) 3%, var(--space-surface-card))' },
  concept: { label: 'Concept', icon: Layers3, emoji: '💡', badgeClass: 'bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_12%,transparent)] text-[var(--space-semantic-warning-700)]', surface: 'color-mix(in srgb, var(--space-semantic-warning-500) 4%, var(--space-surface-card))' },
  quiz: { label: 'Quick check', icon: Target, emoji: '🎯', badgeClass: 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]', surface: 'color-mix(in srgb, var(--space-brand-primary-500) 2%, var(--space-surface-card))' },
  case: { label: 'Applied scenario', icon: Briefcase, emoji: '', badgeClass: 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]', surface: 'color-mix(in srgb, var(--space-semantic-success-500) 3%, var(--space-surface-card))' },
  role: { label: 'Tip', icon: Award, emoji: '🧭', badgeClass: 'bg-[var(--space-neutral-100)] text-[var(--space-neutral-700)]', surface: 'color-mix(in srgb, var(--space-neutral-500) 3%, var(--space-surface-card))' },
};

const FMCG_SUBINDUSTRY_SET = new Set<string>(FMCG_SUBINDUSTRY_SLUGS);
const TOP_LEVEL_DECKS = INDUSTRY_DECKS.filter(({ industry }) => !FMCG_SUBINDUSTRY_SET.has(industry.slug));

function isFmcgSubindustry(slug: string): boolean {
  return FMCG_SUBINDUSTRY_SET.has(slug);
}

function isFmcgDeck(slug: string): boolean {
  return slug === 'fmcg' || isFmcgSubindustry(slug);
}

function validCompletedCount(slug: string, completed: string[]): number {
  const deck = deckFor(slug);
  if (!deck) return 0;
  const cardIds = new Set(deck.cards.map((card) => card.id));
  return new Set(completed.filter((id) => cardIds.has(id))).size;
}

interface ProgressSnapshot {
  completed: string[];
  quizScore: number | null;
  badgeEarned: boolean;
}

type ProgressMap = Record<string, ProgressSnapshot>;
type AppView =
  | { kind: 'home' }
  | { kind: 'fmcg' }
  | { kind: 'topics'; slug: string; topic?: string }
  | { kind: 'subcategory'; slug: string; subcategoryId: string; pillar?: PillarId }
  | { kind: 'deck'; slug: string; index: number; subcategoryId?: string; pillar?: PillarId }
  | { kind: 'study'; slug: string; mode: StudyMode }
  | { kind: 'quick'; slug: string };

type NavigationMode = 'push' | 'replace';

function domainRoute(view: AppView): string {
  const root = '#industry-knowledge';
  if (view.kind === 'home') return root;
  if (view.kind === 'fmcg') return `${root}/fmcg`;
  if (view.kind === 'topics') return view.topic
    ? `${root}/industry/${encodeURIComponent(view.slug)}/topic/${encodeURIComponent(view.topic)}`
    : `${root}/industry/${encodeURIComponent(view.slug)}`;
  if (view.kind === 'subcategory') return view.pillar
    ? `${root}/industry/${encodeURIComponent(view.slug)}/${encodeURIComponent(view.subcategoryId)}/pillar/${encodeURIComponent(view.pillar)}`
    : `${root}/industry/${encodeURIComponent(view.slug)}/${encodeURIComponent(view.subcategoryId)}`;
  if (view.kind === 'deck') {
    const suffix = view.subcategoryId
      ? `/${encodeURIComponent(view.subcategoryId)}/${encodeURIComponent(view.pillar || '')}`
      : '';
    return `${root}/card/${encodeURIComponent(view.slug)}/${view.index}${suffix}`;
  }
  if (view.kind === 'study') return `${root}/study/${encodeURIComponent(view.slug)}/${encodeURIComponent(view.mode)}`;
  return `${root}/quiz/${encodeURIComponent(view.slug)}`;
}

function viewFromDomainRoute(): AppView {
  const parts = window.location.hash.replace(/^#/, '').split('/').map((part) => decodeURIComponent(part));
  if (parts[0] !== 'industry-knowledge') return { kind: 'home' };
  if (parts[1] === 'fmcg') return { kind: 'fmcg' };
  if (parts[1] === 'industry' && parts[2]) {
    if (parts[3] === 'topic' && parts[4]) return { kind: 'topics', slug: parts[2], topic: parts[4] };
    if (parts[3]) {
      const pillar = parts[4] === 'pillar' && parts[5] ? parts[5] as PillarId : undefined;
      return { kind: 'subcategory', slug: parts[2], subcategoryId: parts[3], pillar };
    }
    return { kind: 'topics', slug: parts[2] };
  }
  if (parts[1] === 'card' && parts[2]) return {
    kind: 'deck',
    slug: parts[2],
    index: Math.max(0, Number(parts[3]) || 0),
    subcategoryId: parts[4] || undefined,
    pillar: (parts[5] || undefined) as PillarId | undefined,
  };
  if (parts[1] === 'study' && parts[2] && parts[3]) return { kind: 'study', slug: parts[2], mode: parts[3] as StudyMode };
  if (parts[1] === 'quiz' && parts[2]) return { kind: 'quick', slug: parts[2] };
  return { kind: 'home' };
}

interface ProgressCache {
  progress: ProgressMap;
  streak: number;
}

function progressCacheKey(userId: string): string {
  return `casemate-domain-progress-v1:${userId}`;
}

function readProgressCache(userId: string): ProgressCache | null {
  try {
    const cached = JSON.parse(localStorage.getItem(progressCacheKey(userId)) || 'null');
    if (!cached || typeof cached !== 'object' || typeof cached.progress !== 'object') return null;
    return { progress: cached.progress, streak: Math.max(1, Number(cached.streak) || 1) };
  } catch {
    return null;
  }
}

function writeProgressCache(userId: string, progress: ProgressMap, streak: number) {
  try {
    localStorage.setItem(progressCacheKey(userId), JSON.stringify({ progress, streak }));
    window.dispatchEvent(new CustomEvent('casemate:domain-progress-updated', { detail: { userId } }));
  } catch {
    // The bundled curriculum still renders immediately when storage is unavailable.
  }
}

function workspaceDb(): any {
  const db = (window as any).__workspaceDb;
  if (!db?.from) throw new Error('Workspace data is still loading.');
  return db;
}

function rowsOf(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

function jsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function utcDay(offset = 0): string {
  const date = new Date(Date.now() + offset * 86400000);
  return date.toISOString().slice(0, 10);
}

function consecutiveStreak(dates: string[]): number {
  const set = new Set(dates.filter(Boolean));
  let cursor = set.has(utcDay()) ? 0 : set.has(utcDay(-1)) ? -1 : 0;
  if (!set.has(utcDay(cursor))) return 1;
  let count = 0;
  while (set.has(utcDay(cursor))) {
    count += 1;
    cursor -= 1;
  }
  return Math.max(1, count);
}

function dailyCard(): LearningCard {
  const day = utcDay();
  let hash = 0;
  for (let i = 0; i < day.length; i += 1) hash = (hash * 31 + day.charCodeAt(i)) >>> 0;
  return ALL_LEARNING_CARDS[hash % ALL_LEARNING_CARDS.length];
}

function ProgressRing({ value }: { value: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(100, value)) / 100);
  return (
    <div className="relative h-12 w-12 shrink-0" aria-label={`${value}% complete`}>
      <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="var(--space-border-default)" strokeWidth="4" />
        <circle cx="22" cy="22" r={radius} fill="none" stroke="var(--space-brand-primary-600)" strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-500" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-[var(--space-text-primary)]">{value}%</span>
    </div>
  );
}

function IndustryTile({ slug, progress, onOpen }: { slug: string; progress: ProgressSnapshot; onOpen: () => void }) {
  const deck = deckFor(slug)!;
  const Icon = ICONS[deck.industry.icon] || BookOpen;
  const count = validCompletedCount(slug, progress.completed);
  const pct = deck.cards.length > 0 ? Math.round((count / deck.cards.length) * 100) : 0;
  return (
    <button type="button" onClick={onOpen} className="group flex min-h-44 flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-200)] hover:shadow-md" data-testid={`industry-tile-${slug}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]"><Icon className="h-5 w-5 text-[var(--space-text-brand)]" /></span>
        <ProgressRing value={pct} />
      </div>
      <h2 className="mt-3 text-sm font-extrabold text-[var(--space-text-primary)]">{deck.industry.label}</h2>
      <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-[var(--space-text-muted)]">{deck.industry.tagline}</p>
      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <span className="text-[10px] font-bold text-[var(--space-text-secondary)]">{count}/{deck.cards.length} cards</span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${progress.badgeEarned ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>
          {progress.badgeEarned ? <BadgeCheck className="h-3 w-3" /> : <Lock className="h-3 w-3" />}{deck.industry.badge}
        </span>
      </div>
    </button>
  );
}

function FmcgParentTile({ progress, onOpen }: { progress: ProgressMap; onOpen: () => void }) {
  const deck = deckFor('fmcg')!;
  const totalCards = FMCG_SUBINDUSTRY_SLUGS.reduce((sum, slug) => sum + (deckFor(slug)?.cards.length || 0), 0);
  const learned = FMCG_SUBINDUSTRY_SLUGS.reduce((sum, slug) => sum + validCompletedCount(slug, progress[slug]?.completed || []), 0);
  const pct = totalCards > 0 ? Math.round((learned / totalCards) * 100) : 0;
  const badgeEarned = FMCG_SUBINDUSTRY_SLUGS.every((slug) => progress[slug]?.badgeEarned === true);
  return (
    <button type="button" onClick={onOpen} className="group flex min-h-44 flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-200)] hover:shadow-md" data-testid="industry-tile-fmcg">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]"><ShoppingCart className="h-5 w-5 text-[var(--space-text-brand)]" /></span>
        <ProgressRing value={pct} />
      </div>
      <h2 className="mt-3 text-sm font-extrabold text-[var(--space-text-primary)]">{deck.industry.label}</h2>
      <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-[var(--space-text-muted)]">{deck.industry.tagline}</p>
      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <span className="text-[10px] font-bold text-[var(--space-text-secondary)]">{learned}/{totalCards} cards</span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${badgeEarned ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>
          {badgeEarned ? <BadgeCheck className="h-3 w-3" /> : <Lock className="h-3 w-3" />}{deck.industry.badge}
        </span>
      </div>
    </button>
  );
}

function HomeView({ progress, streak, loading, onOpen, onOpenTopics, onOpenFmcg }: { progress: ProgressMap; streak: number; loading: boolean; onOpen: (slug: string, index?: number) => void; onOpenTopics: (slug: string) => void; onOpenFmcg: () => void }) {
  const featured = dailyCard();
  const featuredDeck = deckFor(featured.industrySlug)!;
  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]"><BookOpen className="h-5 w-5 text-[var(--space-text-brand)]" /></span>
            <div>
              <h1 className="text-lg font-black text-[var(--space-text-primary)] sm:text-2xl">Domain Knowledge</h1>
              <p className="text-xs font-semibold text-[var(--space-text-brand)]">Learn the business. Speak like an insider.</p>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">Basic Economics and eight Vietnam-relevant industries, each organized into specialist sub-categories and the same six business pillars. Explore {ALL_LEARNING_CARDS.length} practical cards, then retain more with Flashcards, adaptive Learn, Test, Match, Memory Score and scheduled reviews.</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3 shadow-sm" data-testid="streak-counter">
          <Flame className="h-5 w-5 text-[var(--space-semantic-warning-600)]" />
          <div><p className="text-base font-black text-[var(--space-text-primary)]">{streak} day{streak === 1 ? '' : 's'}</p><p className="text-[10px] text-[var(--space-text-muted)]">learning streak</p></div>
        </div>
      </header>

      <button type="button" onClick={() => onOpen(featured.industrySlug, featured.order - 1)} className="mt-5 flex w-full flex-col gap-3 overflow-hidden rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-4 text-left sm:mt-6 sm:flex-row sm:items-center sm:gap-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center" data-testid="daily-card">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)] sm:h-14 sm:w-14 sm:rounded-2xl"><Sparkles className="h-5 w-5 sm:h-7 sm:w-7" /></div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Random Daily Card · {featuredDeck.industry.shortLabel}</p>
          <p className="mt-1 text-base font-black text-[var(--space-text-primary)]">{featured.title}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--space-text-secondary)]">{featured.front}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--space-text-brand)]">Open card <ChevronRight className="h-4 w-4" /></span>
      </button>

      <div className="mt-5 flex items-end justify-between gap-3 sm:mt-7">
        <div><h2 className="text-base font-black text-[var(--space-text-primary)]">Choose a learning path</h2><p className="mt-1 text-xs text-[var(--space-text-muted)]">Start with Basic Economics or choose an industry. Every industry now opens into its own specialist sub-categories, and every sub-category is structured around operations, product, finance, commercial work, careers and surprising insights.</p></div>
        {loading && <Loader2 className="h-4 w-4 animate-spin text-[var(--space-text-brand)]" />}
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOP_LEVEL_DECKS.map(({ industry }) => industry.slug === 'fmcg'
          ? <FmcgParentTile key={industry.slug} progress={progress} onOpen={onOpenFmcg} />
          : <IndustryTile key={industry.slug} slug={industry.slug} progress={progress[industry.slug] || { completed: [], quizScore: null, badgeEarned: false }} onOpen={() => onOpenTopics(industry.slug)} />)}
      </div>
    </div>
  );
}

function FmcgHub({ progress, onOpen, onBack }: { progress: ProgressMap; onOpen: (slug: string) => void; onBack: () => void }) {
  const totalCards = FMCG_SUBINDUSTRY_SLUGS.reduce((sum, slug) => sum + (deckFor(slug)?.cards.length || 0), 0);
  return <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-7">
    <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold text-[var(--space-text-secondary)]"><ArrowLeft className="h-4 w-4" />All industries</button>
    <header className="mt-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-4 shadow-sm sm:p-8">
      <div className="max-w-2xl"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]"><ShoppingCart className="h-5 w-5 text-[var(--space-text-brand)]" /></span><p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--space-text-brand)]">FMCG specialist library</p><h1 className="mt-2 text-lg font-black text-[var(--space-text-primary)] sm:text-3xl">Six categories. Six different businesses.</h1><p className="mt-3 text-sm leading-6 text-[var(--space-text-secondary)]">Choose a nested sub-industry to learn its glossary first, then its Vietnam market, route to market, economics and MT career paths.</p></div>
    </header>
    <div className="mt-6 flex items-end justify-between"><div><h2 className="text-base font-black text-[var(--space-text-primary)]">Choose an FMCG sub-industry</h2><p className="mt-1 text-xs text-[var(--space-text-muted)]">Every category has its own operating physics and badge.</p></div><span className="hidden rounded-full bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[10px] font-bold text-[var(--space-text-brand)] sm:inline">{totalCards} specialist cards</span></div>
    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{FMCG_SUBINDUSTRY_SLUGS.map((slug) => <IndustryTile key={slug} slug={slug} progress={progress[slug] || { completed: [], quizScore: null, badgeEarned: false }} onOpen={() => onOpen(slug)} />)}</div>
    <button type="button" onClick={() => onOpen('fmcg')} className="mt-5 flex w-full items-center justify-between rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-5 py-4 text-left hover:border-[var(--space-brand-primary-200)]"><span><span className="text-xs font-black text-[var(--space-text-primary)]">Review FMCG Core Foundations</span><span className="mt-1 block text-[10px] text-[var(--space-text-muted)]">Cross-category fundamentals for building a strong FMCG foundation.</span></span><ChevronRight className="h-4 w-4 text-[var(--space-text-brand)]" /></button>
  </div>;
}

function IndustryCategoryView({ slug, progress, onOpenFoundation, onOpenSubcategory, onBack }: { slug: string; progress: ProgressSnapshot; onOpenFoundation: (index: number) => void; onOpenSubcategory: (subcategoryId: string) => void; onBack: () => void }) {
  const deck = deckFor(slug)!;
  const categories = subcategoriesForIndustry(slug);
  const studyMap = useMemo(() => buildSubcategoryStudyMap(slug, deck.cards), [slug, deck]);
  const glossaryCards = deck.cards.filter((card) => card.topic === 'glossary');
  const learnedSet = new Set(progress.completed);
  const Icon = ICONS[deck.industry.icon] || BookOpen;
  const learned = validCompletedCount(slug, progress.completed);
  const pct = deck.cards.length ? Math.round((learned / deck.cards.length) * 100) : 0;

  return <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-6 sm:py-8">
    <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold text-[var(--space-text-secondary)]"><ArrowLeft className="h-4 w-4" />All industries</button>
    <header className="mt-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-4 shadow-sm sm:p-8">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]"><Icon className="h-5 w-5 text-[var(--space-text-brand)]" /></span>
      <h1 className="mt-3 text-lg font-black text-[var(--space-text-primary)] sm:text-3xl">{deck.industry.label}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">{deck.industry.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold text-[var(--space-text-secondary)]"><span className="rounded-full bg-[var(--space-surface-muted)] px-3 py-1.5">{categories.length} specialist sub-categories</span><span className="rounded-full bg-[var(--space-surface-muted)] px-3 py-1.5">{learned}/{deck.cards.length} learned · {pct}%</span></div>
    </header>

    {glossaryCards.length > 0 && <button type="button" onClick={() => onOpenFoundation(deck.cards.indexOf(glossaryCards[0]))} className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4 text-left"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-card)]"><BookOpen className="h-5 w-5 text-[var(--space-text-brand)]" /></span><span className="min-w-0 flex-1"><span className="block text-xs font-black uppercase tracking-wider text-[var(--space-text-brand)]">Start with the foundation</span><span className="mt-1 block text-sm font-black text-[var(--space-text-primary)]">Term Sheet / Key Terms</span><span className="mt-1 block text-[11px] text-[var(--space-text-muted)]">{glossaryCards.length} essential definitions before the specialist tracks.</span></span><ChevronRight className="h-4 w-4 text-[var(--space-text-brand)]" /></button>}

    <section className="mt-6"><h2 className="text-base font-black text-[var(--space-text-primary)]">Choose a {deck.industry.shortLabel} sub-category</h2><p className="mt-1 text-xs text-[var(--space-text-muted)]">Each track contains the same six-pillar structure and at least 24 focused study cards.</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category) => {
        const entries = studyMap[category.id] || [];
        const uniqueIds = new Set(entries.map(({ card }) => card.id));
        const done = [...uniqueIds].filter((id) => learnedSet.has(id)).length;
        const sectionPct = uniqueIds.size ? Math.round(done / uniqueIds.size * 100) : 0;
        const CategoryIcon = ICONS[category.icon] || BookOpen;
        return <button key={category.id} type="button" onClick={() => onOpenSubcategory(category.id)} className="group flex min-h-44 flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-200)] hover:shadow-md" data-testid={`subcategory-${category.id}`}>
          <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]"><CategoryIcon className="h-5 w-5 text-[var(--space-text-brand)]" /></span><ProgressRing value={sectionPct} /></div>
          <h3 className="mt-3 text-sm font-black text-[var(--space-text-primary)]">{category.name}</h3><p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[var(--space-text-muted)]">{category.description}</p>
          <span className="mt-auto flex items-center justify-between pt-3 text-[10px] font-bold text-[var(--space-text-secondary)]"><span>{done}/{uniqueIds.size} cards</span><span className="inline-flex items-center gap-1 text-[var(--space-text-brand)]">Open <ChevronRight className="h-3.5 w-3.5" /></span></span>
        </button>;
      })}</div>
    </section>
  </div>;
}

function IndustrySubcategoryView({ slug, subcategoryId, pillar, progress, onOpenPillar, onOpenCard, onBack }: { slug: string; subcategoryId: string; pillar?: PillarId; progress: ProgressSnapshot; onOpenPillar: (pillar: PillarId) => void; onOpenCard: (index: number, pillar: PillarId) => void; onBack: () => void }) {
  const deck = deckFor(slug)!;
  const category = subcategoryById(slug, subcategoryId)!;
  const entries = useMemo(() => buildSubcategoryStudyMap(slug, deck.cards)[subcategoryId] || [], [slug, subcategoryId, deck]);
  const learnedSet = new Set(progress.completed);
  const CategoryIcon = ICONS[category.icon] || BookOpen;
  const selectedPillar = pillar ? KNOWLEDGE_PILLARS.find((item) => item.id === pillar) || null : null;
  const pillarCards = selectedPillar ? cardsForSubcategoryPillar(slug, subcategoryId, selectedPillar.id, deck.cards) : [];

  return <div className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-6 sm:py-8">
    <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold text-[var(--space-text-secondary)]"><ArrowLeft className="h-4 w-4" />{selectedPillar ? category.name : `All ${deck.industry.shortLabel} sub-categories`}</button>
    <header className="mt-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-4 shadow-sm sm:p-7">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]"><CategoryIcon className="h-5 w-5 text-[var(--space-text-brand)]" /></span>
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--space-text-brand)]">{deck.industry.shortLabel} specialist track</p><h1 className="mt-1 text-lg font-black text-[var(--space-text-primary)] sm:text-3xl">{category.name}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">{category.description}</p>
      <p className="mt-3 text-[10px] font-bold text-[var(--space-text-muted)]">{new Set(entries.map(({ card }) => card.id)).size} cards across six pillars</p>
    </header>

    {!selectedPillar ? <section className="mt-6"><h2 className="text-base font-black text-[var(--space-text-primary)]">Choose a knowledge pillar</h2><p className="mt-1 text-xs text-[var(--space-text-muted)]">Build a complete view of this business, one management lens at a time.</p><div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">{KNOWLEDGE_PILLARS.map((pillarItem) => {
      const cards = entries.filter((entry) => entry.pillar === pillarItem.id).map((entry) => entry.card);
      const done = cards.filter((card) => learnedSet.has(card.id)).length;
      const pct = cards.length ? Math.round(done / cards.length * 100) : 0;
      const PillarIcon = ICONS[pillarItem.icon] || BookOpen;
      return <button key={pillarItem.id} type="button" onClick={() => onOpenPillar(pillarItem.id)} className="group flex min-h-36 flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-200)] hover:shadow-md" data-testid={`pillar-${pillarItem.id}`}><div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]"><PillarIcon className="h-5 w-5 text-[var(--space-text-brand)]" /></span><span className="rounded-full bg-[var(--space-surface-muted)] px-2 py-1 text-[10px] font-black text-[var(--space-text-muted)]">{pct}%</span></div><h3 className="mt-3 text-sm font-black text-[var(--space-text-primary)]">{pillarItem.label}</h3><p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[var(--space-text-muted)]">{pillarItem.description}</p><span className="mt-auto pt-3 text-[10px] font-bold text-[var(--space-text-secondary)]">{done}/{cards.length} learned</span></button>;
    })}</div></section> : <section className="mt-6"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]">{(() => { const PillarIcon = ICONS[selectedPillar.icon] || BookOpen; return <PillarIcon className="h-5 w-5 text-[var(--space-text-brand)]" />; })()}</span><div><h2 className="text-base font-black text-[var(--space-text-primary)]">{selectedPillar.label}</h2><p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">{selectedPillar.description}</p></div></div><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">{pillarCards.map((card) => { const complete = learnedSet.has(card.id); const typeMeta = TYPE_META[card.type]; return <button key={card.id} type="button" onClick={() => onOpenCard(deck.cards.indexOf(card), selectedPillar.id)} className="group flex items-start gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-200)] hover:shadow-sm"><span className="min-w-0 flex-1"><span className="block text-xs font-bold leading-4 text-[var(--space-text-primary)]">{card.title}</span><span className="mt-1 flex items-center gap-2"><span className="text-[9px] font-black uppercase tracking-wider text-[var(--space-text-muted)]">{typeMeta.label}</span>{complete && <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[var(--space-semantic-success-700)]"><CheckCircle2 className="h-3 w-3" />Learned</span>}</span></span><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[var(--space-text-muted)]" /></button>; })}</div></section>}
  </div>;
}

function StructuredVisual({ lines }: { lines: string[] }) {
  const maxBar = Math.max(1, ...lines.map((line) => line.match(/#+/)?.[0].length || 0));
  return <div className="mt-6 space-y-2 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 sm:p-4">
    {lines.map((line, index) => {
      const bar = line.match(/#+/)?.[0] || '';
      const cleaned = line.replace(/#+/g, '').trim();
      const columns = cleaned.match(/^(.*?)(?:\s{2,})(\(?-?\d+(?:\.\d+)?%?\)?)$/);
      if (bar) return <div key={`${line}-${index}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-[var(--space-surface-card)] p-2.5"><div className="min-w-0"><p className="break-words text-[11px] font-bold text-[var(--space-text-secondary)]">{columns?.[1] || cleaned}</p><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--space-neutral-200)]"><div className="h-full rounded-full bg-[var(--space-brand-primary-600)]" style={{ width: `${Math.max(8, Math.round((bar.length / maxBar) * 100))}%` }} /></div></div>{columns?.[2] && <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-1 text-[10px] font-black text-[var(--space-text-brand)]">{columns[2]}</span>}</div>;
      if (columns) return <div key={`${line}-${index}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[var(--space-border-default)] px-1 py-2 last:border-b-0"><span className="min-w-0 break-words text-[11px] font-semibold text-[var(--space-text-secondary)]">{columns[1]}</span><span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-1 text-[10px] font-black text-[var(--space-text-brand)]">{columns[2]}</span></div>;
      return <div key={`${line}-${index}`} className="break-words rounded-lg bg-[var(--space-surface-card)] px-3 py-2 text-[11px] font-semibold leading-5 text-[var(--space-text-secondary)]">{cleaned}</div>;
    })}
  </div>;
}

function processIconFor(step: string): typeof BookOpen {
  const value = step.toLowerCase();
  if (/customer|consumer|shopper|user|client|borrower|demand|need/.test(value)) return Users;
  if (/price|fund|revenue|cost|margin|tax|premium|payment|budget/.test(value)) return Banknote;
  if (/ship|deliver|distribut|freight|transport|warehouse|last mile/.test(value)) return Truck;
  if (/produce|factory|manufactur|build|assembly|process|operate/.test(value)) return Factory;
  if (/test|check|quality|monitor|measure|approve|review|inspect/.test(value)) return BadgeCheck;
  if (/plan|design|strategy|hypoth|idea|prototype|structure/.test(value)) return Sparkles;
  return CheckCircle2;
}

function CardBody({ card, completed, onComplete }: { card: LearningCard; completed: boolean; onComplete: () => void }) {
  const [choice, setChoice] = useState<number | null>(null);
  const meta = TYPE_META[card.type];
  const topic = topicGroupMeta(card.topic);
  const TypeIcon = meta.icon;
  const TopicIcon = ICONS[topic.icon] || BookOpen;
  const specialistCard = isFmcgSubindustry(card.industrySlug) && card.topic !== 'glossary';
  const cleanBack = card.back.filter((point) => !/^sources?:/i.test(point.trim()));
  const formulaPoints = cleanBack.filter((point) => /^(công thức|formula):/i.test(point.trim()));
  const narrativePoints = cleanBack.filter((point) => !/^(công thức|formula):/i.test(point.trim()));
  const takeaway = specialistCard ? narrativePoints[0] : null;
  const detailPoints = specialistCard ? narrativePoints.slice(1) : narrativePoints;
  const answered = choice != null;
  const correct = answered && choice === card.answer;

  useEffect(() => { setChoice(null); }, [card.id]);

  const choose = (index: number) => {
    if (answered) return;
    setChoice(index);
    onComplete();
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl select-none" data-testid={`learning-card-${card.id}`}>
      <div className="absolute -left-3 top-5 hidden h-[calc(100%_-_2rem)] w-full rotate-[-2deg] rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] sm:block" aria-hidden />
      <div className="absolute -right-3 top-5 hidden h-[calc(100%_-_2rem)] w-full rotate-[2deg] rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] sm:block" aria-hidden />
      <article className="relative min-h-[360px] rounded-2xl border p-4 shadow-xl sm:min-h-[460px] sm:p-8" style={{ borderColor: completed ? 'var(--space-semantic-success-500)' : 'var(--space-border-default)', backgroundColor: meta.surface }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider" style={{ backgroundColor: `color-mix(in srgb, ${topic.accent} 12%, transparent)`, color: 'var(--space-text-secondary)' }}><TopicIcon className="h-3.5 w-3.5" />{topic.label}</span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${meta.badgeClass}`}><TypeIcon className="h-3.5 w-3.5" />{meta.label}</span>
          </div>
          <span className="shrink-0 text-[10px] font-bold text-[var(--space-text-muted)]">Card {card.order}</span>
        </div>
        <h2 className="mt-5 text-lg font-black leading-tight text-[var(--space-text-primary)] sm:mt-6 sm:text-2xl">{card.title}</h2>

        {card.type === 'quiz' ? (
          <div className="mt-5 sm:mt-6" onClick={(event) => event.stopPropagation()}>
            <p className="text-sm font-semibold leading-6 sm:text-base sm:leading-7 text-[var(--space-text-secondary)]">{card.front}</p>
            <div className="mt-5 space-y-2.5">
              {(card.options || []).map((option, index) => {
                const isAnswer = answered && index === card.answer;
                const isWrong = answered && index === choice && !isAnswer;
                return <button key={option} type="button" onClick={() => choose(index)} className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold sm:px-4 sm:py-3 transition-all ${isAnswer ? 'border-[var(--space-semantic-success-500)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]' : isWrong ? 'border-[var(--space-semantic-danger-500)] bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_10%,transparent)] text-[var(--space-semantic-danger-700)]' : 'border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-200)] hover:bg-[var(--space-surface-muted)]'}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-[10px]">{String.fromCharCode(65 + index)}</span>{option}{isAnswer && <Check className="ml-auto h-4 w-4" />}{isWrong && <X className="ml-auto h-4 w-4" />}</button>;
              })}
            </div>
            {answered && <div className={`mt-4 rounded-xl p-3 text-xs leading-5 ${correct ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_10%,transparent)] text-[var(--space-semantic-danger-700)]'}`}><strong>{correct ? 'Correct.' : 'Not quite.'}</strong> {card.back[0]}</div>}
          </div>
        ) : (
          <div className="mt-5 sm:mt-6">
            <p className="text-sm font-semibold leading-6 text-[var(--space-text-secondary)]">{card.front}</p>
            {takeaway && <div className="mt-5 rounded-xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_22%,transparent)] bg-[color-mix(in_srgb,var(--space-brand-primary-500)_8%,transparent)] p-3 text-xs font-bold leading-5 text-[var(--space-text-brand)]">Key takeaway · {takeaway.replace(/^MT takeaway:\s*/i, '')}</div>}
            {card.diagram && <div className="mt-6 flex flex-wrap items-center gap-2">{card.diagram.map((step, index) => { const StepIcon = processIconFor(step); return <div key={step} className="flex min-w-0 items-center gap-2"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]"><StepIcon className="h-4 w-4 text-[var(--space-text-brand)]" /></span><span className="max-w-32 break-words text-[11px] font-bold leading-4 text-[var(--space-text-secondary)]">{step}</span>{index < card.diagram!.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-[var(--space-text-muted)]" />}</div>; })}</div>}
            {card.visual && card.type !== 'fact' && <StructuredVisual lines={card.visual} />}
            {formulaPoints.length > 0 && <div className="mt-5 space-y-2 rounded-xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_30%,transparent)] bg-[color-mix(in_srgb,var(--space-brand-primary-500)_8%,transparent)] p-4">{formulaPoints.map((point) => <p key={point} className="text-sm font-black leading-6 text-[var(--space-text-primary)]">{point}</p>)}</div>}
            <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">{detailPoints.map((point) => <li key={point} className="flex gap-3 break-words text-sm leading-6 text-[var(--space-text-secondary)]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--space-brand-primary-600)]" />{point}</li>)}</ul>
          </div>
        )}

        {completed && <span className="absolute bottom-4 right-5 inline-flex items-center gap-1 text-[10px] font-bold text-[var(--space-semantic-success-700)]"><CheckCircle2 className="h-4 w-4" />Learned</span>}
      </article>
    </div>
  );
}

// Decks are never presented as one flat list. This is the chapter index: every card filed under a
// topic group so a learner can see market fundamentals, the operating chain, the product science,
// the money, the commercial engine, the career path and the insider facts as separate sections.
function TopicIndexView({ slug, selectedTopic, progress, onOpenCard, onBack, onSelectTopic, onStudy, onQuiz }: { slug: string; selectedTopic?: string; progress: ProgressSnapshot; onOpenCard: (index: number) => void; onBack: () => void; onSelectTopic: (topic: string) => void; onStudy: (mode: StudyMode) => void; onQuiz: () => void }) {
  const deck = deckFor(slug)!;
  const sections = topicSectionsFor(slug);
  const glossarySection = sections.find((section) => section.topic === 'glossary') || null;
  const categorySections = sections.filter((section) => section.topic !== 'glossary' && section.topic !== 'overview');
  const Icon = ICONS[deck.industry.icon] || BookOpen;
  const learned = validCompletedCount(slug, progress.completed);
  const pct = deck.cards.length > 0 ? Math.round((learned / deck.cards.length) * 100) : 0;
  const selectedSection = sections.find((section) => section.topic === selectedTopic) || null;

  return (
    <div className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-6 sm:py-8">
      <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />{selectedSection ? 'All sub-categories' : isFmcgSubindustry(slug) ? 'All FMCG categories' : 'All industries'}</button>

      <header className="mt-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-4 shadow-sm sm:p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]"><Icon className="h-5 w-5 text-[var(--space-text-brand)]" /></span>
        <h1 className="mt-3 text-lg font-black text-[var(--space-text-primary)] sm:text-3xl">{deck.industry.label}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">{deck.industry.tagline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-bold text-[var(--space-text-secondary)]">
          <span className="rounded-full bg-[var(--space-surface-muted)] px-3 py-1.5">{deck.cards.length} cards</span>
          <span className="rounded-full bg-[var(--space-surface-muted)] px-3 py-1.5">{categorySections.length} sub-categories</span>
          <span className="rounded-full bg-[var(--space-surface-muted)] px-3 py-1.5">{learned} learned · {pct}%</span>
          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 ${progress.badgeEarned ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>{progress.badgeEarned ? <BadgeCheck className="h-3 w-3" /> : <Lock className="h-3 w-3" />}{deck.industry.badge}</span>
        </div>
      </header>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:flex sm:flex-wrap">
        <button type="button" onClick={() => onOpenCard(selectedSection ? deck.cards.indexOf(selectedSection.cards[0]) : 0)} className="col-span-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-2.5 text-xs font-bold sm:col-span-1 sm:w-auto text-[var(--space-text-on-primary)]">Read cards<ArrowRight className="h-4 w-4" /></button>
        <button type="button" onClick={() => onStudy('flashcards')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-xs font-bold text-[var(--space-text-secondary)]"><BookOpen className="h-4 w-4" />Flashcards</button>
        <button type="button" onClick={() => onStudy('learn')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-xs font-bold text-[var(--space-text-secondary)]"><Sparkles className="h-4 w-4" />Learn</button>
        <button type="button" onClick={onQuiz} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-xs font-bold text-[var(--space-text-secondary)]"><Target className="h-4 w-4" />Test</button>
        <button type="button" onClick={() => onStudy('match')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-xs font-bold text-[var(--space-text-secondary)]"><Zap className="h-4 w-4" />Match</button>
      </div>

      {!selectedSection ? (
        <section className="mt-7">
          <div><h2 className="text-base font-black text-[var(--space-text-primary)]">Choose a sub-category</h2><p className="mt-1 text-xs text-[var(--space-text-muted)]">Open one focused area instead of browsing one long mixed list.</p></div>
          {glossarySection && <button type="button" onClick={() => onSelectTopic(glossarySection.topic)} className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4 text-left"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-card)]"><BookOpen className="h-5 w-5 text-[var(--space-text-brand)]" /></span><span className="min-w-0 flex-1"><span className="block text-xs font-black uppercase tracking-wider text-[var(--space-text-brand)]">Start with the foundation</span><span className="mt-1 block text-sm font-black text-[var(--space-text-primary)]">Term Sheet / Key Terms</span><span className="mt-1 block text-[11px] text-[var(--space-text-muted)]">{glossarySection.cards.length} beginner definitions before the specialist categories.</span></span><ChevronRight className="h-4 w-4 text-[var(--space-text-brand)]" /></button>}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {categorySections.map((section) => {
              const topic = topicGroupMeta(section.topic);
              const GroupIcon = ICONS[topic.icon] || BookOpen;
              const done = section.cards.filter((item) => progress.completed.includes(item.id)).length;
              const sectionPct = section.cards.length ? Math.round(done / section.cards.length * 100) : 0;
              return <button key={section.topic} type="button" onClick={() => onSelectTopic(section.topic)} className="group flex min-h-36 flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-200)] hover:shadow-md" data-testid={`subcategory-${section.topic}`}>
                <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `color-mix(in srgb, ${topic.accent} 14%, transparent)` }}><GroupIcon className="h-5 w-5" style={{ color: topic.accent }} /></span><span className="rounded-full bg-[var(--space-surface-muted)] px-2 py-1 text-[10px] font-black text-[var(--space-text-muted)]">{sectionPct}%</span></div>
                <h3 className="mt-3 text-sm font-black text-[var(--space-text-primary)]">{topic.label}</h3><p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[var(--space-text-muted)]">{topic.blurb}</p>
                <span className="mt-auto flex items-center justify-between pt-3 text-[10px] font-bold text-[var(--space-text-secondary)]"><span>{done}/{section.cards.length} learned</span><span className="inline-flex items-center gap-1 text-[var(--space-text-brand)]">Open <ChevronRight className="h-3.5 w-3.5" /></span></span>
              </button>;
            })}
          </div>
        </section>
      ) : (() => {
        const topic = topicGroupMeta(selectedSection.topic);
        const GroupIcon = ICONS[topic.icon] || BookOpen;
        const done = selectedSection.cards.filter((item) => progress.completed.includes(item.id)).length;
        return <section className="mt-7" data-testid={`topic-section-${selectedSection.topic}`}>
          <div className="flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `color-mix(in srgb, ${topic.accent} 14%, transparent)` }}><GroupIcon className="h-5 w-5" style={{ color: topic.accent }} /></span><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-black text-[var(--space-text-primary)]">{topic.label}</h2><span className="rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-muted)]">{done}/{selectedSection.cards.length} learned</span></div><p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">{topic.blurb}</p></div></div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">{selectedSection.cards.map((item) => { const complete = progress.completed.includes(item.id); const typeMeta = TYPE_META[item.type]; return <button key={item.id} type="button" onClick={() => onOpenCard(deck.cards.indexOf(item))} className="group flex items-start gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-200)] hover:shadow-sm" data-testid={`topic-card-${item.id}`}><span className="min-w-0 flex-1"><span className="block text-xs font-bold leading-4 text-[var(--space-text-primary)]">{item.title}</span><span className="mt-1 flex items-center gap-2"><span className="text-[9px] font-black uppercase tracking-wider text-[var(--space-text-muted)]">{typeMeta.label}</span>{complete && <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[var(--space-semantic-success-700)]"><CheckCircle2 className="h-3 w-3" />Learned</span>}</span></span><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[var(--space-text-muted)] group-hover:text-[var(--space-text-brand)]" /></button>; })}</div>
        </section>;
      })()}
    </div>
  );
}

function DeckView({ slug, index, progress, onIndex, onBack, onComplete, onQuiz }: { slug: string; index: number; progress: ProgressSnapshot; onIndex: (index: number) => void; onBack: () => void; onComplete: (id: string) => void; onQuiz: () => void }) {
  const deck = deckFor(slug)!;
  const card = deck.cards[index];
  const cardTopic = topicGroupMeta(card.topic);
  const dragStart = useRef<number | null>(null);
  const complete = progress.completed.includes(card.id);
  const learned = validCompletedCount(slug, progress.completed);
  const pct = Math.round((learned / deck.cards.length) * 100);
  const move = (delta: number) => {
    if (delta > 0) onComplete(card.id);
    onIndex(Math.max(0, Math.min(deck.cards.length - 1, index + delta)));
  };
  const endDrag = (clientX: number) => {
    if (dragStart.current == null) return;
    const delta = clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 55) move(delta > 0 ? 1 : -1);
  };

  return (
    <div className="flex min-h-full flex-col bg-[var(--space-surface-page)] px-4 py-4 sm:px-6 sm:py-6">
      <header className="mx-auto flex w-full max-w-4xl items-center gap-3">
        <button type="button" onClick={onBack} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]" aria-label="Back to topics"><ArrowLeft className="h-4 w-4" /></button>
        <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><h1 className="flex min-w-0 items-center gap-1.5 truncate text-sm font-black text-[var(--space-text-primary)]"><span className="truncate">{deck.industry.label}</span><span className="hidden shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold sm:inline-flex" style={{ backgroundColor: `color-mix(in srgb, ${cardTopic.accent} 14%, transparent)`, color: 'var(--space-text-secondary)' }}>{cardTopic.shortLabel}</span></h1><span className="text-[10px] font-bold text-[var(--space-text-muted)]">{learned}/{deck.cards.length} learned</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--space-surface-muted)]"><div className="h-full rounded-full bg-[var(--space-brand-primary-600)] transition-all duration-500" style={{ width: `${pct}%` }} /></div></div>
        {progress.badgeEarned && <span className="hidden items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] px-3 py-2 text-[10px] font-bold text-[var(--space-semantic-success-700)] sm:inline-flex"><Trophy className="h-4 w-4" />{deck.industry.badge}</span>}
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-4 sm:py-6" onPointerDown={(event) => { dragStart.current = event.clientX; }} onPointerUp={(event) => endDrag(event.clientX)} onPointerCancel={() => { dragStart.current = null; }}>
        <CardBody key={card.id} card={card} completed={complete} onComplete={() => onComplete(card.id)} />
      </main>

      <footer className="mx-auto w-full max-w-2xl">
        <p className="text-center text-[10px] font-bold text-[var(--space-text-muted)]">Card {index + 1} of {deck.cards.length} · swipe right for next, left for previous</p>
        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
          <button type="button" onClick={() => move(-1)} disabled={index === 0} className="flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2 py-2.5 text-xs font-bold sm:gap-2 sm:px-4 sm:py-3 text-[var(--space-text-secondary)] disabled:opacity-30"><ArrowLeft className="h-4 w-4 shrink-0" />Previous</button>
          <button type="button" onClick={() => onComplete(card.id)} className={`flex h-12 w-12 items-center justify-center rounded-full border ${complete ? 'border-[var(--space-semantic-success-500)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]' : 'border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'}`} aria-label="Mark learned"><Check className="h-5 w-5" /></button>
          {index < deck.cards.length - 1 ? <button type="button" onClick={() => move(1)} className="flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-xl bg-[var(--space-brand-primary-600)] px-2 py-2.5 text-xs font-bold sm:gap-2 sm:px-4 sm:py-3 text-[var(--space-text-on-primary)]">Next<ArrowRight className="h-4 w-4 shrink-0" /></button> : <button type="button" onClick={progress.badgeEarned ? onQuiz : () => onComplete(card.id)} className="flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-xl bg-[var(--space-brand-primary-600)] px-2 py-2.5 text-center text-xs font-bold sm:gap-2 sm:px-4 sm:py-3 text-[var(--space-text-on-primary)]">{progress.badgeEarned ? 'Quick Quiz' : 'Finish deck'}<Trophy className="h-4 w-4 shrink-0" /></button>}
        </div>
      </footer>
    </div>
  );
}

function QuickQuiz({ slug, onBack, onFinish }: { slug: string; onBack: () => void; onFinish: (score: number) => Promise<number> }) {
  const deck = deckFor(slug)!;
  const [attempt, setAttempt] = useState(0);
  const questions = useMemo(() => {
    const shuffle = <T,>(items: T[]): T[] => {
      const shuffled = [...items];
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
      }
      return shuffled;
    };

    const seen = new Set<string>();
    const sections = shuffle(topicSectionsFor(slug).filter((section) => section.topic !== 'overview' && section.topic !== 'glossary'))
      .map((section) => ({
        ...section,
        cards: shuffle(section.cards.filter((card) => {
          if (seen.has(card.id)) return false;
          seen.add(card.id);
          return true;
        })),
      }))
      .filter((section) => section.cards.length > 0);
    const target = Math.min(20, sections.reduce((sum, section) => sum + section.cards.length, 0));
    if (target === 0) return [];

    const baseQuota = target >= sections.length ? 1 : 0;
    const quotas: number[] = sections.map(() => baseQuota);
    let remaining = target - quotas.reduce((sum, quota) => sum + quota, 0);
    const totalCapacity = sections.reduce((sum, section, index) => sum + section.cards.length - quotas[index], 0);
    const shares = sections.map((section, index) => {
      const capacity = section.cards.length - quotas[index];
      const exact = totalCapacity > 0 ? (remaining * capacity) / totalCapacity : 0;
      const whole = Math.min(capacity, Math.floor(exact));
      quotas[index] += whole;
      return { index, remainder: exact - whole };
    });
    remaining = target - quotas.reduce((sum, quota) => sum + quota, 0);
    for (const share of shuffle(shares).sort((left, right) => right.remainder - left.remainder)) {
      if (remaining === 0) break;
      if (quotas[share.index] < sections[share.index].cards.length) {
        quotas[share.index] += 1;
        remaining -= 1;
      }
    }

    const selected = shuffle(sections.flatMap((section, index) => section.cards.slice(0, quotas[index])));
    const titles = [...new Set(sections.flatMap((section) => section.cards.map((card) => card.title)))];
    return selected.map((card) => {
      const authoredAnswer = card.answer;
      if (card.type === 'quiz' && Array.isArray(card.options) && card.options.length >= 2 && typeof authoredAnswer === 'number' && Number.isInteger(authoredAnswer) && authoredAnswer >= 0 && authoredAnswer < card.options.length) return card;
      const distractors = shuffle(titles.filter((title) => title !== card.title)).slice(0, 3);
      if (distractors.length === 0) distractors.push('None of the listed concepts');
      const options = shuffle([card.title, ...distractors]);
      return {
        ...card,
        type: 'quiz' as const,
        front: `Which concept matches this explanation? ${card.front}`,
        back: [card.back[0] || card.front],
        options,
        answer: options.indexOf(card.title),
      };
    });
  }, [attempt, deck, slug]);
  const quizDuration = Math.max(1, questions.length) * 12;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(score);
  scoreRef.current = score;
  const [choice, setChoice] = useState<number | null>(null);
  const [time, setTime] = useState(quizDuration);
  const [result, setResult] = useState<{ score: number; percentile: number } | null>(null);
  const finishing = useRef(false);

  const finish = useCallback(async (finalScore: number) => {
    if (finishing.current) return;
    finishing.current = true;
    const comparableScore = questions.length > 0 ? Math.round((finalScore / questions.length) * 5) : 0;
    const percentile = await onFinish(comparableScore);
    setResult({ score: finalScore, percentile });
  }, [onFinish, questions.length]);

  useEffect(() => {
    if (result || questions.length === 0) return;
    const timer = window.setInterval(() => setTime((value) => {
      if (value <= 1) { window.clearInterval(timer); void finish(scoreRef.current); return 0; }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [finish, questions.length, result]);

  if (questions.length === 0) return (
    <div className="flex min-h-full items-center justify-center bg-[var(--space-surface-page)] p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 text-center">
        <h1 className="text-lg font-black text-[var(--space-text-primary)]">No quiz questions available</h1>
        <button type="button" onClick={onBack} className="mt-4 min-h-11 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-xs font-bold text-[var(--space-text-on-primary)]">Back</button>
      </div>
    </div>
  );

  if (result) return (
    <div className="flex min-h-full items-center justify-center bg-[var(--space-surface-page)] p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-center shadow-xl sm:p-7">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)]"><Trophy className="h-8 w-8 text-[var(--space-text-brand)]" /></span>
        <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Quick Quiz complete</p>
        <h1 className="mt-2 text-lg font-black text-[var(--space-text-primary)] sm:text-3xl">{result.score}/{questions.length}</h1>
        <p className="mt-2 text-sm text-[var(--space-text-secondary)]">You scored as well as or better than <strong className="text-[var(--space-text-brand)]">{result.percentile}%</strong> of recorded learners.</p>
        <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row"><button type="button" onClick={() => { finishing.current = false; setAttempt((value) => value + 1); setIndex(0); setScore(0); setChoice(null); setTime(quizDuration); setResult(null); }} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--space-border-default)] px-4 py-3 text-xs font-bold text-[var(--space-text-secondary)]"><RotateCcw className="h-4 w-4" />Try again</button><button type="button" onClick={onBack} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-xs font-bold text-[var(--space-text-on-primary)]"><ArrowLeft className="h-4 w-4" />{isFmcgDeck(slug) ? 'Back to FMCG' : 'Back home'}</button></div>
      </div>
    </div>
  );

  const question = questions[index];
  const answerNow = (answer: number) => {
    if (choice != null) return;
    setChoice(answer);
    if (answer === question.answer) setScore((value) => value + 1);
  };
  const advance = () => {
    const finalScore = score;
    if (index === questions.length - 1) void finish(finalScore);
    else { setIndex((value) => value + 1); setChoice(null); }
  };

  return (
    <div className="flex min-h-full flex-col bg-[var(--space-surface-page)] p-3 sm:p-6">
      <header className="mx-auto flex w-full min-w-0 max-w-2xl items-center gap-2 sm:gap-3"><button type="button" onClick={onBack} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]"><X className="h-4 w-4" /></button><div className="min-w-0 flex-1"><p className="truncate text-sm font-black text-[var(--space-text-primary)]">{deck.industry.label} Test</p><p className="text-[10px] text-[var(--space-text-muted)]">Question {index + 1} of {questions.length}</p></div><span className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-black sm:px-3 ${time <= 10 ? 'bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_10%,transparent)] text-[var(--space-semantic-danger-700)]' : 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'}`}><Timer className="h-4 w-4" />{time}s</span></header>
      <main className="mx-auto flex w-full min-w-0 max-w-2xl flex-1 items-center py-4 sm:py-6"><div className="w-full min-w-0 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 shadow-xl sm:p-8"><h1 className="break-words text-lg font-black leading-tight text-[var(--space-text-primary)] sm:text-xl">{question.front}</h1><div className="mt-6 space-y-2.5">{(question.options || []).map((option, optionIndex) => { const isCorrect = choice != null && optionIndex === question.answer; const isWrong = choice === optionIndex && optionIndex !== question.answer; return <button key={option} type="button" onClick={() => answerNow(optionIndex)} className={`min-h-11 w-full break-words rounded-xl border px-4 py-3 text-left text-sm font-semibold ${isCorrect ? 'border-[var(--space-semantic-success-500)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]' : isWrong ? 'border-[var(--space-semantic-danger-500)] bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_10%,transparent)] text-[var(--space-semantic-danger-700)]' : 'border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'}`}>{option}</button>; })}</div>{choice != null && <><p className="mt-4 break-words text-xs leading-5 text-[var(--space-text-secondary)]">{question.back[0]}</p><button type="button" onClick={advance} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-xs font-bold text-[var(--space-text-on-primary)]">{index === questions.length - 1 ? 'See my score' : 'Next question'}<ArrowRight className="h-4 w-4" /></button></>}</div></main>
    </div>
  );
}

function DomainKnowledgeInner() {
  const { sessionId } = useSpaceRuntime();
  const userId = useMemo(() => resolveRoadmapIdentity(sessionId).userKey, [sessionId]);
  const cachedProgress = useMemo(() => readProgressCache(userId), [userId]);
  const [view, setView] = useState<AppView>(() => viewFromDomainRoute());
  const [progress, setProgress] = useState<ProgressMap>(() => cachedProgress?.progress || {});
  const [streak, setStreak] = useState(() => cachedProgress?.streak || 1);
  const [loading, setLoading] = useState(() => !cachedProgress);
  const [badgeToast, setBadgeToast] = useState<string | null>(null);

  const navigate = useCallback((next: AppView, mode: NavigationMode = 'push') => {
    const url = domainRoute(next);
    if (mode === 'replace') window.history.replaceState({ ...window.history.state, domainKnowledge: true }, '', url);
    else window.history.pushState({ ...window.history.state, domainKnowledge: true }, '', url);
    setView(next);
  }, []);

  const goBack = useCallback(() => window.history.back(), []);

  useEffect(() => {
    const syncFromHistory = () => setView(viewFromDomainRoute());
    window.addEventListener('popstate', syncFromHistory);
    window.addEventListener('hashchange', syncFromHistory);
    return () => {
      window.removeEventListener('popstate', syncFromHistory);
      window.removeEventListener('hashchange', syncFromHistory);
    };
  }, []);

  useEffect(() => {
    const raw = sessionStorage.getItem('casemate-domain-pending-route');
    if (!raw) return;
    sessionStorage.removeItem('casemate-domain-pending-route');
    try {
      const pending = JSON.parse(raw) as { industrySlug?: string; subcategoryId?: string | null; pillar?: PillarId };
      if (!pending.industrySlug) return;
      const timer = window.setTimeout(() => {
        const categoryView: AppView = { kind: 'topics', slug: pending.industrySlug! };
        navigate(categoryView, 'replace');
        if (pending.subcategoryId) navigate({ kind: 'subcategory', slug: pending.industrySlug!, subcategoryId: pending.subcategoryId, pillar: pending.pillar });
        else if (pending.pillar) navigate({ kind: 'topics', slug: pending.industrySlug!, topic: pending.pillar });
      }, 0);
      return () => window.clearTimeout(timer);
    } catch {
      return;
    }
  }, [navigate]);

  useEffect(() => {
    writeProgressCache(userId, progress, streak);
  }, [progress, streak, userId]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const db = workspaceDb();
      const result = await db.from('domain_knowledge_progress', { shared: true }).eq('user_id', userId).orderBy('id', 'desc').limit(50).get();
      const rows = rowsOf(result);
      const next: ProgressMap = {};
      for (const row of rows) {
        const slug = String(row.industry_slug || '');
        if (!next[slug] && deckFor(slug)) next[slug] = { completed: jsonArray(row.cards_completed), quizScore: Number.isFinite(Number(row.quiz_score)) ? Number(row.quiz_score) : null, badgeEarned: row.badge_earned === true };
      }
      setProgress(next);
      const dates = rows.map((row) => String(row.streak_last_date || '').slice(0, 10)).filter(Boolean);
      if (!dates.includes(utcDay())) {
        await db.from('domain_knowledge_progress').insert({ user_id: userId, industry_slug: '__streak__', cards_completed: [], quiz_score: null, badge_earned: false, streak_last_date: utcDay() });
        dates.push(utcDay());
      }
      const nextStreak = consecutiveStreak(dates);
      setStreak(nextStreak);
      writeProgressCache(userId, next, nextStreak);
    } catch {
      // Keep the cached/local-first snapshot when the background sync is unavailable.
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 250);
    return () => window.clearTimeout(timer);
  }, [load]);

  const persist = useCallback(async (slug: string, snapshot: ProgressSnapshot) => {
    try {
      await workspaceDb().from('domain_knowledge_progress').insert({ user_id: userId, industry_slug: slug, cards_completed: snapshot.completed, quiz_score: snapshot.quizScore, badge_earned: snapshot.badgeEarned, streak_last_date: utcDay() });
    } catch {
      // Keep optimistic state; the next interaction retries with a full snapshot.
    }
  }, [userId]);

  const completeCard = useCallback((slug: string, id: string) => {
    const deck = deckFor(slug)!;
    setProgress((current) => {
      const previous = current[slug] || { completed: [], quizScore: null, badgeEarned: false };
      if (previous.completed.includes(id)) return current;
      const completed = [...previous.completed, id];
      const validIds = new Set(deck.cards.map((item) => item.id));
      const validCount = new Set(completed.filter((itemId) => validIds.has(itemId))).size;
      // Decks grew when the deep research packs shipped, so a badge already earned stays earned.
      const badgeEarned = previous.badgeEarned || validCount >= deck.cards.length;
      const next = { ...previous, completed, badgeEarned };
      void persist(slug, next);
      if (badgeEarned && !previous.badgeEarned) { setBadgeToast(deck.industry.badge); window.setTimeout(() => setBadgeToast(null), 3500); }
      return { ...current, [slug]: next };
    });
  }, [persist]);

  const finishQuiz = useCallback(async (slug: string, score: number): Promise<number> => {
    const snapshot = progress[slug] || { completed: [], quizScore: null, badgeEarned: true };
    const next = { ...snapshot, quizScore: score };
    setProgress((current) => ({ ...current, [slug]: next }));
    await persist(slug, next);
    try {
      const result = await workspaceDb().from('domain_knowledge_progress', { shared: true }).eq('industry_slug', slug).orderBy('id', 'desc').limit(500).get();
      const latestByUser = new Map<string, number>();
      for (const row of rowsOf(result)) {
        const key = String(row.user_id || 'unknown');
        const value = Number(row.quiz_score);
        if (!latestByUser.has(key) && Number.isFinite(value)) latestByUser.set(key, value);
      }
      const scores = [...latestByUser.values()];
      if (scores.length === 0) return 100;
      return Math.max(1, Math.round((scores.filter((value) => value <= score).length / scores.length) * 100));
    } catch { return 100; }
  }, [persist, progress]);

  return (
    <div className="relative h-full overflow-y-auto bg-[var(--space-surface-page)]">
      {view.kind === 'home' && <HomeView progress={progress} streak={streak} loading={loading} onOpen={(slug, index = 0) => navigate({ kind: 'deck', slug, index })} onOpenTopics={(slug) => navigate({ kind: 'topics', slug })} onOpenFmcg={() => navigate({ kind: 'fmcg' })} />}
      {view.kind === 'fmcg' && <FmcgHub progress={progress} onOpen={(slug) => navigate({ kind: 'topics', slug })} onBack={goBack} />}
      {view.kind === 'topics' && subcategoriesForIndustry(view.slug).length > 0 && <IndustryCategoryView slug={view.slug} progress={progress[view.slug] || { completed: [], quizScore: null, badgeEarned: false }} onOpenFoundation={(index) => navigate({ kind: 'deck', slug: view.slug, index })} onOpenSubcategory={(subcategoryId) => navigate({ kind: 'subcategory', slug: view.slug, subcategoryId })} onBack={goBack} />}
      {view.kind === 'topics' && subcategoriesForIndustry(view.slug).length === 0 && <TopicIndexView slug={view.slug} selectedTopic={view.topic} progress={progress[view.slug] || { completed: [], quizScore: null, badgeEarned: false }} onOpenCard={(index) => navigate({ kind: 'deck', slug: view.slug, index })} onBack={goBack} onSelectTopic={(topic) => navigate({ kind: 'topics', slug: view.slug, topic })} onStudy={(mode) => navigate({ kind: 'study', slug: view.slug, mode })} onQuiz={() => navigate({ kind: 'quick', slug: view.slug })} />}
      {view.kind === 'subcategory' && <IndustrySubcategoryView slug={view.slug} subcategoryId={view.subcategoryId} pillar={view.pillar} progress={progress[view.slug] || { completed: [], quizScore: null, badgeEarned: false }} onOpenPillar={(pillar) => navigate({ kind: 'subcategory', slug: view.slug, subcategoryId: view.subcategoryId, pillar })} onOpenCard={(index, pillar) => navigate({ kind: 'deck', slug: view.slug, index, subcategoryId: view.subcategoryId, pillar })} onBack={goBack} />}
      {view.kind === 'deck' && <DeckView slug={view.slug} index={view.index} progress={progress[view.slug] || { completed: [], quizScore: null, badgeEarned: false }} onIndex={(index) => navigate({ kind: 'deck', slug: view.slug, index, subcategoryId: view.subcategoryId, pillar: view.pillar }, 'replace')} onBack={goBack} onComplete={(id) => completeCard(view.slug, id)} onQuiz={() => navigate({ kind: 'quick', slug: view.slug })} />}
      {view.kind === 'study' && <StudyModes slug={view.slug} mode={view.mode} onBack={goBack} />}
      {view.kind === 'quick' && <QuickQuiz slug={view.slug} onBack={goBack} onFinish={(score) => finishQuiz(view.slug, score)} />}
      {badgeToast && <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%_-_1.5rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl bg-[var(--space-neutral-900)] px-4 py-3 sm:bottom-6 sm:w-auto sm:px-5 sm:py-4 text-[var(--space-neutral-0)] shadow-2xl" role="status"><Trophy className="h-6 w-6 text-[var(--space-semantic-warning-500)]" /><div><p className="text-xs font-black">Badge unlocked!</p><p className="text-[10px]">{badgeToast}</p></div></div>}
    </div>
  );
}

export default function IndustryKnowledge() {
  return <PaywallGate appId="industry-knowledge" appName="Domain Knowledge"><DomainKnowledgeInner /></PaywallGate>;
}
