import { useEffect, useRef, useState } from 'react';
import { Download, Share2, X } from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';

const INSTALL_MOMENT_EVENT = 'casemate:pwa-install-ready';
const DISMISSED_KEY = 'casemate-pwa-install-dismissed-v1';
const INSTALLED_KEY = 'casemate-pwa-installed-v1';

interface DeferredInstallPrompt extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function isStandalone() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches || Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);
}

function isIosSafari() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return ios && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
}

export default function PwaInstallPrompt() {
  const { trackEvent } = useSpaceRuntime();
  const [installPrompt, setInstallPrompt] = useState<DeferredInstallPrompt | null>(null);
  const [visible, setVisible] = useState(false);
  const [source, setSource] = useState('study_completion');
  const studyMomentRef = useRef(false);
  const shownRef = useRef(false);
  const dismissedRef = useRef(false);
  const standaloneTrackedRef = useRef(false);
  const ios = isIosSafari();
  const standalone = isStandalone();

  useEffect(() => {
    if ('serviceWorker' in navigator && window.isSecureContext) {
      navigator.serviceWorker.register('/service-worker.js', { scope: '/' }).catch(() => {
        // Root service workers are available on the verified custom domain.
        // Draft preview may not expose the root file, so failure is non-blocking.
      });
    }
  }, []);

  useEffect(() => {
    if (!standalone || standaloneTrackedRef.current) return;
    standaloneTrackedRef.current = true;
    trackEvent('pwa_standalone_opened', {
      displayMode: 'standalone',
      platform: ios ? 'ios' : 'other',
    });
  }, [ios, standalone, trackEvent]);

  useEffect(() => {
    dismissedRef.current = (() => {
      try { return Boolean(localStorage.getItem(DISMISSED_KEY) || localStorage.getItem(INSTALLED_KEY)); }
      catch { return false; }
    })();

    const showPrompt = (nextSource: string) => {
      if (dismissedRef.current || standalone || !window.matchMedia('(max-width: 767px)').matches) return;
      setSource(nextSource);
      setVisible(true);
      if (!shownRef.current) {
        shownRef.current = true;
        trackEvent('pwa_install_prompt_shown', {
          platform: ios ? 'ios' : 'android',
          source: nextSource,
        });
      }
    };

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as DeferredInstallPrompt);
      if (studyMomentRef.current) showPrompt(source);
    };
    const onStudyMoment = (event: Event) => {
      studyMomentRef.current = true;
      const nextSource = (event as CustomEvent<{ source?: string }>).detail?.source || 'study_completion';
      setSource(nextSource);
      if (ios || installPrompt) showPrompt(nextSource);
    };
    const onInstalled = () => {
      try { localStorage.setItem(INSTALLED_KEY, String(Date.now())); } catch { /* private browsing */ }
      setVisible(false);
      setInstallPrompt(null);
      trackEvent('pwa_install_accepted', { source });
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener(INSTALL_MOMENT_EVENT, onStudyMoment);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener(INSTALL_MOMENT_EVENT, onStudyMoment);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, [installPrompt, ios, source, standalone, trackEvent]);

  if (!visible || standalone || (!ios && !installPrompt)) return null;

  const dismiss = () => {
    dismissedRef.current = true;
    try { localStorage.setItem(DISMISSED_KEY, String(Date.now())); } catch { /* private browsing */ }
    setVisible(false);
  };

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'dismissed') dismiss();
  };

  return (
    <aside className="fixed inset-x-3 bottom-[calc(76px+env(safe-area-inset-bottom))] md:bottom-[max(12px,env(safe-area-inset-bottom))] z-[80] mx-auto max-w-md rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 shadow-2xl md:hidden" role="status" aria-live="polite" data-testid="pwa-install-prompt">
      <button type="button" onClick={dismiss} className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-xl text-[var(--space-text-muted)]" aria-label="Dismiss install prompt"><X className="h-4 w-4" /></button>
      <div className="flex items-start gap-3 pr-9">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]">
          {ios ? <Share2 className="h-5 w-5" /> : <Download className="h-5 w-5" />}
        </span>
        <div>
          <p className="text-base font-extrabold text-[var(--space-text-primary)]">Keep Casemate on your home screen</p>
          <p className="mt-1 text-sm leading-5 text-[var(--space-text-secondary)]">
            {ios ? 'Tap Share, then Add to Home Screen.' : 'Install for faster study sessions and easier access.'}
          </p>
        </div>
      </div>
      {!ios && <button type="button" onClick={() => void install()} className="mt-3 min-h-12 w-full rounded-xl bg-[var(--space-brand-primary)] px-4 text-base font-bold text-[var(--space-text-on-primary)]">Install Casemate</button>}
    </aside>
  );
}
