const META_PIXEL_ID = '1148167871488337';

const META_PIXEL_BASE_CODE = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

const META_PIXEL_NOSCRIPT = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"/>`;

type MetaPixelWindow = Window & {
  fbq?: (...args: any[]) => void;
  __META_PIXEL_ID__?: string;
  __CASEMATE_META_HASH_TRACKING__?: boolean;
};

function metaWindow() {
  return window as MetaPixelWindow;
}

function appendNoScriptFallback() {
  if (document.querySelector(`[data-meta-pixel-noscript="${META_PIXEL_ID}"]`)) return;
  const fallback = document.createElement('noscript');
  fallback.dataset.metaPixelNoscript = META_PIXEL_ID;
  fallback.innerHTML = META_PIXEL_NOSCRIPT;

  const append = () => {
    if (!fallback.isConnected && document.body) document.body.prepend(fallback);
  };
  if (document.body) append();
  else document.addEventListener('DOMContentLoaded', append, { once: true });
}

export function installMetaPixel() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const target = metaWindow();
  target.__META_PIXEL_ID__ = META_PIXEL_ID;

  if (!document.querySelector(`script[data-meta-pixel-id="${META_PIXEL_ID}"]`)) {
    const script = document.createElement('script');
    script.dataset.metaPixelId = META_PIXEL_ID;
    script.text = META_PIXEL_BASE_CODE;
    document.head.prepend(script);
    appendNoScriptFallback();
  }

  if (!target.__CASEMATE_META_HASH_TRACKING__) {
    target.__CASEMATE_META_HASH_TRACKING__ = true;
    let skipInitialAppHashSync = !window.location.hash;
    window.addEventListener('hashchange', () => {
      if (skipInitialAppHashSync) {
        skipInitialAppHashSync = false;
        return;
      }
      if (window.location.hash && typeof target.fbq === 'function') {
        target.fbq('track', 'PageView');
      }
    });
  }
}

function claimEvent(dedupeKey?: string) {
  if (!dedupeKey) return true;
  try {
    const key = `casemate-meta:${dedupeKey}`;
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, String(Date.now()));
  } catch {
    // Tracking remains best-effort when storage is unavailable.
  }
  return true;
}

export function trackMetaCustomEvent(
  eventName: string,
  parameters: Record<string, unknown> = {},
  dedupeKey?: string,
) {
  if (typeof window === 'undefined') return;
  const target = metaWindow();
  if (typeof target.fbq !== 'function' || !claimEvent(dedupeKey)) return;
  target.fbq('trackCustom', eventName, parameters);
}

export function trackMetaPurchase({
  dedupeKey,
  value,
  currency = 'VND',
  planId,
}: {
  dedupeKey: string;
  value?: number | null;
  currency?: string;
  planId?: string | null;
}) {
  if (typeof window === 'undefined') return;
  const target = metaWindow();
  if (typeof target.fbq !== 'function' || !claimEvent(`purchase:${dedupeKey}`)) return;
  const parameters: Record<string, unknown> = {
    currency,
    content_type: 'product',
    content_name: planId || 'Casemate Pro',
  };
  if (Number.isFinite(value) && Number(value) >= 0) parameters.value = Number(value);
  target.fbq('track', 'Purchase', parameters);
}
