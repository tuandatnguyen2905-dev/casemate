import { lazy, Suspense, useEffect, useState } from 'react';
import type { DesktopThemeTokens } from '../types';
import BrandLogoMark from './BrandLogoMark';
import type { LandingFeaturePage } from './features/LandingFeaturePages';

const EmailGate = lazy(() => import('./EmailGate'));
const LandingInfoPage = lazy(() => import('./LandingInfoPage'));
const LandingFeaturePages = lazy(() => import('./features/LandingFeaturePages'));
const LegalPages = lazy(() => import('./LegalPages'));

const FEATURE_PAGES: LandingFeaturePage[] = ['fit-assessment', 'practice-tool', 'domain-knowledge', 'aptitude-test', 'about'];
const FEATURE_ROUTES: Record<LandingFeaturePage, string> = {
  'fit-assessment': '/fit-assessment',
  'practice-tool': '/practice-tool',
  'domain-knowledge': '/domain-knowledge',
  'aptitude-test': '/aptitude-test',
  about: '/about',
};
const PRIVACY_POLICY_PATH = '/privacy-policy';
const LEGAL_ROUTES = { terms: '/terms', 'acceptable-use': '/acceptable-use' } as const;
const HERO_IMAGE_ORIGINAL = 'https://storage.googleapis.com/audos-images/generated-images/agent/workspace-539150/img-1789529370697-nsmyb9.png';
const HERO_IMAGE_CDN = 'https://res.cloudinary.com/asfzhhej/image/fetch/f_webp,q_auto:good';
const HERO_IMAGE_FALLBACK = `https://res.cloudinary.com/asfzhhej/image/fetch/f_jpg,q_auto:good,w_1280/${HERO_IMAGE_ORIGINAL}`;
const HERO_IMAGE_SRCSET = [640, 960, 1280, 1536]
  .map((width) => `${HERO_IMAGE_CDN},w_${width}/${HERO_IMAGE_ORIGINAL} ${width}w`)
  .join(', ');

type InfoView = 'privacy' | 'contact';
type LegalView = keyof typeof LEGAL_ROUTES;

type PublicEntryProps = {
  spaceId: string;
  branding?: {
    name?: string;
    tagline?: string;
    logoUrl?: string;
    heroVideoUrl?: string;
    colors?: Record<string, unknown>;
    palette?: Record<string, unknown>;
  };
  themeTokens?: DesktopThemeTokens;
};

function currentPath() {
  return typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/+$/, '') || '/';
}

function isPrivacyPolicyPath() {
  return currentPath() === PRIVACY_POLICY_PATH;
}

function legalFromLocation(): LegalView | null {
  if (typeof window === 'undefined' || isPaymentReturnLocation()) return null;
  const path = currentPath();
  const route = (Object.keys(LEGAL_ROUTES) as LegalView[]).find((key) => LEGAL_ROUTES[key] === path);
  if (route) return route;
  const hash = window.location.hash.replace(/^#/, '');
  return hash === 'terms' || hash === 'acceptable-use' ? hash : null;
}

function isPaymentReturnLocation() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.has('payment_success')
    || params.has('payment_cancelled')
    || params.has('payos')
    || params.get('cancel') === 'true'
    || (params.has('status') && (params.has('orderCode') || params.has('order_code')));
}

function pageFromLocation(): LandingFeaturePage | null {
  if (isPaymentReturnLocation()) return null;
  const path = currentPath();
  const route = FEATURE_PAGES.find((key) => FEATURE_ROUTES[key] === path);
  if (route) return route;
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash.replace(/^#/, '');
  return (FEATURE_PAGES as string[]).includes(hash) ? hash as LandingFeaturePage : null;
}

function SignInFallback({ brandName }: { brandName: string; tagline: string }) {
  return (
    <main className="relative flex min-h-[84svh] items-center overflow-hidden bg-slate-950 text-white" aria-busy="true">
      <picture className="absolute inset-0 block h-full w-full">
        <source srcSet={HERO_IMAGE_SRCSET} sizes="100vw" type="image/webp" />
        <img
          src={HERO_IMAGE_FALLBACK}
          alt=""
          width={1536}
          height={1024}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.42)_48%,rgba(0,0,0,0.08)_88%)]" />
      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-3 px-4 py-5 sm:px-6">
        <BrandLogoMark size={30} style={{ color: '#ffffff' }} />
        <span className="text-sm font-bold sm:text-base">{brandName}</span>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-[3px] w-11 shrink-0 bg-[#cc0000]" />
            <span className="text-[11px] font-bold uppercase leading-snug tracking-[0.16em] text-white/90 sm:text-xs">For Vietnamese Economics &amp; STEM students preparing for Graduate, Internship &amp; Rotational Programs</span>
          </div>
          <h1 className="mt-7 font-bold leading-none tracking-[-0.035em] sm:mt-8">
            <span className="block text-xl sm:text-3xl md:text-4xl">Start to Be</span>
            <span className="mt-1 block text-[2rem] sm:mt-2 sm:text-6xl md:text-7xl">Future Leaders</span>
          </h1>
          <p className="mt-5 max-w-3xl text-sm font-light leading-relaxed text-white/90 sm:mt-6 sm:text-base">Drop your CV, answer a few questions, get your industry fit, function fit, and matched MT programs — with a personalised prep roadmap with a toolkit including Case Solver, Case Drill, Domain Knowledge, Aptitude Test where you can create your own competitive advantage</p>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-white/70" role="status">Preparing secure sign-in…</p>
        </div>
      </div>
    </main>
  );
}

export default function PublicEntry(props: PublicEntryProps) {
  const [page, setPage] = useState<LandingFeaturePage | null>(() => pageFromLocation());
  const [infoView, setInfoView] = useState<InfoView | null>(() => (isPrivacyPolicyPath() ? 'privacy' : null));
  const [legalView, setLegalView] = useState<LegalView | null>(() => legalFromLocation());
  const [gateReady, setGateReady] = useState(false);
  const brandName = props.branding?.name || 'Casemate';
  const tagline = props.branding?.tagline || '';
  const headingFont = props.themeTokens?.typography?.headingFont || 'Inter';
  const bodyFont = props.themeTokens?.typography?.bodyFont || headingFont;
  const headingFontStack = `"${headingFont}", system-ui, -apple-system, sans-serif`;
  const bodyFontStack = `"${bodyFont}", system-ui, -apple-system, sans-serif`;

  useEffect(() => {
    if (!isPaymentReturnLocation()) return;
    const onPublicCasemateDomain = ['www.casemateaud.com', 'casemateaud.com'].includes(window.location.hostname);
    if (!onPublicCasemateDomain) return;
    const target = new URL('https://app.casemateaud.com/');
    target.search = window.location.search;
    target.hash = '#settings';
    window.location.replace(target.toString());
  }, []);

  useEffect(() => {
    if (!infoView && !page && !legalView) return;
    void import('../lib/publicSeo').then(({ applyPublicSeo }) => {
      applyPublicSeo(legalView ?? (infoView ? 'privacy' : page!));
    });
  }, [page, infoView, legalView]);

  useEffect(() => {
    if (!legalView) return;
    const onCanonicalHost = ['www.casemateaud.com', 'casemateaud.com'].includes(window.location.hostname);
    if (!onCanonicalHost) return;
    const canonicalPath = LEGAL_ROUTES[legalView];
    if (window.location.pathname !== canonicalPath || window.location.search || window.location.hash) {
      window.history.replaceState({}, '', canonicalPath);
    }
  }, [legalView]);

  useEffect(() => {
    if (!page) return;
    const onCanonicalDomain = ['www.casemateaud.com', 'casemateaud.com'].includes(window.location.hostname);
    if (!onCanonicalDomain) return;
    const canonicalPath = FEATURE_ROUTES[page];
    if (window.location.pathname !== canonicalPath || window.location.search || window.location.hash) {
      window.history.replaceState({}, '', canonicalPath);
    }
  }, [page]);

  useEffect(() => {
    // Prioritize the critical hero and LCP image before loading the full gate,
    // including its icon and authentication dependencies. Never delay longer
    // than 750 ms, and fall back cleanly where requestIdleCallback is absent.
    const loadGate = () => setGateReady(true);
    const requestIdle = typeof (window as any).requestIdleCallback === 'function'
      ? (window as any).requestIdleCallback.bind(window) as (callback: () => void, options: { timeout: number }) => number
      : undefined;
    const cancelIdle = typeof (window as any).cancelIdleCallback === 'function'
      ? (window as any).cancelIdleCallback.bind(window) as (handle: number) => void
      : undefined;
    if (requestIdle) {
      const handle = requestIdle(loadGate, { timeout: 750 });
      return () => cancelIdle?.(handle);
    }
    const timer = window.setTimeout(loadGate, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sync = () => {
      setPage(pageFromLocation());
      setInfoView(isPrivacyPolicyPath() ? 'privacy' : null);
      setLegalView(legalFromLocation());
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const onCanonicalDomain = typeof window !== 'undefined'
    && ['www.casemateaud.com', 'casemateaud.com'].includes(window.location.hostname);

  const navigate = (nextPage: LandingFeaturePage) => {
    const route = FEATURE_ROUTES[nextPage];
    const target = onCanonicalDomain ? route : `${window.location.pathname}${window.location.search}#${nextPage}`;
    window.history.pushState({}, '', target);
    setInfoView(null);
    setLegalView(null);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const goHome = () => {
    const target = onCanonicalDomain ? '/' : `${window.location.pathname}${window.location.search}`;
    window.history.pushState({}, '', target);
    setInfoView(null);
    setLegalView(null);
    setPage(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const openSignIn = () => {
    const target = onCanonicalDomain ? '/?login=1' : `${window.location.pathname}?login=1`;
    window.history.pushState({}, '', target);
    setInfoView(null);
    setLegalView(null);
    setPage(null);
  };

  const openLegal = (target: LegalView | 'privacy') => {
    setPage(null);
    if (target === 'privacy') {
      if (onCanonicalDomain) window.history.pushState({}, '', PRIVACY_POLICY_PATH);
      setLegalView(null);
      setInfoView('privacy');
    } else {
      const nextUrl = onCanonicalDomain
        ? LEGAL_ROUTES[target]
        : `${window.location.pathname}${window.location.search}#${target}`;
      window.history.pushState({}, '', nextUrl);
      setInfoView(null);
      setLegalView(target);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (legalView) {
    return (
      <Suspense fallback={<SignInFallback brandName={brandName} tagline={tagline} />}>
        <LegalPages page={legalView} onClose={goHome} onNavigate={openLegal} />
      </Suspense>
    );
  }

  if (infoView) {
    return (
      <Suspense fallback={<SignInFallback brandName={brandName} tagline={tagline} />}>
        <LandingInfoPage
          page={infoView}
          onClose={goHome}
          onOpenLegal={openLegal}
          onNavigate={(next) => {
            if (next === 'about') navigate('about');
            else setInfoView(next);
          }}
        />
      </Suspense>
    );
  }

  if (page) {
    return (
      <Suspense fallback={<SignInFallback brandName={brandName} tagline={tagline} />}>
        <LandingFeaturePages
          page={page}
          brandName={brandName}
          headingFontStack={headingFontStack}
          bodyFontStack={bodyFontStack}
          onNavigate={navigate}
          onHome={goHome}
          onSignUp={openSignIn}
          onOpenLegal={openLegal}
        />
      </Suspense>
    );
  }

  if (!gateReady) return <SignInFallback brandName={brandName} tagline={tagline} />;

  return (
    <Suspense fallback={<SignInFallback brandName={brandName} tagline={tagline} />}>
      <EmailGate {...props} />
    </Suspense>
  );
}
