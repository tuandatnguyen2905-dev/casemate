# Practice & Review expansion, wave 2

Optional Smart Flashcards and Match & Sort content for the implemented Domain Knowledge curricula
other than Commercial Banking and Consumer Finance (a parallel task owns those). Everything is Draft.
Nothing here is registered in a shared registry, no engine, component, navigation, scoring, review-hold
or config file was changed, and the existing decks and activities were not touched.

Start with `COVERAGE.md` (what is done and what is not) and `integrationManifest.ts` (exact steps for
the later consolidation pass).

## Layout

| Path | Purpose |
| --- | --- |
| `types.ts` | Wave-2 types. Decks use the existing flashcard model unchanged. Match & Sort uses the existing activity model with a string `sourceModuleKey`, because the engine's `SourceModuleKey` union is closed over the two banking curricula |
| `kit.ts` | Declarative builders for decks and the three activity types; derive lesson, chapter and activity IDs from the source mapping |
| `validators.ts`, `checks.ts` | Targeted checks (schema, stable IDs, duplicates, figures, legal citations, verbatim excerpts, chapter mapping, holds, gate behaviour, engine `validateActivity`) |
| `liveProvider.ts` | Turns the live module decks, after `applyReviewHolds`, into the text a check reads |
| `professionalAudit/` | Audit & Assurance (`professional-audit`): `source.ts` (stable source mapping), `chapterIntegrity.ts` (A/B/C/D class of all 90 chapters and the validated/excluded card and activity lists; supersedes the alignment flags for eligibility), `flashcards/m01..m05.ts`, `matchSort/m01..m05.ts`, `index.ts` (exports, including the `PROFESSIONAL_AUDIT_ELIGIBLE_*` lists that are the only ones that may be registered) |
| `manifest.ts` | Coverage manifest, one row per curriculum in scope (39) |
| `integrationManifest.ts` | Read-only registration steps and the IDs to drop first if the source is corrected |
| `__tests__/validators.test.ts` | Self-contained: good content passes, each kind of defect is rejected |
| `__tests__/professionalAudit.test.ts` | The Audit content against the live curriculum |
| `__tests__/chapterIntegrity.test.ts` | Every live chapter classified at its position; held chapters are D; only validated cards on A/B chapters are eligible |

## How content is grounded

Every card and activity quotes the text a learner actually reads in the chapter, verbatim, and
the quote is checked by a test. Titles are never used to infer content. Where the reader's chapters are
generated from a data file (as Audit's are, by `auditAssuranceCore.tsx`), the check compares against the generated chapter,
not the data file. Items on a chapter under a review hold, on a missing or moved chapter, or on text whose
correctness could not be established are excluded.

## Running the tests

```bash
npx -y tsx apps/InteractiveLearning/expansionWave2/__tests__/validators.test.ts       # no source needed
npx -y tsx apps/InteractiveLearning/expansionWave2/__tests__/professionalAudit.test.ts # needs the app module graph
npx -y tsx apps/InteractiveLearning/expansionWave2/__tests__/chapterIntegrity.test.ts  # needs the app module graph
```

The second test needs React and the app's module graph, like `practiceReview/__tests__`.

## Test runs

The first build of this content was checked only against a recorded copy of the source. On 2026-11-08 all three suites
were executed against a byte-verified mirror of the saved Draft source and the live module graph:
`validators.test.ts` 17/17, `professionalAudit.test.ts` 13/13 and `chapterIntegrity.test.ts` 9/9. The same pass classified
every chapter (19 A, 32 B, 37 C, 2 D) and withheld 57 of 148 cards and all 11 activities; see `COVERAGE.md` and
`reports/audit-assurance-source-integrity-2026-11-08.md`.

## Adding the next curriculum

1. Read the curriculum's chapter text (and how its reader generates chapters, if it does) and `reviewHolds.ts`.
2. Add `<curriculum>/source.ts` with every chapter title, classify every displayed chapter A/B/C/D in a `chapterIntegrity.ts`, then author `flashcards/` and `matchSort/` files using `kit.ts` for A/B chapters only.
3. Export decks and packs from `<curriculum>/index.ts`; add a test that calls `runChecks` with its modules and provider.
4. Update `manifest.ts`. Keep Not Started until its tests have run, and register only the eligible exports.
