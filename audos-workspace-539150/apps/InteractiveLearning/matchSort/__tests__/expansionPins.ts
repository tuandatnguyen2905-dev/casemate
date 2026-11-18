// Pinned activity IDs for every expansion pack, in registry order (see ../content/expansion.ts).
// Match & Sort history is keyed by activity ID only, so renaming or reusing an ID would orphan or
// reinterpret a learner's saved attempts. An activity whose answer key changes materially gets a new ID
// (the old one moves to RETIRED_ACTIVITY_IDS and is never reused).

export const EXPANSION_ACTIVITY_IDS: Record<string, string[]> = {
  'commercial-banking-m01-lessons-2-5': ['cb-m01-match-history-terms', 'cb-m01-sort-branch-vs-digital-v2', 'cb-m01-seq-crisis-cycle-v2', 'cb-m01-seq-vietnam-system', 'cb-m01-match-bank-ratios', 'cb-m01-sort-stock-flow-income', 'cb-m01-match-stability-layers', 'cb-m01-match-vn-institution-roles', 'cb-m01-match-demand-drivers', 'cb-m01-sort-bank-archetypes-v2', 'cb-m01-match-macro-drivers', 'cb-m01-match-technology-controls', 'cb-m01-seq-inclusion-stages'],
  'commercial-banking-m02': ['cb-m02-seq-value-chain', 'cb-m02-match-bank-actors', 'cb-m02-sort-four-views', 'cb-m02-match-funding-layers', 'cb-m02-match-cost-terms', 'cb-m02-sort-treasury-diagnostic-v2', 'cb-m02-seq-credit-lifecycle', 'cb-m02-sort-debt-group-boundary', 'cb-m02-match-credit-loss-terms', 'cb-m02-match-channel-roles', 'cb-m02-sort-segment-relationships-v2', 'cb-m02-sort-input-families', 'cb-m02-seq-profit-waterfall-v2', 'cb-m02-match-profit-metrics', 'cb-m02-sort-global-vs-vietnam-v2', 'cb-m02-match-global-operating-model', 'cb-m02-match-stress-terms'],
  'commercial-banking-m03': ['cb-m03-sort-revenue-engines', 'cb-m03-match-bank-models', 'cb-m03-sort-income-lines', 'cb-m03-match-product-economics-terms', 'cb-m03-match-needs-to-responses-v2', 'cb-m03-match-segment-coverage-v2', 'cb-m03-seq-nim-calculation', 'cb-m03-seq-profit-waterfall', 'cb-m03-sort-statement-stocks-flows', 'cb-m03-match-channel-fit', 'cb-m03-match-channel-economics-terms', 'cb-m03-match-ecosystem-roles'],
  'commercial-banking-m04': ['cb-m04-match-five-forces', 'cb-m04-match-advantage-links-v2', 'cb-m04-sort-position-vs-performance', 'cb-m04-match-kpi-definitions', 'cb-m04-match-tradeoff-questions', 'cb-m04-sort-funding-vs-credit-franchise', 'cb-m04-match-ksf-outcomes-v2', 'cb-m04-sort-swot-factors-v2', 'cb-m04-match-risk-transmission-v2', 'cb-m04-match-response-kpis'],
  'commercial-banking-m05': ['cb-m05-match-segment-financial-jobs', 'cb-m05-match-vietnam-distribution-links', 'cb-m05-match-outlook-transmission', 'cb-m05-sort-outlook-figure-types', 'cb-m05-match-strategy-shortcuts'],
  'consumer-finance-m01-lessons-2-5': ['cf-m01-sort-lending-eras', 'cf-m01-sort-volume-vs-quality', 'cf-m01-sort-lender-vs-partner'],
  'consumer-finance-m02': ['cf-m02-seq-lending-lifecycle', 'cf-m02-seq-origination', 'cf-m02-sort-standardise-vs-local', 'cf-m02-match-shared-risk-controls', 'cf-m02-sort-stock-flow-rate'],
  'consumer-finance-m03': ['cf-m03-sort-lending-models', 'cf-m03-sort-risk-carriers-vs-supporters', 'cf-m03-sort-revenue-vs-cost', 'cf-m03-sort-channel-controls'],
  'consumer-finance-m04': ['cf-m04-sort-benchmark-lenses', 'cf-m04-seq-risk-compounding'],
  'consumer-finance-m05': ['cf-m05-match-alternative-data-tests'],
};

/** Removed or superseded in the 2026-11-08 integrity pass (grounding on undrawn diagrams, filler, or a materially changed answer key). */
export const RETIRED_ACTIVITY_IDS: string[] = [
  'cb-m02-match-journey-measures', 'cb-m03-match-channel-scorecard', 'cb-m03-seq-profit-gates', 'cb-m04-match-competition-arenas',
  'cb-m04-match-growth-capacity', 'cb-m04-match-kpi-families', 'cb-m05-match-ai-control-questions', 'cb-m05-match-digital-operating-model',
  'cb-m05-match-opportunity-constraints', 'cb-m05-match-outlook-drivers', 'cb-m05-match-segment-needs', 'cb-m05-match-strategy-hidden-risks',
  'cb-m05-sort-relationship-economics', 'cb-m05-sort-traditional-vs-digital-journey', 'cf-m01-seq-partnership-flow', 'cb-m01-seq-crisis-cycle',
  'cb-m02-seq-profit-waterfall', 'cb-m01-sort-branch-vs-digital', 'cb-m01-sort-bank-archetypes', 'cb-m02-sort-global-vs-vietnam',
  'cb-m02-sort-segment-relationships', 'cb-m02-sort-treasury-diagnostic', 'cb-m03-match-needs-to-responses', 'cb-m03-match-segment-coverage',
  'cb-m04-match-advantage-links', 'cb-m04-match-ksf-outcomes', 'cb-m04-sort-swot-factors', 'cb-m04-match-risk-transmission',
];
