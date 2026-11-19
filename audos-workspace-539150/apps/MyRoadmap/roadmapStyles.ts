// Scoped stylesheet for My Roadmap. The design-system variables live on
// `.mr-root` (the prototype's :root) and resolve to the workspace brand tokens,
// so the page follows workspace-branding.json. In-card breakpoints are container
// queries on each `.mr-card` because the app window can be narrower than the
// viewport; containment makes a card the containing block for fixed elements,
// so dialogs must render outside every card.

export const ROADMAP_CSS = `
.mr-root {
  --mr-red: var(--space-brand-primary-600, #d40000);
  --mr-red-dark: var(--space-brand-primary-700, #a80000);
  --mr-red-soft: var(--space-brand-primary-50, #fff5f5);
  --mr-red-tint: var(--space-brand-primary-100, #fee2e2);
  --mr-red-line: var(--space-brand-primary-200, #fecaca);
  --mr-ink: var(--space-text-primary, #111827);
  --mr-ink-2: var(--space-text-secondary, #374151);
  --mr-muted: var(--space-text-muted, #6b7280);
  --mr-line: var(--space-neutral-200, #e7e8eb);
  --mr-line-soft: var(--space-neutral-100, #f3f4f5);
  --mr-surface: var(--space-surface-card, #ffffff);
  --mr-bg: var(--space-surface-page, #f9fafb);
  --mr-green: var(--space-semantic-success-500, #149644);
  --mr-green-dark: var(--space-semantic-success-700, #12893e);
  --mr-green-soft: color-mix(in srgb, var(--space-semantic-success-500, #149644) 12%, transparent);
  --mr-amber: var(--space-semantic-warning-700, #b66405);
  --mr-amber-soft: color-mix(in srgb, var(--space-semantic-warning-500, #c86d06) 14%, transparent);
  --mr-danger: var(--space-semantic-danger, #dc2626);
  --mr-radius: 16px;
  --mr-radius-sm: 12px;
  --mr-shadow: 0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06);
  --mr-shadow-hover: 0 4px 14px rgba(16, 24, 40, 0.08);
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background: var(--mr-bg);
  color: var(--mr-ink);
  font-size: 14px;
  line-height: 1.5;
}
.mr-root *, .mr-root *::before, .mr-root *::after { box-sizing: border-box; }
:where(.mr-root) button { font: inherit; cursor: pointer; }
:where(.mr-root) button:disabled { cursor: not-allowed; opacity: 0.6; }
.mr-root button:focus-visible, .mr-root input:focus-visible, .mr-modal button:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--mr-red) 45%, transparent);
  outline-offset: 2px;
}
.mr-wrap {
  width: min(1220px, calc(100% - 48px));
  margin: 0 auto;
  padding: 28px 0 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

/* Page header */
.mr-page-head h1 { margin: 0; display: flex; align-items: center; gap: 10px; font-size: 24px; font-weight: 800; letter-spacing: -0.01em; }
.mr-page-head h1 svg { color: var(--mr-red); }
.mr-page-head p { margin: 4px 0 0; color: var(--mr-muted); font-size: 14px; }

/* Cards and section headings */
.mr-card {
  background: var(--mr-surface);
  border: 1px solid var(--mr-line);
  border-radius: var(--mr-radius);
  box-shadow: var(--mr-shadow);
  padding: 22px 24px;
  min-width: 0;
  container-type: inline-size;
}
.mr-sec-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.mr-sec-head > div { min-width: 0; }
.mr-sec-head > .mr-pill { flex-shrink: 0; }
.mr-eyebrow { display: block; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mr-red); }
.mr-h2 { margin: 4px 0 0; font-size: 19px; font-weight: 800; line-height: 1.3; color: var(--mr-ink); }
.mr-sub { margin: 4px 0 0; font-size: 13px; color: var(--mr-muted); overflow-wrap: anywhere; }
.mr-sub strong { color: var(--mr-ink); font-weight: 700; }

/* Pills, chips, badges */
.mr-pill { display: inline-flex; align-items: center; gap: 4px; border-radius: 999px; padding: 4px 11px; font-size: 12px; font-weight: 800; white-space: nowrap; }
.mr-pill--red { background: var(--mr-red); color: #fff; }
.mr-pill--soft { background: var(--mr-red-soft); color: var(--mr-red); border: 1px solid var(--mr-red-line); }
.mr-pill--green { background: var(--mr-green-soft); color: var(--mr-green-dark); }
.mr-chip { display: inline-flex; align-items: center; gap: 4px; border-radius: 999px; padding: 2px 9px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.mr-chip svg { width: 12px; height: 12px; }
.mr-chip.is-current { background: var(--mr-red); color: #fff; }
.mr-chip.is-past { background: var(--mr-green-soft); color: var(--mr-green-dark); }
.mr-chip.is-upcoming { background: var(--mr-line-soft); color: var(--mr-muted); }
.mr-badge { display: inline-flex; align-items: center; gap: 4px; border-radius: 999px; padding: 2px 8px; font-size: 10.5px; font-weight: 700; white-space: nowrap; }
.mr-badge--general { background: var(--mr-line-soft); color: var(--mr-ink-2); border: 1px solid var(--mr-line); }
.mr-badge--exact { background: var(--mr-green-soft); color: var(--mr-green-dark); }
.mr-badge--related { background: var(--mr-amber-soft); color: var(--mr-amber); }
.mr-extra { display: inline-flex; border-radius: 999px; padding: 1px 7px; font-size: 10.5px; font-weight: 700; background: var(--mr-green-soft); color: var(--mr-green-dark); white-space: nowrap; }

/* Buttons */
.mr-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px; padding: 0 16px; border-radius: 10px; font-size: 13px; font-weight: 700; border: 1px solid transparent; text-decoration: none; transition: background-color 0.15s, border-color 0.15s, color 0.15s; }
.mr-btn svg { width: 16px; height: 16px; flex-shrink: 0; }
.mr-btn--primary { background: var(--mr-red); color: #fff; }
.mr-btn--primary:hover:not(:disabled) { background: var(--mr-red-dark); }
.mr-btn--ghost { background: var(--mr-surface); color: var(--mr-ink-2); border-color: var(--mr-line); }
.mr-btn--ghost:hover:not(:disabled) { border-color: var(--mr-red-line); color: var(--mr-red); }
.mr-btn--block { width: 100%; }
.mr-btn--sm { min-height: 36px; padding: 0 12px; font-size: 12px; }
.mr-link { display: inline-flex; align-items: center; gap: 4px; min-height: 32px; padding: 0 4px; border: 0; background: none; color: var(--mr-red); font-size: 12.5px; font-weight: 700; text-decoration: underline; text-decoration-color: var(--mr-red-line); text-underline-offset: 4px; border-radius: 6px; }
.mr-link:hover { text-decoration-color: var(--mr-red); }
.mr-link--muted { color: var(--mr-muted); }
.mr-link--muted:hover { color: var(--mr-danger); }

/* Progress bars */
.mr-bar { position: relative; height: 8px; border-radius: 999px; background: var(--mr-line-soft); overflow: hidden; }
.mr-bar--thin { height: 6px; }
.mr-bar--thick { height: 10px; }
.mr-bar > span { display: block; height: 100%; border-radius: inherit; background: var(--mr-red); transition: width 0.5s ease; }
.mr-bar.is-done > span { background: var(--mr-green); }
.mr-num { font-variant-numeric: tabular-nums; }

/* 1. Target program */
.mr-target { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 20px; }
.mr-target-main { min-width: 0; flex: 1 1 380px; }
.mr-target-title { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; margin-top: 6px; }
.mr-target-title h2 { margin: 0; font-size: 20px; font-weight: 800; line-height: 1.25; overflow-wrap: anywhere; }
.mr-target-meta { display: flex; flex-wrap: wrap; gap: 6px 18px; margin: 10px 0 0; padding: 0; list-style: none; font-size: 13px; color: var(--mr-ink-2); }
.mr-target-meta li { display: inline-flex; align-items: center; gap: 6px; min-width: 0; overflow-wrap: anywhere; }
.mr-target-meta svg { width: 15px; height: 15px; color: var(--mr-red); flex-shrink: 0; }
.mr-target-meta b { font-weight: 700; color: var(--mr-ink); }
.mr-target-note { margin: 8px 0 0; font-size: 12px; color: var(--mr-muted); }
.mr-target-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.mr-confirm { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12.5px; color: var(--mr-ink-2); max-width: 420px; }
.mr-error { margin: 8px 0 0; font-size: 12.5px; font-weight: 700; color: var(--mr-danger); }
.mr-target--empty { border-style: dashed; border-color: var(--mr-red-line); background: linear-gradient(180deg, var(--mr-red-soft), var(--mr-surface)); }

/* 2. Progress this week */
.mr-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.mr-stat { background: var(--mr-bg); border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); padding: 12px 14px; min-width: 0; }
.mr-stat-label { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mr-muted); }
.mr-stat-value { margin-top: 2px; font-size: 20px; font-weight: 800; line-height: 1.2; color: var(--mr-ink); overflow-wrap: anywhere; }
.mr-stat-value--text { font-size: 15px; line-height: 1.3; }
.mr-stat-sub { margin-top: 2px; font-size: 11.5px; color: var(--mr-ink-2); }
.mr-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 14px; }
.mr-track { border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); padding: 14px 16px; background: var(--mr-surface); min-width: 0; }
.mr-track-head { display: flex; align-items: center; gap: 10px; }
.mr-track-icon { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 10px; background: var(--mr-red-soft); color: var(--mr-red); flex-shrink: 0; }
.mr-track-icon svg { width: 17px; height: 17px; }
.mr-track-name { font-size: 14px; font-weight: 800; }
.mr-track-goal { font-size: 11.5px; color: var(--mr-muted); }
.mr-track-count { margin-left: auto; font-size: 20px; font-weight: 800; }
.mr-track-count.is-done { color: var(--mr-green); }
.mr-track-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 8px; font-size: 11.5px; color: var(--mr-ink-2); min-height: 18px; }
.mr-track-foot .is-done { display: inline-flex; align-items: center; gap: 4px; font-weight: 700; color: var(--mr-green); }
.mr-overall { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--mr-line); }
.mr-overall-row { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 4px 12px; margin-bottom: 8px; font-size: 13px; }
.mr-overall-row b { font-weight: 800; }
.mr-note { margin: 12px 0 0; padding: 10px 12px; border-radius: 10px; background: var(--mr-red-soft); font-size: 12.5px; color: var(--mr-ink-2); }
.mr-note strong { color: var(--mr-ink); }
.mr-start { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; margin-top: 14px; font-size: 12.5px; color: var(--mr-ink-2); }
.mr-start svg { width: 15px; height: 15px; color: var(--mr-red); flex-shrink: 0; }
.mr-start .mr-link { margin-left: auto; }
.mr-start-editor { margin-top: 10px; padding: 14px; border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); background: var(--mr-bg); }
.mr-start-editor label { font-size: 13px; font-weight: 700; }
.mr-start-editor p { margin: 2px 0 0; font-size: 11.5px; color: var(--mr-muted); }
.mr-start-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; align-items: center; }
.mr-start-row input { min-height: 44px; border: 1px solid var(--mr-line); border-radius: 10px; padding: 0 12px; font: inherit; color: var(--mr-ink); background: var(--mr-surface); max-width: 100%; }

/* 3. Recommendations */
.mr-rec-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-items: start; }
.mr-rec-col { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.mr-rec-col-head { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mr-ink-2); }
.mr-rec-col-head svg { width: 16px; height: 16px; color: var(--mr-red); }
.mr-rec-col-head .mr-rec-col-count { margin-left: auto; font-weight: 700; letter-spacing: 0; text-transform: none; color: var(--mr-muted); }
.mr-rec-card { position: relative; display: flex; flex-direction: column; gap: 10px; border: 1px solid var(--mr-line); border-top: 3px solid var(--mr-red); border-radius: var(--mr-radius-sm); padding: 16px; background: var(--mr-surface); min-width: 0; transition: box-shadow 0.15s, border-color 0.15s; }
.mr-rec-card:hover { box-shadow: var(--mr-shadow-hover); }
.mr-rec-card-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 6px; }
.mr-rec-kicker { font-size: 10.5px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mr-red); }
.mr-rec-title { margin: 0; padding: 0; border: 0; background: none; text-align: left; font-size: 16px; font-weight: 800; line-height: 1.3; color: var(--mr-ink); overflow-wrap: anywhere; border-radius: 6px; }
button.mr-rec-title:hover { color: var(--mr-red); }
.mr-rec-title small { display: block; margin-top: 2px; font-size: 11.5px; font-weight: 600; color: var(--mr-muted); }
.mr-rec-desc { margin: 0; font-size: 12.5px; color: var(--mr-ink-2); }
.mr-rec-why { margin: 0; padding: 10px 12px; border-radius: 10px; background: var(--mr-bg); font-size: 12px; color: var(--mr-ink-2); }
.mr-rec-why b { display: block; margin-bottom: 2px; font-size: 10.5px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mr-muted); }
.mr-rec-progress-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; font-size: 11.5px; }
.mr-rec-progress-row span:first-child { font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--mr-muted); font-size: 10.5px; }
.mr-rec-progress-row span:last-child { font-weight: 800; color: var(--mr-ink-2); }
.mr-rec-loading { display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--mr-muted); }
.mr-rec-actions { display: flex; flex-direction: column; gap: 4px; margin-top: 2px; }
.mr-rec-actions .mr-link { align-self: center; }
.mr-rec-more { display: flex; flex-direction: column; gap: 8px; }
.mr-rec-mini { display: flex; flex-direction: column; gap: 6px; width: 100%; padding: 12px 14px; border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); background: var(--mr-surface); text-align: left; color: var(--mr-ink); transition: border-color 0.15s, box-shadow 0.15s; }
.mr-rec-mini:hover { border-color: var(--mr-red-line); box-shadow: var(--mr-shadow-hover); }
.mr-rec-mini-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.mr-rec-mini-title { font-size: 13.5px; font-weight: 800; line-height: 1.3; overflow-wrap: anywhere; }
.mr-rec-mini-title small { display: block; font-size: 11px; font-weight: 600; color: var(--mr-muted); }
.mr-rec-mini-why { font-size: 11.5px; color: var(--mr-ink-2); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.mr-rec-mini-foot { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--mr-muted); }
.mr-rec-mini-foot .mr-bar { flex: 1; }
.mr-rec-mini-foot svg { width: 14px; height: 14px; color: var(--mr-red); }
.mr-explore { display: flex; justify-content: center; margin-top: 16px; }
.mr-explore .mr-btn svg { transition: transform 0.2s; }
.mr-explore .mr-btn[aria-expanded="true"] svg { transform: rotate(180deg); }
.mr-rec-empty { padding: 12px; border: 1px dashed var(--mr-line); border-radius: var(--mr-radius-sm); font-size: 12px; color: var(--mr-muted); text-align: center; }

/* 4. Timeline */
.mr-tabs { display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 2px; padding: 4px; border-radius: 12px; background: var(--mr-line-soft); }
.mr-tab { min-height: 38px; padding: 0 16px; border: 0; border-radius: 9px; background: transparent; color: var(--mr-ink-2); font-size: 13px; font-weight: 700; white-space: nowrap; }
.mr-tab:hover { color: var(--mr-red); }
.mr-tab[aria-selected="true"] { background: var(--mr-red); color: #fff; box-shadow: var(--mr-shadow); }
.mr-phases { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.mr-phase { display: flex; flex-direction: column; gap: 6px; padding: 14px; border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); background: var(--mr-surface); text-align: left; color: var(--mr-ink); min-width: 0; transition: border-color 0.15s, box-shadow 0.15s; }
.mr-phase:hover { border-color: var(--mr-red-line); }
.mr-phase.is-current { border-color: var(--mr-red); background: var(--mr-red-soft); box-shadow: inset 0 0 0 1px var(--mr-red); }
.mr-phase.is-upcoming { border-style: dashed; }
.mr-phase > *, .mr-rec-mini > * { width: 100%; }
.mr-phase-top { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.mr-phase-idx { font-size: 10.5px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mr-muted); }
.mr-phase-name { font-size: 14px; font-weight: 800; line-height: 1.3; overflow-wrap: anywhere; }
.mr-phase.is-current .mr-phase-name { color: var(--mr-red); }
.mr-phase-range { font-size: 11.5px; color: var(--mr-muted); }
.mr-phase-prog { display: flex; align-items: center; justify-content: space-between; gap: 6px; font-size: 11.5px; color: var(--mr-ink-2); }
.mr-view { margin-top: 18px; }
.mr-weeknav { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
.mr-weeknav-title { text-align: center; min-width: 0; }
.mr-weeknav-title b { display: block; font-size: 15px; font-weight: 800; }
.mr-weeknav-title span { font-size: 12px; color: var(--mr-muted); }
.mr-icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 10px; border: 1px solid var(--mr-line); background: var(--mr-surface); color: var(--mr-ink-2); flex-shrink: 0; }
.mr-icon-btn:hover:not(:disabled) { color: var(--mr-red); border-color: var(--mr-red-line); }
.mr-weekchips { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 6px; margin-bottom: 14px; }
.mr-weekchip { position: relative; min-height: 40px; padding: 0 2px; border: 1px solid var(--mr-line); border-radius: 9px; background: var(--mr-surface); color: var(--mr-ink-2); font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums; }
.mr-weekchip.is-upcoming { border-style: dashed; color: var(--mr-muted); }
.mr-weekchip.is-current { border-color: var(--mr-red); color: var(--mr-red); }
.mr-weekchip.is-met::after { content: ''; position: absolute; top: 4px; right: 4px; width: 6px; height: 6px; border-radius: 50%; background: var(--mr-green); }
.mr-weekchip[aria-pressed="true"] { background: var(--mr-red); border-color: var(--mr-red); color: #fff; border-style: solid; }
.mr-weekchip:hover:not([aria-pressed="true"]) { border-color: var(--mr-red-line); }
.mr-week { border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); padding: 16px; background: var(--mr-surface); min-width: 0; }
.mr-week.is-current { border-color: var(--mr-red-line); background: var(--mr-red-soft); }
.mr-week-head { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; margin-bottom: 12px; }
.mr-week-head b { font-size: 14px; font-weight: 800; }
.mr-week-head span.mr-week-dates { font-size: 12px; color: var(--mr-muted); }
.mr-week-head .mr-chip:last-child { margin-left: auto; }
.mr-week-theme { display: inline-flex; border-radius: 999px; padding: 2px 9px; font-size: 11px; font-weight: 700; background: var(--mr-line-soft); color: var(--mr-ink-2); }
.mr-week-targets { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.mr-target-item { min-width: 0; }
.mr-target-item-row { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; font-size: 12.5px; }
.mr-target-item-row svg { width: 15px; height: 15px; color: var(--mr-red); flex-shrink: 0; }
.mr-target-item-row b { font-weight: 700; }
.mr-target-item-row .mr-num { margin-left: auto; font-weight: 800; }
.mr-target-item-row .mr-num.is-done { color: var(--mr-green); }
.mr-target-item-goal { margin-top: 4px; font-size: 11px; color: var(--mr-muted); }
.mr-week-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--mr-line); font-size: 12px; color: var(--mr-ink-2); }
.mr-week-foot b { font-weight: 800; color: var(--mr-ink); }
.mr-months { display: flex; flex-direction: column; gap: 10px; }
.mr-month { border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); background: var(--mr-surface); overflow: hidden; }
.mr-month.is-current { border-color: var(--mr-red-line); }
.mr-month-btn { display: flex; align-items: center; gap: 12px; width: 100%; padding: 14px 16px; border: 0; background: transparent; text-align: left; color: var(--mr-ink); }
.mr-month-btn:hover { background: var(--mr-bg); }
.mr-month-main { flex: 1; min-width: 0; }
.mr-month-title { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; font-size: 14px; font-weight: 800; }
.mr-month-title span.mr-month-range { font-size: 11.5px; font-weight: 600; color: var(--mr-muted); }
.mr-month-tracks { display: flex; flex-wrap: wrap; gap: 4px 16px; margin-top: 6px; font-size: 12px; color: var(--mr-ink-2); }
.mr-month-tracks b { font-weight: 700; color: var(--mr-ink); }
.mr-month-side { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; width: 140px; flex-shrink: 0; font-size: 11.5px; color: var(--mr-ink-2); }
.mr-month-side .mr-bar { width: 100%; }
.mr-month-chevron { width: 18px; height: 18px; color: var(--mr-muted); flex-shrink: 0; transition: transform 0.2s; }
.mr-month-btn[aria-expanded="true"] .mr-month-chevron { transform: rotate(180deg); }
.mr-month-body { display: flex; flex-direction: column; gap: 8px; padding: 12px; border-top: 1px solid var(--mr-line); background: var(--mr-bg); }
.mr-full { display: flex; flex-direction: column; gap: 18px; }
.mr-full-phase-title { margin: 0 0 8px; font-size: 11.5px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mr-muted); }
.mr-full-list { border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); overflow: hidden; background: var(--mr-surface); }
.mr-full-item + .mr-full-item { border-top: 1px solid var(--mr-line); }
.mr-full-row { display: grid; grid-template-columns: 150px minmax(0, 1fr) 110px 20px; align-items: center; gap: 14px; width: 100%; padding: 10px 14px; border: 0; background: transparent; text-align: left; color: var(--mr-ink); }
.mr-full-row:hover { background: var(--mr-bg); }
.mr-full-row.is-current { background: var(--mr-red-soft); }
.mr-full-row.is-upcoming { color: var(--mr-ink-2); }
.mr-full-week b { display: block; font-size: 13px; font-weight: 800; }
.mr-full-week span { font-size: 11px; color: var(--mr-muted); }
.mr-full-tracks { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; min-width: 0; }
.mr-full-track { min-width: 0; font-size: 11px; color: var(--mr-ink-2); }
.mr-full-track div:first-child { display: flex; justify-content: space-between; gap: 4px; margin-bottom: 4px; }
.mr-full-track .is-done { color: var(--mr-green); font-weight: 800; }
.mr-full-row .mr-chip { justify-self: end; }
.mr-full-row .mr-month-chevron { justify-self: end; }
.mr-full-row[aria-expanded="true"] .mr-month-chevron { transform: rotate(180deg); }
.mr-full-detail { padding: 0 12px 12px; background: var(--mr-bg); }
.mr-full-detail .mr-week { margin-top: 0; }
.mr-legend { margin: 6px 0 0; font-size: 11px; color: var(--mr-muted); }
.mr-footnote { margin: 0; font-size: 11.5px; line-height: 1.6; color: var(--mr-muted); }
.mr-restart { display: flex; justify-content: center; }
.mr-state { display: flex; align-items: center; gap: 8px; color: var(--mr-muted); }
.mr-spin { animation: mr-spin 1s linear infinite; }
@keyframes mr-spin { to { transform: rotate(360deg); } }

/* Responsive (card content width): tablet */
@container (max-width: 900px) {
  .mr-phases { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (max-width: 800px) {
  .mr-rec-grid { grid-template-columns: minmax(0, 1fr); gap: 22px; }
  .mr-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .mr-full-row { grid-template-columns: 120px minmax(0, 1fr) 20px; }
  .mr-full-row .mr-chip { display: none; }
}
@container (max-width: 620px) {
  .mr-weekchips { grid-template-columns: repeat(8, minmax(0, 1fr)); }
  .mr-month-side { width: 96px; }
}
/* Responsive (card content width): phone */
@container (max-width: 520px) {
  .mr-grid-3, .mr-week-targets { grid-template-columns: minmax(0, 1fr); }
  .mr-phases { grid-template-columns: minmax(0, 1fr); }
  .mr-weekchips { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  .mr-sec-head { align-items: stretch; flex-direction: column; }
  .mr-sec-head > .mr-pill { align-self: flex-start; }
  .mr-tabs { display: grid; width: 100%; }
  .mr-tab { padding: 0 6px; }
  .mr-target-actions { width: 100%; }
  .mr-target-actions .mr-btn { flex: 1 1 auto; }
  .mr-month-side { display: none; }
  .mr-full-row { grid-template-columns: minmax(0, 1fr) 20px; gap: 8px; }
  .mr-full-tracks { grid-column: 1 / -1; grid-row: 2; }
  .mr-start .mr-link { margin-left: 0; }
  .mr-stat-value { font-size: 18px; }
}
@media (max-width: 600px) {
  .mr-wrap { width: calc(100% - 32px); padding: 20px 0 28px; gap: 16px; }
  .mr-card { padding: 18px 16px; }
  .mr-page-head h1 { font-size: 21px; }
}

/* Details dialogs (re-declare the variables they use so they also work outside .mr-root) */
.mr-modal-backdrop {
  position: fixed; inset: 0; z-index: 120; display: flex; align-items: center; justify-content: center; padding: 16px;
  background: rgba(17, 24, 39, 0.5);
}
.mr-modal {
  --mr-red: var(--space-brand-primary-600, #d40000);
  --mr-red-dark: var(--space-brand-primary-700, #a80000);
  --mr-red-soft: var(--space-brand-primary-50, #fff5f5);
  --mr-red-line: var(--space-brand-primary-200, #fecaca);
  --mr-ink: var(--space-text-primary, #111827);
  --mr-ink-2: var(--space-text-secondary, #374151);
  --mr-muted: var(--space-text-muted, #6b7280);
  --mr-line: var(--space-neutral-200, #e7e8eb);
  --mr-line-soft: var(--space-neutral-100, #f3f4f5);
  --mr-surface: var(--space-surface-card, #ffffff);
  --mr-bg: var(--space-surface-page, #f9fafb);
  --mr-green: var(--space-semantic-success-500, #149644);
  --mr-green-dark: var(--space-semantic-success-700, #12893e);
  --mr-green-soft: color-mix(in srgb, var(--space-semantic-success-500, #149644) 12%, transparent);
  --mr-amber: var(--space-semantic-warning-700, #b66405);
  --mr-amber-soft: color-mix(in srgb, var(--space-semantic-warning-500, #c86d06) 14%, transparent);
  --mr-danger: var(--space-semantic-danger, #dc2626);
  --mr-radius-sm: 12px;
  --mr-shadow: 0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06);
  position: relative; width: min(600px, 100%); max-height: calc(100vh - 32px); overflow-y: auto; overflow-x: hidden;
  border-radius: 18px; background: var(--mr-surface); color: var(--mr-ink); padding: 24px;
  box-shadow: 0 24px 60px rgba(17, 24, 39, 0.25); font-size: 14px; line-height: 1.5;
}
.mr-modal *, .mr-modal *::before, .mr-modal *::after { box-sizing: border-box; }
.mr-modal button { font: inherit; cursor: pointer; }
.mr-modal-close { position: absolute; top: 12px; right: 12px; display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: 0; border-radius: 10px; background: var(--mr-line-soft); color: var(--mr-ink-2); }
.mr-modal-close:hover { color: var(--mr-red); }
.mr-modal-kicker { display: flex; align-items: center; gap: 6px; padding-right: 48px; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mr-red); }
.mr-modal-kicker svg { width: 15px; height: 15px; }
.mr-modal h3 { margin: 8px 0 0; padding-right: 40px; font-size: 21px; font-weight: 800; line-height: 1.25; overflow-wrap: anywhere; }
.mr-modal-sub { margin: 4px 0 0; font-size: 12.5px; color: var(--mr-muted); }
.mr-modal-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.mr-modal-section { margin-top: 18px; }
.mr-modal-section h4 { margin: 0 0 6px; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mr-muted); }
.mr-modal-section p { margin: 0; font-size: 13.5px; color: var(--mr-ink-2); }
.mr-modal-section ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
.mr-modal-gap { padding: 10px 12px; border-radius: 10px; background: var(--mr-bg); font-size: 12.5px; color: var(--mr-ink-2); }
.mr-modal-gap b { color: var(--mr-ink); }
.mr-modal-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.mr-modal-tag { border-radius: 999px; padding: 3px 10px; font-size: 12px; font-weight: 700; background: var(--mr-red-soft); color: var(--mr-red); border: 1px solid var(--mr-red-line); }
.mr-evidence { padding: 10px 12px; border: 1px solid var(--mr-line); border-radius: 10px; }
.mr-evidence blockquote { margin: 6px 0 0; font-size: 12.5px; color: var(--mr-ink); white-space: pre-line; overflow-wrap: anywhere; }
.mr-evidence-meta { margin-top: 6px; font-size: 11px; color: var(--mr-muted); overflow-wrap: anywhere; }
.mr-modal-note { margin-top: 8px; display: flex; gap: 6px; font-size: 11.5px; color: var(--mr-muted); }
.mr-modal-note svg { width: 14px; height: 14px; flex-shrink: 0; margin-top: 2px; }
.mr-modal-foot { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; margin-top: 22px; }
.mr-modal .mr-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px; padding: 0 16px; border-radius: 10px; font-size: 13px; font-weight: 700; border: 1px solid transparent; }
.mr-modal .mr-btn svg { width: 16px; height: 16px; }
.mr-modal .mr-btn--primary { background: var(--mr-red); color: #fff; }
.mr-modal .mr-btn--primary:hover { background: var(--mr-red-dark); }
.mr-modal .mr-btn--ghost { background: var(--mr-surface); color: var(--mr-ink-2); border-color: var(--mr-line); }
.mr-modal .mr-badge { display: inline-flex; align-items: center; gap: 4px; border-radius: 999px; padding: 2px 8px; font-size: 10.5px; font-weight: 700; }
.mr-modal .mr-badge--general { background: var(--mr-line-soft); color: var(--mr-ink-2); border: 1px solid var(--mr-line); }
.mr-modal .mr-badge--exact { background: var(--mr-green-soft); color: var(--mr-green-dark); }
.mr-modal .mr-badge--related { background: var(--mr-amber-soft); color: var(--mr-amber); }
.mr-modal .mr-bar { height: 8px; border-radius: 999px; background: var(--mr-line-soft); overflow: hidden; }
.mr-modal .mr-bar > span { display: block; height: 100%; border-radius: inherit; background: var(--mr-red); }
.mr-modal .mr-bar.is-done > span { background: var(--mr-green); }
.mr-modal .mr-rec-progress-row { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 6px; font-size: 12.5px; }
.mr-modal .mr-rec-progress-row span:last-child { font-weight: 800; }
.mr-modal .mr-link { display: inline-flex; align-items: center; gap: 4px; padding: 2px 4px; border: 0; background: none; color: var(--mr-red); font-size: 12px; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
.mr-modal button:focus-visible { outline: 3px solid color-mix(in srgb, var(--mr-red) 45%, transparent); outline-offset: 2px; }
@media (max-width: 560px) {
  .mr-modal-backdrop { align-items: flex-end; padding: 0; }
  .mr-modal { width: 100%; max-height: 88vh; border-radius: 18px 18px 0 0; padding: 20px 16px 16px; }
  .mr-modal-foot .mr-btn { flex: 1 1 auto; }
}
`;
