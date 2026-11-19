// Scoped styles for the compact "Study Pace" bar. Uses the --mr-* variables that
// ROADMAP_CSS declares on .mr-root, so it must render inside .mr-root.

export const PACE_CSS = `
.mr-pace { padding-top: 16px; padding-bottom: 14px; }
.mr-pace-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 18px; min-width: 0; }
.mr-pace-head { flex: 0 0 auto; min-width: 0; }
.mr-pace-head .mr-h2 { margin-top: 2px; }
.mr-pace-seg { flex: 0 1 auto; }
.mr-pace-metrics { flex: 1 1 380px; display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1.1fr); gap: 4px 16px; margin: 0; min-width: 0; }
.mr-pace-metrics > div { min-width: 0; padding-left: 12px; border-left: 2px solid var(--mr-red-tint); }
.mr-pace-metrics dt { font-size: 10.5px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mr-muted); }
.mr-pace-metrics dd { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 6px; margin: 2px 0 0; font-size: 13px; font-weight: 700; color: var(--mr-ink); overflow-wrap: anywhere; }
.mr-pace-metrics dd b { font-size: 15px; font-weight: 800; }
.mr-pace-vs { font-size: 11.5px; font-weight: 600; color: var(--mr-muted); }
.mr-pace-delta { display: inline-flex; border-radius: 999px; padding: 0 7px; font-size: 11px; font-weight: 800; white-space: nowrap; }
.mr-pace-delta.is-up { background: var(--mr-red-tint); color: var(--mr-red-dark); }
.mr-pace-delta.is-down { background: var(--mr-green-soft); color: var(--mr-green-dark); }
.mr-pace-apply { flex: 0 0 auto; min-width: 104px; }
.mr-pace-note { display: flex; flex-wrap: wrap; gap: 2px 12px; margin: 10px 0 0; font-size: 11.5px; color: var(--mr-muted); overflow-wrap: anywhere; }
.mr-pace-status { font-weight: 700; color: var(--mr-ink-2); }
.mr-pace-note .mr-error { margin: 0; }
.mr-pace-disclaimer { font-style: italic; }

@container (max-width: 1060px) {
  .mr-pace-metrics { flex-basis: 100%; order: 3; }
  .mr-pace-apply { margin-left: auto; }
}
@container (max-width: 620px) {
  .mr-pace-head { flex-basis: 100%; }
  .mr-pace-seg { flex: 1 1 100%; display: grid; }
  .mr-pace-seg .mr-seg-btn { padding: 0 6px; font-size: 12.5px; white-space: normal; line-height: 1.2; }
  .mr-pace-metrics { grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .mr-pace-apply { order: 4; width: 100%; margin-left: 0; }
}
`;
