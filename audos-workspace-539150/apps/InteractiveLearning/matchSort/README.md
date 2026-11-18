# Match & Sort (Interactive Learning)

Optional active-learning practice for Domain Knowledge: **Concept Matching**, **Category Sorting** and **Sequence Builder**. Opened from Domain Knowledge lessons through Practice & Review (`apps/InteractiveLearning/practiceReview`); not registered in `config.json`.

## Layout

| Path | Purpose |
| --- | --- |
| `types.ts` | Data model: activities, chapter references, runtime state, attempt records |
| `engine.ts` | Pure reducer: select, pair, place, move, check, retry, reveal, reset, feedback, progress |
| `validation.ts` | Content validation and fail-closed chapter mapping (`resolveAvailableActivities`) |
| `persistence.ts` | Practice-history adapter (`MatchSortPersistence`) |
| `content/` | Chapter-grounded packs. The two original packs (Commercial Banking M01 lesson 1.1: 5 activities; Consumer Finance M01: 4) are unchanged. `expansion.ts` registers the expansion packs, one per module or lesson group, with IDs that never change. See `reports/practice-content-expansion-manifest.md` for coverage |
| `components/` | `MatchSortSession`, `ConceptMatching`, `CategorySorting`, `SequenceBuilder`, `ActivityFeedback`, `ActivityProgress` |
| `__tests__/` | Targeted tests (plain TypeScript, throw on failure) |

## Connecting it to Practice & Review

1. Render a pack: `<MatchSortSession pack={COMMERCIAL_BANKING_M01_PACK} onExit={...} />`, or a single activity with `ActivityRunner`.
2. Pass decks **after** `applyReviewHolds` to `resolveAvailableActivities(pack.activities, { COMMERCIAL_BANKING_MODULE01: decks })` and give the result's `available` list to the session's `activities` prop. Activities citing a missing, moved or held chapter are hidden.
3. Link from a chapter or lesson with `activitiesForChapter(chapterId)` / `activitiesForLesson(lessonId)`. IDs are `MODULE_KEY::lesson title::chapter title`, using the exact keys of `COMMERCIAL_BANKING_MODULE01_DECKS` / `CONSUMER_FINANCE_MODULE01_DECKS`.
4. `industryId` uses the app's category IDs (`banking-commercial`, `banking-consumer-finance`), the first part of the Domain Knowledge lesson identity. Activity and pack IDs are independent of it, so practice history keyed by `activityId` is unaffected.
5. Persistence defaults to `localStorage` key `casemate:practice-review:match-sort:v1`; inside Practice & Review it is scoped per signed-in learner (`casemate:practice-review:match-sort:v1:<scope>`, see `../practiceReview/practiceStorage.ts`). Swap in a server adapter by passing any `{ load, save }` object as `persistence`. Use `onAttempt` for analytics.

## Boundaries

- Never reads or writes `casemate:domain-reader:*`, `casemate:domain-quiz:*` or `casemate:domain-lesson-progress:v1`.
- Never unlocks or locks chapters, changes Knowledge Check scores or marks lessons complete.
- Sequence Builder is only for genuinely sequential processes. Each one records `sequenceEvidence`, and `validateActivity` rejects product types, segments and participant roles as steps.
- No figures, rankings, rates or legal provisions. The banking source is "Draft / Ready for Review — Verification Required".

## Tests

`engine.test.ts`, `content.test.ts` and `components.test.tsx` (needs a DOM such as jsdom) are self-contained. `sourceMapping.test.ts` checks every reference against the live deck registries, review holds and source registries, so it needs the full `apps/IndustryKnowledge` module graph.

Activity IDs: the nine original IDs are pinned in `content.test.ts`; every expansion activity ID is pinned per pack in
`__tests__/expansionPins.ts`, with `RETIRED_ACTIVITY_IDS` for removed or materially rebuilt activities. History is keyed by
activity ID, so an activity whose answer key changes materially gets a new ID (e.g. a `-v2` suffix) instead of reusing the old one.

## Generated activities (all curricula)

`generator.ts` builds activities at runtime from the text each chapter's General Info displays, for every curriculum
the catalogue opens, with no per-industry code and no runtime AI. `practiceReview/lessonAccess.ts` →
`resolveLessonPractice` returns authored activities first, unchanged, then the generated ones
(`generatedPractice.ts` caches them per reader deck). Pass `{ generated: false }` as the fourth argument for the
authored-only result.

- Types are chosen by content, never forced: Concept Matching from 4–8 specific term–meaning pairs (Key terms,
  labelled concept points) or from 4+ Concept breakdown parts of distinct roles; Category Sorting only from explicit
  named groups (2–4 groups, 6–12 items, no item in two groups); Sequence Builder only from an explicit ordered chain
  (arrow chain, consecutive "Step N", First/Then/Finally; 4–7 stages). Template definitions, template sentences,
  instructions, figures, digits and held text are never used. Guideline per chapter: introductory 1, standard 2,
  complex 3, one per objective.
- A lesson with authored chapter practice is curated and stays exactly as authored. FMCG lesson-wide samplers (one
  term per chapter) do not block chapter practice; their terms are not repeated.
- Where chapters have no chapter practice, a lesson review ("Which chapter says it?", Category Sorting) sorts each
  chapter's own statements by chapter. It cites every chapter it uses and counts as lesson-level coverage only.
- Generated refs use `sourceModuleKey: 'READER_GENERATED'` and follow the reader's own chapter gate and holds.
  Activities carry `origin: 'generated'` and `objectiveKey`.
- IDs: `ms-gen-<industry>-<hash(identity)>-<chapter slug>-<objective>-<hash(answer key)>` — deterministic,
  curriculum-scoped and position-independent; a materially changed answer key gets a new ID.
- Coverage and quality: `apps/IndustryKnowledge/matchSortCoverage.ts` (read-only), shown on `?dkAudit=learning-modes`
  ("Match & Sort coverage"). Report: `reports/match-sort-coverage-2026-11-15.md`.
- Tests: `__tests__/generator.test.ts` (pure, MS-01 … MS-17, MS-21 … MS-23) and
  `../practiceReview/__tests__/matchSortGenerated.test.ts` (resolver, chooser and checker; needs the module graph).
