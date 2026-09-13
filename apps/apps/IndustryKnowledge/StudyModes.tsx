import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Brain, Check, Clock3, RefreshCw, Shuffle, Star, Trophy, X } from 'lucide-react';
import { deckFor } from './learningDecks';
import type { LearningCard } from './learningDecks';
import { topicGroupMeta } from './topicGroups';

export type StudyMode = 'flashcards' | 'learn' | 'match';

interface StudyModesProps {
  slug: string;
  mode: StudyMode;
  onBack: () => void;
}

interface MemoryRecord {
  confidence: number;
  streak: number;
  dueAt: number;
  lastSeen: number;
  starred: boolean;
}

type MemoryMap = Record<string, MemoryRecord>;

const MINUTE = 60_000;
const DAY = 86_400_000;

function storageKey(slug: string) {
  return `casemate-domain-memory-v1:${slug}`;
}

function readMemory(slug: string): MemoryMap {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey(slug)) || '{}');
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

function saveMemory(slug: string, memory: MemoryMap) {
  try { localStorage.setItem(storageKey(slug), JSON.stringify(memory)); } catch { /* private browsing */ }
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function titleAccepted(answer: string, title: string) {
  const expected = normalize(title);
  const actual = normalize(answer);
  if (!actual) return false;
  if (actual === expected || expected.includes(actual) || actual.includes(expected)) return true;
  const keywords = expected.split(' ').filter((word) => word.length > 2);
  return keywords.length > 0 && keywords.filter((word) => actual.includes(word)).length >= Math.min(2, keywords.length);
}

function nextRecord(previous: MemoryRecord | undefined, correct: boolean): MemoryRecord {
  const now = Date.now();
  if (!correct) return { confidence: 0, streak: 0, dueAt: now + 10 * MINUTE, lastSeen: now, starred: previous?.starred || false };
  const streak = (previous?.streak || 0) + 1;
  const intervals = [DAY, 3 * DAY, 7 * DAY, 14 * DAY, 30 * DAY];
  return {
    confidence: Math.min(3, (previous?.confidence || 0) + 1),
    streak,
    dueAt: now + intervals[Math.min(streak - 1, intervals.length - 1)],
    lastSeen: now,
    starred: previous?.starred || false,
  };
}

function answerPoints(card: LearningCard) {
  return card.back.filter((point) => !/^sources?:/i.test(point.trim())).slice(0, 4);
}

function StudyHeader({ title, subtitle, onBack }: { title: string; subtitle: string; onBack: () => void }) {
  return <header className="flex items-center gap-3 border-b border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3 sm:px-6">
    <button type="button" onClick={onBack} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]" aria-label="Back to topics"><ArrowLeft className="h-4 w-4" /></button>
    <div className="min-w-0"><h1 className="truncate text-sm font-black text-[var(--space-text-primary)]">{title}</h1><p className="text-[10px] text-[var(--space-text-muted)]">{subtitle}</p></div>
  </header>;
}

export default function StudyModes({ slug, mode, onBack }: StudyModesProps) {
  const deck = deckFor(slug)!;
  const studyCards = useMemo(() => deck.cards.filter((card) => card.type !== 'quiz'), [deck]);
  const [memory, setMemory] = useState<MemoryMap>(() => readMemory(slug));
  const [sessionOrder, setSessionOrder] = useState(() => studyCards.map((card) => card.id));
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [starredOnly, setStarredOnly] = useState(false);

  useEffect(() => saveMemory(slug, memory), [memory, slug]);
  useEffect(() => {
    setMemory(readMemory(slug));
    setSessionOrder(studyCards.map((card) => card.id));
    setIndex(0);
    setShowAnswer(false);
  }, [slug, mode, studyCards]);

  const reviewed = studyCards.filter((card) => memory[card.id]?.lastSeen).length;
  const memoryScore = studyCards.length
    ? Math.round(studyCards.reduce((sum, card) => sum + (memory[card.id]?.confidence || 0), 0) / (studyCards.length * 3) * 100)
    : 0;
  const dueCount = studyCards.filter((card) => !memory[card.id] || memory[card.id].dueAt <= Date.now()).length;

  const review = (card: LearningCard, correct: boolean) => {
    setMemory((current) => ({ ...current, [card.id]: nextRecord(current[card.id], correct) }));
  };

  const toggleStar = (card: LearningCard) => {
    setMemory((current) => ({
      ...current,
      [card.id]: {
        confidence: current[card.id]?.confidence || 0,
        streak: current[card.id]?.streak || 0,
        dueAt: current[card.id]?.dueAt || Date.now(),
        lastSeen: current[card.id]?.lastSeen || 0,
        starred: !current[card.id]?.starred,
      },
    }));
  };

  const scorePanel = <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 shadow-sm">
    <div><p className="text-lg font-black text-[var(--space-text-brand)]">{memoryScore}%</p><p className="text-[10px] text-[var(--space-text-muted)]">Memory Score</p></div>
    <div><p className="text-lg font-black text-[var(--space-text-primary)]">{dueCount}</p><p className="text-[10px] text-[var(--space-text-muted)]">Due now</p></div>
    <div><p className="text-lg font-black text-[var(--space-text-primary)]">{reviewed}/{studyCards.length}</p><p className="text-[10px] text-[var(--space-text-muted)]">Reviewed</p></div>
  </div>;

  if (mode === 'match') return <MatchMode deckLabel={deck.industry.label} cards={studyCards} scorePanel={scorePanel} onReview={review} onBack={onBack} />;
  if (mode === 'learn') return <LearnMode deckLabel={deck.industry.label} cards={studyCards} memory={memory} scorePanel={scorePanel} onReview={review} onBack={onBack} />;

  const visibleIds = sessionOrder.filter((id) => !starredOnly || memory[id]?.starred);
  const card = deck.cards.find((item) => item.id === visibleIds[index % Math.max(1, visibleIds.length)]);
  const next = (known?: boolean) => {
    if (card && known != null) review(card, known);
    setShowAnswer(false);
    setIndex((value) => visibleIds.length ? (value + 1) % visibleIds.length : 0);
  };

  return <div className="flex min-h-full flex-col bg-[var(--space-surface-page)] [&_button]:min-h-11">
    <StudyHeader title={`${deck.industry.label} · Flashcards`} subtitle="Active recall, shuffle, starred terms and spaced review" onBack={onBack} />
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-4 sm:p-6">
      {scorePanel}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => { setSessionOrder(shuffled(sessionOrder)); setIndex(0); setShowAnswer(false); }} className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold text-[var(--space-text-secondary)]"><Shuffle className="h-3.5 w-3.5" />Shuffle</button>
        <button type="button" onClick={() => { setStarredOnly((value) => !value); setIndex(0); setShowAnswer(false); }} className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold ${starredOnly ? 'border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)]'}`}><Star className="h-3.5 w-3.5" />Starred only</button>
      </div>
      {!card ? <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-8 text-center"><Star className="mx-auto h-6 w-6 text-[var(--space-text-muted)]" /><p className="mt-3 text-sm font-bold text-[var(--space-text-primary)]">No starred cards yet</p><button type="button" onClick={() => setStarredOnly(false)} className="mt-3 text-xs font-bold text-[var(--space-text-brand)]">Study all cards</button></div> : <>
        <article className="relative flex min-h-80 flex-col rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-lg sm:p-8">
          <button type="button" onClick={() => toggleStar(card)} className="absolute right-4 top-4 rounded-lg p-2" aria-label="Star this card"><Star className={`h-5 w-5 ${memory[card.id]?.starred ? 'fill-[var(--space-semantic-warning-500)] text-[var(--space-semantic-warning-500)]' : 'text-[var(--space-text-muted)]'}`} /></button>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Recall before checking</p>
          <h2 className="mt-4 pr-10 text-xl font-black text-[var(--space-text-primary)] sm:text-2xl">{card.title}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--space-text-secondary)]">{card.front}</p>
          {!showAnswer ? <button type="button" onClick={() => setShowAnswer(true)} className="mt-auto rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)]">Check answer</button> : <div className="mt-5 border-t border-[var(--space-border-default)] pt-5"><p className="text-[10px] font-black uppercase tracking-wider text-[var(--space-text-muted)]">Explanation</p><ul className="mt-3 space-y-2">{answerPoints(card).map((point) => <li key={point} className="text-sm leading-6 text-[var(--space-text-secondary)]">• {point}</li>)}</ul></div>}
        </article>
        {showAnswer && <div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => next(false)} className="flex items-center justify-center gap-2 rounded-xl border border-[var(--space-semantic-danger-500)] bg-[var(--space-surface-card)] px-4 py-3 text-sm font-bold text-[var(--space-semantic-danger-700)]"><X className="h-4 w-4" />Still learning</button><button type="button" onClick={() => next(true)} className="flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)]"><Check className="h-4 w-4" />Know it</button></div>}
        <p className="text-center text-[10px] font-bold text-[var(--space-text-muted)]">{index + 1} of {visibleIds.length} · correct cards return in 1, 3, 7, 14 and 30 days</p>
      </>}
    </main>
  </div>;
}

function LearnMode({ deckLabel, cards, memory, scorePanel, onReview, onBack }: { deckLabel: string; cards: LearningCard[]; memory: MemoryMap; scorePanel: JSX.Element; onReview: (card: LearningCard, correct: boolean) => void; onBack: () => void }) {
  // Freeze the weak-first queue for this session so recording an answer cannot
  // replace the current question before its feedback is displayed.
  const ordered = useMemo(() => [...cards].sort((a, b) => (memory[a.id]?.confidence || 0) - (memory[b.id]?.confidence || 0) || (memory[a.id]?.dueAt || 0) - (memory[b.id]?.dueAt || 0)), [cards]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState('');
  const [written, setWritten] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const card = ordered[index % ordered.length];
  const hard = (memory[card.id]?.confidence || 0) >= 2;
  const options = useMemo(() => shuffled([card, ...shuffled(cards.filter((item) => item.id !== card.id)).slice(0, 3)]).map((item) => item.title), [card, cards]);
  const submit = (answer: string) => {
    if (result != null) return;
    const correct = titleAccepted(answer, card.title);
    setResult(correct);
    onReview(card, correct);
  };
  const advance = () => { setIndex((value) => (value + 1) % ordered.length); setChoice(''); setWritten(''); setResult(null); };

  return <div className="flex min-h-full flex-col bg-[var(--space-surface-page)] [&_button]:min-h-11">
    <StudyHeader title={`${deckLabel} · Learn`} subtitle="Weak concepts first; questions become written recall as mastery grows" onBack={onBack} />
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-4 sm:p-6">{scorePanel}<article className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-lg sm:p-8">
      <div className="flex items-center justify-between"><span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[10px] font-black text-[var(--space-text-brand)]"><Brain className="h-3.5 w-3.5" />{hard ? 'Written recall' : 'Multiple choice'}</span><span className="text-[10px] font-bold text-[var(--space-text-muted)]">Weakest item {index + 1}/{ordered.length}</span></div>
      <p className="mt-6 text-base font-bold leading-7 text-[var(--space-text-primary)]">Which concept does this explanation describe?</p><p className="mt-3 rounded-2xl bg-[var(--space-surface-muted)] p-4 text-sm leading-6 text-[var(--space-text-secondary)]">{card.front}</p>
      {hard ? <div className="mt-5"><input value={written} onChange={(event) => setWritten(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') submit(written); }} placeholder="Type the concept from memory" className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3 text-sm text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary-500)]" /><button type="button" onClick={() => submit(written)} className="mt-3 w-full rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)]">Check answer</button></div> : <div className="mt-5 grid gap-2">{options.map((option) => <button key={option} type="button" onClick={() => { setChoice(option); submit(option); }} className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold ${result != null && option === card.title ? 'border-[var(--space-semantic-success-500)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]' : result === false && option === choice ? 'border-[var(--space-semantic-danger-500)] text-[var(--space-semantic-danger-700)]' : 'border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'}`}>{option}</button>)}</div>}
      {result != null && <div className={`mt-5 rounded-xl p-4 text-sm ${result ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_10%,transparent)] text-[var(--space-semantic-danger-700)]'}`}><strong>{result ? 'Correct.' : `Correct answer: ${card.title}.`}</strong><p className="mt-1 leading-5">{answerPoints(card)[0]}</p><button type="button" onClick={advance} className="mt-3 inline-flex items-center gap-1.5 font-black">Next weakest concept <ArrowRight className="h-4 w-4" /></button></div>}
    </article></main>
  </div>;
}

function MatchMode({ deckLabel, cards, scorePanel, onReview, onBack }: { deckLabel: string; cards: LearningCard[]; scorePanel: JSX.Element; onReview: (card: LearningCard, correct: boolean) => void; onBack: () => void }) {
  const [round, setRound] = useState(0);
  const matchGroups = useMemo(() => {
    const grouped = new Map<LearningCard['topic'], LearningCard[]>();
    for (const card of cards) grouped.set(card.topic, [...(grouped.get(card.topic) || []), card]);
    return [...grouped.entries()]
      .filter(([, topicCards]) => topicCards.length >= 2)
      .map(([topic, topicCards]) => ({ topic, cards: topicCards }));
  }, [cards]);
  const fallbackTopic = cards[0]?.topic;
  const activeGroup = matchGroups.length
    ? matchGroups[round % matchGroups.length]
    : { topic: fallbackTopic, cards: fallbackTopic ? cards.filter((card) => card.topic === fallbackTopic) : [] };
  const roundCards = useMemo(() => shuffled(activeGroup.cards).slice(0, Math.min(6, activeGroup.cards.length)), [activeGroup.cards, round]);
  const definitions = useMemo(() => shuffled(roundCards), [roundCards]);
  const topicLabel = activeGroup.topic ? topicGroupMeta(activeGroup.topic).label : 'Focused review';
  const [left, setLeft] = useState<string | null>(null);
  const [right, setRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000); return () => window.clearInterval(timer); }, [round]);
  useEffect(() => {
    if (!left || !right) return;
    if (left === right) {
      const card = roundCards.find((item) => item.id === left)!;
      setMatched((current) => new Set(current).add(left));
      onReview(card, true);
    } else setMistakes((value) => value + 1);
    const timer = window.setTimeout(() => { setLeft(null); setRight(null); }, 350);
    return () => window.clearTimeout(timer);
  }, [left, right]);
  const complete = matched.size === roundCards.length;
  const restart = () => { setRound((value) => value + 1); setLeft(null); setRight(null); setMatched(new Set()); setMistakes(0); setSeconds(0); };

  return <div className="flex min-h-full flex-col bg-[var(--space-surface-page)] [&_button]:min-h-11"><StudyHeader title={`${deckLabel} · Match`} subtitle="Connect concepts and explanations from one topic at a time" onBack={onBack} /><main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 p-4 sm:p-6">{scorePanel}<div className="flex items-center justify-between gap-3 rounded-xl bg-[var(--space-surface-card)] px-4 py-2 text-xs font-bold text-[var(--space-text-secondary)]"><span className="min-w-0 truncate text-[var(--space-text-brand)]">{topicLabel}</span><span className="inline-flex shrink-0 items-center gap-1.5"><Clock3 className="h-4 w-4" />{seconds}s · {mistakes} mistakes</span></div>
    {complete ? <div className="rounded-3xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-8 text-center shadow-lg"><Trophy className="mx-auto h-10 w-10 text-[var(--space-semantic-warning-500)]" /><h2 className="mt-4 text-2xl font-black text-[var(--space-text-primary)]">Round complete in {seconds}s</h2><p className="mt-2 text-sm text-[var(--space-text-muted)]">You matched one coherent {topicLabel} set. The next round moves to another topic.</p><button type="button" onClick={restart} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-5 py-3 text-sm font-bold text-[var(--space-text-on-primary)]"><RefreshCw className="h-4 w-4" />Next topic round</button></div> : <div className="grid gap-3 md:grid-cols-2"><div className="space-y-2">{roundCards.map((card) => <button key={card.id} type="button" disabled={matched.has(card.id)} onClick={() => setLeft(card.id)} className={`w-full rounded-xl border p-3 text-left text-xs font-bold transition ${matched.has(card.id) ? 'invisible' : left === card.id ? 'border-[var(--space-brand-primary-500)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-primary)] hover:border-[var(--space-brand-primary-200)]'}`}>{card.title}</button>)}</div><div className="space-y-2">{definitions.map((card) => <button key={card.id} type="button" disabled={matched.has(card.id)} onClick={() => setRight(card.id)} className={`w-full rounded-xl border p-3 text-left text-xs leading-5 transition ${matched.has(card.id) ? 'invisible' : right === card.id ? 'border-[var(--space-brand-primary-500)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-200)]'}`}>{card.front}</button>)}</div></div>}
  </main></div>;
}
