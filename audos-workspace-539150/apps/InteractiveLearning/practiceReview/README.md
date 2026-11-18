# Practice & Review (Domain Knowledge)

Optional revision inside a Domain Knowledge lesson, with two learning modes: **Smart Flashcards**
(`../flashcards`) and **Match & Sort** (`../matchSort`). It is not a separate app and is not in
`config.json`.

Path: **Your Learning Path → Start / Continue Learning → chooser → learning mode for one chapter → Return to Lesson**.

## Return to Lesson and the Learning Journey

- The practice header has exactly one return control, **Return to Lesson** (`practice-back-to-lesson`). It goes back
  to where practice was opened from, the **origin** (`PracticeOrigin` in `practiceResume.ts`), fixed when the mode opens
  and kept in the tab-scoped resume record so a refresh keeps it:
  - opened in the reader (its Change learning mode, the Practice & Review journey step, or the takeaways card): the
    reader on that same chapter (or the takeaways), even after the learner moved chapters, scopes or modes in practice;
  - opened from the Learning Mode Chooser on Your Learning Path: that overview with the lesson card focused and the
    chooser reopened on the same chapter (`learningPathFocus.ts` → `chooserChapter`, `prepareLearningEntry({ chapterIndex })`);
  - no origin (a practice deep link, or a record written before origins existed) or a chapter that is no longer open:
    Your Learning Path with the lesson card focused, never another chapter (`resolvePracticeReturn`).
  The Learning Path route comes from the lesson identity (`useCurriculumLessonFlow` → `LessonFlowValue.backToLearningPath`
  → `PracticeLessonActions.backToLearningPath`), never from browser history. The dialog writes the card to focus on open,
  so the browser Back button (the previous route entry) lands on the same card. Mode, scope and chapter switches inside
  practice replace the practice link in place and never add history entries.
- **Change learning mode** keeps the current chapter: General Info closes practice onto the reader at that chapter;
  Flashcards and Match & Sort switch in place. It never changes the origin.
- Every learning mode works on one chapter (`chapterOnly`). The reader publishes its Learning Journey rows
  (`journeyRows` in `lessonFlowCore.ts`, the same rows the reader renders) and its navigation through
  `publishPracticeLesson`; `PracticeJourney.tsx` renders them beside the mode on desktop and as a collapsible list under
  the header on mobile. Choosing an open chapter keeps the mode and moves the reader to that chapter
  (`goToChapter`, so locks and holds apply and a refresh keeps it); Knowledge Check and Final Lesson Takeaways leave
  practice for the reader's own routes. Open rows show a card or activity count (`chapterModeCounts`); locked rows show
  the prerequisite check.
- Flashcards: chapter title, a **Cards rated** bar ("X of Y chapter cards rated": cards the learner rated over the
  cards open in the chapter; cards only viewed have no scheduler state and are not counted), available / due / mastered from the scheduler, then Study / Review. Match & Sort: an
  **Activities completed** bar and the chapter's activities. My notes & key terms for the chapter sit below.
- Practice deep link: `dkPractice=<mode>&dkChapter=<n>` is kept on the lesson URL while a mode is open and removed when
  practice closes; a page load that carries it reopens the mode (the reader's chapter gate still applies).

## Entry points (in `apps/IndustryKnowledge/lessonFlow.tsx`)

- `useLessonFlowState` publishes the open lesson (identity, the reader's held deck and which
  chapters are open) through `publishPracticeLesson`. It only reads progress.
- `PracticeReviewJourneyStep`: one Learning Journey step after Final Lesson Takeaways. It is
  rendered only when the open lesson has something open to practise.
- `PracticeReviewTakeawaysCard`: a compact prompt on the Lesson Takeaways screen.

Both open one full-screen dialog: an overview with a card per learning mode (description, progress,
Start / Continue), then the mode itself, with breadcrumbs back to Practice & Review and the lesson.
Escape closes the overview.

## Learning Mode Chooser

Start Learning and Continue Learning on every lesson card (`LessonPathCard` in `App.tsx`) open a centered
dialog (`LearningModeChooser.tsx`) for one chapter: **General Info** (the chapter reader), **Flashcards** and
**Match & Sort**. The chapter, its gate and each mode's content are resolved by `learningModes.ts` from the deck
the shared dispatcher returns for the lesson (`resolveLessonDeck`), so a newly registered curriculum gets the
chooser with no extra wiring.

- Start Learning: the first open chapter. Continue Learning: the reader's saved chapter (`view.chapter`) when it is
  still open, otherwise `resolveStartChapter`'s fallback. Held chapters are never chosen.
- All three choices always show; a mode with nothing open in that chapter reads "Not available for this chapter
  yet". Locked and held chapters offer nothing in any mode.
- Choosing writes only the reader's `view` (chapter + `learning` stage) and, for practice modes, the tab-scoped
  resume record with `chapterOnly: true`; the reader then opens and Practice & Review reopens on that chapter, so
  refresh and direct entry keep the reader's own gate.
- `chapterOnly` (`PracticeContext`): Flashcards start on the chapter scope and the scope selector can widen to the
  lesson, module and all cards (no curriculum total); Match & Sort lists only activities that cite the chapter;
  counts and progress labels are chapter-level. The review scope is never the navigation origin: widening it does not
  move the reader or change where Return to Lesson goes.
- "Change learning mode" sits in the reader's chapter header (`ReaderLearningModeSwitch`) and in the Practice &
  Review navigation; it reopens the chooser for the same chapter. General Info returns to the reader.
- The Practice & Review overview (journey step, takeaways card) keeps lesson-wide counts; opening a mode from it goes to
  the reader's chapter, or the first open chapter with content for that mode.
- Dialog: `role="dialog"`, `aria-modal`, labelled by the chapter title; focus moves to the first available card,
  Tab is trapped, arrow keys move between cards, Esc / close / backdrop return focus to the control that opened it.
- Routing check: `apps/IndustryKnowledge/learningModeAudit.ts` audits every implemented sub-industry from
  `loadLearningModeCatalog()` (`App.tsx`). In the app, `?dkAudit=learning-modes` shows the progress bar (verified /
  implemented sub-industries) and per-group coverage; `apps/IndustryKnowledge/__tests__/learningModeRouting.test.tsx`
  prints the same report. Pure cases: `__tests__/learningModes.test.ts`. The same page shows Knowledge Check coverage
  and **Flashcard coverage** (`apps/IndustryKnowledge/flashcardCoverage.ts`): eligible chapters, chapters with valid
  cards, zero and below-recommended chapters, authored and generated cards, duplicates, invalid and unmapped cards, by
  industry → sub-industry → module → lesson → chapter.

## Modes

`modes.ts` defines `PracticeMode`. `PRACTICE_MODES` in `PracticeReviewEntry.tsx` lists them, and a
mode appears for any lesson its `resolve` returns content for. A failing mode is hidden; the lesson
reader keeps working.

| Mode | Resolver | Content today |
| --- | --- | --- |
| Smart Flashcards | `flashcardScopes.ts` → `resolveIndustryFlashcards` (authored lessons through `flashcardAccess.ts` → `resolveLessonFlashcards`) | Authored decks for Commercial Banking, Consumer Finance, the FMCG expansion curricula and seven generated curricula (Building Materials, Packaging, Electrical Equipment, Healthcare Products, Audit & Assurance, Contract Logistics, Express Delivery; `flashcards/decks`, access through `sourceDecks.ts`). Every chapter of every curriculum is completed with chapter cards built at runtime from the text it displays (`chapterCards.ts`); authored cards come first and are never changed. Coverage: `reports/flashcard-depth-coverage-2026-11-15.md` and the audit page |
| Match & Sort | `lessonAccess.ts` → `resolveLessonPractice` | Commercial Banking and Consumer Finance activities. The two original packs plus the expansion packs (`matchSort/content/expansion.ts`); a lesson can draw activities from more than one pack. Coverage is tracked in the same manifest |

## Flashcard scopes

The Flashcards mode owns its layout (`ownsLayout`): a deck overview with a Back control, the
sub-industry name and lesson context, a scope selector, a progress summary and Study / Review actions,
plus a collapsible My notes & key terms panel (side column from 1280px, below the main column on
narrower screens). Scopes: **This chapter** (the chapter open in the reader, the default), **This
lesson**, **This module** and **All [sub-industry] cards**. Module and full-deck scopes need the
curriculum the reader publishes (`LessonFlowValue.curriculum`, built in `App.tsx`
`useCurriculumLessonFlow`); without it only chapter and lesson are offered. Sessions take up to 12
cards (`FLASHCARD_SESSION_LIMIT`): Study starts with cards not yet rated, Review takes due cards. Progress labels say "rated" because only a rating
(Again / Hard / Good / Easy) is stored; viewing a card is session-only and never persisted.

Chapter cards (`chapterCards.ts`, built once per curriculum and cached) follow the General Info journey: what it
is, key insight, Key terms, each concept and its named points (fundamentals) → how it works, what drives it
(mechanisms) → worked examples → how to apply it, KPIs to watch (applications) → main risk, business impact, why it
matters (implications). Each answer is one unbroken run of the chapter's own sentences. Template text (sentences
repeated in three or more chapters, "A core … concept related to …" definitions, restated headings, "The mechanism
connects …" label lists), figures in the newer card types, review markers, held chapters and anything that repeats or
paraphrases an answer already given in the chapter, the curriculum or an authored card never become cards. Beside an
authored deck, each chapter's authored cards come first and chapter cards follow. Recommended depth per chapter
(`chapterDepth`: introductory 6–10, standard 10–15, complex 15–25 cards) comes from the specific units the chapter
displays; very rich chapters are held to their ceiling, and chapters below it are reported for content enrichment,
never padded. Card IDs come from the curriculum, chapter title and term or section, so renumbering keeps review
history, and every card that existed before keeps its ID and text. Cards carry optional metadata (`origin`,
`conceptCategory`, `stage`, `difficulty`, `sourceSection`, `learningObjective`). Wider scopes show a question once even
when two decks hold it under different IDs.

## Access rules (fail closed)

A flashcard deck belongs to a lesson only when its `industryId` equals the lesson identity's
industry (the app's category id, e.g. `banking-commercial`) and its lesson title matches.

An item is offered only when every chapter it draws on:

1. sits at its recorded position with the same title in the live registry after `applyReviewHolds`
   (`sourceDecks.ts`) **and** in the reader's own deck;
2. is not under review; and
3. is open to this learner under the reader's chapter gate (`accessible`). Match & Sort chapters in
   other lessons follow that lesson's own gate (`lessonAccess.ts` → `otherLessonAccess`, which delegates to the same
   `storedChapterProgress` as `lessonChapterAccess` and `lessonChapterProgress`, so legacy chapter completion counts in
   Flashcards, the chooser and Match & Sort alike).

Items on missing, moved or held chapters are excluded; items on locked chapters are counted
("N more open as you complete earlier chapters") but never shown. Lessons that are not open follow the
same gate from their stored records (`lessonChapterAccess`: chapter checks, legacy completion, lesson
completion); the first chapter of every lesson is open. Practice never unlocks chapters,
changes Knowledge Check scores, marks lessons complete or writes `casemate:domain-*` records.

## Persistence

Browser-local only, one record per signed-in learner (`learnerScope.ts`: hash of the session email
from `useSpaceRuntime().userEmail`; the email is not written into key names):

- Flashcards: `casemate:flashcards:v1:<scope>`
- Match & Sort: `casemate:practice-review:match-sort:v1:<scope>`

Signed-out visits keep practice in memory only. There is no cross-device sync.

A refresh reopens the same mode and scope for the same lesson (`practiceResume.ts`, sessionStorage
`casemate:practice-review:resume:v1`, cleared on return to the lesson). The record is navigation intent only, never
progress, and a lesson that opens reopens practice from it only when `practiceRestoreDecision` says so:

- an explicit request that is still fresh (`requested`, written by the chooser, Change learning mode, or a chapter
  switch inside practice that moves the reader), or
- a reload of the page that was showing that mode (the record comes from an earlier page load, `pageLoad`, and the
  address bar still carries the same `dkPractice`).

Any other record was left behind earlier in the same page load (browser Back, then Forward, or opening the lesson
again), so it is dropped with its practice link and the lesson opens normally. Leaving the lesson while practice is
open points the reader back at the origin chapter. The reader keeps a reading position per chapter
(`readingPositions` in the reader record, percent of the article); it is re-applied while a chapter lays out and is
not overwritten until it is reached or the learner scrolls. Closing practice or the chooser returns focus without
scrolling the reader. The dialog is rendered into `document.body` so the reader's sticky columns cannot paint
over it.

## Tests

- `__tests__/practiceReview.test.tsx`: Match & Sort access and the entry flow.
- `__tests__/flashcardsPractice.test.tsx`: flashcard access (gating, holds, moved or missing
  chapters, other curricula), a live curriculum resolved through `resolveIndustryFlashcards`, the
  full study-and-rate flow through the deck overview (portal dialog, scope selector, tiles, Reveal
  answer, 12-card sessions), due reviews, learner isolation, signed-out behaviour and the refresh
  restore. It also runs `flashcardScopes.test.tsx`.
- `__tests__/flashcardScopes.test.tsx`: self-contained fixtures (a made-up curriculum, no authored deck).
  `resolveIndustryFlashcards` with a curriculum (chapter, lesson, module and all scopes, `lessonChapterAccess`
  for lessons that are not open, held chapters), the `chapterLessonDeck` filters (template and shared
  definitions, instruction-only examples, duplicates, held chapters, stable IDs), `FLASHCARDS_MODE.resolve`
  and `summarise`, and the deck overview the mode owns (`flashcards-*` test IDs).
- `__tests__/flashcardDepth.test.ts`: FC-01 … FC-22 for the chapter-card engine (rich and introductory chapters,
  authored cards preserved, grounding, combined order, template text, empty chapters, duplicates, cross-industry
  isolation, the four scopes, origin and chooser counts, saved progress, large decks, stable IDs, the missing-assessment
  access policy, held chapters and the catalogue coverage check). Pure; uses the live Commercial Banking 1.1 deck.
- `__tests__/renderedGrounding.test.ts`: every flashcard excerpt and every quoted Match & Sort grounding
  phrase must be displayed in its chapter as the reader renders it (live diagrams only: inline diagram specs in
  Commercial Banking lesson files are never drawn, and held diagram kinds draw nothing), and none may come from a
  "Do Not Publish" restriction notice.

Both need a DOM (jsdom preloaded before React DOM) and the `apps/IndustryKnowledge` module graph.
