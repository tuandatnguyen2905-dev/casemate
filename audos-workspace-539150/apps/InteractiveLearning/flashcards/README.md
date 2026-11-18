# Smart Flashcards

Optional active-recall and spaced-review practice for Domain Knowledge, opened from lessons through
Practice & Review (`../practiceReview`). It is not registered in `config.json` as its own app.
Curriculum files are read only. Flashcards never lock or unlock chapters and are independent of
Knowledge Check scores and lesson completion.

Learner journey: **Select deck → Study → Reveal answer → Rate recall → Review progress.**

## Layout

| Path | Purpose |
| --- | --- |
| `models.ts` | Types: card content, deck/chapter/source mapping, review state, snapshot |
| `scheduler.ts` | Pure SM-2-lite scheduler with an injectable clock |
| `review.ts` | Pure queue builders (study, review, weak) and deck statistics |
| `persistence.ts` | Persistence adapter interface, localStorage adapter, in-memory fallback |
| `useFlashcardReviews.ts` | React hook joining scheduler and adapter |
| `decks/` | Deck content files, registry and `validateDeck` |
| `components/` | `SmartFlashcards`, `FlashcardDeck`, `FlashcardSession`, `Flashcard`, `RecallRating`, `FlashcardProgress`, `ReviewSummary` |
| `styles.ts` | Scoped stylesheet (all selectors prefixed `.cmfc`) |
| `FlashcardsDemo.tsx` | Standalone demo entry (default export), with a simulated clock |
| `demo/mountDemo.tsx` | Mounts the demo into any element outside the Casemate shell |
| `__tests__/` | Dependency-free test suites (project `*.test.ts` convention) |
| `tsconfig.flashcards.json` | Type-check config scoped to this directory |

## Modes

- **Study Mode**: one card at a time in authored order. The front shows a question or term
  prompt. Clicking or tapping the card (or Space / Enter) reveals the answer, explanation,
  practical example, key terms and source chapter. Previous / Next move freely. The answer side is
  not rendered until reveal, so it is neither visible nor exposed to assistive technology.
- **Recall rating**: Again / Hard / Good / Easy appear only after reveal; keys 1–4 map to them.
  Each button shows the interval it would schedule. A rating is accepted once per card position
  (ref-based guard against double clicks or repeated keys) and then advances.
- **Review Mode**: due cards only, ordered forgotten (last rated Again) → difficult (weak, lowest
  ease first) → most overdue. Shows the due count on the deck tile. A card rated Again in a review
  session comes back later in the same session (at most twice). When nothing is due, the learner
  can retry weak concepts or study the deck.
- **Summary**: ratings this session, deck mastery, due / weak / unstudied counts, next review time,
  and actions to retry weak concepts, review again or return to the decks.

Keyboard: Space or Enter flips (a focused button keeps its own Space/Enter), ← / → move, 1–4 rate.
Typing in an input is never intercepted.

## Card types

A card without `interaction` is **classic** (flip to reveal). Two optional formats share the same deck, session
and review state (`models.ts`, `interactive.ts`, `components/InteractiveFlashcard.tsx`):

- **MCQ** (`interaction.type: 'mcq'`): 3 or 4 options, one key; `back` repeats the correct option.
- **Fill in the blank** (`'fill_blank'`): `front` holds one `____`; `back` is the completed statement. Matching is
  case-insensitive, trimmed and punctuation-insensitive (`matching: 'exact'` keeps punctuation for formulas), and
  accepts only `answer` plus the listed `acceptedAnswers`. No fuzzy matching.

Interactive cards never flip: options and inputs are native form controls in a plain region, Space does not reveal
them, and the answer and explanation stay out of the DOM until a correct check or Show answer. Check answer, Try
again and Show answer are recorded for the Session Complete line only (`SessionActivity.interactions`, never
persisted); a correct answer is not a rating and not mastery. After the answer shows, Again/Hard/Good/Easy is
offered as optional, exactly as for classic cards; Next/Skip always works without it.

Content: `decks/interactiveCommercialBanking.ts` (Commercial Banking 1.2, 2.1, 2.2, 2.3; 13 MCQ and 13 fill in the
blank, one of each per chapter). Each spec restates an authored card (`basedOn`) and inherits its chapter and
verbatim source excerpts. `decks/practice.ts` merges them after their chapter's authored cards into
`PRACTICE_DECKS`, which Practice & Review uses; `FLASHCARD_DECKS`, its pins and Lesson 1.1 are unchanged. IDs
are pinned in `__tests__/interactiveCards.test.tsx`.

## Scheduling algorithm (SM-2-lite)

Deterministic and pure; every function takes `now` from the caller (`Clock = () => number`).

| Rating | Card with no current streak | Card with a streak (previous interval *I*, ease *E*) | Ease change |
| --- | --- | --- | --- |
| Again | due in 10 minutes | due in 10 minutes; streak reset; lapse +1 | −0.20 |
| Hard | 1 day | max(I + 1, round(I × 1.2)) | −0.15 |
| Good | 2 days | max(Hard + 1, round(I × E)) | 0 |
| Easy | 4 days | max(Good + 1, round(I × E × 1.3)) | +0.15 |

- Initial ease 2.5, clamped to [1.3, 3.0]; intervals capped at 365 days.
- A lapse is counted when a card with at least one successful recall is rated Again.
- States: `unseen` (never rated), `learning`, `mastered` (current interval ≥ 21 days). Mastered is
  never permanent: a mastered card still comes due, and Again demotes it to `learning`.
- `confidence` is a 0–1 moving average of ratings (Again 0, Hard 0.4, Good 0.75, Easy 1).
- A card is **weak** while not mastered and last rated Again or Hard, lapsed, or below the
  initial ease.
- Example with Good every time: 2 → 5 → 13 → 33 days (mastered on the fourth review).

## Data model

Content (`FlashcardContent`) is separate from review state (`CardReviewState`):

- Content: `cardId`, `deckId`, `industryId`, `moduleId`, `lessonId`, `chapterId`, `front`, `back`,
  `explanation`, `practicalExample`, `keyTerms`, `sourceRefs[]` (file, chapterId, verbatim
  excerpt, citation IDs). Optional, backward-compatible metadata: `origin` (authored / generated),
  `conceptCategory`, `stage` (recall, mechanism, implication, application), `difficulty`, `sourceSection`,
  `learningObjective`. Stored review state never depends on them.
- Review state: `state`, `confidence`, `schedule { dueAt, intervalDays, ease, lapses, repetitions }`,
  `lastReviewedAt`, `reviewHistory[]` (capped at 50).
- All identities are stable slugs. Card IDs are pinned by a test because renaming one would orphan
  learners' history. Chapters are referenced by ID plus the lesson-local chapter number the
  existing app uses, never by array position in this feature.

## Persistence

`FlashcardPersistenceAdapter { kind, load(), save(snapshot), clear() }`.

- Default: `createLocalStorageAdapter()` stores one JSON document under
  `casemate:flashcards:v1` (or `casemate:flashcards:v1:<learnerKey>` when a learner key is given).
  If storage is missing, blocked or a write fails, it continues in memory for the session.
- It reads and writes only that key: existing `casemate:domain-*` progress and learner records are
  untouched. No WorkspaceDB tables are used.
- `parseSnapshot` validates any input and drops malformed entries; it never throws.
- **Integration point**: to move review state into the learner-state system, implement the adapter
  against it and pass it as `<SmartFlashcards adapter={...} />`. The `FlashcardStoreSnapshot` shape
  is the contract.

## Content

The two decks in the table below are the original decks and are unchanged. Lesson decks added later live in `decks/*.ts`, are built with `decks/factory.ts`, are registered in `decks/expansion.ts` and have every card ID pinned in `__tests__/expansionPins*.ts`. Retired card IDs are listed in `RETIRED_CARD_IDS` (`__tests__/expansionPins.ts`) and are never reused; a card whose correct answer changes materially gets a new ID. Coverage and the continuation point are in `reports/practice-content-expansion-manifest.md`.

| Deck | Source (read-only) | Chapters at read time | Cards |
| --- | --- | --- | --- |
| Commercial Banking Fundamentals | `apps/IndustryKnowledge/commercialBankingM01B1.tsx`, Lesson 1.1 Industry Definition & Scope | 5 | 14 |
| Consumer Finance Fundamentals | `apps/IndustryKnowledge/consumerFinanceModule01.tsx`, Lesson 1 Industry Definition & Scope (definitions from `consumerFinanceCore.tsx`) | 5 | 13 (`cff-credit-risk` retired 2026-11-08) |

Authored decks for seven generated curricula (`mfg-building`, `mfg-packaging`, `mfg-electrical`, `healthcare-products`, `professional-audit`, `logistics-contract`, `logistics-express`) live in `decks/<stem>M01.ts` to `M05.ts` (one deck per lesson, `mfgBuilding`, `mfgPackaging`, `mfgElectrical`, `healthcareProducts`, `professionalAudit`, `logisticsContract`, `logisticsExpress`), with pins in `__tests__/expansionPins<Stem>.ts`. Their curriculum files are compact data files expanded by a builder, so a deck sets `source.readAtSha256` to `'rendered-chapter-text'`: its excerpts are verbatim text the chapter displays and are checked by `practiceReview/__tests__/renderedGrounding.test.ts` against the live registry (the source file path names the module file, markers are empty), not by raw-file segments in `decks.test.ts`. Source gaps (chapters without a card) are recorded in `reports/flashcards-authored-decks/<industry>.md`. Authored decks are never changed by the runtime: `practiceReview/flashcardScopes.ts` shows each chapter's authored cards first and completes the chapter with cards built from the text it displays (`practiceReview/chapterCards.ts`), skipping anything an authored card already asks. Curricula without authored decks get only those chapter cards. Coverage of both: `reports/flashcard-depth-coverage-2026-11-15.md` and the Flashcard coverage section of the audit page (`?dkAudit=learning-modes`).

Chapter ID mapping (lesson-local chapter number = existing quiz `moduleId` = deck index + 1):

| Chapter ID | Source chapter |
| --- | --- |
| `cb-m1-l11-ch01` … `ch05` | What Is Commercial Banking? · What Makes Commercial Banking Unique? · Where Does Commercial Banking Begin and End? · Understanding Banking Products and Services · Who Are Commercial Banks' Customers? |
| `consumer-finance-m1-l1-ch01` … `ch05` | What Is Consumer Finance? · What Makes Consumer Finance Unique? · Where Does Consumer Finance Begin and End? · Understanding Consumer Finance Products and Services · Who Uses Consumer Finance and Why? |

Content rules applied: card text restates the chapter; every card cites verbatim excerpts that the
source-mapping test re-checks against the curriculum files, and `practiceReview/__tests__/renderedGrounding.test.ts`
checks are actually displayed to the learner; no statistics, years or regulatory
thresholds; no chapter under a review hold; Consumer Finance generic fallback definitions are
never used. Each deck's `mappingNotes` records caveats (for example, why `cff-credit-risk` was retired: its definition is not displayed in any chapter). The Consumer Finance lesson had 5 chapters at read time, which matches the 5-chapter
structure the QA work expects; no mismatch was found and the source was not edited.

If the Global QA task changes chapter titles, order or text, the source-mapping test fails and names
the card and chapter to re-map.

## Tests

The suites follow the workspace's existing `*.test.ts` style (local asserts, no test framework)
and need no project dependency changes.

The scheduler, persistence and deck/source-mapping suites need only `tsx`, run from the workspace
root:

```bash
npx -y tsx@4 apps/InteractiveLearning/flashcards/__tests__/scheduler.test.ts
npx -y tsx@4 apps/InteractiveLearning/flashcards/__tests__/persistence.test.ts
npx -y tsx@4 apps/InteractiveLearning/flashcards/__tests__/decks.test.ts
```

The component suite (jsdom + React) and the type-check need packages resolvable from the files, so
run them from a scratch folder outside the workspace that holds the tools and a copy of the two app
folders:

```bash
mkdir -p /tmp/fc && cd /tmp/fc
npm i --no-save tsx@4 jsdom@25 react@18.3.1 react-dom@18.3.1 typescript@5.6 @types/react@18.3 @types/react-dom@18.3
mkdir -p apps && cp -r <workspace>/apps/InteractiveLearning <workspace>/apps/IndustryKnowledge apps/
npx tsc -p apps/InteractiveLearning/flashcards/tsconfig.flashcards.json      # type-check this directory only
npx tsx apps/InteractiveLearning/flashcards/__tests__/run-all.test.ts        # all four suites
```

Set `FLASHCARDS_WORKSPACE_ROOT` when running from a directory other than the (copied) workspace
root.

## Running the demo

`FlashcardsDemo` (default export) renders the full feature with progress stored under
`casemate:flashcards:v1:demo`, plus "Simulate +1 day / +7 days" and "Reset demo progress"
controls so spaced review can be checked without waiting. To run it outside the Casemate shell,
bundle `demo/mountDemo.tsx` (for example with esbuild) into a page containing
`<div id="flashcards-demo-root"></div>`.

## Integration

Integrated into Domain Knowledge through Practice & Review (`../practiceReview`). Each lesson with
a deck shows the Smart Flashcards learning mode. The deck is limited to cards whose chapters are
open to the learner, and it renders `<SmartFlashcards embedded />` with a learner-scoped adapter
(`casemate:flashcards:v1:<scope>`). A deck matches the open lesson only when its `industryId` equals
the lesson identity's category ID (`banking-commercial`, `banking-consumer-finance`), its lesson
title matches, and its chapters sit at their recorded positions in the live registry.
