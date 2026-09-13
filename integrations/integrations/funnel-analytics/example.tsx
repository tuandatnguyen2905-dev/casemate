// Funnel Analytics — fire conversion events into Google Tag Manager.
//
// `window.trackFunnelEvent` and `window.dataLayer` are always injected into a
// Space app, so you can call them without any import or setup. When the
// workspace has no GTM container configured the call is a safe no-op.

declare global {
  interface Window {
    trackFunnelEvent?: (
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

// Fire a simple event.
export function trackPageViewed(page: string) {
  window.trackFunnelEvent?.('page_viewed', { page });
}

// Fire an event with conversion parameters.
export function trackLeadSubmitted(plan: string, value: number) {
  window.trackFunnelEvent?.('lead_submitted', { plan, value });
}

// Example: wire it into a React handler.
import { useState } from 'react';

export function SignupButton() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSignup() {
    setSubmitting(true);
    try {
      window.trackFunnelEvent?.('checkout_started', { source: 'signup_button' });
      // ... your signup / checkout logic ...
      window.trackFunnelEvent?.('lead_submitted', { plan: 'pro', value: 49 });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <button onClick={handleSignup} disabled={submitting}>
      {submitting ? 'Working…' : 'Get started'}
    </button>
  );
}
