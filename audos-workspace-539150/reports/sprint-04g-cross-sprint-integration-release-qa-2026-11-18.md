# CASEMATE - SPRINT 04G CROSS-SPRINT INTEGRATION & RELEASE QA REPORT

Date: 18 Nov 2026 (02:20-02:50 UTC) · App: Domain Knowledge / Learning Hub (`apps/IndustryKnowledge`, `apps/InteractiveLearning`) · Mode: **Draft only, not published** · No DB tables created or changed · Restore point: manual snapshot **v1303** "Before Sprint 04G cross-sprint integration QA (Domain Knowledge)", confirmed `restorable: true` at 02:31 UTC.

**Final verdict: INTEGRATED - BROWSER QA PENDING.** The features are wired together correctly in source, every executable suite I could run passes, and one confirmed integration defect was fixed with a regression test. Browser QA was not run (no Draft Preview access from this session) and most jsdom suites that need the full app module graph could not be executed. Neither release gate can be marked PASS until those are run.

## A. Current integrated architecture (what is actually in Draft)

| Sprint output | Present in Draft | Evidence |
|---|---|---|
| 04A MCQ auto-advance | Yes | `assessmentAutoAdvance.ts` (500 ms, 650 ms reduced motion), `LessonAssessmentStage.tsx` (pending lock, final question never advances, explicit Submit); wired in reader `stage === 'check'` with `flowState.select/move/submit` |
| 04B flashcard UX + Continue Learning | Yes | `ReviewSummary.tsx` (viewed/rated/not rated, zero-rating message, Continue Learning panel, Return to Lesson), `continueLearning.ts`, `PracticeReviewEntry.tsx` |
| 04C / Sprint 05-06 interactive flashcards | Yes | `decks/interactiveCommercialBanking.ts` (26) + `decks/interactiveCommercialBankingM2M3.ts` (36) merged in `decks/practice.ts`; **62 cards counted** (1.2: 8; 2.1-2.6 and 3.1-3.3: 6 each), all IDs unique, pinned list in `interactiveCards.test.tsx` matches exactly; lesson 1.1 deck untouched |
| 04D.1 banking cases | Yes | `commercialBankingCases.ts`: **7 cases** (techcombankCasa, mbDigitalDistribution, vietcombankFwdBancassurance, vpbankSmbcCapital, vietcombankStateControlledScale, vpbankNeoDigital, techcombankDataLending), all `verifiedAt: 17 November 2026` |
| 04E Essential Terms | Yes | `glossary/*`; module overview calls `essentialTerms.open(lessonIdentity(...), () => setChooser(...), { auto: reopenChapter === undefined })`; reader header renders `EssentialTermsReaderButton`; narrative uses `GlossaryText`. Commercial Banking glossary covers 26/27 lessons (5.4 excluded) |
| 04F Vietnamese | Yes, wider than the Module 1 pilot | `localization/*`: VI General Info files exist for Modules 1-5 (5.4 deliberately absent, review hold REV-P0-12); VI flashcards for 1.1-1.2 and 2.1-5.5, VI interactive cards for 1.2 and 2.1-3.3, VI Match & Sort M01-M05, VI cases 7/7. EN/VI switch in reader header and module overview breadcrumb |
| 03F/03H canonical access, retired legacy endpoint | Yes | Chapter gate in `lessonFlowCore.chapterProgress`; review of all 1,344,955 chars of `App.tsx` found no `fetch`/POST to any progress endpoint (reader state is localStorage only) |
| 03G cross-device sync | Not active | `progressSync/` files exist; no `progressSync` import was found in the `App.tsx` import block |

Identity model (verified across `App.tsx`, `lessonLocalization.tsx`, `cbLocalizer.tsx`, `practiceLocalization.ts`): lesson identity, persistence keys (`Commercial Banking Industry Context: <lesson>` etc., exact prefixes), lesson-state lookups, chooser and practice records all use the **English** titles. `useLocalizedDeck` changes display props only (persistenceKey untouched); the access gate runs on the original cards; Practice & Review receives English cards through `practiceSourceCards`; question/option IDs and `correctOptionId` are never changed by translation; reader migration (`migrateLessonReaderState`) maps by `legacyIndex`, never by title, so localized cards cannot remap stored progress.

## B. Feature integration matrix

Levels: SOURCE VERIFIED / UNIT TESTED / COMPONENT TESTED / INTEGRATION TESTED / BROWSER VERIFIED / BLOCKED.

| Feature | Level reached | Notes |
|---|---|---|
| MCQ auto-advance (EN) | COMPONENT TESTED | 13/13 jsdom cases on byte-identical source (one click = one answer, 500 ms advance, rapid clicks, final Submit explicit, one attempt, refresh resume, keyboard, reduced motion, scoring) |
| MCQ auto-advance (VI) | COMPONENT TESTED | New suite, 4/4 after fix; translated questions keep IDs, same picks give identical records in EN and VI, VI to EN switch mid-check keeps answers |
| Chapter gating / legacy completion | UNIT TESTED | `lessonFlowProgression` 10/10 |
| Continue Learning routing | UNIT TESTED | 8/8: next open chapter, blocking check (never a locked chapter), next lesson across modules, held lessons skipped, last lesson to Your Learning Path |
| Return to Lesson / no unexpected return to practice | UNIT TESTED | `practiceNavigation` 11/11 |
| Flashcard flip, optional rating, Finish Session | SOURCE VERIFIED | `components`, `sessionFlow` suites not run |
| Interactive MCQ / fill-in-the-blank | SOURCE VERIFIED | 62 cards, unique IDs, valid `basedOn`; VI fill-in answers also accept the English term and unaccented forms; `interactiveCards` suite not run |
| Practice & Review counters vs current decks | SOURCE VERIFIED | Counts are derived from `PRACTICE_DECKS` at runtime; test literals checked: all lesson 1.1 or fixture based, none stale after Sprint 06 (one residual answer-collision risk, see F) |
| Banking case rendering, EN | SOURCE VERIFIED | 7 cases, sources attached |
| Banking case rendering, VI | SOURCE VERIFIED | VI file says translated from English version 1794943156416769 = current English version; titles and `verifiedAt` match for 7/7; every figure manually traced through `keepsNumbers` (e.g. 2,085,874 vs 2.085.874); stale/missing case falls back to the English block |
| Essential Terms entry | SOURCE VERIFIED | Skip = sessionStorage, Start = localStorage; `proceed` opens the Learning Mode Chooser; `auto: false` when returning; not triggered by chapter-to-chapter navigation; glossary that fails to load goes straight to the chooser |
| Essential Terms lookup / VI definitions | SOURCE VERIFIED | Identity resolves from English titles; switching lesson language moves a single-language glossary choice but never overrides EN+VI; `glossaryEssentialTerms`, `glossaryCoverage` not run |
| EN/VI switch keeps chapter and progress | SOURCE VERIFIED (+ KC component-tested) | Display-only overlay, language-independent IDs; `localizationVi` suite not run |
| Full-app compile / TypeScript | BLOCKED (full app) | Strict `tsc` passes on the mirrored subset only |
| Browser QA, any feature | BLOCKED | No Draft Preview / browser access in this session |

## C. Journey results

**Journey A, new learner (CB Module 1 > 1.1):** PASS AT SOURCE LEVEL, browser pending. Lesson card > Essential Terms preview (auto on first entry) > Skip or Start Learning > Learning Mode Chooser > General Info > Start Knowledge Check (auto-advance, explicit Submit, tested) > Continue to next chapter (gate tested) > Flashcards via Change learning mode > flip / Next without rating / rate > Finish session > Continue Learning (routing tested). No step found that can route to a wrong lesson or module.

**Journey B, returning learner:** PASS AT UNIT LEVEL for gating, historical completion, Return to Lesson origin, refresh restore and stale-resume suppression. Reading position: reader `view` persisted per persistenceKey and restored through `resolveStartChapter` (unit-tested). Essential Terms does not reappear once started. Not browser-verified.

**Journey C, Vietnamese learner:** PASS WITH MINOR DEFECTS. Same chapter stays open on switch (display-only overlay), VI chapter content, VI cases, VI flashcards and interactive cards with IDs and answer keys unchanged, translated KC scored identically (tested). Several interface labels remain English (D-02 to D-04); D-01 fixed.

## D. Test results

Environment: Cloud VM, Node 22.23, React 18.3.1, react-dom 18.3.1, jsdom 24, tsx, TypeScript strict. The bridge returns files as 32,000-character inline pages, so the 20 MB app could not be mirrored. I recreated only the files these suites import and **verified each one byte-for-byte against the bridge's SHA-256** (lessonFlowCore, LessonAssessmentStage, assessmentAutoAdvance, uiText, learningLanguage, glossaryLanguage, readerCopy, continueLearning, practiceResume, learningPathFocus, matchSort assert helper and the five test files). One type-only stub (`glossaryTypes`) was used for `tsc`.

| Suite | Command | Result |
|---|---|---|
| `practiceReview/__tests__/continueLearning.test.ts` | `npx tsx <file>` | 8/8 PASS |
| `IndustryKnowledge/__tests__/lessonFlowProgression.test.ts` | `npx tsx <file>` | 10/10 PASS |
| `IndustryKnowledge/__tests__/assessmentAutoAdvance.test.tsx` | `npx tsx --import ./jsdom-preload.mjs <file>` | 13/13 PASS (before and after the fix) |
| `IndustryKnowledge/__tests__/assessmentAutoAdvanceVi.test.tsx` (new) | same | before fix 2/4 (KC-VI-01, KC-VI-02 fail on English status text), after fix 4/4 PASS |
| `practiceReview/__tests__/practiceNavigation.test.ts` | `npx tsx <file>` | 11/11 PASS |
| TypeScript strict (subset above) | `npx tsc -p tsconfig.check.json` | PASS |

**Total executed on the patched Draft: 46/46 cases pass.**

Not run (need the full module graph, e.g. `industryModuleHydration`, all decks, App.tsx): flashcards `run-all` (scheduler, persistence, decks, components, sessionFlow, interactiveCards), `flashcardsPractice`, `flashcardScopes`, `practiceReview`, `flashcardDepth`, `learningModes`, `matchSortGenerated`, `renderedGrounding`, `glossaryEssentialTerms`, `glossaryCoverage`, `localizationVi`, `crossModeAccess`, `lessonFlowReader`, `learningModeRouting`, `assessmentCoverage`, `progressSync`, full-app compile. Static review of `flashcardsPractice`, `flashcardScopes` and `practiceReview` found no assertion made stale by Sprint 06 (all Commercial Banking literals are lesson 1.1, which has no interactive cards, or fixture data).

## E. Browser QA

**NOT RUN.** This session has no Draft Preview or browser access; no screenshots or recordings exist and none are claimed. Behaviours that remain unverified in a browser: glossary preview stacking with the chooser, language switch re-render of every surface, General Info layout with VI text, auto-advance timing feel, flashcard flip animation, optional rating, interactive cards, Session Complete, Continue Learning, refresh/Back behaviour, and mobile layout.

Manual QA script (desktop, then a 375 px wide viewport; use a fresh test account or a private window, never a real learner):
1. Domain Knowledge > Banking & Financial Services > Commercial Banking > Module 1 > 1.1. Expect Essential Terms preview. Click Skip for Now: the Learning Mode Chooser opens for chapter 1 (one dialog only). Close it, reopen the lesson: the preview appears again (skip is per browser session). Choose Start Learning: chooser opens; reopen lesson later: no preview.
2. Choose General Info, read chapter 1, Start Knowledge Check. Click one option: it is selected, "Answer recorded. Moving to question 2 of N…" appears, question 2 shows after about half a second. Double-click an option on question 2: only one advance. On the last question nothing auto-submits; Submit is enabled only when all are answered; one result screen.
3. Continue to next chapter: chapter 2 opens; chapter 3 is still locked in the Learning Journey.
4. Change learning mode > Flashcards. Flip a card (click and Space), press Next without rating, rate another card, Finish session. Session Complete shows Viewed / Rated / Not rated; Continue Learning names the next chapter or the blocking Knowledge Check, never a locked chapter. Return to Lesson goes back to the chapter you came from.
5. Lesson 1.2: answer one MCQ and one fill-in-the-blank card (try the synonym "LOLR"); checking an answer does not rate the card.
6. Refresh during practice: the same mode reopens once; press Back to the lesson and reopen it: practice does not reopen by itself.
7. Lesson 1.4 chapter 4: the Vietcombank case renders with its source link.
8. In 1.1 chapter 2, switch EN to VI: the same chapter stays open, text is Vietnamese, the Learning Journey progress is unchanged. Open Essential Terms: Vietnamese definitions. Take the chapter check in VI: status line now reads "Đã ghi nhận câu trả lời…". Switch back to EN: the same score and progress show. Check 1.4 chapter 4 case in VI.
9. Repeat 1-4 at 375 px width: no dialog overflow, buttons reachable, chooser cards stack.

## F. Defects found

| ID | Severity | Component | Repro | Root cause | Status |
|---|---|---|---|---|---|
| D-01 | Minor (VI journey, accessibility) | `LessonAssessmentStage.tsx` | Switch to VI, open any chapter check, click an option: status line reads "Answer recorded. Moving to question 2 of 3…"; progress-dot labels and "Go to question N" also English | Strings hard-coded, not routed through `uiText` | **Fixed** (G) |
| D-02 | Minor | `flashcards/components/ReviewSummary.tsx`, `practiceReview/continueLearning.ts` | VI mode, finish a flashcard session: Session Complete text, Study again, Return to Lesson and Continue Learning label/notice are English | No `uiText` in these files | Open; in 04F localization scope (Task #166829 localized the neighbouring flashcard components at 01:55 but not these) |
| D-03 | Minor | `practiceReview/LearningModeChooser.tsx`, practice header | VI mode, open the chooser: mode names, descriptions, "Hey, I'm Mate…", counts and the chapter title are English | Chooser has no `uiText`; chapter title comes from the English practice cards by design | Open (04F scope) |
| D-04 | Minor | `lessonFlow.tsx` takeaways and "Knowledge Check unavailable" screens, `JourneyTakeaways`, `LessonPathCard` CTA (Start Learning / Continue Learning / Completed), reader concept headings, Essential Terms button | VI mode: these labels stay English | Not in `uiText` vocabulary | Open (04F scope) |
| D-05 | Minor, outside Commercial Banking | `App.tsx` `LearningVisualViewer` | Reported by source review: "enlarge" on payments-fintech, life-insurance, consumer-finance, professional, healthcare, hospitality, real-estate, agri, logistics, mfg, social, adtech or telecom visuals opens an empty viewer; Commercial Banking (`cb-m*`) is handled in both renderers | Full-screen renderer chain lacks those sectors | Open, not browser-verified, outside the pilot journeys |
| D-06 | Info | `App.tsx` Commercial Banking Module 2 `onNextLesson` | Fallback has no `nextModule` branch | Masked: inside `LessonFlowContext` the reader uses `flow.next.open`, which crosses modules | No learner impact found |
| R-01 | Risk, not confirmed | `flashcardsPractice` test | Generated 1.1 chapter cards are dropped if their answer equals an authored card answer anywhere in `PRACTICE_DECKS`; the 36 new cards add answers | Collision judged very unlikely | Settle by running the suite |

No critical navigation, scoring or data-integrity defect was found.

## G. Fixes implemented

D-01 only (permitted category: missing localized UI labels in a modified interface).
- `apps/IndustryKnowledge/localization/uiText.ts`: 3 VI dictionary entries ('Answer recorded.', the final-question variant, 'Knowledge Check progress') and 3 helpers (`uiMovingToQuestion`, `uiGoToQuestion`, `uiQuestionDot`). English output is byte-identical to the old strings. Version 1794967989487988 > 1794969565925105.
- `apps/IndustryKnowledge/LessonAssessmentStage.tsx`: the status line, progress group/dot aria-labels and the "Go to question" link use those helpers. No logic change. Version 1794948303421437 > 1794969580117055.
- New regression test `apps/IndustryKnowledge/__tests__/assessmentAutoAdvanceVi.test.tsx` (KC-VI-01..04). Fails 2/4 on the old source, passes 4/4 after; original EN suite still 13/13.
- Workspace file hashes equal the locally tested files (uiText `3f15a18b…`, stage `38d1f5cb…`).

## H. Concurrent development integrity

- Concurrent work seen: Task #166829 (04F, 20 files incl. `uiText.ts`, flashcard components, App.tsx; finished 02:15), Task #166827 (03E Hotels KC v5), Task #166826 (04F glossary). Draft `App.tsx` was stable at version 1794968094419996 throughout the review.
- Both edits used `expected_version`; `versionBefore` matched the version I had read, so nothing written by another task was overwritten. No content, curriculum, glossary, deck, case, Knowledge Check or Hotels file was edited. No question IDs migrated. Sprint 03G not activated. No publish.
- Unresolved conflicts: none.

## I. Release B (22 Nov) readiness: **CONDITIONAL**

Met in source and executed tests: MCQ auto-advance, Continue Learning routing, chapter gating, banking cases, interactive card integrity, no critical navigation or data-integrity defect. Conditions: (1) run the flashcards `run-all`, `flashcardsPractice`, `practiceReview` and `lessonFlowReader` suites plus a full compile in an environment with the whole app; (2) run manual QA steps 1-7 and 9 in Draft Preview; (3) explicit acceptance if browser validation is still outstanding.

## J. Release C (29 Nov) readiness: **CONDITIONAL**

Met in source: EN/VI switching preserves identity, progress and scores; translated KC scoring identical (tested); case and card fallbacks safe; Essential Terms in the journey. Conditions: (1) run `localizationVi`, `glossaryEssentialTerms`, `glossaryCoverage`; (2) close or explicitly accept D-02 to D-04 (mixed-language chrome); (3) approve the actual VI scope, since Draft already carries Modules 2-5, not only the Module 1 pilot; (4) native Vietnamese review; (5) manual QA step 8.

## K. Critical remaining work (MVP scope, priority order)

1. Run the not-run suites and a full-app compile where the whole app can be loaded; fix any failure.
2. Browser QA in Draft Preview with the script in E (desktop + mobile).
3. Localize the remaining learner-facing labels in the VI journey (D-02, D-03, D-04) through `uiText`, owned by the 04F stream.
4. Decide and record the approved Vietnamese scope for Release C; native review of VI content.
5. Optional: D-05 viewer renderers for non-banking sectors.

## L. Final verdict

**INTEGRATED - BROWSER QA PENDING**
