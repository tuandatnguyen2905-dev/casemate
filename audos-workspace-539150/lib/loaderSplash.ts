// Casemate loading splash — the brand mark alone, and nothing else.
//
// Two surfaces draw it. React renders <BrandSplash /> (components/BrandSplash.tsx)
// wherever the shell has to wait, and applyBrandLoaderSplash() takes over the
// loading shell the compiled bundle paints before any of this code evaluates.
// Both draw the same mark from the constants below under the same stylesheet,
// so the hand-off from the pre-hydration shell to the React tree has nothing
// visible to cross.

import { BRAND_MARK_PATH_D, BRAND_MARK_VIEW_BOX, brandMarkSvgMarkup } from './brandMark';

const STYLE_ELEMENT_ID = 'casemate-splash-style';
const PRE_HYDRATION_LOADER_ID = 'space-loader';
const TAKEOVER_ATTRIBUTE = 'data-casemate-splash';

function readBranding(): Record<string, any> {
  try {
    return ((window as any).__SPACE_CONFIG__?.desktop?.branding || {}) as Record<string, any>;
  } catch (e) {
    return {};
  }
}

function readString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}

// Only used for the assistive-technology label — the splash itself is wordless.
export const SPLASH_BRAND_NAME = readString(readBranding().name, 'Casemate');

// The real Casemate mark — the circular C-arrow — taken from the shared outline
// in lib/brandMark, so the splash, the landing page and the app can never end up
// showing two different logos.
//
// It is drawn inline rather than loaded as an image so the splash paints with no
// network request, and in currentColor so the brand token drives it. There is no
// plate, chip or square behind it: the page surface shows through everywhere the
// outline does not cover. The mark is a ring closed by an arrow, so a continuous
// spin reads as the arrow travelling around the ring. BrandSplash renders the
// same two constants as JSX, so the two copies cannot drift apart.
export const SPLASH_MARK_VIEW_BOX = BRAND_MARK_VIEW_BOX;
export const SPLASH_MARK_PATH_D = BRAND_MARK_PATH_D;

const SPLASH_MARK_SVG = brandMarkSvgMarkup('cm-splash-mark');

// Plain CSS rather than Tailwind: the pre-hydration takeover builds its nodes
// with the DOM API, outside anything the class scanner sees.
const SPLASH_CSS = `
@keyframes cm-splash-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes cm-splash-in { from { opacity: 0; } to { opacity: 1; } }
.cm-splash {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--space-surface-page, #f9fafb);
  animation: cm-splash-in 200ms ease-out both;
}
/* vmin keeps the mark the same optical size on a phone and on a desktop:
   generous on the small side, never oversized on a wide monitor. */
.cm-splash-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(104px, 22vmin, 148px);
  height: clamp(104px, 22vmin, 148px);
}
.cm-splash-mark {
  display: block;
  width: 100%;
  height: 100%;
  color: var(--space-brand-primary, #cc0000);
  transform-origin: 50% 50%;
  animation: cm-splash-spin 1500ms linear infinite;
}
/* The spin is the only progress cue left, so it slows rather than stops. */
@media (prefers-reduced-motion: reduce) {
  .cm-splash { animation: none; }
  .cm-splash-mark { animation-duration: 3000ms; }
}
`;

export function ensureSplashStyle(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ELEMENT_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ELEMENT_ID;
  style.textContent = SPLASH_CSS;
  (document.head || document.documentElement).appendChild(style);
}

export function applyBrandLoaderSplash(): void {
  if (typeof document === 'undefined') return;
  const loader = document.getElementById(PRE_HYDRATION_LOADER_ID);
  if (!loader || loader.getAttribute(TAKEOVER_ATTRIBUTE) === '1') return;

  ensureSplashStyle();
  loader.setAttribute(TAKEOVER_ATTRIBUTE, '1');

  const stage = document.createElement('div');
  stage.className = 'cm-splash-stage';
  stage.setAttribute('role', 'status');
  stage.setAttribute('aria-label', `Loading ${SPLASH_BRAND_NAME}`);
  stage.innerHTML = SPLASH_MARK_SVG;

  // Clearing the shell drops its spinner and its loading copy together. The
  // copy has to leave the document rather than be hidden: the bundle re-shows
  // that node by id on a timer if it is still there.
  loader.textContent = '';
  loader.appendChild(stage);
}
