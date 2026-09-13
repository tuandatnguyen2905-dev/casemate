import {
  ensureSplashStyle,
  SPLASH_BRAND_NAME,
  SPLASH_MARK_PATH_D,
  SPLASH_MARK_VIEW_BOX,
} from '../lib/loaderSplash';

// Injected on import rather than in an effect so the mark is styled in the same
// frame it first paints.
ensureSplashStyle();

// Full-surface loading state: the Casemate mark on the page surface, with no
// copy of any kind and nothing behind the mark. It is drawn from the same
// geometry constants applyBrandLoaderSplash() writes into the pre-hydration
// shell, so replacing one with the other is invisible.
export default function BrandSplash() {
  return (
    <div className="cm-splash">
      <div className="cm-splash-stage" role="status" aria-label={`Loading ${SPLASH_BRAND_NAME}`}>
        <svg className="cm-splash-mark" viewBox={SPLASH_MARK_VIEW_BOX} aria-hidden="true" focusable="false">
          <path d={SPLASH_MARK_PATH_D} fill="currentColor" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}
