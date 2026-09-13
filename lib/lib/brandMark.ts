// The Casemate mark — the circular C-arrow — and nothing behind it.
//
// The mark previously reached every surface as a 1024px raster with a solid
// #cc0000 plate baked into it, so anything that placed it (the landing navbar
// most visibly) painted a red rectangle that ran into whatever it sat on. Here
// the mark is the outline alone: a single path with no background shape, filled
// with the colour the surface asks for. On a light section pass the brand red,
// on a dark one pass white; either way the area around the mark stays empty.
//
// Geometry is a faithful vector trace of the original artwork, normalised into
// a square 1000x1000 box with even optical margins so the mark drops into a
// square slot without extra padding. The two hosted files below are the same
// outline exported for places that need a URL rather than markup (favicons,
// social cards, decks); both have a fully transparent background.

export const BRAND_MARK_VIEW_BOX = '0 0 1000 1000';

export const BRAND_MARK_PATH_D =
  'M459 950C154 925 -44 631 58 354C135 142 378 19 605 78C638 86 689 106 686 109C683 112 566 154 450 193C337 231 304 250 256 300C78 491 211 791 477 802C637 809 770 704 799 549C803 528 827 462 855 394C869 359 888 313 892 303C900 282 935 372 946 439C989 725 752 975 459 950ZM796 445C796 444 794 436 791 429C785 403 772 376 754 347C743 331 743 331 746 322C751 305 773 252 783 231C797 202 797 202 771 219C684 274 687 273 673 263C628 230 572 209 521 205C499 203 495 202 501 200C507 197 607 163 641 152C675 141 702 133 819 96C839 90 865 81 878 77C900 70 960 51 967 49C972 47 971 50 951 93C905 194 839 346 810 419C800 445 797 450 796 445Z';

export const BRAND_MARK_RED = '#cc0000';
export const BRAND_MARK_WHITE = '#ffffff';

const HOSTED_BRAND_ASSETS =
  'https://storage.googleapis.com/audos-images/workspaces/c6ce26d1-7466-4b72-962d-b7bf7a471c88/uploads/brand/';

// Transparent exports of the mark above — red for light backgrounds, white for
// dark ones. Mirrored in the workspace as assets/logo-red.svg and
// assets/logo-white.svg.
export const BRAND_MARK_SVG_RED = `${HOSTED_BRAND_ASSETS}89b30a22-1b16-4449-972a-5d8c6b459198.svg`;
export const BRAND_MARK_SVG_WHITE = `${HOSTED_BRAND_ASSETS}cb1a5f98-f3ba-44f1-bd5e-142f7d3f4069.svg`;
export const BRAND_MARK_PNG_RED = `${HOSTED_BRAND_ASSETS}e28b4f5e-44e7-4243-a6ec-91b01e5e68bb.png`;
export const BRAND_MARK_PNG_WHITE = `${HOSTED_BRAND_ASSETS}02ad64ce-be52-4d70-992f-08e0b01728f1.png`;

// Markup form, for the pre-hydration loader that builds its nodes with the DOM
// API before any component tree exists.
export function brandMarkSvgMarkup(className: string, color = 'currentColor'): string {
  return (
    `<svg class="${className}" viewBox="${BRAND_MARK_VIEW_BOX}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
    `<path d="${BRAND_MARK_PATH_D}" fill="${color}" fill-rule="evenodd"/>` +
    '</svg>'
  );
}
