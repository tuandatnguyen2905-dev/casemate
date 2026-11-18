export const CANONICAL_ORIGIN = 'https://www.casemateaud.com';
export const PRIVACY_POLICY_PATH = '/privacy-policy';
export const TERMS_PATH = '/terms';
export const ACCEPTABLE_USE_PATH = '/acceptable-use';

export type PublicSeoKey =
  | 'landing'
  | 'fit-assessment'
  | 'practice-tool'
  | 'domain-knowledge'
  | 'aptitude-test'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'acceptable-use';

export type PublicSeoEntry = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

export const PUBLIC_PAGE_SEO: Record<PublicSeoKey, PublicSeoEntry> = {
  landing: {
    title: 'Casemate – Start to Become Future Leaders',
    description: 'Start to become a future leader. Upload your CV and see which industries, functions and graduate programs fit you best.',
    path: '/',
  },
  'fit-assessment': {
    title: 'Fit Assessment: Find Your Industry Fit | Casemate',
    description: 'Upload your CV to see which industries, functions and graduate programs fit you best, then build a personalised preparation roadmap.',
    path: '/fit-assessment',
  },
  'practice-tool': {
    title: 'Case Drill: Case Interview Practice | Casemate',
    description: 'Practise consulting-style cases step by step, with structured feedback on your answers.',
    path: '/practice-tool',
  },
  'domain-knowledge': {
    title: 'Domain Knowledge: Learn Industries | Casemate',
    description: 'Learn the industry basics behind MT and consulting interviews, in short, easy-to-read cards.',
    path: '/domain-knowledge',
  },
  'aptitude-test': {
    title: 'Aptitude Test Practice: Numerical & Logical | Casemate',
    description: 'Practise 12 aptitude test formats used by MT programs in Vietnam, from numerical to situational judgement. Free for 14 days.',
    path: '/aptitude-test',
  },
  about: {
    title: 'About Casemate: Our Founder Story | Casemate',
    description: 'Meet the story behind Casemate and our mission to help students find direction, prepare with confidence and become future leaders.',
    path: '/about',
  },
  privacy: {
    title: 'Privacy Policy | Casemate',
    description: 'How Casemate collects, uses and protects your account, CV and assessment data, and the choices you have.',
    path: PRIVACY_POLICY_PATH,
    noindex: true,
  },
  terms: {
    title: 'Terms of Service | Casemate',
    description: 'The terms for using Casemate: Fit Assessment, Case Drill, Case Pool, Case Arena, Domain Knowledge and Aptitude Test, plus plans, billing, refunds and AI content.',
    path: TERMS_PATH,
  },
  'acceptable-use': {
    title: 'Acceptable Use Policy | Casemate',
    description: 'How to use Casemate and its AI-generated case and preparation features responsibly, including the ban on sexual or NSFW content.',
    path: ACCEPTABLE_USE_PATH,
  },
};

const ROBOTS_INDEXABLE = 'index, follow, max-image-preview:large, max-snippet:-1';
const ROBOTS_NOINDEX = 'noindex, follow';

function currentPath(): string {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export function isPrivacyPolicyPath(): boolean {
  return typeof window !== 'undefined' && currentPath() === PRIVACY_POLICY_PATH;
}

export function publicSeoKeyForPath(pathname: string): PublicSeoKey | null {
  const path = pathname.replace(/\/+$/, '') || '/';
  const match = (Object.keys(PUBLIC_PAGE_SEO) as PublicSeoKey[]).find(
    (key) => key !== 'landing' && PUBLIC_PAGE_SEO[key].path === path,
  );
  return match ?? null;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
}

export function applyPublicSeo(key: PublicSeoKey): void {
  if (typeof document === 'undefined') return;
  const seo = PUBLIC_PAGE_SEO[key];
  const canonicalUrl = `${CANONICAL_ORIGIN}${seo.path}`;
  document.title = seo.title;
  upsertMeta('name', 'description', seo.description);
  upsertMeta('property', 'og:title', seo.title);
  upsertMeta('property', 'og:description', seo.description);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('name', 'twitter:title', seo.title);
  upsertMeta('name', 'twitter:description', seo.description);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'robots', seo.noindex ? ROBOTS_NOINDEX : ROBOTS_INDEXABLE);
  upsertCanonical(canonicalUrl);
}
