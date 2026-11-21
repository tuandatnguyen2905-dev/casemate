// Case Drill → Charts: practice-mode chooser and Audio Mode.
// Audio Mode plays pre-generated narration (Context, Question) for the drill on
// screen. Audio is only played when the stored source/script hashes match the
// live question, so an edited question never plays stale narration; it falls
// back to the transcript, with Switch to text always one tap away.
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, FileText, Headphones, Loader2, Pause, Play, RotateCcw, ScrollText } from 'lucide-react';
import BrandLogoMark from './BrandLogoMark';
import { presentLibraryQuestion } from '../lib/learnerContentPresentation';
import { clarifyUnitText, clarifyUnitsDeep } from '../lib/unitLabels';
import { journeyFor } from '../lib/caseJourneys';
import {
  buildChartNarration,
  chartNarrationSource,
  type ChartNarration,
  type ChartNarrationSegmentKind,
} from '../lib/chartNarration';
import type { ChartNarrationAudioEntry } from '../lib/chartNarrationAudio';

export type ChartsPracticeMode = 'chooser' | 'text' | 'audio';

const NARRATION_DEPS = {
  clarifyUnitsDeep,
  clarifyUnitText,
  present: presentLibraryQuestion,
  journeyFor,
};

const SPEEDS = [1, 1.25, 1.5, 2, 0.75];

let audioManifestPromise: Promise<typeof import('../lib/chartNarrationAudio')> | null = null;
function loadAudioManifest() {
  audioManifestPromise ??= import('../lib/chartNarrationAudio').catch((error) => {
    audioManifestPromise = null;
    throw error;
  });
  return audioManifestPromise;
}

const label = 'text-[11px] font-bold uppercase tracking-[0.16em]';
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)] focus-visible:ring-offset-2';

function formatTime(seconds: number): string {
  const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  const minutes = Math.floor(safe / 60);
  return `${minutes}:${String(Math.floor(safe % 60)).padStart(2, '0')}`;
}

/* ---------------------------------------------------------------- chooser */

function ModeCard({ icon, title, body, cta, primary, disabled, onClick, testId }: { icon: ReactNode; title: string; body: string; cta: string; primary?: boolean; disabled?: boolean; onClick: () => void; testId: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group flex min-h-48 flex-col rounded-2xl border-2 p-5 text-left transition-all sm:p-6 ${focusRing} ${primary ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] shadow-[0_8px_24px_color-mix(in_srgb,var(--space-brand-primary-500)_14%,transparent)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary-500)]'} ${disabled ? 'cursor-wait opacity-60' : 'hover:-translate-y-0.5 hover:shadow-lg'}`}
      data-testid={testId}
    >
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${primary ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'}`}>{icon}</span>
      <span className="mt-4 text-lg font-extrabold text-[var(--space-text-primary)]">{title}</span>
      <span className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{body}</span>
      <span className={`mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold ${primary ? 'text-[var(--space-text-brand)]' : 'text-[var(--space-text-secondary)] group-hover:text-[var(--space-text-brand)]'}`}>
        {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </button>
  );
}

export function ChartsModeChooser({ onAudio, onText, onBack, loading = false }: { onAudio: () => void; onText: () => void; onBack: () => void; loading?: boolean }) {
  return (
    <div className="-mx-3 -my-4 min-h-full bg-[var(--space-surface-page)] sm:-mx-6 lg:-mx-8" data-testid="charts-mode-chooser">
      <header className="flex items-center justify-between gap-3 border-b border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 text-[var(--space-text-brand)]">
          <BrandLogoMark size={26} color="var(--space-brand-primary)" />
          <span className="text-base font-extrabold tracking-tight text-[var(--space-text-primary)]">Casemate</span>
        </div>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">Case Drill · Charts</span>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
        <button type="button" onClick={onBack} className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-semibold text-[var(--space-text-secondary)] hover:text-[var(--space-text-brand)] ${focusRing}`} data-testid="charts-chooser-back">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Case Drill
        </button>
        <p className={`mt-6 ${label} text-[var(--space-text-brand)]`}>Chart drills</p>
        <h1 className="mt-2 text-2xl font-extrabold leading-tight text-[var(--space-text-primary)] sm:text-3xl">How would you like to practice Charts?</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)] sm:text-base">Choose a mode to start. You can switch while you practice.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ModeCard
            primary
            icon={<Headphones className="h-6 w-6" aria-hidden="true" />}
            title="Audio Mode"
            body="Listen to the case and question, then answer."
            cta="Start in Audio Mode"
            disabled={loading}
            onClick={onAudio}
            testId="charts-mode-audio"
          />
          <ModeCard
            icon={<FileText className="h-6 w-6" aria-hidden="true" />}
            title="Text Mode"
            body="Read the context and question in the usual drill layout."
            cta="Start in Text Mode"
            disabled={loading}
            onClick={onText}
            testId="charts-mode-text"
          />
        </div>
        <p className="mt-5 text-center text-xs font-medium text-[var(--space-text-muted)]" aria-live="polite">
          {loading ? 'Loading your saved progress…' : 'Select a mode to continue.'}
        </p>
      </main>
    </div>
  );
}

/** Compact mode picker shown on the Case Drill home when the learner left the chooser without picking. */
export function ChartsModePicker({ onAudio, onText, loading = false }: { onAudio: () => void; onText: () => void; loading?: boolean }) {
  return (
    <section className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="charts-mode-picker">
      <p className={`${label} text-[var(--space-text-brand)]`}>Chart drills</p>
      <h3 className="mt-1 text-lg font-bold text-[var(--space-text-primary)]">How would you like to practice Charts?</h3>
      <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">Choose a mode to start. You can switch while you practice.</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={onAudio} disabled={loading} className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 text-sm font-bold text-[var(--space-text-on-primary)] ${focusRing} ${loading ? 'opacity-60' : ''}`} data-testid="charts-picker-audio">
          <Headphones className="h-4 w-4" aria-hidden="true" /> Audio Mode
        </button>
        <button type="button" onClick={onText} disabled={loading} className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 text-sm font-bold text-[var(--space-text-primary)] hover:border-[var(--space-brand-primary-500)] ${focusRing} ${loading ? 'opacity-60' : ''}`} data-testid="charts-picker-text">
          <FileText className="h-4 w-4" aria-hidden="true" /> Text Mode
        </button>
      </div>
    </section>
  );
}

/** Mode row above the Charts list: which mode new drills open in, and the switch. */
export function ChartsModeBanner({ mode, onSwitch }: { mode: 'text' | 'audio'; onSwitch: (mode: 'text' | 'audio') => void }) {
  const audio = mode === 'audio';
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2" data-testid="charts-mode-banner">
      <p className="flex min-w-0 items-center gap-2 text-xs leading-5 text-[var(--space-text-secondary)]">
        {audio ? <Headphones className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" aria-hidden="true" /> : <FileText className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" aria-hidden="true" />}
        <span><span className="font-bold text-[var(--space-text-primary)]">{audio ? 'Audio Mode' : 'Text Mode'}</span> · {audio ? 'drills open with case narration.' : 'drills open in the usual reading layout.'}</span>
      </p>
      <ChartsModeSwitchButton target={audio ? 'text' : 'audio'} onClick={() => onSwitch(audio ? 'text' : 'audio')} />
    </div>
  );
}

export function ChartsModeSwitchButton({ target, onClick, className = '' }: { target: 'text' | 'audio'; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 text-xs font-bold text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)] hover:text-[var(--space-text-brand)] ${focusRing} ${className}`}
      data-testid={target === 'audio' ? 'charts-switch-to-audio' : 'charts-switch-to-text'}
    >
      {target === 'audio' ? <Headphones className="h-3.5 w-3.5" aria-hidden="true" /> : <FileText className="h-3.5 w-3.5" aria-hidden="true" />}
      {target === 'audio' ? 'Switch to audio' : 'Switch to text'}
    </button>
  );
}

/* ------------------------------------------------------- audio exercise page */

export function ChartsAudioHeader({ title, meta, onBackToLibrary, onSwitchToText }: { title: string; meta?: ReactNode; onBackToLibrary: () => void; onSwitchToText: () => void }) {
  return (
    <div data-testid="charts-audio-header">
      <button type="button" onClick={onBackToLibrary} className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg text-xs font-semibold text-[var(--space-text-secondary)] hover:text-[var(--space-text-brand)] ${focusRing}`} data-testid="charts-audio-back-library">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Charts library
      </button>
      <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <h1 className="min-w-0 break-words text-lg font-extrabold leading-7 text-[var(--space-text-primary)] sm:flex-1 sm:text-xl">{title}</h1>
        <div className="flex shrink-0 items-center gap-2">
          <span className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-[var(--space-brand-primary-600)] px-3 text-xs font-bold text-[var(--space-text-on-primary)]" aria-current="true" data-testid="charts-audio-mode-chip">
            <Headphones className="h-3.5 w-3.5" aria-hidden="true" /> Audio Mode
          </span>
          <ChartsModeSwitchButton target="text" onClick={onSwitchToText} />
        </div>
      </div>
      {meta ? <div className="mt-1.5 flex flex-wrap items-center gap-2">{meta}</div> : null}
    </div>
  );
}

/** Player, then exhibits (left) beside a sticky question + answer panel (right); stacked on mobile. */
export function ChartsAudioLayout({ header, player, exhibits, panel, after }: { header: ReactNode; player: ReactNode; exhibits: ReactNode; panel: ReactNode; after?: ReactNode }) {
  return (
    <div className="mt-2" data-testid="charts-audio-page">
      {header}
      <div className="mt-3">{player}</div>
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(340px,1fr)] lg:items-start" data-testid="charts-audio-columns">
        <div className="min-w-0" data-testid="charts-audio-exhibits">{exhibits}</div>
        <aside className="min-w-0 lg:sticky lg:top-3 lg:max-h-[calc(100vh-1.5rem)] lg:overflow-y-auto" aria-label="Question and answer" data-testid="charts-audio-panel">{panel}</aside>
      </div>
      {after ? <div className="mt-4">{after}</div> : null}
    </div>
  );
}

/** Question prompt shown beside the chart in Audio Mode (the long context stays in the player transcript). */
export function ChartsAudioQuestion({ task, notes }: { task: string; notes?: string[] }) {
  return (
    <div data-testid="charts-audio-question">
      <p className={`${label} text-[var(--space-text-brand)]`}>Question</p>
      <p className="mt-1 break-words text-[15px] font-semibold leading-6 text-[var(--space-text-primary)]">{task}</p>
      {(notes || []).filter(Boolean).map((line) => <p key={line} className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">{line}</p>)}
    </div>
  );
}

type NarrationStatus = 'loading' | 'ready' | 'stale' | 'missing' | 'blocked';

interface ResolvedNarration {
  narration: ChartNarration;
  status: NarrationStatus;
  urls: Partial<Record<ChartNarrationSegmentKind, { url: string; durationMs: number }>>;
}

function resolveNarration(narration: ChartNarration, entry: ChartNarrationAudioEntry | null | undefined, base: string, loaded: boolean): ResolvedNarration {
  if (!narration.validation.ok) return { narration, status: 'blocked', urls: {} };
  if (!loaded) return { narration, status: 'loading', urls: {} };
  if (!entry) return { narration, status: 'missing', urls: {} };
  if (entry.v !== narration.version || entry.s !== narration.sourceHash) return { narration, status: 'stale', urls: {} };
  const urls: ResolvedNarration['urls'] = {};
  for (const segment of narration.segments) {
    const stored = segment.kind === 'context' ? entry.c : entry.q;
    if (!stored || stored.h !== segment.scriptHash) return { narration, status: 'stale', urls: {} };
    urls[segment.kind] = { url: `${base}${stored.u}`, durationMs: stored.d };
  }
  return { narration, status: 'ready', urls };
}

export function useChartNarration(question: any): ResolvedNarration {
  const narration = useMemo(() => buildChartNarration(chartNarrationSource(question, NARRATION_DEPS)), [question]);
  const [manifest, setManifest] = useState<{ entry: ChartNarrationAudioEntry | null; base: string } | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setManifest(null);
    setFailed(false);
    loadAudioManifest()
      .then((module) => { if (!cancelled) setManifest({ entry: module.CHART_NARRATION_AUDIO[narration.id] || null, base: module.CHART_NARRATION_AUDIO_BASE }); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [narration.id]);
  if (failed) return { narration, status: 'missing', urls: {} };
  return resolveNarration(narration, manifest?.entry, manifest?.base || '', Boolean(manifest));
}

const UNAVAILABLE_COPY: Record<Exclude<NarrationStatus, 'ready' | 'loading'>, string> = {
  stale: 'This exercise was updated after its narration was recorded, so the audio is being refreshed. Read the transcript below, or switch to text.',
  missing: 'Narration for this exercise is not available yet. Read the transcript below, or switch to text.',
  blocked: 'Narration for this exercise is on hold while its script is checked. Read the transcript below, or switch to text.',
};

export function ChartsNarrationPlayer({ question, onSwitchToText }: { question: any; onSwitchToText: () => void }) {
  const { narration, status, urls } = useChartNarration(question);
  const segments = narration.segments;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAfterLoadRef = useRef(false);
  const [activeKind, setActiveKind] = useState<ChartNarrationSegmentKind>(segments[0].kind);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const ready = status === 'ready' && !playbackError;
  const unavailable = status !== 'ready' && status !== 'loading';
  const transcriptOpen = showTranscript || unavailable || playbackError;
  const active = segments.find((segment) => segment.kind === activeKind) || segments[0];
  const activeUrl = urls[active.kind];
  const speed = SPEEDS[speedIndex];

  useEffect(() => {
    setActiveKind(segments[0].kind);
    setPlaying(false);
    setCurrentTime(0);
    setPlaybackError(false);
    playAfterLoadRef.current = false;
  }, [narration.id]);

  useEffect(() => {
    setDuration(activeUrl ? activeUrl.durationMs / 1000 : 0);
    setCurrentTime(0);
  }, [activeUrl?.url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = speed;
  }, [speed, activeUrl?.url]);

  // Leaving the exercise or switching to Text Mode unmounts the player: stop and release the audio.
  useEffect(() => () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
  }, []);

  const fail = () => {
    setPlaybackError(true);
    setPlaying(false);
    playAfterLoadRef.current = false;
  };

  const startPlayback = () => {
    const audio = audioRef.current;
    if (!audio || !activeUrl) return;
    audio.playbackRate = speed;
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch((error: unknown) => { if ((error as { name?: string })?.name !== 'AbortError') fail(); });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    if (audio.paused) startPlayback();
    else audio.pause();
  };

  const replay = () => {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    startPlayback();
  };

  const selectSegment = (kind: ChartNarrationSegmentKind) => {
    if (kind === activeKind) {
      replay();
      return;
    }
    playAfterLoadRef.current = playing;
    setActiveKind(kind);
  };

  const onLoaded = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration);
    audio.playbackRate = speed;
    if (playAfterLoadRef.current) {
      playAfterLoadRef.current = false;
      startPlayback();
    }
  };

  const onEnded = () => {
    setPlaying(false);
    const index = segments.findIndex((segment) => segment.kind === activeKind);
    const next = segments[index + 1];
    if (next) {
      playAfterLoadRef.current = true;
      setActiveKind(next.kind);
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const statusText = status === 'loading'
    ? 'Loading narration…'
    : playbackError
      ? 'The narration could not be played. The transcript is open below, or switch to text.'
      : unavailable
        ? UNAVAILABLE_COPY[status as keyof typeof UNAVAILABLE_COPY]
        : '';

  return (
    <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 shadow-sm sm:p-4" aria-label="Case narration" data-testid="charts-narration-player" data-narration-status={playbackError ? 'error' : status}>
      {activeUrl ? (
        <audio
          ref={audioRef}
          src={activeUrl.url}
          preload="metadata"
          onLoadedMetadata={onLoaded}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={onEnded}
          onError={fail}
          data-testid="charts-narration-audio"
        />
      ) : null}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex items-center gap-2">
          <Headphones className="h-4 w-4 text-[var(--space-text-brand)]" aria-hidden="true" />
          <p className={`${label} text-[var(--space-text-primary)]`}>Case narration</p>
        </div>
        <div className="flex rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-0.5" role="tablist" aria-label="Narration segments">
          {segments.map((segment) => (
            <button
              key={segment.kind}
              type="button"
              role="tab"
              aria-selected={segment.kind === activeKind}
              onClick={() => selectSegment(segment.kind)}
              className={`min-h-9 rounded-md px-3 text-xs font-bold transition-colors ${focusRing} ${segment.kind === activeKind ? 'bg-[var(--space-surface-card)] text-[var(--space-text-brand)] shadow-sm' : 'text-[var(--space-text-secondary)] hover:text-[var(--space-text-primary)]'}`}
              data-testid={`charts-narration-tab-${segment.kind}`}
            >
              {segment.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowTranscript((open) => !open)}
          aria-expanded={transcriptOpen}
          className={`ml-auto inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold text-[var(--space-text-brand)] hover:underline ${focusRing}`}
          data-testid="charts-narration-transcript-toggle"
        >
          <ScrollText className="h-3.5 w-3.5" aria-hidden="true" /> {transcriptOpen ? 'Hide transcript' : 'Show transcript'}
        </button>
      </div>

      <div className="mt-2 flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={togglePlay}
          disabled={!ready}
          aria-label={playing ? `Pause ${active.label.toLowerCase()} narration` : `Play ${active.label.toLowerCase()} narration`}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)] shadow-sm ${focusRing} ${ready ? 'hover:bg-[var(--space-brand-primary-700)]' : 'cursor-not-allowed opacity-50'}`}
          data-testid="charts-narration-play"
        >
          {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : playing ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="ml-0.5 h-5 w-5" aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={replay}
          disabled={!ready}
          aria-label={`Replay ${active.label.toLowerCase()} narration`}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--space-border-default)] text-[var(--space-text-secondary)] ${focusRing} ${ready ? 'hover:border-[var(--space-brand-primary-500)] hover:text-[var(--space-text-brand)]' : 'cursor-not-allowed opacity-50'}`}
          data-testid="charts-narration-replay"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
        <input
          type="range"
          min={0}
          max={Math.max(duration, 0.1)}
          step={0.1}
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => seek(Number(event.target.value))}
          disabled={!ready}
          aria-label={`Seek ${active.label.toLowerCase()} narration`}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          className="h-2 min-w-0 flex-1 cursor-pointer accent-[var(--space-brand-primary-600)] disabled:cursor-not-allowed"
          data-testid="charts-narration-seek"
        />
        <span className="shrink-0 text-[11px] font-semibold tabular-nums text-[var(--space-text-muted)]" data-testid="charts-narration-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
        <button
          type="button"
          onClick={() => setSpeedIndex((index) => (index + 1) % SPEEDS.length)}
          aria-label={`Playback speed ${speed} times. Change speed`}
          className={`inline-flex min-h-9 min-w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--space-border-default)] px-2 text-xs font-bold tabular-nums text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)] ${focusRing}`}
          data-testid="charts-narration-speed"
        >
          {Number.isInteger(speed) ? speed.toFixed(1) : String(speed)}x
        </button>
      </div>

      {statusText ? (
        <div className={`mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs leading-5 ${unavailable || playbackError ? 'border border-[var(--space-semantic-warning)] bg-[var(--space-semantic-warning-50)] text-[var(--space-text-primary)]' : 'text-[var(--space-text-muted)]'}`} role={unavailable || playbackError ? 'alert' : 'status'} data-testid="charts-narration-status">
          <p className="flex min-w-0 items-start gap-1.5">
            {unavailable || playbackError ? <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--space-semantic-warning-700)]" aria-hidden="true" /> : null}
            <span>{statusText}</span>
          </p>
          {unavailable || playbackError ? <ChartsModeSwitchButton target="text" onClick={onSwitchToText} /> : null}
        </div>
      ) : null}

      {transcriptOpen ? (
        <div className="mt-3 grid gap-3 border-t border-[var(--space-border-default)] pt-3 md:grid-cols-2" data-testid="charts-narration-transcript">
          {segments.map((segment) => (
            <div key={segment.kind} className="min-w-0" data-testid={`charts-transcript-${segment.kind}`}>
              <p className={`${label} text-[var(--space-text-brand)]`}>{segment.label}</p>
              <div className="mt-1 space-y-1.5">
                {segment.transcript.map((line, index) => <p key={`${segment.kind}-${index}`} className="break-words text-xs leading-5 text-[var(--space-text-secondary)]">{line}</p>)}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
