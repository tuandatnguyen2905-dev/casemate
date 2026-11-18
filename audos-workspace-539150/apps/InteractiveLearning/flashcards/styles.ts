// Scoped stylesheet for the feature. Every selector is prefixed with `.cmfc` so nothing leaks into
// the rest of the space. Accent and surfaces read the space's --space-* tokens when present.

export const FLASHCARD_STYLE_ID = 'cmfc-styles';

export const FLASHCARD_CSS = `
.cmfc {
  --cmfc-ink: #0f1e36;
  --cmfc-slate: #475569;
  --cmfc-muted: #64748b;
  --cmfc-line: #e2e8f0;
  --cmfc-line-strong: #cbd5e1;
  --cmfc-surface: var(--space-surface-card, #ffffff);
  --cmfc-subtle: #f8fafc;
  --cmfc-accent: var(--space-brand-primary, #cc0000);
  --cmfc-accent-strong: var(--space-brand-primary-700, #b91c1c);
  --cmfc-accent-soft: var(--space-brand-primary-50, #fff5f5);
  box-sizing: border-box;
  min-height: 100%;
  width: 100%;
  background: #ffffff;
  color: var(--cmfc-ink);
  font-family: var(--space-font-body, Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  line-height: 1.5;
  overflow-x: hidden;
}
.cmfc *, .cmfc *::before, .cmfc *::after { box-sizing: border-box; }
.cmfc-shell { max-width: 720px; margin: 0 auto; padding: 32px 20px 48px; }
.cmfc--embedded { min-height: 0; background: transparent; }
.cmfc-shell--embedded { max-width: none; padding: 0; }
.cmfc-header { margin-bottom: 24px; }
.cmfc-eyebrow { margin: 0 0 6px; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--cmfc-accent); }
.cmfc-title { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.01em; color: var(--cmfc-ink); }
.cmfc-subtitle { margin: 6px 0 0; font-size: 15px; color: var(--cmfc-slate); }
.cmfc-text-muted { color: var(--cmfc-muted); }
.cmfc-small { font-size: 13px; }
.cmfc-visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

.cmfc-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 44px; padding: 10px 18px; border-radius: 10px;
  font: inherit; font-size: 15px; font-weight: 600; cursor: pointer;
  border: 1px solid var(--cmfc-line-strong); background: #ffffff; color: var(--cmfc-ink);
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
}
.cmfc-btn:hover:not(:disabled) { background: var(--cmfc-subtle); border-color: var(--cmfc-muted); }
.cmfc-btn:disabled { cursor: not-allowed; opacity: 0.45; }
.cmfc-btn-primary { background: var(--cmfc-accent); border-color: var(--cmfc-accent); color: #ffffff; }
.cmfc-btn-primary:hover:not(:disabled) { background: var(--cmfc-accent-strong); border-color: var(--cmfc-accent-strong); }
.cmfc-btn-ghost { border-color: transparent; background: transparent; color: var(--cmfc-slate); padding-left: 10px; padding-right: 10px; }
.cmfc-btn-ghost:hover:not(:disabled) { background: var(--cmfc-subtle); border-color: transparent; color: var(--cmfc-ink); }
.cmfc :focus-visible { outline: 2px solid var(--cmfc-accent); outline-offset: 2px; }

.cmfc-deck-list { display: grid; gap: 14px; margin: 0; padding: 0; list-style: none; }
.cmfc-deck { border: 1px solid var(--cmfc-line); border-radius: 14px; padding: 20px; background: var(--cmfc-surface); }
.cmfc-deck-title { margin: 0; font-size: 18px; font-weight: 650; color: var(--cmfc-ink); }
.cmfc-deck-desc { margin: 4px 0 0; font-size: 14px; color: var(--cmfc-slate); }
.cmfc-deck-source { margin: 10px 0 0; font-size: 12.5px; color: var(--cmfc-muted); }
.cmfc-deck-stats { display: flex; flex-wrap: wrap; gap: 6px 18px; margin: 14px 0 0; padding: 0; list-style: none; font-size: 13px; color: var(--cmfc-slate); }
.cmfc-deck-stats strong { color: var(--cmfc-ink); font-weight: 650; }
.cmfc-deck-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }

.cmfc-meter { margin-top: 14px; }
.cmfc-meter-label { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--cmfc-muted); margin-bottom: 6px; }
.cmfc-meter-track { height: 4px; border-radius: 999px; background: var(--cmfc-line); overflow: hidden; }
.cmfc-meter-fill { height: 100%; border-radius: 999px; background: var(--cmfc-accent); transition: width 200ms ease; }
.cmfc-meter-fill--ink { background: var(--cmfc-ink); }

.cmfc-topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.cmfc-topbar .cmfc-btn { flex-shrink: 0; white-space: nowrap; }
.cmfc-session-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--cmfc-ink); text-align: right; overflow-wrap: anywhere; }
.cmfc-progress { margin-bottom: 18px; }
.cmfc-reason { margin: 0 0 10px; font-size: 12.5px; color: var(--cmfc-muted); text-align: center; }

.cmfc-card {
  position: relative; display: block; width: 100%; min-height: 300px; margin: 0;
  padding: 32px 28px; border-radius: 16px; border: 1px solid var(--cmfc-line);
  background: var(--cmfc-surface); color: var(--cmfc-ink); text-align: left;
  box-shadow: 0 1px 2px rgba(15, 30, 54, 0.04);
  font: inherit; overflow-wrap: anywhere;
}
button.cmfc-card, .cmfc-card[role="button"] { cursor: pointer; transition: border-color 120ms ease, box-shadow 120ms ease; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
button.cmfc-card:hover, .cmfc-card[role="button"]:hover { border-color: var(--cmfc-line-strong); box-shadow: 0 6px 18px rgba(15, 30, 54, 0.07); }
.cmfc-card-front { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
.cmfc-face--question { display: flex; flex-direction: column; align-items: center; }
.cmfc-card--answer { border-top: 3px solid var(--cmfc-accent); }
.cmfc-card--answer .cmfc-face-label { color: var(--cmfc-accent); }
.cmfc-card:focus { outline: none; }
.cmfc-card:focus-visible { outline: 2px solid var(--cmfc-accent); outline-offset: 2px; }
.cmfc-face-label { margin: 0 0 14px; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--cmfc-muted); }
.cmfc-prompt { margin: 0; font-size: 22px; font-weight: 600; line-height: 1.4; color: var(--cmfc-ink); max-width: 34ch; }
.cmfc-hint { margin: 22px 0 0; font-size: 13px; color: var(--cmfc-muted); }
.cmfc-answer { margin: 0; font-size: 19px; font-weight: 600; line-height: 1.5; color: var(--cmfc-ink); }
.cmfc-detail { margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--cmfc-line); }
.cmfc-detail-label { margin: 0 0 4px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--cmfc-muted); }
.cmfc-detail-text { margin: 0; font-size: 15px; color: var(--cmfc-slate); }
.cmfc-source { margin: 18px 0 0; font-size: 12.5px; color: var(--cmfc-muted); }
.cmfc-card-back:focus { outline: none; }
.cmfc-card-back:focus-visible { outline: 2px solid var(--cmfc-accent); outline-offset: 2px; }
.cmfc-flip-back { margin-top: 14px; }

@keyframes cmfc-reveal {
  from { opacity: 0; transform: perspective(1200px) rotateY(-7deg); }
  to { opacity: 1; transform: none; }
}
.cmfc-animate { animation: cmfc-reveal 220ms ease-out; transform-origin: center; }
@media (prefers-reduced-motion: reduce) {
  .cmfc-animate { animation: none; }
  .cmfc-btn, .cmfc-meter-fill, button.cmfc-card, .cmfc-card[role="button"] { transition: none; }
}

.cmfc-rating { margin-top: 18px; }
.cmfc-rating-label { margin: 0 0 10px; font-size: 13px; color: var(--cmfc-slate); text-align: center; }
.cmfc-rating-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
.cmfc-rate { flex-direction: column; gap: 2px; min-height: 60px; padding: 8px 6px; }
.cmfc-rate-name { font-size: 15px; font-weight: 600; }
.cmfc-rate-meta { font-size: 12px; font-weight: 500; color: var(--cmfc-muted); }
.cmfc-rate--again .cmfc-rate-name { color: var(--cmfc-accent); }
.cmfc-rated-note { margin: 14px 0 0; text-align: center; font-size: 13px; color: var(--cmfc-slate); }
.cmfc-rating-optional { margin: 8px 0 0; text-align: center; font-size: 12.5px; color: var(--cmfc-muted); }

.cmfc-nav { display: flex; justify-content: space-between; gap: 10px; margin-top: 18px; }
.cmfc-kbd-help { margin: 18px 0 0; text-align: center; font-size: 12px; color: var(--cmfc-muted); }
.cmfc-kbd-help kbd { font-family: inherit; font-size: 11px; padding: 1px 6px; border: 1px solid var(--cmfc-line-strong); border-radius: 4px; background: var(--cmfc-subtle); color: var(--cmfc-slate); }

.cmfc-panel { border: 1px solid var(--cmfc-line); border-radius: 16px; padding: 28px; background: var(--cmfc-surface); }
.cmfc-panel-title { margin: 0; font-size: 20px; font-weight: 700; color: var(--cmfc-ink); }
.cmfc-panel-title[tabindex="-1"]:focus { outline: none; }
.cmfc-panel-text { margin: 8px 0 0; font-size: 15px; color: var(--cmfc-slate); }
.cmfc-tally { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin: 20px 0 0; padding: 0; list-style: none; }
.cmfc-tally li { border: 1px solid var(--cmfc-line); border-radius: 12px; padding: 12px; text-align: center; }
.cmfc-tally-value { display: block; font-size: 22px; font-weight: 700; color: var(--cmfc-ink); }
.cmfc-tally-label { display: block; font-size: 12.5px; color: var(--cmfc-muted); }
.cmfc-panel-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
.cmfc-session-counts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin: 18px 0 0; }
.cmfc-session-counts > div { min-width: 0; border: 1px solid var(--cmfc-line); border-radius: 12px; padding: 10px 12px; background: var(--cmfc-subtle); }
.cmfc-session-counts dt { margin: 0; font-size: 12px; font-weight: 600; color: var(--cmfc-muted); }
.cmfc-session-counts dd { margin: 2px 0 0; font-size: 22px; font-weight: 700; color: var(--cmfc-ink); font-variant-numeric: tabular-nums; }
.cmfc-summary-heading { margin: 22px 0 0; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--cmfc-muted); }
.cmfc-summary-heading + .cmfc-tally { margin-top: 10px; }
.cmfc-continue { margin-top: 22px; padding: 16px; border: 1px solid var(--cmfc-line); border-left: 4px solid var(--cmfc-accent); border-radius: 12px; background: var(--cmfc-accent-soft); }
.cmfc-continue-notice { margin: 0 0 12px; font-size: 14px; color: var(--cmfc-slate); }
.cmfc-continue-btn { width: 100%; }
.cmfc-continue-detail { margin: 8px 0 0; font-size: 13px; color: var(--cmfc-slate); overflow-wrap: anywhere; }
@media (min-width: 561px) { .cmfc-continue-btn { width: auto; } }

.cmfc-session { max-width: 640px; margin: 0 auto; }
.cmfc-session .cmfc-card-back { min-height: 0; }
.cmfc-reveal { display: flex; justify-content: center; margin-top: 16px; }
.cmfc-reveal .cmfc-btn { min-width: 220px; }
/* Rating stays next to the revealed answer while a long answer scrolls (the dialog is the scroll container). */
.cmfc-session .cmfc-rating { position: sticky; bottom: 0; z-index: 1; margin-top: 0; padding: 14px 0 calc(14px + env(safe-area-inset-bottom, 0px)); background: linear-gradient(to bottom, rgba(255, 255, 255, 0.92), #ffffff 32%); }

/* MCQ and fill-in-the-blank cards: a plain region with its own controls, never a flip target. */
.cmfc-card--interactive { min-height: 0; border-top: 3px solid var(--cmfc-line-strong); }
.cmfc-card--interactive[data-revealed="true"] { border-top-color: var(--cmfc-accent); }
.cmfc-interaction { margin: 0; }
.cmfc-prompt--interactive { display: block; max-width: none; margin: 0 0 14px; padding: 0; font-size: 19px; }
.cmfc-options { display: grid; gap: 10px; min-width: 0; margin: 0; padding: 0; border: 0; }
.cmfc-option {
  display: flex; align-items: flex-start; gap: 12px; min-height: 48px; padding: 12px 14px;
  border: 1px solid var(--cmfc-line-strong); border-radius: 12px; background: #ffffff;
  font-size: 15px; color: var(--cmfc-ink); cursor: pointer; transition: border-color 120ms ease, background-color 120ms ease;
}
.cmfc-option:hover { border-color: var(--cmfc-muted); }
.cmfc-option input { flex-shrink: 0; width: 18px; height: 18px; margin: 2px 0 0; accent-color: var(--cmfc-accent); }
.cmfc-option-text { flex: 1 1 auto; min-width: 0; }
.cmfc-option-tag { flex-shrink: 0; align-self: center; font-size: 12px; font-weight: 600; color: var(--cmfc-slate); }
.cmfc-option--selected { border-color: var(--cmfc-ink); background: var(--cmfc-subtle); }
.cmfc-option--correct { border-color: var(--space-semantic-success-600, #15803d); background: var(--space-semantic-success-50, #f0fdf4); }
.cmfc-option--correct .cmfc-option-tag { color: var(--space-semantic-success-700, #15803d); }
.cmfc-option--incorrect { border-color: var(--cmfc-accent); background: var(--cmfc-accent-soft); }
.cmfc-option--incorrect .cmfc-option-tag { color: var(--cmfc-accent); }
.cmfc-options:disabled .cmfc-option { cursor: default; }
.cmfc-blank { display: inline-block; min-width: 5em; margin: 0 4px; padding: 0 6px; border-bottom: 2px solid var(--cmfc-ink); text-align: center; }
.cmfc-input-label { display: block; margin: 0 0 6px; font-size: 13px; font-weight: 600; color: var(--cmfc-slate); }
.cmfc-input { width: 100%; min-height: 48px; padding: 10px 14px; border: 1px solid var(--cmfc-line-strong); border-radius: 10px; background: #ffffff; font: inherit; font-size: 16px; color: var(--cmfc-ink); }
.cmfc-input:disabled { background: var(--cmfc-subtle); color: var(--cmfc-slate); }
.cmfc-interaction-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
.cmfc-feedback { margin-top: 16px; padding: 12px 14px; border: 1px solid var(--cmfc-line); border-radius: 12px; background: var(--cmfc-subtle); }
.cmfc-feedback:focus { outline: none; }
.cmfc-feedback:focus-visible { outline: 2px solid var(--cmfc-accent); outline-offset: 2px; }
.cmfc-feedback--correct { border-color: var(--space-semantic-success-300, #86efac); background: var(--space-semantic-success-50, #f0fdf4); }
.cmfc-feedback--incorrect { border-color: var(--cmfc-accent); background: var(--cmfc-accent-soft); }
.cmfc-feedback-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--cmfc-ink); }
.cmfc-feedback .cmfc-interaction-actions { margin-top: 10px; }
.cmfc-answer-text { font-weight: 600; color: var(--cmfc-ink); }
@media (prefers-reduced-motion: reduce) { .cmfc-option { transition: none; } }
@media (max-width: 560px) {
  .cmfc-prompt--interactive { font-size: 17px; }
  .cmfc-interaction-actions .cmfc-btn { flex: 1 1 auto; }
}

@media (hover: none) and (pointer: coarse) {
  .cmfc-kbd-help { display: none; }
}
@media (max-width: 560px) {
  .cmfc-shell { padding: 20px 14px 36px; }
  .cmfc-session-title { font-size: 14px; }
  .cmfc-title { font-size: 22px; }
  .cmfc-card { min-height: 260px; padding: 24px 18px; }
  .cmfc-prompt { font-size: 19px; }
  .cmfc-answer { font-size: 17px; }
  .cmfc-rating-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cmfc-tally { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cmfc-deck-actions .cmfc-btn, .cmfc-panel-actions .cmfc-btn { flex: 1 1 auto; }
}
`;
