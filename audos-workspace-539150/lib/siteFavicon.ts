import { BRAND_MARK_PNG_RED, BRAND_MARK_SVG_RED } from './brandMark';

/** Opaque raster plate baked into the old platform iconUrl — not the outline mark. */
const LEGACY_OPAQUE_FAVICON_FRAGMENT = 'brand-logos/a631377d';

function cloudinaryFitPng(size: number, sourceUrl: string): string {
  return `https://res.cloudinary.com/asfzhhej/image/fetch/w_${size},h_${size},c_fit,f_png/${sourceUrl}`;
}

export const CASEMATE_FAVICON_SVG = BRAND_MARK_SVG_RED;
export const CASEMATE_FAVICON_PNG_16 = cloudinaryFitPng(16, BRAND_MARK_PNG_RED);
export const CASEMATE_FAVICON_PNG_32 = cloudinaryFitPng(32, BRAND_MARK_PNG_RED);
export const CASEMATE_FAVICON_PNG_48 = cloudinaryFitPng(48, BRAND_MARK_PNG_RED);
export const CASEMATE_APPLE_TOUCH_ICON = cloudinaryFitPng(180, BRAND_MARK_PNG_RED);

type LinkSpec = {
  rel: string;
  href: string;
  type?: string;
  sizes?: string;
};

const FAVICON_SPECS: LinkSpec[] = [
  { rel: 'icon', type: 'image/svg+xml', href: CASEMATE_FAVICON_SVG },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: CASEMATE_FAVICON_PNG_16 },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: CASEMATE_FAVICON_PNG_32 },
  { rel: 'icon', type: 'image/png', sizes: '48x48', href: CASEMATE_FAVICON_PNG_48 },
  { rel: 'apple-touch-icon', sizes: '180x180', href: CASEMATE_APPLE_TOUCH_ICON },
];

function isLegacyFaviconLink(link: HTMLLinkElement): boolean {
  const href = link.getAttribute('href') || '';
  if (!href) return false;
  if (href.includes(LEGACY_OPAQUE_FAVICON_FRAGMENT)) return true;
  if (href === '/favicon.svg' || href.endsWith('/favicon.svg')) return true;
  if (href.includes('c_fill') && href.includes(LEGACY_OPAQUE_FAVICON_FRAGMENT)) return true;
  return false;
}

function upsertHeadLink(spec: LinkSpec): void {
  const selector = spec.sizes
    ? `link[rel="${spec.rel}"][sizes="${spec.sizes}"]`
    : spec.type
      ? `link[rel="${spec.rel}"][type="${spec.type}"]`
      : `link[rel="${spec.rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = spec.rel;
    if (spec.type) el.type = spec.type;
    if (spec.sizes) el.sizes = spec.sizes;
    document.head.appendChild(el);
  }
  el.href = spec.href;
}

/** Drop the old filled-square favicon set and point the tab at the transparent mark. */
export function applyCasemateFavicons(): void {
  if (typeof document === 'undefined') return;

  document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"], link[rel="apple-touch-icon"]').forEach((link) => {
    if (isLegacyFaviconLink(link)) link.remove();
  });

  for (const spec of FAVICON_SPECS) upsertHeadLink(spec);
}
