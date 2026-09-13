import { useState, Suspense, LazyExoticComponent, ComponentType, useEffect, useRef, useMemo, useCallback, Component, ErrorInfo, ReactNode } from 'react';
import { Bot, Folder, X, Plus, Menu, PanelLeftClose, PanelLeftOpen, ChevronLeft, Activity, Maximize2, Minimize2, Moon, Heart, Calendar, Users, FileText, BarChart, Settings as SettingsIcon, ArrowUp, MessageCircle, ChevronUp, Plane, TrendingUp, LineChart, Dumbbell, Brain, Target, Zap, Star, Clock, CheckCircle, List, BookOpen, Coffee, Music, Camera, MapPin, Wallet, ShoppingCart, Gift, Lightbulb, Sparkles, Rocket, Home, Building, Globe, Mail, Phone, Video, Mic, Image, Play, Pause, Volume2, Wifi, Cloud, Sun, Umbrella, Thermometer, Wind, Droplets, Leaf, Flower2, Mountain, Waves, Compass, Map, Navigation, Car, Bike, Ship, Award, Trophy, Medal, Crown, Diamond, Gem, Key, Lock, Unlock, Shield, Eye, Search, Filter, SortAsc, Download, Upload, Share2, Link, ExternalLink, Copy, Clipboard, Trash2, Edit, Pencil, PenTool, Scissors, Bookmark, Flag, Bell, AlertCircle, Info, HelpCircle, XCircle, CheckCircle2, Circle, Square, Triangle, Hexagon, Octagon, Hash, AtSign, DollarSign, Percent, Calculator, Code, Terminal, Database, Server, Cpu, Monitor, Smartphone, Tablet, Laptop, Watch, Headphones, Speaker, Radio, Tv, Printer, Scan, QrCode, Barcode, CreditCard, Receipt, Banknote, PiggyBank, TrendingDown, AreaChart, PieChart, ClipboardList } from 'lucide-react';
import type { SpaceConfig, DesktopBranding, DesktopThemeTokens } from './types';
import { useSpaceRuntime } from './SpaceRuntimeContext';
import AgentChat from './components/AgentChat';
import FileBrowser from './components/FileBrowser';
import EmailGate from './components/EmailGate';
import Settings from './components/Settings';
import { isTenantDelegationCanvas } from './lib/tenant-delegation-canvas';
import { isFounderEmailSession } from './lib/founderAccess';
import ViewportToastHost from './components/ViewportToast';
import FloatingFeedbackWidget from './components/FloatingFeedbackWidget';
import BrandSplash from './components/BrandSplash';
import BrandLogoMark from './components/BrandLogoMark';
import { applyBrandLoaderSplash } from './lib/loaderSplash';
import { CasemateEntitlement, fetchCasemateEntitlement } from './lib/proAccess';
import { useSessionDurationTracking } from './hooks/useSessionDurationTracking';

// The compiled bundle paints its own loading shell, with a loading message in
// it, before any of this evaluates. Take it over on the first tick we control
// so the whole wait is the branded splash instead.
applyBrandLoaderSplash();

// v4: agent-first shell (thread sidebar + primary chat + side app panel).
const DESKTOP_VERSION = 4;

// Canonical primary thread id — mirrors PRIMARY_THREAD_ID on the server.
const PRIMARY_THREAD_ID = 'main';
const THREAD_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

// --- Casemate feedback prompt (v1.1) ---------------------------------------
// After ~15 minutes of CUMULATIVE active use (persisted across visits), the
// compact floating feedback form opens automatically. Shown at most ONCE per
// device, never after a submission, and never blocks anything — closing the
// tab early just resumes the count on the next visit.
const FEEDBACK_APP_ID = 'feedback';
const FEEDBACK_PROMPT_SECONDS = 15 * 60;
const FEEDBACK_TICK_MS = 15000;
const FEEDBACK_ACTIVE_SECONDS_KEY = 'casemate-feedback-active-seconds-v1';
const FEEDBACK_PROMPT_SHOWN_KEY = 'casemate-feedback-prompt-shown-v1';
const FEEDBACK_SUBMITTED_KEY = 'casemate-feedback-submitted-v1';

// Keep every destination's purpose visible in the journey navigation. These
// labels belong to the shell rather than the individual apps so app behavior
// remains unchanged while the path through Casemate stays clear.
const APP_NAV_LABELS: Record<string, string> = {
  'fit-assessment': 'Assess your CV, preferences, OCP & MBTI',
  'browse-programs': 'Explore open programs',
  'my-roadmap': 'Your personalized preparation plan',
  'case-drill-log': 'Full case library',
  'case-drill': 'Rapid case practice',
  'industry-knowledge': 'Industry knowledge library',
  'aptitude-test': 'Practice aptitude tests',
  feedback: 'Share feedback',
};
const START_HERE_APP_ID = 'fit-assessment';

// A customer must never see raw agent scaffolding as a conversation title.
// Thread titles derive from each thread's first user message, but the very
// first "message" on the primary thread is the auto-sent [SYSTEM: …] greeting
// instruction — machine-facing text, not human copy. Treat any title that
// looks like internal scaffolding (SYSTEM markers, JSON/bracket payloads) as
// unusable and fall back to a friendly default instead.
function isInternalThreadTitle(value: unknown): boolean {
  if (typeof value !== 'string') return true;
  const t = value.trim();
  if (!t) return true;
  if (/^\[?\s*SYSTEM\s*:/i.test(t)) return true;
  if (t.startsWith('{') || t.startsWith('[')) return true;
  return false;
}

function sanitizeThreadTitle(value: unknown, fallback: string): string {
  return isInternalThreadTitle(value) ? fallback : (value as string).trim();
}

// Hook to detect mobile vs desktop using JS (prevents double-mounting of components)
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768; // md breakpoint
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

interface AppErrorBoundaryProps {
  appName?: string;
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  retryKey: number;
}

class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, retryKey: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<AppErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[AppErrorBoundary] App "${this.props.appName || 'unknown'}" crashed:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: 'var(--space-text-primary)' }}>
            {this.props.appName ? `"${this.props.appName}" failed to load` : 'App failed to load'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--space-text-muted)', marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px' }}>
            {this.state.error?.message || 'An unexpected error occurred while loading this app.'}
          </p>
          <button
            onClick={() => {
              this.setState((prev) => ({ hasError: false, error: null, retryKey: prev.retryKey + 1 }));
            }}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: '1px solid var(--space-border-default)',
              background: 'var(--space-surface-card)',
              color: 'var(--space-text-primary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            ↻ Retry
          </button>
        </div>
      );
    }
    return <div key={this.state.retryKey}>{this.props.children}</div>;
  }
}

function buildFontFamily(fontName?: string): string {
  if (!fontName) {
    return '"Outfit", system-ui, -apple-system, sans-serif';
  }

  return `"${fontName}", system-ui, -apple-system, sans-serif`;
}

function resolveGenesisRuntimeTheme(config: SpaceConfig) {
  const branding = (config.desktop?.branding || {}) as DesktopBranding;
  const themeTokens = (config.desktop?.themeTokens || {}) as DesktopThemeTokens;
  const headingFont =
    themeTokens.typography?.headingFont ||
    branding.headingFont ||
    'Outfit';
  const bodyFont =
    themeTokens.typography?.bodyFont ||
    branding.bodyFont ||
    headingFont;
  const shellTheme = {
    ...themeTokens.shell,
    accentColor: themeTokens.shell?.accentColor || config.desktop?.theme?.accentColor,
    dockStyle: themeTokens.shell?.dockStyle || config.desktop?.theme?.dockStyle,
  };

  return {
    branding: {
      name: branding.name || config.name || 'Welcome',
      tagline: branding.tagline,
      logoUrl:
        branding.logoUrl ||
        (config as any).iconUrl ||
        (config as any).logoUrl,
      heroVideoUrl:
        branding.heroVideoUrl ||
        (config as any).heroVideoUrl ||
        (config as any).brandAssets?.heroVideoUrl,
    },
    themeTokens: {
      palette: themeTokens.palette || branding.palette || branding.colors,
      typography: {
        headingFont,
        bodyFont,
        fontFamily:
          themeTokens.typography?.fontFamily || buildFontFamily(headingFont),
      },
      shell: shellTheme,
      cssVariables: themeTokens.cssVariables || {},
    },
  };
}

// Icon mapping for app icons - supports both PascalCase and lowercase
const baseIconMap: Record<string, ComponentType<any>> = {
  Activity, Moon, Heart, Calendar, Users, FileText, BarChart, Bot, Folder,
  Plane, TrendingUp, LineChart, Dumbbell, Brain, Target, Zap, Star, Clock,
  CheckCircle, List, BookOpen, Coffee, Music, Camera, MapPin, Wallet,
  ShoppingCart, Gift, Lightbulb, Sparkles, Rocket, Home, Building, Globe,
  Mail, Phone, Video, Mic, Image, Play, Pause, Volume2, Wifi, Cloud, Sun,
  Umbrella, Thermometer, Wind, Droplets, Leaf, Mountain, Waves, Compass,
  Map, Navigation, Car, Bike, Ship, Award, Trophy, Medal, Crown, Diamond,
  Gem, Key, Lock, Unlock, Shield, Eye, Search, Filter, SortAsc, Download,
  Upload, Share2, Link, ExternalLink, Copy, Clipboard, Trash2, Edit, Pencil,
  PenTool, Scissors, Bookmark, Flag, Bell, AlertCircle, Info, HelpCircle,
  XCircle, CheckCircle2, Circle, Square, Triangle, Hexagon, Octagon, Hash,
  AtSign, DollarSign, Percent, Calculator, Code, Terminal, Database, Server,
  Cpu, Monitor, Smartphone, Tablet, Laptop, Watch, Headphones, Speaker,
  Radio, Tv, Printer, Scan, QrCode, Barcode, CreditCard, Receipt, Banknote,
  PiggyBank, TrendingDown, AreaChart, PieChart, Flower2, ClipboardList,
};

// Create case-insensitive lookup with common aliases
const iconMap: Record<string, ComponentType<any>> = {};
Object.entries(baseIconMap).forEach(([key, value]) => {
  iconMap[key] = value;
  iconMap[key.toLowerCase()] = value;
  // Handle kebab-case (e.g., "line-chart" -> LineChart)
  const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  iconMap[kebabKey] = value;
});
// Common aliases
iconMap['chart'] = BarChart;
iconMap['graph'] = LineChart;
iconMap['workout'] = Dumbbell;
iconMap['fitness'] = Dumbbell;
iconMap['gym'] = Dumbbell;
iconMap['stock'] = TrendingUp;
iconMap['stocks'] = TrendingUp;
iconMap['trip'] = Plane;
iconMap['travel'] = Plane;
iconMap['flight'] = Plane;
iconMap['money'] = Wallet;
iconMap['finance'] = DollarSign;
iconMap['health'] = Heart;
iconMap['wellness'] = Heart;
iconMap['notes'] = FileText;
iconMap['note'] = FileText;
iconMap['log'] = List;
iconMap['tracker'] = Activity;
iconMap['tracking'] = Activity;
iconMap['ai'] = Sparkles;
iconMap['smart'] = Brain;
iconMap['idea'] = Lightbulb;
iconMap['ideas'] = Lightbulb;
iconMap['time'] = Clock;
iconMap['schedule'] = Calendar;
iconMap['event'] = Calendar;
iconMap['events'] = Calendar;
iconMap['people'] = Users;
iconMap['team'] = Users;
iconMap['community'] = Users;
iconMap['book'] = BookOpen;
iconMap['read'] = BookOpen;
iconMap['reading'] = BookOpen;
iconMap['shop'] = ShoppingCart;
iconMap['shopping'] = ShoppingCart;
iconMap['cart'] = ShoppingCart;
iconMap['location'] = MapPin;
iconMap['place'] = MapPin;
iconMap['weather'] = Cloud;
iconMap['photo'] = Camera;
iconMap['photos'] = Camera;
iconMap['video'] = Video;
iconMap['movie'] = Play;
iconMap['audio'] = Music;
iconMap['sound'] = Volume2;
iconMap['call'] = Phone;
iconMap['email'] = Mail;
iconMap['message'] = MessageCircle;
iconMap['messages'] = MessageCircle;
iconMap['chat'] = MessageCircle;
iconMap['settings'] = SettingsIcon;
iconMap['config'] = SettingsIcon;
iconMap['gear'] = SettingsIcon;

interface SpaceDesktopProps {
  mode: 'entrepreneur' | 'customer';
  spaceId: string;
  sessionId?: string;
  config: SpaceConfig;
  apps: Record<string, LazyExoticComponent<any>>;
  LoadingSpinner: ComponentType;
  initialAppId?: string | null;
}

// Right-panel identifier: 'files' | 'settings' | app id.
type PanelId = 'files' | 'settings' | string;

function hashAppId(hash: string): string {
  return hash.replace(/^#/, '').split('/')[0].toLowerCase();
}

interface FileAccessLog {
  timestamp: number;
  path: string;
  action: 'read' | 'write';
  tool: string;
}

interface ThreadSummary {
  threadId: string;
  title: string;
  messageCount: number;
  lastMessageAt: string | null;
  createdAt: string | null;
}

function makeThreadId(): string {
  return `thr_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export default function SpaceDesktop({
  mode,
  spaceId,
  sessionId: _unusedProp, // Ignore prop, read from context instead
  config,
  apps,
  LoadingSpinner,
  initialAppId
}: SpaceDesktopProps) {
  const { sessionId, email, isBootstrappingSession, trackEvent, checkRoleAccess } = useSpaceRuntime();
  const { recordAppOpen } = useSessionDurationTracking({
    enabled: mode === 'customer' && !!sessionId,
    spaceId,
    workspaceSessionId: sessionId,
  });
  const [shellEntitlement, setShellEntitlement] = useState<CasemateEntitlement | null>(null);
  const isMobile = useIsMobile(); // JS-based media query to prevent double-mounting AgentChat

  useEffect(() => {
    let cancelled = false;
    if (mode !== 'customer' || !sessionId) {
      setShellEntitlement(null);
      return;
    }
    void fetchCasemateEntitlement(sessionId, { claim: false }).then((result) => {
      if (!cancelled) setShellEntitlement(result);
    });
    return () => { cancelled = true; };
  }, [mode, sessionId]);

  const shellTrialType = shellEntitlement?.trialType || (shellEntitlement?.subscription_type === 'pro' ? 'pro' : shellEntitlement?.entitled ? 'standard' : 'expired');
  const shellDaysRemaining = Math.max(0, shellEntitlement?.daysRemaining ?? shellEntitlement?.days_remaining ?? 0);
  const showTrialReminder = shellEntitlement?.entitled === true && shellTrialType !== 'pro' && shellDaysRemaining <= 3;

  // Role-gated app registry: apps registered with `allowedRoles` in
  // config.json are hidden from customers everywhere the sidebar renders.
  const visibleApps = config.apps.filter(app => {
    const allowedRoles = (app as any).allowedRoles as string[] | undefined;
    if (checkRoleAccess(allowedRoles)) return true;
    return !!allowedRoles && allowedRoles.includes('founder') && isFounderEmailSession(spaceId);
  });
  const isFounderOnlyApp = (app: any) => {
    const allowedRoles = app.allowedRoles as string[] | undefined;
    return !!allowedRoles?.includes('founder') && allowedRoles.every(role => role === 'founder');
  };
  const journeyApps = visibleApps.filter(app => !isFounderOnlyApp(app));
  const adminApps = visibleApps.filter(isFounderOnlyApp);

  // Lock body/html scroll on mobile to prevent iOS Safari from scrolling
  // the page when the keyboard opens or the address bar animates.
  useEffect(() => {
    if (!isMobile) return;
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = 'hidden';
    html.style.height = '100%';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.height = '100%';
    body.style.top = '0';
    body.style.left = '0';
    const raf = requestAnimationFrame(() => {
      body.style.opacity = '0.999';
      requestAnimationFrame(() => { body.style.opacity = ''; });
    });
    return () => {
      cancelAnimationFrame(raf);
      html.style.overflow = '';
      html.style.height = '';
      body.style.overflow = '';
      body.style.position = '';
      body.style.width = '';
      body.style.height = '';
      body.style.top = '';
      body.style.left = '';
    };
  }, [isMobile]);

  // Casemate feedback prompt (v1.1): count cumulative VISIBLE time in
  // localStorage; at ~15 minutes open the floating form once. The 'shown'
  // flag is written the moment the nudge appears so it can never nag twice.
  const [showFeedbackNudge, setShowFeedbackNudge] = useState(false);
  const hasFeedbackApp = config.apps.some(app => app.id === FEEDBACK_APP_ID);
  useEffect(() => {
    if (mode !== 'customer' || !sessionId || !hasFeedbackApp) return;
    try {
      if (
        localStorage.getItem(FEEDBACK_PROMPT_SHOWN_KEY) ||
        localStorage.getItem(FEEDBACK_SUBMITTED_KEY)
      ) {
        return;
      }
    } catch (e) {
      return; // No storage (private mode) — skip rather than risk nagging.
    }
    let finished = false;
    const timer = setInterval(() => {
      if (finished || document.visibilityState !== 'visible') return;
      let total = 0;
      try {
        total = (parseInt(localStorage.getItem(FEEDBACK_ACTIVE_SECONDS_KEY) || '0', 10) || 0) + FEEDBACK_TICK_MS / 1000;
        localStorage.setItem(FEEDBACK_ACTIVE_SECONDS_KEY, String(total));
      } catch (e) {
        return;
      }
      if (total >= FEEDBACK_PROMPT_SECONDS) {
        finished = true;
        clearInterval(timer);
        try {
          if (localStorage.getItem(FEEDBACK_SUBMITTED_KEY)) return;
          localStorage.setItem(FEEDBACK_PROMPT_SHOWN_KEY, String(Date.now()));
        } catch (e) {
          // Still show this once — worst case it reappears next visit.
        }
        setShowFeedbackNudge(true);
      }
    }, FEEDBACK_TICK_MS);
    return () => clearInterval(timer);
  }, [mode, sessionId, hasFeedbackApp]);

  // --- Shell state -----------------------------------------------------
  // The chat is ALWAYS the primary surface; apps/files/settings open in a
  // side panel next to it (never replacing it on desktop).
  const [activePanelId, setActivePanelId] = useState<PanelId | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  // Mobile: when a panel is open, chat and panel toggle full-screen.
  const [mobileView, setMobileView] = useState<'chat' | 'panel'>('chat');
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  // Papa Principle "app home" shell: true while the visitor is in the
  // app-first landing state (fully-expanded home app with branded header +
  // assistant pill). Cleared the moment they navigate anywhere else.
  const [isAppHomeShell, setIsAppHomeShell] = useState(false);
  const [fileAccessLogs, setFileAccessLogs] = useState<FileAccessLog[]>([]);
  const [pendingAgentMessage, setPendingAgentMessage] = useState<string | null>(null);
  // Casemate app-first redesign: Mate remains available from a secondary help
  // action, never as a sidebar or as the default customer surface.
  const [showMateSupport, setShowMateSupport] = useState(false);
  const [showAccountPanel, setShowAccountPanel] = useState(false);

  // --- Thread state ----------------------------------------------------
  const threadStorageKey = `space_thread_${spaceId}`;
  const [activeThreadId, setActiveThreadId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(threadStorageKey);
      if (stored && THREAD_ID_PATTERN.test(stored)) return stored;
    } catch (e) { /* ignore */ }
    return PRIMARY_THREAD_ID;
  });
  const [threads, setThreads] = useState<ThreadSummary[]>([]);
  // Thread ids the user has explicitly started this session (clicked "New
  // conversation" or sent a first message). These stay visible even when the
  // server thread list hasn't caught up yet (brand-new/empty thread), but we
  // do NOT fabricate one on first load before the user has done anything.
  const [startedThreadIds, setStartedThreadIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    try {
      localStorage.setItem(threadStorageKey, activeThreadId);
    } catch (e) { /* ignore */ }
  }, [activeThreadId, threadStorageKey]);

  // Friendly default titles: the primary conversation is "Chat with <agent>"
  // (e.g. "Chat with Mate"), secondary threads are "New conversation".
  const agentDisplayName = ((config as any)?.agent?.name as string) || 'Mate';
  const threadTitleFallback = (threadId: string) =>
    threadId === PRIMARY_THREAD_ID ? `Chat with ${agentDisplayName}` : 'New conversation';

  const canListThreads = !!sessionId && sessionId.startsWith('wses_');

  const refreshThreads = useCallback(async () => {
    if (!sessionId || !sessionId.startsWith('wses_')) return;
    try {
      const res = await fetch(
        `/api/space/${spaceId}/chat/threads?sessionId=${encodeURIComponent(sessionId)}`,
      );
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.threads)) {
        // Server titles derive from each thread's first user message, which
        // for the primary thread is the auto-sent [SYSTEM: …] greeting
        // instruction — sanitize before anything reaches the sidebar/header.
        setThreads(
          data.threads.map((t: ThreadSummary) => ({
            ...t,
            title: sanitizeThreadTitle(t.title, threadTitleFallback(t.threadId)),
          })),
        );
      }
    } catch (e) {
      console.error('[Desktop] Failed to load threads:', e);
    }
  }, [sessionId, spaceId]);

  // Load thread list on session availability and re-sync when switching
  // threads (titles derive from each thread's first user message).
  useEffect(() => {
    if (canListThreads) {
      refreshThreads();
    }
  }, [canListThreads, refreshThreads, activeThreadId]);

  // Display list: only threads that actually exist server-side (primary first),
  // plus the active thread when the user has explicitly started it (clicked
  // "New conversation" or sent a first message) but the server list hasn't
  // caught up yet. On a brand-new space with no started/real threads, the
  // sidebar stays empty instead of showing a fabricated "New conversation".
  const displayThreads = useMemo(() => {
    const main = threads.find(t => t.threadId === PRIMARY_THREAD_ID);
    const rest = threads.filter(t => t.threadId !== PRIMARY_THREAD_ID);
    const list: ThreadSummary[] = main ? [main, ...rest] : [...rest];
    if (
      startedThreadIds.has(activeThreadId) &&
      !list.some(t => t.threadId === activeThreadId)
    ) {
      const synthesized: ThreadSummary = {
        threadId: activeThreadId,
        title: 'New conversation',
        messageCount: 0,
        lastMessageAt: null,
        createdAt: null,
      };
      // Keep the freshly-started thread near the top, after the primary thread.
      if (main) list.splice(1, 0, synthesized);
      else list.unshift(synthesized);
    }
    return list;
  }, [threads, activeThreadId, startedThreadIds]);

  const selectThread = (threadId: string) => {
    if (threadId === activeThreadId) {
      setIsMobileDrawerOpen(false);
      setMobileView('chat');
      return;
    }
    setActiveThreadId(threadId);
    setIsMobileDrawerOpen(false);
    setMobileView('chat');
    trackEvent('thread_switched', { threadId });
  };

  // Auto-title threads from the first user message. The server derives
  // titles the same way for real (wses_) sessions; this local fallback makes
  // titles appear instantly and covers guest/preview sessions where the
  // server thread list isn't available.
  useEffect(() => {
    const onUserMessage = (e: Event) => {
      const detail = (e as CustomEvent).detail as { threadId?: string; content?: string } | undefined;
      const threadId = detail?.threadId;
      const content = typeof detail?.content === 'string' ? detail.content.trim() : '';
      if (!threadId || !content) return;
      // The auto-sent greeting instruction ([SYSTEM: …]) is agent scaffolding,
      // not a real user message — never title (or start) a conversation from it.
      if (isInternalThreadTitle(content)) return;
      const title = content.length > 48 ? `${content.slice(0, 48).trimEnd()}…` : content;
      setStartedThreadIds(prev => (prev.has(threadId) ? prev : new Set(prev).add(threadId)));
      setThreads(prev => {
        const existing = prev.find(t => t.threadId === threadId);
        if (existing) {
          if (existing.title && existing.title !== 'New conversation') return prev;
          return prev.map(t => (t.threadId === threadId ? { ...t, title } : t));
        }
        return [
          { threadId, title, messageCount: 1, lastMessageAt: new Date().toISOString(), createdAt: new Date().toISOString() },
          ...prev,
        ];
      });
    };
    window.addEventListener('audos:chat-user-message', onUserMessage);
    return () => window.removeEventListener('audos:chat-user-message', onUserMessage);
  }, []);

  const createThread = () => {
    const id = makeThreadId();
    setStartedThreadIds(prev => (prev.has(id) ? prev : new Set(prev).add(id)));
    setThreads(prev => [
      { threadId: id, title: 'New conversation', messageCount: 0, lastMessageAt: null, createdAt: new Date().toISOString() },
      ...prev,
    ]);
    setActiveThreadId(id);
    setIsMobileDrawerOpen(false);
    setMobileView('chat');
    trackEvent('thread_created', { threadId: id });
  };

  // Track whether hash change was triggered internally (to avoid reacting to our own updates)
  const isInternalHashChange = useRef(false);
  // Avoid clearing an app deep link before initial panel restoration commits.
  const hasRunHashSync = useRef(false);
  // Track if initial deep-link setup has been done
  const hasInitialized = useRef(false);
  // Track if space_entered has been tracked to avoid duplicates
  const hasTrackedSpaceEntry = useRef(false);

  // Apps that open as a FULL-SCREEN destination (their own page) instead of
  // the side panel. Case Pool and Case Drill remain first-class practice
  // rooms. Domain Knowledge and Aptitude Test intentionally use the same
  // comfortable app width as My Roadmap. Keep this explicit list because
  // SpaceConfig validation can strip the custom `fullscreen` field from app
  // entries; other apps can still opt in via `fullscreen: true` in config.
  const FULLSCREEN_APP_IDS = ['case-drill-log', 'case-drill'];
  const isFullscreenApp = (panelId: PanelId | null): boolean => {
    if (!panelId || panelId === 'files' || panelId === 'settings') return false;
    if (FULLSCREEN_APP_IDS.includes(panelId)) return true;
    const app = config.apps.find(a => a.id === panelId);
    return !!app && (app as any).fullscreen === true;
  };

  const openPanel = (panelId: PanelId) => {
    setIsPanelExpanded(
      isFullscreenApp(panelId) ||
      (typeof window !== 'undefined' && window.innerWidth < 1024)
    );
    setIsAppHomeShell(false);
    const app = config.apps.find(a => a.id === panelId);
    if (app) {
      trackEvent('app_opened', { appId: panelId, appName: app.name });
      recordAppOpen();
    }
    setActivePanelId(panelId);
    setMobileView('panel');
    setIsMobileDrawerOpen(false);
  };

  useEffect(() => {
    if (!activePanelId) return;
    const app = config.apps.find(a => a.id === activePanelId);
    const fullscreen =
      FULLSCREEN_APP_IDS.includes(activePanelId) ||
      (!!app && (app as any).fullscreen === true);
    if (fullscreen) return;

    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const syncExpansion = () => setIsPanelExpanded(mediaQuery.matches);
    syncExpansion();
    mediaQuery.addEventListener('change', syncExpansion);
    return () => mediaQuery.removeEventListener('change', syncExpansion);
  }, [activePanelId, config.apps]);

  const closePanel = () => {
    setActivePanelId(null);
    setIsPanelExpanded(false);
    setIsAppHomeShell(false);
    setMobileView('chat');
  };

  // Papa Principle (app-vs-agent default face). Every product here is part
  // app + part agent; the v0 planning agent decides which face it leads with
  // and records it as desktop.layout.defaultLandingView in config.json:
  //   - 'agent' (or absent): land in the conversation (v4 default,
  //     back-compat with configs that predate the field).
  //   - 'app': land on the fully-expanded app view ("app home"), with a
  //     clear path back to the agent (assistant pill in the header).
  const layoutConfig = config?.desktop?.layout as
    | { defaultLandingView?: string; defaultLandingAppId?: string }
    | undefined;
  const defaultLandingApp = (() => {
    if (layoutConfig?.defaultLandingView !== 'app') return null;
    if (!visibleApps.length) return null;
    const wanted = layoutConfig?.defaultLandingAppId?.toLowerCase();
    const byId = wanted
      ? visibleApps.find(a => a.id.toLowerCase() === wanted)
      : undefined;
    return byId || visibleApps[0];
  })();

  // Leave the app-home landing state and return to the agent-centric view:
  // panel stays open but un-expanded (side-by-side with the chat on wide
  // viewports), sidebar reopens, and narrow viewports switch to the chat.
  const returnToAgentView = () => {
    setIsAppHomeShell(false);
    setIsPanelExpanded(false);
    setIsSidebarOpen(true);
    setMobileView('chat');
    trackEvent('agent_view_opened', { source: 'app_home_header' });
  };

  // Show email gate for customer mode if no session (from context)
  const publicAppBypass = (() => {
    if (typeof window === 'undefined') return false;
    // space-app-only mode: the config designates a specific app as the public
    // entry for the root URL — no email gate required regardless of session state.
    const configEntryMode = (config as any).publicEntry?.mode;
    const configEntryAppId = (config as any).publicEntry?.appId;
    if (configEntryMode === 'space-app-only' && configEntryAppId) {
      return true;
    }
    const params = new URLSearchParams(window.location.search);
    const requestedAppId = params.get('app') || (window as any).__DEEP_LINK_APP_ID__ || initialAppId;
    if (!requestedAppId) return false;
    const matchingApp = config.apps.find(a => a.id.toLowerCase() === String(requestedAppId).toLowerCase());
    return !!matchingApp && (matchingApp as any).public === true;
  })();
  const forceVisitor =
    typeof window !== 'undefined' && (window as any).__AUDOS_FORCE_VISITOR__ === true;
  const showEmailGate =
    mode === 'customer' &&
    (forceVisitor || (!sessionId && !isBootstrappingSession && !publicAppBypass));

  // Track space_entered when session becomes available (first entry after email gate)
  useEffect(() => {
    if (sessionId && !hasTrackedSpaceEntry.current) {
      hasTrackedSpaceEntry.current = true;
      trackEvent('space_entered', {
        referrer: document.referrer || null,
        url: window.location.href,
      });
    }
  }, [sessionId, trackEvent]);

  // Handle URL hash-based deep linking (ONLY on initial mount).
  // Agent-first default: no panel open — the conversation is the landing surface.
  useEffect(() => {
    if (hasInitialized.current) return;
    if (!sessionId && !publicAppBypass) return;

    hasInitialized.current = true;

    const hash = hashAppId(window.location.hash);
    const urlAppParam = new URLSearchParams(window.location.search).get('app') || (window as any).__DEEP_LINK_APP_ID__ || initialAppId;

    const deepLinkId = hash || urlAppParam?.toLowerCase() || '';

    if (deepLinkId) {
      const matchingApp = config.apps.find(
        app => app.id.toLowerCase() === deepLinkId || app.name.toLowerCase() === deepLinkId
      );

      if (matchingApp) {
        openPanel(matchingApp.id);
        return;
      }

      if (deepLinkId === 'files' || deepLinkId === 'memory') {
        openPanel('files');
        return;
      }

      if (deepLinkId === 'settings') {
        openPanel('settings');
        return;
      }
    }

    // Papa Principle: when the planning agent marked this product app-first
    // (desktop.layout.defaultLandingView === 'app'), land on the fully
    // expanded app view instead of the conversation. The agent stays one
    // tap away (assistant pill in the app-home header; browser back also
    // returns to the chat). Deep links above always take precedence.
    if (defaultLandingApp) {
      setActivePanelId(defaultLandingApp.id);
      setIsPanelExpanded(true);
      setIsSidebarOpen(false);
      setMobileView('panel');
      setIsAppHomeShell(true);
      trackEvent('app_opened', {
        appId: defaultLandingApp.id,
        appName: defaultLandingApp.name,
        source: 'default_landing',
      });
      recordAppOpen();
      return;
    }
    // Default: land in the agent conversation, no panel.
  }, [sessionId, config.apps]);

  // Update URL hash when active panel changes. Nested app routes keep their
  // suffix while the same app remains active.
  useEffect(() => {
    const currentHashAppId = hashAppId(window.location.hash);
    if (!hasRunHashSync.current) {
      hasRunHashSync.current = true;
      if (config.apps.some(app => app.id.toLowerCase() === currentHashAppId)) return;
    }

    if (activePanelId) {
      if (currentHashAppId !== activePanelId.toLowerCase()) {
        isInternalHashChange.current = true;
        window.location.hash = activePanelId;
        setTimeout(() => {
          isInternalHashChange.current = false;
        }, 0);
      }
    } else {
      if (window.location.hash) {
        isInternalHashChange.current = true;
        window.location.hash = '';
        setTimeout(() => {
          isInternalHashChange.current = false;
        }, 0);
      }
    }
  }, [activePanelId, config.apps]);

  // Listen for browser back/forward navigation via hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (isInternalHashChange.current) {
        return;
      }

      const hash = hashAppId(window.location.hash);

      if (!hash) {
        closePanel();
        return;
      }

      const matchingApp = config.apps.find(
        app => app.id.toLowerCase() === hash || app.name.toLowerCase() === hash
      );

      if (matchingApp) {
        openPanel(matchingApp.id);
        return;
      }

      if (hash === 'files' || hash === 'memory') {
        openPanel('files');
        return;
      }

      if (hash === 'settings') {
        openPanel('settings');
        return;
      }

      closePanel();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [config.apps]);

  // Listen for app deep-link events from agent chat (openApp contract)
  useEffect(() => {
    const handleOpenApp = (event: CustomEvent) => {
      const { appId } = event.detail;
      if (appId) {
        const app = config.apps.find(candidate => candidate.id === appId);
        if (app) {
          trackEvent('app_opened', { appId, appName: app.name, source: 'open_app_event' });
          recordAppOpen();
        }
        setActivePanelId(appId);
        setIsPanelExpanded(
          isFullscreenApp(appId) ||
          (typeof window !== 'undefined' && window.innerWidth < 1024)
        );
        setMobileView('panel');
      }
    };

    window.addEventListener('openApp', handleOpenApp as EventListener);
    return () => window.removeEventListener('openApp', handleOpenApp as EventListener);
  }, []);

  // Listen for closeApp events dispatched by mini-apps (e.g. VoiceBuddy)
  useEffect(() => {
    const handleCloseApp = () => {
      setActivePanelId(null);
      setMobileView('chat');
    };

    window.addEventListener('closeApp', handleCloseApp as EventListener);
    return () => window.removeEventListener('closeApp', handleCloseApp as EventListener);
  }, []);

  // Keyboard shortcut: Cmd+M (Mac) / Ctrl+M (Windows) to toggle Memory panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        if (activePanelId === 'files') {
          closePanel();
        } else {
          openPanel('files');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanelId]);

  const handleFileAccess = (log: FileAccessLog) => {
    setFileAccessLogs(prev => [...prev, log]);
  };

  // Resolve the active panel's metadata
  const isAppPanel = activePanelId && !['files', 'settings'].includes(activePanelId);
  const currentAppConfig = isAppPanel ? config.apps.find(app => app.id === activePanelId) : null;
  const CurrentApp = isAppPanel && activePanelId ? apps[activePanelId] : null;

  const runtimeTheme = resolveGenesisRuntimeTheme(config);
  const themeVariables = (runtimeTheme.themeTokens.cssVariables || {}) as Record<string, string>;
  const rootStyle = {
    ...themeVariables,
    ['--space-font-family' as any]:
      runtimeTheme.themeTokens.typography?.fontFamily ||
      `"${runtimeTheme.themeTokens.typography?.headingFont || 'Outfit'}", system-ui, -apple-system, sans-serif`,
    fontFamily:
      runtimeTheme.themeTokens.typography?.fontFamily ||
      `"${runtimeTheme.themeTokens.typography?.headingFont || 'Outfit'}", system-ui, -apple-system, sans-serif`,
    background: 'var(--space-surface-page)',
    color: 'var(--space-text-primary)',
  } as React.CSSProperties;

  const activeThread = displayThreads.find(t => t.threadId === activeThreadId);
  const activeThreadTitle = sanitizeThreadTitle(
    activeThread?.title,
    threadTitleFallback(activeThreadId),
  );

  // Show the branded splash while the post-checkout auto-session is being established
  if (isBootstrappingSession) {
    return <BrandSplash />;
  }

  // Show email gate if no session in customer mode
  if (showEmailGate) {
    return (
      <EmailGate
        spaceId={spaceId}
        branding={runtimeTheme.branding}
        themeTokens={runtimeTheme.themeTokens}
      />
    );
  }

  // Subscription and entitlement checks run in the background. Paid apps keep
  // their own fail-closed PaywallGate, so the free shell must never wait here.

  // Tenant agent handoff (Product Run iframe): render the target app edge-to-edge
  // with no sidebar, chat, or panel chrome.
  if (isTenantDelegationCanvas()) {
    if (!isAppPanel || !CurrentApp || !currentAppConfig) {
      return (
        <div className="fixed inset-0 flex items-center justify-center" style={rootStyle}>
          {LoadingSpinner ? <LoadingSpinner /> : <div className="w-8 h-8 rounded-full border-2 border-current border-t-transparent animate-spin" />}
        </div>
      );
    }

    return (
      <div
        className="fixed inset-0 overflow-hidden bg-[var(--space-surface-card)]"
        style={rootStyle}
        data-testid="tenant-delegation-canvas"
      >
        <AppErrorBoundary key={currentAppConfig.id} appName={currentAppConfig.name}>
          <Suspense fallback={LoadingSpinner ? <LoadingSpinner /> : null}>
            <CurrentApp appConfig={currentAppConfig} dataFile={currentAppConfig.dataFile || ''} />
          </Suspense>
        </AppErrorBoundary>
      </div>
    );
  }

  // --- Shared render pieces ---------------------------------------------

  const renderSidebarContent = (opts: { onClose?: () => void }) => (
    <div className="flex flex-col h-full min-h-0">
      {/* Sidebar header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold truncate text-[var(--space-text-primary)]">
            {runtimeTheme.branding.name}
          </span>
        </div>
        {opts.onClose && (
          <button
            type="button"
            onClick={opts.onClose}
            className="min-h-11 min-w-11 rounded-lg hover:bg-[var(--space-surface-muted)] transition-colors text-[var(--space-text-secondary)]"
            aria-label="Close navigation"
            data-testid="button-sidebar-close"
          >
            {isMobile ? <X className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* New conversation */}
      <div className="px-3 pb-2">
        <button
          onClick={createThread}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)] hover:bg-[var(--space-brand-primary-600)]"
          data-testid="button-new-thread"
        >
          <Plus className="w-4 h-4" />
          New conversation
        </button>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto min-h-0 px-3 py-1">
        {displayThreads.length > 0 && (
          <div className="text-[11px] font-medium uppercase tracking-wide px-2 pt-2 pb-1 text-[var(--space-text-muted)]">
            Conversations
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          {displayThreads.map(thread => {
            const isActive = thread.threadId === activeThreadId;
            return (
              <button
                key={thread.threadId}
                onClick={() => selectThread(thread.threadId)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-sm transition-colors ${
                  isActive
                    ? 'bg-[var(--space-surface-muted)] text-[var(--space-text-primary)] font-medium'
                    : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'
                }`}
                data-testid={`button-thread-${thread.threadId}`}
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0 opacity-60" />
                <span className="truncate">{sanitizeThreadTitle(thread.title, threadTitleFallback(thread.threadId))}</span>
              </button>
            );
          })}
        </div>

        {/* Guided app journey: order comes from config.json; purpose labels and
            the first-step cue live here so they appear consistently on desktop
            and in the mobile drawer. */}
        {journeyApps.length > 0 && (
          <>
            <div className="px-2 pt-4 pb-1">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">
                Your Journey
              </div>
              <div className="mt-0.5 text-[10px] text-[var(--space-text-muted)]">
                Start → Assess → Explore → Prepare
              </div>
            </div>
            <div className="flex flex-col gap-2 px-0.5 pt-1">
              {journeyApps.map(app => {
                const isActive = activePanelId === app.id;
                const isStartHere = app.id === START_HERE_APP_ID;
                const isFeedback = app.id === FEEDBACK_APP_ID;
                const IconComponent = app.icon && iconMap[app.icon] ? iconMap[app.icon] : Activity;
                return (
                  <button
                    key={app.id}
                    onClick={() => openPanel(app.id)}
                    className={`w-full flex items-center gap-3 rounded-2xl text-left transition-all border ${
                      isFeedback ? 'mt-2 px-3 py-2' : 'px-3 py-2.5'
                    } ${
                      isActive
                        ? 'bg-[var(--space-surface-card)] border-[color-mix(in_srgb,var(--space-brand-primary-500)_40%,transparent)] shadow-[0_4px_14px_color-mix(in_srgb,var(--space-shell-shadow)_35%,transparent)]'
                        : isStartHere
                          ? 'bg-[color-mix(in_srgb,var(--space-brand-primary-500)_8%,var(--space-surface-card))] border-[color-mix(in_srgb,var(--space-brand-primary-500)_35%,var(--space-border-default))] shadow-[0_1px_5px_color-mix(in_srgb,var(--space-shell-shadow)_25%,transparent)] hover:-translate-y-px'
                          : isFeedback
                            ? 'bg-transparent border-transparent hover:bg-[var(--space-surface-muted)]'
                            : 'bg-[var(--space-surface-card)] border-[var(--space-border-default)] shadow-[0_1px_4px_color-mix(in_srgb,var(--space-shell-shadow)_25%,transparent)] hover:shadow-[0_4px_14px_color-mix(in_srgb,var(--space-shell-shadow-strong)_30%,transparent)] hover:-translate-y-px'
                    }`}
                    data-testid={`button-app-${app.id}`}
                  >
                    <span className={`rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isFeedback
                        ? 'w-8 h-8 bg-[var(--space-surface-muted)]'
                        : isStartHere
                          ? 'w-9 h-9 bg-[var(--space-brand-primary)]'
                          : 'w-9 h-9 bg-[var(--space-surface-accent-soft)]'
                    }`}>
                      <IconComponent className={`${isFeedback ? 'w-4 h-4' : 'w-[18px] h-[18px]'} ${
                        isStartHere ? 'text-[var(--space-text-on-primary)]' : 'text-[var(--space-text-brand)]'
                      }`} />
                    </span>
                    <span className="min-w-0 flex-1 flex flex-col">
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span className={`truncate text-[var(--space-text-primary)] ${isFeedback ? 'text-xs font-medium' : 'text-sm font-semibold'}`}>
                          {app.name}
                        </span>
                        {isStartHere && (
                          <span className="flex-shrink-0 rounded-full bg-[var(--space-brand-primary)] px-2 py-0.5 text-[9px] font-bold text-[var(--space-text-on-primary)]">
                            Start Here →
                          </span>
                        )}
                      </span>
                      <span className={`truncate text-[var(--space-text-muted)] ${isFeedback ? 'text-[10px]' : 'text-[11px]'}`}>
                        {APP_NAV_LABELS[app.id] || (isActive ? 'Open' : 'Open App')}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Founder-only tools stay functional but live outside the customer
            journey. This section is absent unless role/email checks grant
            access to at least one founder-only app. */}
        {adminApps.length > 0 && (
          <div className="mt-4 border-t border-[var(--space-border-default)] px-0.5 pt-3">
            <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">
              Admin
            </div>
            <div className="flex flex-col gap-1">
              {adminApps.map(app => {
                const isActive = activePanelId === app.id;
                const IconComponent = app.icon && iconMap[app.icon] ? iconMap[app.icon] : Shield;
                return (
                  <button
                    key={app.id}
                    onClick={() => openPanel(app.id)}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-[var(--space-surface-muted)] font-medium text-[var(--space-text-primary)]'
                        : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'
                    }`}
                    data-testid={`button-admin-app-${app.id}`}
                  >
                    <IconComponent className="h-4 w-4 flex-shrink-0 opacity-70" />
                    <span className="truncate">{app.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar footer: memory + settings */}
      <div className="px-3 py-3 flex flex-col gap-0.5">
        {mode === 'entrepreneur' && (
          <button
            onClick={() => openPanel('files')}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-sm transition-colors ${
              activePanelId === 'files'
                ? 'bg-[var(--space-surface-muted)] text-[var(--space-text-primary)] font-medium'
                : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'
            }`}
            data-testid="button-panel-files"
          >
            <Folder className="w-4 h-4 opacity-60" />
            Memory
          </button>
        )}
        <button
          onClick={() => openPanel('settings')}
          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-sm transition-colors ${
            activePanelId === 'settings'
              ? 'bg-[var(--space-surface-muted)] text-[var(--space-text-primary)] font-medium'
              : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'
          }`}
          data-testid="button-panel-settings"
        >
          <SettingsIcon className="w-4 h-4 opacity-60" />
          Settings
        </button>
      </div>
    </div>
  );

  const renderPanelHeader = () => {
    // App-home landing header (Papa Principle, app-first products): reads as
    // the product's own top bar — brand logo/name with the app as subtitle —
    // instead of window chrome, and swaps the minimize/close buttons for a
    // single prominent assistant pill that returns to the agent view.
    if (isAppHomeShell && isAppPanel && currentAppConfig) {
      const HomeIcon = currentAppConfig.icon && iconMap[currentAppConfig.icon] ? iconMap[currentAppConfig.icon] : Activity;
      return (
        <div className="flex items-center justify-between gap-3 px-4 py-3 flex-shrink-0 border-b border-[var(--space-border-subtle,var(--space-surface-muted))]">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* The brand mark as a vector outline rather than the raster logo:
                the raster carries a solid colour plate, which reads as a red
                tile sitting in the header instead of as the mark. */}
            {runtimeTheme.branding.logoUrl ? (
              <BrandLogoMark size={28} color="var(--space-brand-primary)" />
            ) : (
              <span className="w-7 h-7 rounded-lg bg-[var(--space-surface-accent-soft)] flex items-center justify-center flex-shrink-0">
                <HomeIcon className="w-4 h-4 text-[var(--space-text-brand)]" />
              </span>
            )}
            <span className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[var(--space-text-primary)] truncate">
                {runtimeTheme.branding.name}
              </span>
              {currentAppConfig.name !== runtimeTheme.branding.name && (
                <span className="text-[11px] leading-tight text-[var(--space-text-secondary)] truncate">
                  {currentAppConfig.name}
                </span>
              )}
            </span>
          </div>
          <button
            onClick={returnToAgentView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 bg-[var(--space-brand-highlight)] text-[var(--space-text-on-highlight)] hover:brightness-95 transition-all"
            title="Talk to Mate"
            data-testid="button-open-assistant"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Ask Mate
          </button>
        </div>
      );
    }
    return (
    <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        {/* Back-to-chat: narrow viewports only (chat/panel toggle) */}
        <button
          onClick={() => setMobileView('chat')}
          className="md:hidden p-1.5 -ml-1.5 rounded-lg hover:bg-[var(--space-surface-muted)] transition-colors text-[var(--space-text-secondary)]"
          title="Back to chat"
          data-testid="button-back-to-chat"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {activePanelId === 'files' && (
          <>
            <Folder className="w-4 h-4 text-[var(--space-text-secondary)]" />
            <span className="text-sm font-semibold text-[var(--space-text-primary)]">Memory</span>
          </>
        )}
        {activePanelId === 'settings' && (
          <>
            <SettingsIcon className="w-4 h-4 text-[var(--space-text-secondary)]" />
            <span className="text-sm font-semibold text-[var(--space-text-primary)]">Settings</span>
          </>
        )}
        {isAppPanel && currentAppConfig && (
          <>
            {(() => {
              const IconComponent = currentAppConfig.icon && iconMap[currentAppConfig.icon] ? iconMap[currentAppConfig.icon] : Activity;
              return (
                <span className="w-7 h-7 rounded-lg bg-[var(--space-surface-accent-soft)] flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-4 h-4 text-[var(--space-text-brand)]" />
                </span>
              );
            })()}
            <span className="text-sm font-semibold text-[var(--space-text-primary)]">{currentAppConfig.name}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-1">
        {/* Fullscreen apps (e.g. Case Pool, Case Drill) hide the conversation, so give the
            customer an explicit, labeled way back to the chat they were already
            having — closing the panel never resets or recreates the thread. */}
        {isAppPanel && isPanelExpanded && (
          <button
            onClick={closePanel}
            className="max-md:hidden mr-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--space-brand-highlight)] text-[var(--space-text-on-highlight)] hover:brightness-95 transition-all"
            title={`Back to your conversation with ${agentDisplayName}`}
            data-testid="button-back-to-agent-conversation"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Back to {agentDisplayName}
          </button>
        )}
        {/* Full-screen toggle: wide viewports only */}
        <button
          onClick={() => setIsPanelExpanded(prev => !prev)}
          className="max-lg:hidden min-h-11 min-w-11 rounded-lg hover:bg-[var(--space-surface-muted)] transition-colors text-[var(--space-text-secondary)]"
          title={isPanelExpanded ? 'Exit full screen' : 'Full screen'}
          aria-label={isPanelExpanded ? 'Exit full screen' : 'Full screen'}
          data-testid="button-panel-expand"
        >
          {isPanelExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
        <button
          onClick={closePanel}
          className="p-1.5 rounded-lg hover:bg-[var(--space-surface-muted)] transition-colors text-[var(--space-text-secondary)]"
          title="Close"
          data-testid="button-panel-close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
    );
  };

  const renderPanelBody = () => (
    <div className="flex-1 overflow-y-auto min-h-0 bg-[var(--space-surface-card)]">
      {activePanelId === 'files' && (
        <FileBrowser fileAccessLogs={fileAccessLogs} />
      )}
      {activePanelId === 'settings' && (
        <Settings spaceId={spaceId} />
      )}
      {isAppPanel && CurrentApp && currentAppConfig && (
        <AppErrorBoundary key={currentAppConfig.id} appName={currentAppConfig.name}>
          <Suspense fallback={<LoadingSpinner />}>
            <CurrentApp appConfig={currentAppConfig} dataFile={currentAppConfig.dataFile || ''} />
          </Suspense>
        </AppErrorBoundary>
      )}
    </div>
  );

  // Expose the active thread id for AgentChatView: the platform-managed
  // AgentChat shell doesn't forward its threadId prop to the view, and the
  // view needs it to know whether it is rendering the PRIMARY conversation
  // (greeting + saved assessment card) or a clean secondary thread. Set
  // during render so the child reads a fresh value when it (re)mounts —
  // AgentChat is keyed by thread id.
  if (typeof window !== 'undefined') {
    (window as any).__audosActiveThreadId = activeThreadId;
  }

  const agentChatElement = (
    <AgentChat
      key={activeThreadId}
      spaceId={spaceId}
      threadId={activeThreadId}
      onFileAccess={handleFileAccess}
      pendingMessage={pendingAgentMessage}
      onPendingMessageConsumed={() => setPendingAgentMessage(null)}
    />
  );

  // Casemate's customer experience is app-first. This branch intentionally
  // has no left sidebar and no chat alongside the assessment. The six product
  // destinations live in a sticky top navigation; Mate is a secondary,
  // explicit support destination reached from the help icon.
  if (layoutConfig?.defaultLandingView === 'app') {
    const topNavIds = [
      'fit-assessment',
      'browse-programs',
      'my-roadmap',
      'case-drill-log',
      'case-drill',
      'industry-knowledge',
      'aptitude-test',
    ];
    const topNavApps = topNavIds
      .map(id => visibleApps.find(app => app.id === id))
      .filter(Boolean) as typeof visibleApps;
    const fallbackApp = defaultLandingApp || visibleApps[0] || null;
    const shellPanelId = activePanelId || fallbackApp?.id || null;
    const shellAppConfig = shellPanelId && !['files', 'settings'].includes(shellPanelId)
      ? config.apps.find(app => app.id === shellPanelId)
      : null;
    const ShellApp = shellAppConfig ? apps[shellAppConfig.id] : null;
    const openTopDestination = (id: string) => {
      setShowMateSupport(false);
      setShowAccountPanel(false);
      openPanel(id);
    };

    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {runtimeTheme.themeTokens.typography?.headingFont && runtimeTheme.themeTokens.typography.headingFont !== 'Inter' && (
          <link
            href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(runtimeTheme.themeTokens.typography.headingFont)}:wght@300;400;500;600;700;800;900&display=optional`}
            rel="stylesheet"
          />
        )}
        <div className="fixed inset-0 flex flex-col overflow-hidden bg-[var(--space-surface-page)]" style={rootStyle} data-testid="casemate-app-first-shell">
          <header className="z-40 flex-shrink-0 border-b border-[var(--space-border-default)] bg-[var(--space-surface-card)] shadow-[0_2px_12px_color-mix(in_srgb,var(--space-shell-shadow)_18%,transparent)]">
            <div className="flex h-14 items-center gap-2 px-2.5 sm:h-16 sm:gap-3 sm:px-5">
              <button
                type="button"
                onClick={() => fallbackApp && openTopDestination(fallbackApp.id)}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-xl px-1 py-1 text-left sm:gap-2.5 sm:px-1.5 hover:bg-[var(--space-surface-muted)]"
                data-testid="button-casemate-home"
              >
                <BrandLogoMark size={26} color="var(--space-brand-primary)" />
                <span className="hidden text-sm font-extrabold leading-tight text-[var(--space-text-primary)] sm:inline">
                  {runtimeTheme.branding.name}
                </span>
              </button>

              <nav className="flex min-w-0 flex-1 snap-x snap-mandatory items-center gap-1 overflow-x-auto overscroll-x-contain px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Casemate tools">
                {topNavApps.map(app => {
                  const Icon = app.icon && iconMap[app.icon] ? iconMap[app.icon] : Activity;
                  const active = !showMateSupport && shellPanelId === app.id;
                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => openTopDestination(app.id)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-11 flex-shrink-0 snap-start items-center gap-1 rounded-xl px-2 text-[11px] font-bold transition sm:gap-1.5 sm:px-3 sm:text-xs ${
                        active
                          ? 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                          : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'
                      }`}
                      data-testid={`top-nav-${app.id}`}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="whitespace-nowrap">{app.name}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="flex flex-shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => { setShowAccountPanel(false); setShowMateSupport(true); }}
                  className={`flex items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-bold transition sm:gap-1.5 sm:px-2.5 sm:py-2 sm:text-xs ${
                    showMateSupport
                      ? 'bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                      : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'
                  }`}
                  title="Help from Mate"
                  data-testid="button-mate-support"
                >
                  <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Mate</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setShowMateSupport(false); setShowAccountPanel((value) => !value); }}
                  className={`rounded-xl p-1.5 transition sm:p-2 ${
                    showAccountPanel
                      ? 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                      : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'
                  }`}
                  title="Account & Settings"
                  aria-label="Account, subscription, and settings"
                  data-testid="top-nav-settings"
                >
                  <SettingsIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          {showTrialReminder && (
            <button
              type="button"
              onClick={() => openTopDestination('settings')}
              className="z-30 flex flex-shrink-0 items-center justify-center gap-2 border-b border-[color-mix(in_srgb,var(--space-semantic-warning-500)_35%,var(--space-border-default))] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,var(--space-surface-card))] px-4 py-2 text-center text-xs font-semibold text-[var(--space-text-primary)] hover:bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_16%,var(--space-surface-card))]"
              data-testid="trial-expiry-banner"
            >
              <Clock className="h-3.5 w-3.5 text-[var(--space-semantic-warning)]" />
              You have {shellDaysRemaining} free days remaining <span className="text-[var(--space-text-brand)]">→ Get Pro Plan</span>
            </button>
          )}

          <main className="min-h-0 flex-1 overflow-hidden">
            {showMateSupport ? (
              <div className="flex h-full flex-col bg-[var(--space-surface-card)]">
                <div className="flex flex-shrink-0 items-center justify-between border-b border-[var(--space-border-default)] px-4 py-3">
                  <div>
                    <p className="text-sm font-extrabold text-[var(--space-text-primary)]">Help from Mate</p>
                    <p className="text-xs text-[var(--space-text-muted)]">A dedicated help channel — not the main assessment screen.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMateSupport(false)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--space-surface-muted)] px-3 py-2 text-xs font-bold text-[var(--space-text-secondary)]"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Back to Assessment
                  </button>
                </div>
                <div className="min-h-0 flex-1">{agentChatElement}</div>
              </div>
            ) : shellPanelId === 'settings' ? (
              <div className="h-full overflow-y-auto bg-[var(--space-surface-card)]">
                <Settings spaceId={spaceId} />
              </div>
            ) : ShellApp && shellAppConfig ? (
              <div className="h-full overflow-y-auto bg-[var(--space-surface-page)]" data-testid="app-first-content">
                <AppErrorBoundary key={shellAppConfig.id} appName={shellAppConfig.name}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ShellApp appConfig={shellAppConfig} dataFile={shellAppConfig.dataFile || ''} />
                  </Suspense>
                </AppErrorBoundary>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
          </main>
          {showAccountPanel && (
            <>
              <button
                type="button"
                className="fixed inset-0 top-14 z-40 bg-[color-mix(in_srgb,var(--space-text-primary)_24%,transparent)] sm:top-16"
                onClick={() => setShowAccountPanel(false)}
                aria-label="Close account panel"
              />
              <aside className="fixed bottom-0 right-0 top-14 z-50 flex w-full flex-col border-l border-[var(--space-border-default)] bg-[var(--space-surface-card)] shadow-2xl sm:top-16 sm:w-[94vw] sm:max-w-6xl" data-testid="account-settings-panel">
                <div className="flex items-center justify-between border-b border-[var(--space-border-default)] px-4 py-3">
                  <div>
                    <p className="text-sm font-extrabold text-[var(--space-text-primary)]">Account & Subscription</p>
                    <p className="text-xs text-[var(--space-text-muted)]">Account details, trial period, and access</p>
                  </div>
                  <button type="button" onClick={() => setShowAccountPanel(false)} className="rounded-lg p-2 text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]" aria-label="Close"><X className="h-4 w-4" /></button>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto"><Settings spaceId={spaceId} /></div>
              </aside>
            </>
          )}
          {sessionId && <FloatingFeedbackWidget autoOpen={showFeedbackNudge} />}
          <ViewportToastHost />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Google Fonts - load brand font or fall back to Inter */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {runtimeTheme.themeTokens.typography?.headingFont && runtimeTheme.themeTokens.typography.headingFont !== 'Inter' && (
        <link
          href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(runtimeTheme.themeTokens.typography.headingFont)}:wght@300;400;500;600;700;800;900&display=optional`}
          rel="stylesheet"
        />
      )}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Unified responsive shell — a single layout tree (sidebar | chat |
          app panel) that reflows via CSS across the mobile/desktop threshold.
          AgentChat is rendered from ONE stable location so it is never
          unmounted just because the viewport crossed the breakpoint. */}
      <div className="fixed inset-0 flex overflow-hidden" style={rootStyle}>
        {/* Narrow-only backdrop for the off-canvas sidebar drawer */}
        {isMobileDrawerOpen && (
          <div
            className="md:hidden fixed inset-0 z-40"
            style={{ backgroundColor: 'color-mix(in srgb, var(--space-text-primary) 40%, transparent)' }}
            onClick={() => setIsMobileDrawerOpen(false)}
            data-testid="mobile-drawer-backdrop"
          />
        )}

        {/* Left sidebar — inline collapsible column on wide viewports, an
            off-canvas drawer on narrow ones. One element; presentation is
            driven by responsive CSS so its content/state survives a resize. */}
        <aside
          id="primary-navigation"
          aria-label="Primary navigation"
          className={`z-50 flex-shrink-0 flex flex-col min-h-0 overflow-hidden transition-all duration-300 ease-in-out max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:w-72 max-md:max-w-[85vw] max-md:shadow-[0_22px_56px_var(--space-shell-shadow-strong)] ${
            isMobileDrawerOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
          } ${isSidebarOpen ? 'md:w-64' : 'md:w-0'}`}
          style={{ backgroundColor: 'var(--space-surface-panel)' }}
        >
          <div className="w-72 md:w-64 h-full">
            {renderSidebarContent({
              onClose: () => {
                if (isMobile) setIsMobileDrawerOpen(false);
                else setIsSidebarOpen(false);
              },
            })}
          </div>
        </aside>

        {/* Column to the right of the sidebar: optional narrow top bar + the
            chat/panel content row. */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {/* Narrow-only top bar (menu + title + chat/panel toggle) */}
          <div className="md:hidden flex items-center gap-2 px-3 py-3 border-b border-[var(--space-border-default)] bg-[var(--space-surface-card)] flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="min-h-11 min-w-11 rounded-lg hover:bg-[var(--space-surface-muted)] transition-colors text-[var(--space-text-secondary)]"
              aria-label="Open navigation"
              aria-expanded={isMobileDrawerOpen}
              aria-controls="primary-navigation"
              data-testid="button-mobile-menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="flex-1 text-sm font-semibold truncate text-[var(--space-text-primary)]">
              {activePanelId && mobileView === 'panel'
                ? (currentAppConfig?.name || (activePanelId === 'files' ? 'Memory' : activePanelId === 'settings' ? 'Settings' : 'App'))
                : activeThreadTitle}
            </span>
            {activePanelId && (
              <button
                onClick={() => setMobileView(mobileView === 'panel' ? 'chat' : 'panel')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-[var(--space-surface-muted)] text-[var(--space-text-primary)]"
                data-testid="button-mobile-toggle-view"
              >
                {mobileView === 'panel' ? (
                  <>
                    <MessageCircle className="w-3.5 h-3.5" /> Chat
                  </>
                ) : (
                  <>
                    {(() => {
                      const IconComponent = currentAppConfig?.icon && iconMap[currentAppConfig.icon]
                        ? iconMap[currentAppConfig.icon]
                        : activePanelId === 'files' ? Folder : activePanelId === 'settings' ? SettingsIcon : Activity;
                      return <IconComponent className="w-3.5 h-3.5" />;
                    })()}
                    {currentAppConfig?.name || (activePanelId === 'files' ? 'Memory' : activePanelId === 'settings' ? 'Settings' : 'App')}
                  </>
                )}
              </button>
            )}
          </div>

          {/* Content row: chat card + app panel float as separate cards on
              wide viewports; full-bleed and single-surface on narrow ones. */}
          <div className="flex-1 flex min-w-0 min-h-0 md:gap-3 md:p-3">
            {/* Center: agent conversation. Always mounted; hidden on wide when
                a panel is full-screen, and on narrow when the panel view is
                active — via CSS display, never by unmounting. */}
            <main
              className={`flex-1 flex-col min-w-0 min-h-0 overflow-hidden bg-[var(--space-surface-card)] md:rounded-2xl md:shadow-[0_2px_16px_color-mix(in_srgb,var(--space-shell-shadow)_30%,transparent),0_1px_3px_color-mix(in_srgb,var(--space-shell-shadow)_20%,transparent)] ${
                activePanelId && mobileView === 'panel' ? 'max-md:hidden' : 'max-md:flex'
              } ${activePanelId && isPanelExpanded ? 'md:hidden' : 'md:flex'}`}
            >
              {/* Wide-only chat header (show-sidebar + thread title) */}
              <div className="max-md:hidden flex items-center gap-2 px-4 py-3 flex-shrink-0">
                {!isSidebarOpen && (
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-1.5 -ml-1.5 rounded-lg hover:bg-[var(--space-surface-muted)] transition-colors text-[var(--space-text-secondary)]"
                    title="Show sidebar"
                    data-testid="button-sidebar-open"
                  >
                    <PanelLeftOpen className="w-4 h-4" />
                  </button>
                )}
                <span className="text-sm font-semibold truncate text-[var(--space-text-primary)]">
                  {activeThreadTitle}
                </span>
              </div>
              <div className="flex-1 overflow-hidden bg-[var(--space-surface-card)]">
                {agentChatElement}
              </div>
            </main>

            {/* Right: app panel — a side card on wide (full-width when
                expanded), full-screen on narrow when the panel view is active.
                Kept mounted alongside the chat so state is preserved. */}
            {activePanelId && (
              <section
                className={`flex-col min-h-0 overflow-hidden bg-[var(--space-surface-card)] md:flex md:rounded-2xl md:shadow-[0_2px_16px_color-mix(in_srgb,var(--space-shell-shadow)_30%,transparent),0_1px_3px_color-mix(in_srgb,var(--space-shell-shadow)_20%,transparent)] max-md:flex-1 max-md:min-w-0 ${
                  mobileView === 'panel' ? 'max-md:flex' : 'max-md:hidden'
                } ${isPanelExpanded ? 'md:flex-1 md:min-w-0' : 'md:flex-shrink-0 md:w-[clamp(360px,42vw,680px)]'}`}
                data-testid="app-panel"
              >
                {renderPanelHeader()}
                {renderPanelBody()}
              </section>
            )}
          </div>
        </div>

        {/* Shared viewport toast stack (v1.6): every transient save/confirm
            notification in the space renders here — fixed at the viewport
            bottom-right, above the composer on small screens. */}
        <ViewportToastHost />
        {sessionId && <FloatingFeedbackWidget autoOpen={showFeedbackNudge} />}

      </div>
    </>
  );
}
