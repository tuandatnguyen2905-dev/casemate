// Scoped styles for "Choose Your Study Pace". Uses the --mr-* variables that
// ROADMAP_CSS declares on .mr-root, so it must render inside .mr-root.

export const PACE_CSS = `
.mr-pace-options { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.mr-pace-option {
  position: relative; display: flex; flex-direction: column; align-items: stretch; gap: 8px;
  min-width: 0; padding: 16px; border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm);
  background: var(--mr-surface); color: var(--mr-ink); text-align: left;
  transition: border-color 0.15s, box-shadow 0.15s, background-color 0.15s;
}
.mr-pace-option:hover { border-color: var(--mr-red-line); box-shadow: var(--mr-shadow-hover); }
.mr-pace-option.is-selected { border-color: var(--mr-red); background: var(--mr-red-soft); box-shadow: inset 0 0 0 1px var(--mr-red); }
.mr-pace-option-top { display: flex; align-items: center; gap: 10px; }
.mr-pace-icon { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 10px; background: var(--mr-red-soft); color: var(--mr-red); flex-shrink: 0; }
.mr-pace-option.is-selected .mr-pace-icon { background: var(--mr-red); color: #fff; }
.mr-pace-icon svg { width: 17px; height: 17px; }
.mr-pace-name { flex: 1; min-width: 0; font-size: 15px; font-weight: 800; line-height: 1.25; }
.mr-pace-check { width: 20px; height: 20px; color: var(--mr-red); flex-shrink: 0; }
.mr-pace-radio { width: 18px; height: 18px; border: 2px solid var(--mr-line); border-radius: 50%; flex-shrink: 0; }
.mr-pace-option:hover .mr-pace-radio { border-color: var(--mr-red-line); }
.mr-pace-tagline { font-size: 12.5px; color: var(--mr-ink-2); }
.mr-pace-week { font-size: 12px; font-weight: 700; color: var(--mr-ink); }
.mr-pace-meta { display: flex; flex-wrap: wrap; gap: 2px 12px; font-size: 11.5px; color: var(--mr-muted); }
.mr-pace-badge { align-self: flex-start; display: inline-flex; border-radius: 999px; padding: 2px 9px; font-size: 10.5px; font-weight: 800; letter-spacing: 0.02em; background: var(--mr-line-soft); color: var(--mr-ink-2); border: 1px solid var(--mr-line); }
.mr-pace-badge.is-preview { background: var(--mr-red); color: #fff; border-color: var(--mr-red); }

.mr-pace-preview { margin-top: 14px; padding: 14px 16px; border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); background: var(--mr-bg); min-width: 0; }
.mr-pace-preview-title { margin: 0; font-size: 13px; color: var(--mr-ink-2); overflow-wrap: anywhere; }
.mr-pace-preview-title b { color: var(--mr-ink); font-weight: 800; }
.mr-pace-compare { margin-top: 10px; border: 1px solid var(--mr-line); border-radius: 10px; overflow: hidden; background: var(--mr-surface); }
.mr-pace-row { display: grid; grid-template-columns: minmax(0, 1.6fr) repeat(3, minmax(0, 1fr)); align-items: center; gap: 8px; padding: 8px 12px; font-size: 12.5px; color: var(--mr-ink-2); }
.mr-pace-row + .mr-pace-row { border-top: 1px solid var(--mr-line-soft); }
.mr-pace-row > span { min-width: 0; overflow-wrap: anywhere; }
.mr-pace-row > span:not(:first-child) { text-align: right; }
.mr-pace-row b { color: var(--mr-ink); font-weight: 800; }
.mr-pace-row.is-head { background: var(--mr-line-soft); font-size: 10.5px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mr-muted); }
.mr-pace-row.is-total { background: var(--mr-red-soft); font-weight: 700; color: var(--mr-ink); }
.mr-pace-delta { display: inline-flex; border-radius: 999px; padding: 1px 7px; font-size: 11px; font-weight: 800; white-space: nowrap; }
.mr-pace-delta.is-up { background: var(--mr-red-tint); color: var(--mr-red-dark); }
.mr-pace-delta.is-down { background: var(--mr-green-soft); color: var(--mr-green-dark); }
.mr-pace-delta.is-same { background: var(--mr-line-soft); color: var(--mr-muted); font-weight: 700; }
.mr-pace-phases { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0 0; padding: 0; list-style: none; }
.mr-pace-phases li { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border: 1px solid var(--mr-line); border-radius: 999px; background: var(--mr-surface); font-size: 11.5px; color: var(--mr-ink-2); }
.mr-pace-phases li b { font-weight: 800; color: var(--mr-ink); }
.mr-pace-phases li.is-current { border-color: var(--mr-red-line); background: var(--mr-red-soft); }
.mr-pace-legend { margin: 4px 0 0; font-size: 11px; color: var(--mr-muted); }
.mr-pace-scope { margin: 10px 0 0; font-size: 12px; color: var(--mr-ink-2); }
.mr-pace-disclaimer { margin: 4px 0 0; font-size: 11px; font-style: italic; color: var(--mr-muted); }
.mr-pace-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; margin-top: 14px; }
.mr-pace-status { min-width: 0; font-size: 12.5px; color: var(--mr-ink-2); overflow-wrap: anywhere; }
.mr-pace-status .mr-error { margin: 0; }

@container (max-width: 760px) {
  .mr-pace-options { grid-template-columns: minmax(0, 1fr); }
  .mr-pace-option { padding: 14px; }
}
@container (max-width: 520px) {
  .mr-pace-preview { padding: 12px; }
  .mr-pace-row { grid-template-columns: minmax(0, 1.3fr) repeat(3, minmax(0, 1fr)); gap: 6px; padding: 8px 10px; font-size: 12px; }
  .mr-pace-delta { white-space: normal; padding: 1px 5px; }
  .mr-pace-actions .mr-btn { width: 100%; }
}
`;
