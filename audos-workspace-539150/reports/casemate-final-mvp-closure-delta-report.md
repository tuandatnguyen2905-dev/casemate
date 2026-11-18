# CASEMATE - FINAL MVP CLOSURE & ACCEPTANCE DELTA REPORT

Date: 18 Nov 2026 · Scope: Domain Knowledge / Learning Hub (`apps/IndustryKnowledge`, `apps/InteractiveLearning`), Commercial Banking · Mode: **Draft only, not published** · This report covers only work done after `reports/domain-knowledge-mvp-release-readiness-2026-11-18.md`.

**Evidence levels used on every claim:** SOURCE CHECKED (I read or edited the source) · UNIT TESTED · INTEGRATION TESTED · FULL BUILD VERIFIED · BROWSER VERIFIED · FOUNDER ACCEPTED. One level is never evidence for another.

**Headline.** Every claim below is **SOURCE CHECKED at most**. This session could read and write workspace files only through the bridge, with no shell access to the workspace, no test runner against it, no full-app build and no browser. **No test was executed. Nothing is UNIT TESTED, INTEGRATION TESTED, FULL BUILD VERIFIED, BROWSER VERIFIED or FOUNDER ACCEPTED.** Neither release is READY FOR APPROVAL.

## 1. Baseline used

- `reports/domain-knowledge-mvp-release-readiness-2026-11-18.md` (482 files mirrored, 23 suites, 352 pass, 10 failing checks, no P0/P1 in tested scope). SOURCE CHECKED: no workspace save landed after it before this work (restore point v1318 was the report itself).
- Restore point for this delta: manual snapshot **v1319**, "Before final MVP closure delta (D-R1, D-R2, Vietnamese UI labels, flashcards 1.3-1.5)", `restorable: true`.
- Baseline measured values reused as given, not recalculated: VI General Info 87/90; Classic Flashcards 192/222; Interactive 62/62; Match & Sort 62/62; Knowledge Check 260/260; Case Studies 7/7; Banking glossary 135 terms, 130 source-verified (203 is not claimed); Learning Visuals 5/70.
- I verified current source before editing: none of the files touched had a newer Draft than the baseline, so no item was skipped as already done. The 30 Module 1 flashcard translations (1.3-1.5) did not exist (no `L13`/`L14`/`L15` overlay file; no 04F.2 work had landed).

## 2. Exact files changed

All writes passed `expected_version`. One `version_conflict` occurred and was my own earlier patch to `uiText.ts`; no foreign write was overwritten. Shared file `uiText.ts` was only appended to (dictionary entries and helper functions); existing entries and functions were not edited.

| # | File | Change |
|---|---|---|
| 1 | `apps/IndustryKnowledge/localization/uiText.ts` | + Vietnamese dictionary entries and helper functions for Session Complete, Study Remaining/Next, Continue Learning, learning mode chooser, Essential Terms preview, nothing-due panel |
| 2 | `apps/InteractiveLearning/flashcards/components/ReviewSummary.tsx` | Session Complete now uses `uiText`; English output kept byte-identical; added `data-testid="session-restart"` |
| 3 | `apps/InteractiveLearning/flashcards/components/SmartFlashcards.tsx` | New continuation label (D-R1); session titles and nothing-due panel use `uiText`; `useUiLanguage()` |
| 4 | `apps/InteractiveLearning/practiceReview/continueLearning.ts` | `describeContinueLearning` uses `uiText` helpers (English unchanged) |
| 5 | `apps/InteractiveLearning/practiceReview/LearningModeChooser.tsx` | Chooser and Change learning mode button use `uiText` |
| 6 | `apps/IndustryKnowledge/glossary/EssentialTermsPreview.tsx` | Preview controls use `uiText` |
| 7 | `apps/IndustryKnowledge/glossary/EssentialTermsEntry.tsx` | Reader "Essential Terms" button uses `uiText` |
| 8 | `apps/InteractiveLearning/practiceReview/__tests__/flashcardScopes.test.tsx` | Outdated 12-card assertion replaced; 1 new case (finish continuation without rating) |
| 9 | `apps/InteractiveLearning/practiceReview/__tests__/flashcardsPractice.test.tsx` | Button label in the 42-card wider-scope case |
| 10 | `apps/InteractiveLearning/flashcards/decks/interactiveCommercialBanking.ts` | D-R2: `cb21-fill-deposit-tenor` rewritten (ID kept) |
| 11 | `apps/IndustryKnowledge/localization/practice/cbViPracticeInteractiveM02M03.ts` | D-R2: Vietnamese version of the same card |
| 12 | `apps/IndustryKnowledge/localization/practice/cbViPracticeFlashcardsL13L15.ts` | **New**: 30 classic flashcard translations (1.3: 11, 1.4: 9, 1.5: 10) |
| 13 | `apps/IndustryKnowledge/localization/practice/cbViPractice.ts` | Registers file 12 |
| 14 | `apps/IndustryKnowledge/localization/commercialBanking/cbViVisualsM02.ts` | **New**: 13 Module 2 Learning Visual overlays |
| 15 | `apps/IndustryKnowledge/localization/commercialBanking/cbViVisuals.ts` | Merges file 14 into `CB_VI_VISUALS` |
| 16 | `apps/IndustryKnowledge/localization/localizationCoverage.ts` | Dashboard note text only (it said Practice & Review chrome stays English) |
| 17 | `reports/casemate-final-mvp-closure-delta-report.md` | This report |

Not touched (SOURCE CHECKED by diff review): scheduler, review models, persistence, card/chapter/question IDs, Knowledge Check data and scoring, chapter-access code, `App.tsx`, `Desktop.tsx`, held lesson 5.4 content, any progress endpoint, any database table.

## 3. D-R1 Study More Cards: resolution and tests

Founder decision applied: keep the 3-card continuation; keep the existing exclusion logic (`start(deck, 'study', sessionIds)`).

- **Source (SOURCE CHECKED).** `SmartFlashcards.tsx` now counts the cards the last session did not include and that are still unrated, and labels the button from that count. 12 of 15 studied: **"Study Remaining Cards (3)"**, and the session opens with those 3. If more cards remain than one session holds (for example 42 cards in the lesson scope), the label is **"Study Next 12 Cards (30 remaining)"** so the size of the next session is never misstated. Vietnamese: "Học các thẻ còn lại (3)" and "Học 12 thẻ tiếp theo (còn 30 thẻ)" through `uiText`. Review due cards keeps priority as before.
- **Not changed:** scheduling algorithm, review records, card IDs. Unrated cards are still not counted as mastered because mastery comes only from `applyRating`, which this change does not touch.
- **"Study Deck Again".** No button with that name exists. The summary's `Study again` replays the same session cards (kept, now Vietnamese "Học lại các thẻ này"), and the full restart is the overview's Study action. I did not rename either. Decide whether to rename `Study again` to avoid confusion with the new label.
- **Tests edited (SOURCE CHECKED, not run).** `flashcardScopes.test.tsx`: the case now expects `Study Remaining Cards (3)`, `Card 1 of 3`, that `Study again` still exists, and that the old label is gone. New case: after 12 rated cards, start the 3-card continuation, press Next twice and Finish with no rating; expects "You rated 0 of 3 cards", Viewed 3 / Rated 0 / Not rated 3, the no-rating note, no remaining button, and the overview tiles unchanged (15, 0, 0%). `flashcardsPractice.test.tsx`: the 42-card case clicks `Study Next 12 Cards (30 remaining)`. I read `practiceReview.test.tsx` end to end: it has no continuation assertion.
- **Finish Session and Continue Learning** are untouched in logic (SOURCE CHECKED); the `UXB-07/11/12` case in `practiceReview.test.tsx` still expects the same English strings, which `describeContinueLearning` keeps.
- **Not verified:** that the affected suites pass. UNIT TESTED: none. Run `flashcardScopes` and `flashcardsPractice` (and the flashcards `run-all`).

## 4. D-R2 `cb21-fill-deposit-tenor`: resolution and tests

- **Inspection (SOURCE CHECKED).** The interactive fill-in completed to exactly the answer of classic card `cb21-risk-not-end-of-chain`. Lesson 2.1's other interactive cards already test weakness propagation, funds-transfer pricing, ALCO, the risk view of a deposit and deposits as liabilities; the classic card `cb21-who-creates-value` had no interactive twin.
- **New content (same ID).** `basedOn: cb21-who-creates-value`. Prompt: "Bank value is a ____ outcome that joins customer demand, balance-sheet capacity, execution and control." Answer **cross-functional**; accepted: `cross functional`, `crossfunctional`. The back repeats the chapter's own sentence (verbatim excerpt of that classic card's source reference), is not the classic card's answer, and the prompt does not contain the answer. Explanation is new text, not copied from the classic card.
- **Vietnamese (SOURCE CHECKED).** Prompt "Giá trị của ngân hàng là một kết quả ____, kết hợp nhu cầu của khách hàng, năng lực bảng cân đối, khâu thực thi và kiểm soát."; answer "liên chức năng" (the guide's term from the ALCO card), accepted `lien chuc nang`, `liên phòng ban`, `lien phong ban`, `cross-functional`, `cross functional`. The Vietnamese prompt contains none of them. `example` and `terms` reuse the existing Vietnamese of `cb21-who-creates-value`. English `en` key updated so freshness holds.
- **Semantic equivalence:** checked by reading only; no native review (see 5).
- **Tests:** none edited. `interactiveCards` and `localizationVi` were **not run**. UNIT TESTED: none. The card's old ID now names a concept it no longer tests (`deposit-tenor`); the ID is kept as instructed because the tests pin it.

## 5. New Vietnamese coverage (numbers)

All counts below are **SOURCE CHECKED** (entries written; keys and English fronts copied from the decks; numbers compared by hand). The measured counts come from `localizationVi.test.ts`, which was **not run**, so the "expected after" column is a projection, not a measurement.

| Item | Baseline | Added | Expected after (unmeasured) |
|---|---|---|---|
| Classic flashcards | 192/222 | +30 | **222/222** |
| Interactive cards | 62/62 | 1 card re-translated | 62/62 |
| Match & Sort | 62/62 | 0 | 62/62 |
| Knowledge Check | 260/260 | 0 | 260/260 |
| Case studies | 7/7 | 0 | 7/7 |
| General Info chapters | 87/90 | 0 (Modules 2-5 not retranslated) | 87/90 |
| Learning Visuals | 5/70 | +13 (Module 2) | **18/70** |
| Glossary (CB) | 135, 130 verified | 0 | 135, 130 verified (203 not claimed) |

**B1, 30 flashcards (SOURCE CHECKED).** 1.3 Global Market Overview 11, 1.4 Vietnam Market Overview 9, 1.5 Industry Drivers & External Factors 10, in `cbViPracticeFlashcardsL13L15.ts`. IDs, sources and review history are untouched because the overlay only swaps display text by `cardId`. Terminology follows `viTerminology.ts` (NHNN, room tín dụng, nợ xấu, biên lãi ròng (NIM), xử lý ngân hàng đổ vỡ, tài sản có rủi ro (RWA); none of the three avoided terms appears). The English cards contain no digits, so the number check has nothing to lose. Accuracy was checked by writing each field from the English field, not by field presence only. Not run: freshness (`en` equals the live front) and `localizationVi`.

**B3, Learning Visuals (SOURCE CHECKED).** 13 of the 14 Module 2 (Value Chain) visuals are translated in `cbViVisualsM02.ts`: 21-01, 21-03, 22-01, 22-02, 23-01, 24-01, 24-02, 24-03, 25-01, 25-02, 25-03, 26-01, 26-02. Structure, array lengths, layout and every figure are mirrored from the English spec; each English number appears in its Vietnamese string (for example 196, 133, 15,08%, VND879,35 nghìn tỷ, 29, 41%, 3,35%, VND16.699 tỷ, 13,4 triệu). Hypothetical figures stay labelled GIẢ ĐỊNH. Module 2 chapters 22-03, 23-02, 23-03 and 26-03 are held in English by design (`CB_M2_HELD_KINDS`) and are not counted as missing work by me. Not run: `localizationVi` visual checks.

**B4, lesson 5.4 hold (REV-P0-12).** Not translated, unlocked, modified or published. Coverage, eligible-approved translated vs total including held (projection, SOURCE CHECKED): General Info chapters **87/87 eligible, 87/90 including the 3 held chapters (96.7%)**; classic flashcards 222/222 (lesson 5.4 has no flashcards; the held lesson resolves to none); the other categories carry no held items.

**B5, editorial quality.** **Expert Vietnamese review: OUTSTANDING.** No qualified reviewer has reviewed any of this text. Automated checks are not expert review.

## 6. Remaining English UI and diagrams (counts)

**B2 fixed (SOURCE CHECKED, not browser verified), reusing `uiText` and `useUiLanguage` only:** `ReviewSummary.tsx` (all Session Complete text and buttons incl. Return to Lesson), `continueLearning.ts` (label, detail, notice for chapter, check, next lesson and learning path), `LearningModeChooser.tsx`, Essential Terms preview and the reader "Essential Terms" button, `SmartFlashcards.tsx` session titles and the nothing-due panel, the new Study Remaining/Next labels. English output of every changed string is identical, so existing English assertions still read the same. Switching language only re-renders labels; no id, answer key, progress record or route depends on them (SOURCE CHECKED; browser behaviour not verified).

**Still English that I know of (counted, SOURCE CHECKED):**
- 7 strings: the standalone-only Smart Flashcards shell (eyebrow, title, subtitle, "No flashcard decks yet" and its text, deck list aria-label) plus `aria-label="Key terms"` in `flashcardsMode.tsx`. The standalone shell is not shown inside Practice & Review.
- 6 files I did not audit, so I give no count: `FlashcardDeckOverview.tsx`, `PracticeJourney.tsx`, `matchSortMode.tsx` and the glossary sheet files `GlossaryDialog.tsx`, `TermSheet.tsx`, `TermCard.tsx` / `TermPopover.tsx`.
- **Learning Visuals: 52 of 70 still English-only.** 1 in Module 2 (`cb-m2-21-02-actors`: its `flows` values are used as identifiers, so it needs a renderer check before translating) plus 51 in Modules 1 (lessons 1.2-1.5), 3, 4 and 5, which I did not open. Module 2 spec files also carry `heading` and `intro` text outside the overlay structure; how those are localized was not verified.
- Prioritised list for the 52 (the five core sections the brief names): (1) Module 5 Trends & Outlook, (2) Module 4 Competitive Landscape, (3) Module 3 Business Models & Economics, (4) Module 1 Industry Context lessons 1.2-1.5, (5) `cb-m2-21-02-actors`. Within each, start with the first visual of each lesson. I did not enumerate the individual kinds for Modules 1 and 3-5.

## 7. Full-app build result

**BLOCKED. Not attempted. Nothing is FULL BUILD VERIFIED.** The complete app (`apps/IndustryKnowledge/App.tsx`, about 1.3 MB, and roughly 470 other files) is readable only page by page through the bridge, and this session has no way to place it on a machine with a compiler. Compiling the mirrored test graph is not a full-app compile and is not claimed. Steps needed: (1) export the whole Draft workspace to a machine, byte-checking each file against the bridge `contentSha256` (as the baseline run did); (2) install `react@18.3.1`, `react-dom@18.3.1`, `lucide-react`, TypeScript 5, `tsx`, `jsdom@24`; (3) `tsc --noEmit -p tsconfig.json` on the whole tree including `App.tsx`; (4) run `tsx --tsconfig tsconfig.json --import jsdom-preload.mjs <suite>` for every suite in the baseline's section 8, plus the three that import `App.tsx` (`glossaryCoverage`, `assessmentCoverage`, `learningModeRouting`). The stale `casemate-source.zip` (13 Sep) must not be used. The platform's own compile happens only at publish, which this task forbids.

## 8. Browser QA result

**NOT RUN. No browser or Draft Preview access in this session. Nothing is BROWSER VERIFIED and no journey is marked PASS.** Manual checklist for the founder (desktop, then 375 px, test account). Tick only what you see:

| # | Journey | Steps | Result |
|---|---|---|---|
| A | English | Essential Terms (Start / Skip for Now / View All Terms) > General Info > Knowledge Check (one click auto-advances, last needs Submit) > Flashcards > Session Complete > Continue Learning names the next open chapter or the blocking check | ☐ |
| B | Vietnamese | Switch EN to VI on a chapter: same chapter stays open. Open the Essential Terms preview, Change learning mode chooser, Flashcards, finish a session: Session Complete, Continue Learning and Return to Lesson are Vietnamese. Complete a Knowledge Check in VI, switch back: score and progress identical | ☐ |
| C | Optional recall | Flip, Next without rating, Finish with zero ratings: Viewed/Rated/Not rated, Mastered unchanged, Continue Learning works | ☐ |
| C2 | **Study Remaining (D-R1)** | Rate 12 of 15 cards: button reads "Study Remaining Cards (3)"; the session holds 3 cards; Study again still replays the same 12 | ☐ |
| D | Interactive | MCQ (card does not flip), fill-in-blank, feedback, Match & Sort. **Lesson 2.1: the "Bank value is a ____ outcome" card accepts "cross-functional" and its Vietnamese answer "liên chức năng"** | ☐ |
| E | Returning learner | Refresh mid-check: same question and answers; reopen: Essential Terms does not auto-open after Start; scores, chapter access and reading position intact | ☐ |
| V | Visuals | In VI open Module 2 lessons 2.1, 2.2, 2.5 and 2.6: diagrams are Vietnamese and every figure matches the English diagram; other modules keep the English diagram | ☐ |

## 9. Regression results

**None executed. UNIT TESTED: none. INTEGRATION TESTED: none.** SOURCE CHECKED review only:
- Flashcard session flow, scopes, interactive cards, Continue Learning, KC auto-advance, chapter access and progress: no logic file for any of them was edited. Edits were display text, one label computation and content. KC, assessment, `lessonFlow*`, scheduler and persistence files were not touched.
- Both P2 defects: **fixed in source, closure unverified.** D-R1: assertion replaced and a new case added; D-R2: card rewritten in EN and VI.
- Suites to run first (from the baseline): flashcards `run-all` (interactiveCards, sessionFlow, components, decks), practiceReview `flashcardScopes`, `flashcardsPractice`, `continueLearning`, `practiceNavigation`, `practiceReview`, `learningModes`, IK `localizationVi`, `glossaryEssentialTerms`, `assessmentAutoAdvance` and `assessmentAutoAdvanceVi`, `lessonFlowReader`, `lessonFlowProgression`, `crossModeAccess`. Expected unchanged failures: the 8 FMCG checks below.
- Risk I could not remove: a test I did not read could still assert one of the changed English strings. I read `flashcardScopes`, `flashcardsPractice` and `practiceReview`; I did not read `flashcards/__tests__/*`, `glossaryEssentialTerms` or `learningModes`. I changed no English string except the old "Study more cards" label.

**C3 integrity (SOURCE CHECKED only).** Historical KC scores and flashcard ratings: no write path touched. Canonical chapter access and no duplicate progress across languages: no code touched; language switch is display-only by design (`learningLanguage.ts`). Sprint 03G inactive and retired 03H endpoints disabled: **not re-verified**, because that needs `App.tsx`. No unauthorized shared-file overwrite: every write carried `expected_version`; Sprint 04A-04F work was only appended to.

**Recorded for the FMCG owner (out of scope, unchanged):** 8 failing checks. GL-25 duplicate definition for `tob.compliance-cost` and `hh.compliance-cost`; flashcard `decks` suite 3 checks (FMCG decks at 15 cards, `beauty-m2l4c1-cost-to-serve` repeated prompt, `tobacco-m1l1c4-legal-boundary` year); Match & Sort `content` 2 (pinned pack order lacks 15 FMCG packs, `tobacco-m2-l3-c1-sequence` explanations under 30 characters) and `sourceMapping` 2 (`euCosReg` missing from the `FMCG_BEAUTY_MODULE01` registry).

## 10. Remaining P0 / P1 / P2

- **P0 / P1:** none known. None of this is a test result.
- **P2, banking:** D-R1 and D-R2 fixed in source, closure unverified. D-02 (ReviewSummary, continueLearning) and D-03 (LearningModeChooser, Essential Terms preview) fixed in source, unverified; leftovers in section 6. 52 English-only visuals. D-05 (non-banking visual viewer) not re-checked.
- **P2, outside banking (unchanged):** F-01, F-02, F-03 (the 8 FMCG checks).
- **New risk, unverified:** the `Study Next 12 Cards (N remaining)` label is my generalisation of the founder-approved 3-card label for larger scopes.

## 11. Release B verdict (22 Nov)

**CONDITIONAL. Not READY FOR APPROVAL.** Mandatory acceptance evidence is missing: no test run after these edits, no full-app build, no browser journeys, no founder acceptance. Conditions: run the suites in section 9 and confirm D-R1 and D-R2 close; one full compile that also re-confirms 03G inactive; browser journeys A-E on desktop and 375 px.

## 12. Release C verdict (29 Nov)

**CONDITIONAL. Not READY FOR APPROVAL.** Projected (unmeasured) coverage: 222/222 classic flashcards, 62/62 interactive, 62/62 activities, 260/260 KC, 7/7 cases, 87/90 chapters (87/87 eligible), 18/70 visuals. Conditions: run `localizationVi` to confirm the projection; browser journey B; native Vietnamese review (OUTSTANDING); decide whether 52 English-only visuals are acceptable for the deadline or schedule the rest; lesson 5.4 stays held.

## 13. Founder actions still required

1. Run the test suites and a full-app compile (section 7 and 9), or approve a run that can do it. Do not treat this report as test evidence.
2. Run browser journeys A-E, C2, V from section 8 and tick them.
3. Decide on the `Study again` / `Study Remaining Cards` naming (no "Study Deck Again" button exists) and on the `Study Next 12 Cards (N remaining)` wording for larger scopes.
4. Arrange a qualified Vietnamese reviewer for the 30 flashcards, the 13 diagrams and the new interface labels.
5. Lesson 5.4 legal hold REV-P0-12: no change; decide when it can be lifted.
6. Decide the visual scope (52 left) and whether the owner of the FMCG checks takes the 8 failures.
