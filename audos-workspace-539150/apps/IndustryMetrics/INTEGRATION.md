# Industry Metrics Library — Integration Adapter Guide

Status: **Draft, standalone, not integrated, not published.** Nothing in this folder is registered in `config.json`, imported by Domain Knowledge (`apps/IndustryKnowledge`), or wired into navigation, progress storage or the Knowledge Check system. The library has no runtime dependencies beyond `react`.

## What it is

A declarative metric library (schema + content), a formula engine built from shared kernels, an evidence registry, a self-contained test suite and a standalone Metrics Explorer. Each metric answers five learner questions: what it measures, how it is calculated, why it matters, how to interpret movements, and how a manager uses it.

## Folder layout

| Path | Purpose |
|---|---|
| `core/types.ts` | Single metric schema (identity, definition, interpretation, worked example, evidence, learning links, simulator hints). |
| `core/formulaEngine.ts` | Shared kernels (ratio, percent change, margin, stock-days, sum, product, CAGR, NPV, IRR) and input validation. |
| `core/formulas.ts` | Formula registry: variables, units, justified ranges, constraints, unit rules. |
| `core/units.ts` | Unit definitions and display formatting. |
| `core/sources.ts` | Evidence sources actually read for this build. |
| `core/readiness.ts` | Verified or Verified with caveat (with sources, and caveats for the latter) + formula-tested → `learnerReady`. Pending and Rejected are never learner-ready. |
| `core/query.ts` | Search (name/acronym) and category filter. |
| `catalog/catalogSnapshot.ts` | Read-only snapshot of the 11 groups / 44 sub-industries (41 implemented, 3 Coming Soon). |
| `content/sharedMetrics.ts` | Cross-industry metrics defined once. |
| `content/packs/*.ts` | Industry packs: industry-specific metrics, links with industry interpretation, missing high-priority metrics. |
| `content/library.ts`, `content/coverage.ts` | Assembly, per-curriculum lookup, coverage manifest builder. |
| `content/reviewLog.ts` | Recorded review decisions: reasons for every Pending metric, caveats for metrics reclassified to Verified with caveat. Applied to the authored packs at load. |
| `content/learnerView.ts` | The one rule for learner visibility (used by the adapter and the tests). |
| `components/MetricsExplorer.tsx` | Standalone explorer (scoped `imx-` CSS, no Tailwind dependency). |
| `preview/MetricsExplorerPreview.tsx` | Preview wrapper (default export). |
| `tests/` | Test suite, independent formula checks, frozen metric-id snapshot, runner. |
| `adapter.ts` | **The only file other code should import.** |
| `COVERAGE_MANIFEST.md` | Generated coverage per curriculum and per metric. |

## Public API (`adapter.ts`)

```ts
import {
  MetricsExplorer,            // React component
  getMetricsForCurriculum,    // (curriculumId, { includePending? }) → learner-visible entries by default
  getLearnerReadyMetrics,     // all Verified / Verified-with-caveat, formula-tested metrics
  getLearnerMetric,           // one metric by id, only if learner-visible
  getMetric, assessMetric,    // single metric + readiness (getMetric also returns Pending/Rejected: reviewers only)
  getSimulatorSpec,           // (metricId, { includePending? }) inputs, ranges, defaults, relationships, error conditions, evaluate(); undefined for hidden metrics by default
  buildCoverageManifest,
  isSupportedCurriculum, curriculumLabel,
} from '../IndustryMetrics/adapter';
```

Curriculum ids are the Domain Knowledge catalog ids (e.g. `banking-commercial`, `hospitality-hotels`). Coming Soon ids (`fmcg-beauty`, `fmcg-household`, `fmcg-tobacco`) return no metrics.

## Integration steps (deferred — do not perform in this cycle)

1. **Preview first.** Register `apps/IndustryMetrics/preview/MetricsExplorerPreview.tsx` temporarily as a draft-only app (or mount it in a scratch component) and review it in Draft Preview. Browser rendering in Draft Preview has not been executed yet.
2. **Embed in Domain Knowledge.** In the sub-industry view, render `<MetricsExplorer initialCurriculumId={activeCurriculumId} />` for learners. `allowPendingToggle` now defaults to false so learners can never reveal Pending or Rejected metrics; pass `allowPendingToggle` only in a reviewer view. Verified-with-caveat metrics show their caveats in a highlighted note under the definition. The component has no global state, routing or persistence, so no progress-storage changes are needed.
3. **Lesson cross-links (optional).** Each link carries `relatedModule` (`M01`–`M05`, module-level only). Lesson-level mapping is not established; add it in the pack links if needed.
4. **Customer agent (optional).** If the in-space agent should cite metrics, update `agent/customer-prompt.md` in the integration task, not here.
5. **Simulator (deferred).** Use `getSimulatorSpec(metricId)`: it exposes input variables, units, valid ranges with justifications, default (hypothetical) inputs, scenario assumptions, formula relationships (e.g. RevPAR = Occupancy × ADR; NIM ≈ Asset yield − Cost of funding earning assets, an approximation that holds only on one common basis) and error conditions, plus a safe `evaluate()`.

## Maintaining content

- **Statuses:** `source-verified` (shown as Verified), `verified-with-caveat` (needs at least one caveat, shown to learners), `pending-verification` (needs an entry in `content/reviewLog.ts` with reason and next step) and `rejected`. Only the first two are learner-visible.
- **Promote a pending metric:** read an authoritative source, add it to `core/sources.ts` (URL, publisher, access date, how verified), replace `pending(...)` in the pack with `verified([ref(sourceId, locator, confirms)], note)` or `verifiedWithCaveat([...], note, caveats)`, delete its entry from `PENDING_REVIEWS`, run the tests, regenerate the manifest.
- **Add a metric:** add a formula in `core/formulas.ts`, an independent check in `tests/formulaChecks.ts` (expected value as plain arithmetic), the metric in a pack, links to implemented curricula only, and its id to `tests/idSnapshot.ts`. Never rename or remove ids.
- **Never** add metrics for Coming Soon entries, real-market figures without a source, or regulatory thresholds without jurisdiction, standard and effective date.

## Validation commands

Run from the workspace root (no config changes needed; any TypeScript runner works):

```bash
npx tsc --noEmit --strict --jsx react-jsx --module esnext --moduleResolution bundler --target es2020 --skipLibCheck apps/IndustryMetrics/adapter.ts apps/IndustryMetrics/tests/runTests.ts
npx tsx apps/IndustryMetrics/tests/runTests.ts
```

`runTests.ts` runs `metricsTests.ts` (schema, formulas, units, ids, associations, evidence) and `reviewTests.ts` (status model, learner visibility, review log, corrected definitions, cross-industry consistency, priority coverage). **The 2026-11-08 review edited these files without being able to execute them; run both commands before relying on the suite.**

## Known limitations

- 35 of 132 metrics are **pending verification** and hidden from learner views; none is rejected (see `COVERAGE_MANIFEST.md` and `content/reviewLog.ts` for each reason).
- 63 metrics are **Verified with caveat**: their sources are company-, jurisdiction- or method-specific, and the caveats are displayed.
- Hotel occupancy, ADR and RevPAR are now confirmed in Marriott’s FY2025 10-K as well as the existing STR note (the STR page refused automated access).
- SaaS ARR and NRR are verified against company filings only (no standard exists); caveats say so.
- Livestock metrics (mortality, ADG, cost of gain, dressing percentage) were verified against cattle-feedlot sources; poultry and pig conventions were not read.
- Rendered Explorer QA has not been executed (no browser or runnable project was available); only the source was reviewed.
- Examples are hypothetical and use neutral currency units (CU); they are not market data.
