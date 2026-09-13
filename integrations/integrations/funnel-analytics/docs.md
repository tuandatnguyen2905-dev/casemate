# Funnel Analytics & Event Tracking

Fire conversion / funnel events from your Space app into Google Tag Manager (and any tools wired through it) using the always-available `window.trackFunnelEvent` helper.

## Category
Analytics & Tracking

## Required API Keys
None. Tracking is configured at the workspace level (Google Tag Manager container id, Meta Pixel id, custom head HTML). When nothing is configured the helper is a safe no-op — it never throws.

## How it works

Every compiled Space app has these globals injected into the page, with **no setup required**:

- `window.dataLayer` — the standard Google Tag Manager data layer array.
- `window.trackFunnelEvent(eventName, params?)` — pushes `{ event: eventName, ...params }` onto `window.dataLayer`. If the workspace has a GTM container configured, GTM (and the tags inside it) receive the event. If not, the push is harmless.

When the workspace has a Google Tag Manager container id set (`google_tag_manager_id`), the GTM head + body snippets are injected automatically, identical to the workspace's landing page. A Meta Pixel (`meta_pixel_id`) is injected by the serving layer and respects the workspace GDPR consent setting. Any `custom_head_html` configured for the workspace is also injected.

## Usage

```ts
// Always safe to call — no import, no setup.
window.trackFunnelEvent('lead_submitted', { plan: 'pro', value: 49 });
window.trackFunnelEvent('checkout_started');
```

Pass an event name and an optional flat object of parameters. The parameters are merged into the dataLayer push alongside `event: <eventName>`, so GTM triggers and variables can read them.

## Notes

- The helper is defined before your app bundle runs, so it is safe to call during render or in effects.
- Do not assume a tag is present — design events to be useful for GTM but harmless when unconfigured.
- For typed access, declare it: `declare global { interface Window { trackFunnelEvent?: (name: string, params?: Record<string, unknown>) => void } }`.
