# Domain Knowledge: Full-Catalog Completion Run (target Sunday 22 Nov 2026)

Date: 18 Nov 2026, 13:12–14:40 UTC · App: Domain Knowledge / Learning Hub (`apps/IndustryKnowledge`, `apps/InteractiveLearning`) · Mode: **Draft only, not published** · No database table created or altered · Sprint 03G not activated · retired 03H endpoints untouched · no Hotels & Resorts question-ID migration · lesson 5.4 (REV-P0-12) untouched.

## 1. Executive summary

**Outcome: 0 of 44 curricula are COMPLETE-VERIFIED, and 0 are IMPLEMENTED-QA PENDING.** 42 are PARTIAL-CONTENT GAP and 2 are BLOCKED by P1 content defects that need newly authored content (Audit & Assurance, Healthcare Products). Basic Economics has its own architecture and no assessment by design. The catalogue has no zero-question chapters and no blocked chapters. Every curriculum has a Knowledge Check on every eligible chapter: 4,081 eligible chapters, 11,805 questions.

The remaining gap is content depth and breadth, not navigation or gating:
- 22 curricula (1,963 chapters) still have template-built, too-shallow General Info.
- 2,721 eligible chapters have no Match & Sort activity, and 289 have no flashcard.
- 37 curricula have no glossary.
- 43 curricula have no Vietnamese at all (3,994 chapters).
- 212 of 220 required real-world cases are missing.

**What this run changed (Draft, source-level evidence):**
1. **P1 fixed: Payments & Fintech Knowledge Check.** All 270 questions had one identical correct answer and the same three distractors, so a learner could pass by recognising one sentence. The generator now asks about each question's own chapter: its key insight, or its dimensions. Distractors are the same field from other chapters. Validated on the real module data:
   - 27/27 lessons keep identical question IDs and chapter links.
   - `validateLessonQuiz` passes for 27/27 lessons.
   - Distinct correct answers rose from 1 to 135, and 0 questions use fallback distractors.
   - The longest-option cue fell from 100% to 15.6%.
   - Strict TypeScript reports 0 errors.
2. **Banking closure: 20 more Vietnamese Learning Visuals** (Module 4: 10, Module 5: 10, lesson 5.4 excluded), taking Commercial Banking from 18/70 to **38/70**. The number-preservation check passed on 393 strings and 57 figures, and the real `overlayVisualSpec` produced a complete visual for all 20. One Vietnamese typo was fixed in Module 2 ("một nữa năm" is now "một nửa năm").
3. **Vietnamese interface chrome:** 48 new `uiText` entries and 13 helpers. The following are now routed through `uiText`:
   - flashcard deck overview: 49 strings;
   - Practice Journey: 11;
   - Essential Terms sheet, card and popover: 23;
   - one aria-label.

   English output is byte-identical: 26 render cases matched, and all 18 English strings asserted by tests are unchanged.
4. **FMCG failing checks:** 4 of the 7 known failures now have a fix in source:
   - GL-25 duplicate definition: fixed.
   - Tobacco sequence explanations under 30 characters: fixed.
   - Match & Sort source-mapping test helper: fixed.
   - Years in Tobacco flashcard explanations: fixed in the deck builder, with no card ID changed.

   The other 3 need product decisions (section 9).

Banking closure items done by task #166960 and confirmed present (not redone): D-R1, D-R2, the 30 Module 1 classic flashcards (now 222/222) and the Session Complete, Continue Learning and chooser labels.

**Not verified:** no regression suite ran, the full-app build is **BLOCKED**, and browser QA was **NOT RUN** (sections 7–8). Every PASS in this report is source-level or an isolated local harness on byte-verified mirrors of the touched files.

**Go/no-go:**
- Release B (22 Nov, Commercial Banking): **CONDITIONAL GO**.
- Release C (29 Nov, Banking Vietnamese): **CONDITIONAL**.
- "Full catalogue complete": **NO-GO**. The exact remaining counts per curriculum are in section 5.

## 2. Baseline and restore points

- Baseline Draft: v1320 (automatic, 13:06 UTC, Task #166960, 17 files). Task #166960 had finished before any write in this run, and its report `casemate-final-mvp-closure-delta-report.md` was read first.
- Manual restore point for this run: **v1321**, "Before Domain Knowledge full-catalog completion run (2026-11-18, target 2026-11-22)", `restorable: true`.
- Every write carried `expected_version` and none conflicted. Shared files (`uiText.ts`, `cbViVisuals.ts`) were only appended to.

## 3. Method and evidence levels

The catalogue audits in the app (`learningModeAudit.ts`, `assessmentCoverage.ts`) run off `App.tsx`'s live catalogue loader, which could not be executed here (section 7). Counts were therefore measured in three ways:
- **Report-measured, currency-verified.** I took counts from the dated coverage reports produced by the in-app coverage code: flashcards and Match & Sort from 15 Nov, Knowledge Checks from 6 Nov, glossary from 18 Nov. Each number counts as current only if no data file of that curriculum was modified after the report; this was checked file by file against Draft timestamps.
- **Re-measured from source** where files changed after the report:
  - Beauty, Household, Tobacco, Consumer Finance and Payments & Fintech (Knowledge Checks);
  - interactive cards (`decks/practice.ts`);
  - the Consumer Finance, Life Insurance, Payments and Commercial Banking glossaries;
  - Commercial Banking Vietnamese flashcards and visuals.
- **Stale, not re-measured:** Dairy and Non-Alcoholic Beverages Knowledge Checks (content embedded in `App.tsx`) and Hotels practice counts (content changed 16–18 Nov). They are flagged in the register.

Vietnamese counts treat an English fallback as untranslated. A curriculum with no Vietnamese pack scores 0 against its eligible chapters. The required number of cases is 5 per curriculum (one per module), the rule set for Commercial Banking in Sprint 04D1 and applied by analogy elsewhere, because no other curriculum defines a target.

**Status rules:**
- **COMPLETE-VERIFIED:** every dimension is at its required level, and the suites and browser QA have passed.
- **IMPLEMENTED-QA PENDING:** every dimension is at its required level in source, but QA has not run.
- **PARTIAL-CONTENT GAP:** at least one dimension is below its required level.
- **BLOCKED:** an open P1 that needs authored content or a founder decision before progress.
- **HELD:** content under legal or review hold.

Required levels:
- General Info: substantive, not template-built.
- Flashcards and Match & Sort: at least one per eligible chapter.
- Knowledge Check: valid on every eligible chapter.
- Glossary: exists, with every term verified.
- Vietnamese: every eligible item translated.
- Cases: source-verified, at least one per module.

## 4. Gap register (one row per enabled curriculum)

Eligible means not under review hold. "Interactive" is MCQ plus fill-in-the-blank cards. Commercial Banking figures include this run's changes.

| # | Curriculum (group) | Chapters (eligible/total) | General Info | Flashcards (chapters with / eligible · cards) | Interactive | Match & Sort (chapters with / eligible · activities) | Knowledge Checks (assessed / eligible · questions) | Glossary (verified/total) | Vietnamese (translated/eligible) | Cases (source-verified/required) | QA | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Dairy (FMCG) | 90/90 | substantive, title mismatch (P2) | 90/90 ch · 982 | 0 | 73/90 ch · 123 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 2 | Packaged Food & Confectionery (FMCG) | 87/90 | substantive | 87/87 ch · 800 | 0 | 83/87 ch · 117 | 87/87 ch · 260 q | none (0/–) | 0/87 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 3 | Non-Alcoholic Beverages (FMCG) | 90/90 | substantive | 90/90 ch · 693 | 0 | 46/90 ch · 65 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 4 | Beer & Alcoholic Beverages (FMCG) | 90/90 | substantive | 90/90 ch · 806 | 0 | 74/90 ch · 99 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 5 | Beauty & Personal Care (FMCG) | 135/135 | substantive (compact) | 135/135 ch · 1425 | 0 | 122/135 ch · 149 | 135/135 ch · 270 q | 20/309 | 0/135 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 6 | Household & Personal Care (FMCG) | 135/135 | substantive (compact) | 135/135 ch · 1405 | 0 | 115/135 ch · 142 | 135/135 ch · 270 q | 9/304 | 0/135 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 7 | Tobacco & Next-Generation Products (FMCG) | 135/135 | substantive (compact) | 135/135 ch · 1286 | 0 | 80/135 ch · 107 | 135/135 ch · 270 q | 75/308 | 0/135 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 8 | Fashion, Sports & Lifestyle Retail (Retail & Commerce) | 90/90 | substantive | 90/90 ch · 821 | 0 | 90/90 ch · 120 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 9 | Grocery & General Merchandise Retail (Retail & Commerce) | 126/126 | substantive | 126/126 ch · 1069 | 0 | 123/126 ch · 139 | 126/126 ch · 270 q | none (0/–) | 0/126 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 10 | Pharmacy Retail (Retail & Commerce) | 114/115 | substantive | 114/114 ch · 995 | 0 | 109/114 ch · 121 | 114/114 ch · 267 q | none (0/–) | 0/114 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 11 | Coffeehouse & Foodservice Retail (Retail & Commerce) | 81/81 | substantive | 81/81 ch · 677 | 0 | 79/81 ch · 89 | 81/81 ch · 270 q | none (0/–) | 0/81 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 12 | Commercial Banking (Banking/FS) | 87/90 | substantive (authored) | 87/87 ch · 650 | 62 | 63/87 ch · 64 | 87/87 ch · 260 q | 130/135 | GI 87/87 eligible (87/90 incl. 3 held); FC 222/222; IC 62/62; M&S 62/62; KC 260/260; cases 7/7; visuals 38/70 (was 18); UI 250 labels | 7/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 13 | Consumer Finance (Banking/FS) | 90/90 | template-built (too shallow) | 90/90 ch · 309 | 0 | 28/90 ch · 28 | 90/90 ch · 270 q | 27/57 | 0/90 chapters (English fallback; no VI pack) | 1/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 14 | Life Insurance (Banking/FS) | 90/90 | template-built (too shallow) | 86/90 ch · 209 | 0 | 0/90 ch · 0 | 90/90 ch · 270 q | 29/37 | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 15 | Payments & Fintech (Banking/FS) | 90/90 | template-built (too shallow) | 86/90 ch · 207 | 0 | 0/90 ch · 0 | 90/90 ch · 270 q (fixed this run: 135 distinct chapter-grounded answers; was 1) | 41/48 | 0/90 chapters (English fallback; no VI pack) | 2/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 16 | Enterprise Software & IT Services (Technology & Digital) | 81/81 | substantive | 81/81 ch · 673 | 0 | 79/81 ch · 92 | 81/81 ch · 270 q | none (0/–) | 0/81 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 17 | E-Commerce & Digital Marketplaces (Technology & Digital) | 81/81 | substantive | 81/81 ch · 769 | 0 | 80/81 ch · 130 | 81/81 ch · 270 q | none (0/–) | 0/81 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 18 | Gaming & Digital Entertainment (Technology & Digital) | 90/90 | substantive (many short chapters) | 90/90 ch · 526 | 0 | 28/90 ch · 53 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 19 | Consumer Electronics & Semiconductors (Technology & Digital) | 90/90 | substantive (many short chapters) | 90/90 ch · 500 | 0 | 15/90 ch · 37 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 20 | Telecommunications & Connectivity (Technology & Digital) | 89/89 | substantive (many short chapters) | 89/89 ch · 522 | 0 | 7/89 ch · 21 | 89/89 ch · 270 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 21 | Digital Marketing & AdTech (Technology & Digital) | 90/90 | substantive | 90/90 ch · 602 | 0 | 24/90 ch · 49 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 22 | Social & Communication Platforms (Technology & Digital) | 84/84 | substantive (many short chapters) | 84/84 ch · 498 | 0 | 18/84 ch · 37 | 84/84 ch · 270 q | none (0/–) | 0/84 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 23 | Consumer Electronics & Appliances (Manufacturing & Engineering) | 89/89 | substantive (many short chapters) | 89/89 ch · 524 | 0 | 11/89 ch · 36 | 89/89 ch · 270 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 24 | Machinery & Power Tools (Manufacturing & Engineering) | 75/75 | substantive | 75/75 ch · 624 | 0 | 11/75 ch · 21 | 75/75 ch · 270 q | none (0/–) | 0/75 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 25 | Electrical & Energy Equipment (Manufacturing & Engineering) | 89/90 | template-built (too shallow) | 84/89 ch · 202 | 0 | 0/89 ch · 0 | 89/89 ch · 266 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 26 | Textiles & Apparel Manufacturing (Manufacturing & Engineering) | 89/90 | template-built (too shallow) | 61/89 ch · 164 | 0 | 0/89 ch · 2 | 89/89 ch · 266 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 27 | Building Materials & Coatings (Manufacturing & Engineering) | 89/90 | template-built (too shallow) | 71/89 ch · 144 | 0 | 0/89 ch · 0 | 89/89 ch · 266 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 28 | Packaging, Labels & Industrial Materials (Manufacturing & Engineering) | 89/90 | template-built (too shallow) | 66/89 ch · 143 | 0 | 0/89 ch · 1 | 89/89 ch · 266 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 29 | Freight Forwarding & Ocean Logistics (Logistics & Supply Chain) | 89/90 | template-built (too shallow) | 60/89 ch · 160 | 0 | 0/89 ch · 1 | 89/89 ch · 266 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 30 | Contract Logistics & Warehousing (Logistics & Supply Chain) | 89/90 | template-built (too shallow) | 79/89 ch · 186 | 0 | 0/89 ch · 0 | 89/89 ch · 266 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 31 | Express & Last-Mile Delivery (Logistics & Supply Chain) | 89/90 | template-built (too shallow) | 87/89 ch · 190 | 0 | 0/89 ch · 0 | 89/89 ch · 266 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 32 | Distribution & Market Expansion Services (Logistics & Supply Chain) | 89/90 | template-built (too shallow) | 81/89 ch · 242 | 0 | 0/89 ch · 19 | 89/89 ch · 268 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 33 | Livestock & Animal Feed (Agribusiness) | 90/90 | template-built (too shallow) | 62/90 ch · 146 | 0 | 0/90 ch · 0 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 34 | Agricultural Commodities & Trading (Agribusiness) | 90/90 | template-built (too shallow) | 61/90 ch · 160 | 0 | 0/90 ch · 0 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 35 | Crop Production & Agricultural Processing (Agribusiness) | 90/90 | template-built (too shallow) | 62/90 ch · 145 | 0 | 1/90 ch · 1 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 36 | Property Development & Investment (Real Estate & PropTech) | 87/90 | template-built (too shallow) | 78/87 ch · 194 | 0 | 0/87 ch · 18 | 87/87 ch · 264 q | none (0/–) | 0/87 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 37 | Property Advisory & Management (Real Estate & PropTech) | 88/90 | template-built (too shallow) | 80/88 ch · 199 | 0 | 0/88 ch · 20 | 88/88 ch · 266 q | none (0/–) | 0/88 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 38 | Property Technology & Marketplaces (Real Estate & PropTech) | 90/90 | template-built (too shallow) | 83/90 ch · 187 | 0 | 0/90 ch · 17 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 39 | Hotels & Resorts (Hospitality & Foodservice) | 89/90 | partially revised (pilot) | 81/89 ch · 187 | 0 | 0/89 ch · 20 | 89/89 ch · 268 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 40 | Restaurant Chains (Hospitality & Foodservice) | 89/90 | template-built (too shallow) | 82/89 ch · 177 | 0 | 0/89 ch · 19 | 89/89 ch · 268 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 41 | Healthcare Products & Nutrition (Healthcare & Life Sciences) | 89/90 | template-built (too shallow) + M3 title/text mismatch (P1) | 80/89 ch · 176 | 0 | 1/89 ch · 1 | 89/89 ch · 268 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | BLOCKED |
| 42 | Audit & Assurance (Professional & Business Services) | 89/90 | misaligned (P1) | 84/89 ch · 169 | 0 | 0/89 ch · 0 | 89/89 ch · 268 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | BLOCKED |
| 43 | Management & Technology Consulting (Professional & Business Services) | 90/90 | template-built (too shallow) | 76/90 ch · 174 | 0 | 0/90 ch · 1 | 90/90 ch · 270 q | none (0/–) | 0/90 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 44 | Project & Construction Advisory (Professional & Business Services) | 89/90 | template-built (too shallow) | 83/89 ch · 219 | 0 | 0/89 ch · 0 | 89/89 ch · 266 q | none (0/–) | 0/89 chapters (English fallback; no VI pack) | 0/5 | Source/report-measured; suites NOT RUN; browser NOT RUN | PARTIAL-CONTENT GAP |
| 45 | Basic Economics (own architecture) | n/a (toolkit, no chapters) | Toolkit pages, no curriculum | n/a | n/a | n/a | none (no checks by design, AUD-07) | none | 0 (not set up) | n/a | NOT RUN | PARTIAL-CONTENT GAP (no assessment by design; not in catalogue audits) |

**Catalogue totals:**

| Measure | Value |
|---|---|
| Chapters | 4,106 total; 4,081 eligible; 25 held |
| Knowledge Checks | 11,805 questions; 4,081/4,081 eligible chapters assessed; 0 invalid; 0 zero-question; 0 blocked |
| Flashcards | 21,136 cards; 3,792/4,081 chapters covered |
| Match & Sort | 1,959 activities; 1,360/4,081 chapters covered |
| Interactive cards | 62, Commercial Banking only (31/87 chapters) |
| Glossary | 7 curricula have one; 867 terms still unverified across them |
| Vietnamese | Commercial Banking only |
| Cases | 10 source-verified: CB 7, Consumer Finance 1, Payments 2 |

**Notes on the register:**
- **Commercial Banking Match & Sort:** the 15 Nov coverage report gives 64 activities; the Vietnamese measurement in the 18 Nov readiness report gives 62/62. Treat 62 as verified for Vietnamese and confirm the activity total with the `matchSort` suites.
- **Commercial Banking visuals:** 32 of 70 remain English-only. These are the held kinds (Module 2: 4, Module 4: 4, Module 5: 1), three ecosystem visuals whose `flows` values are renderer identifiers (`cb-m2-21-02-actors`, `cb-m4-41-02-five-forces`, `cb-m5-53-03-vietnam-map`), and the untranslated Module 1 (lessons 1.2–1.5) and Module 3 visuals.
- **Dairy and Non-Alcoholic Beverages:** their Knowledge Check counts may be stale, because the content lives in `App.tsx` (modified 18 Nov).
- **Hotels:** practice counts are stale (content changed 16–18 Nov).

## 5. Remaining work per curriculum (exact counts)

"VI remaining" is the eligible General Info chapters plus every practice and Knowledge Check item of the curriculum. Cases missing are counted against 5 required.

| Curriculum | GI depth | Flashcard chapters missing | Match & Sort chapters missing | Glossary terms unverified | VI remaining | Cases missing | Open P0/P1 |
|---|---|---|---|---|---|---|---|
| Dairy | substantive, title mismatch (P2) | 0 | 17 | no glossary | 90 chapters + practice + KC | 5 | — |
| Packaged Food & Confectionery | substantive | 0 | 4 | no glossary | 87 chapters + practice + KC | 5 | — |
| Non-Alcoholic Beverages | substantive | 0 | 44 | no glossary | 90 chapters + practice + KC | 5 | — |
| Beer & Alcoholic Beverages | substantive | 0 | 16 | no glossary | 90 chapters + practice + KC | 5 | — |
| Beauty & Personal Care | substantive (compact) | 0 | 13 | 289 | 135 chapters + practice + KC | 5 | — |
| Household & Personal Care | substantive (compact) | 0 | 20 | 295 | 135 chapters + practice + KC | 5 | — |
| Tobacco & Next-Generation Products | substantive (compact) | 0 | 55 | 233 | 135 chapters + practice + KC | 5 | — |
| Fashion, Sports & Lifestyle Retail | substantive | 0 | 0 | no glossary | 90 chapters + practice + KC | 5 | — |
| Grocery & General Merchandise Retail | substantive | 0 | 3 | no glossary | 126 chapters + practice + KC | 5 | — |
| Pharmacy Retail | substantive | 0 | 5 | no glossary | 114 chapters + practice + KC | 5 | — |
| Coffeehouse & Foodservice Retail | substantive | 0 | 2 | no glossary | 81 chapters + practice + KC | 5 | — |
| Commercial Banking | substantive (authored) | 0 | 24 | 5 | visuals 32 (incl. held/identifier kinds); native review outstanding | 0 | — |
| Consumer Finance | template-built (too shallow) | 0 | 62 | 30 | 90 chapters + practice + KC | 4 | — |
| Life Insurance | template-built (too shallow) | 4 | 90 | 8 | 90 chapters + practice + KC | 5 | — |
| Payments & Fintech | template-built (too shallow) | 4 | 90 | 7 | 90 chapters + practice + KC | 3 | KC defect fixed in source this run |
| Enterprise Software & IT Services | substantive | 0 | 2 | no glossary | 81 chapters + practice + KC | 5 | — |
| E-Commerce & Digital Marketplaces | substantive | 0 | 1 | no glossary | 81 chapters + practice + KC | 5 | — |
| Gaming & Digital Entertainment | substantive (many short chapters) | 0 | 62 | no glossary | 90 chapters + practice + KC | 5 | — |
| Consumer Electronics & Semiconductors | substantive (many short chapters) | 0 | 75 | no glossary | 90 chapters + practice + KC | 5 | — |
| Telecommunications & Connectivity | substantive (many short chapters) | 0 | 82 | no glossary | 89 chapters + practice + KC | 5 | — |
| Digital Marketing & AdTech | substantive | 0 | 66 | no glossary | 90 chapters + practice + KC | 5 | — |
| Social & Communication Platforms | substantive (many short chapters) | 0 | 66 | no glossary | 84 chapters + practice + KC | 5 | — |
| Consumer Electronics & Appliances | substantive (many short chapters) | 0 | 78 | no glossary | 89 chapters + practice + KC | 5 | — |
| Machinery & Power Tools | substantive | 0 | 64 | no glossary | 75 chapters + practice + KC | 5 | — |
| Electrical & Energy Equipment | template-built (too shallow) | 5 | 89 | no glossary | 89 chapters + practice + KC | 5 | — |
| Textiles & Apparel Manufacturing | template-built (too shallow) | 28 | 89 | no glossary | 89 chapters + practice + KC | 5 | — |
| Building Materials & Coatings | template-built (too shallow) | 18 | 89 | no glossary | 89 chapters + practice + KC | 5 | — |
| Packaging, Labels & Industrial Materials | template-built (too shallow) | 23 | 89 | no glossary | 89 chapters + practice + KC | 5 | — |
| Freight Forwarding & Ocean Logistics | template-built (too shallow) | 29 | 89 | no glossary | 89 chapters + practice + KC | 5 | — |
| Contract Logistics & Warehousing | template-built (too shallow) | 10 | 89 | no glossary | 89 chapters + practice + KC | 5 | — |
| Express & Last-Mile Delivery | template-built (too shallow) | 2 | 89 | no glossary | 89 chapters + practice + KC | 5 | — |
| Distribution & Market Expansion Services | template-built (too shallow) | 8 | 89 | no glossary | 89 chapters + practice + KC | 5 | — |
| Livestock & Animal Feed | template-built (too shallow) | 28 | 90 | no glossary | 90 chapters + practice + KC | 5 | — |
| Agricultural Commodities & Trading | template-built (too shallow) | 29 | 90 | no glossary | 90 chapters + practice + KC | 5 | — |
| Crop Production & Agricultural Processing | template-built (too shallow) | 28 | 89 | no glossary | 90 chapters + practice + KC | 5 | — |
| Property Development & Investment | template-built (too shallow) | 9 | 87 | no glossary | 87 chapters + practice + KC | 5 | — |
| Property Advisory & Management | template-built (too shallow) | 8 | 88 | no glossary | 88 chapters + practice + KC | 5 | — |
| Property Technology & Marketplaces | template-built (too shallow) | 7 | 90 | no glossary | 90 chapters + practice + KC | 5 | — |
| Hotels & Resorts | partially revised (pilot) | 8 | 89 | no glossary | 89 chapters + practice + KC | 5 | 03D P1 generic KC seeds: 6 lessons not re-measured |
| Restaurant Chains | template-built (too shallow) | 7 | 89 | no glossary | 89 chapters + practice + KC | 5 | — |
| Healthcare Products & Nutrition | template-built (too shallow) + M3 title/text mismatch (P1) | 9 | 88 | no glossary | 89 chapters + practice + KC | 5 | AUD-11 P1 (M3 titles vs text, 12 class-C chapters) |
| Audit & Assurance | misaligned (P1) | 5 | 89 | no glossary | 89 chapters + practice + KC | 5 | AUD-11 P1 (22 class-C chapters, M3–M5) |
| Management & Technology Consulting | template-built (too shallow) | 14 | 90 | no glossary | 90 chapters + practice + KC | 5 | — |
| Project & Construction Advisory | template-built (too shallow) | 6 | 89 | no glossary | 89 chapters + practice + KC | 5 | — |

**Remaining totals:**

| Gap | Remaining |
|---|---|
| Template / too-shallow General Info | 22 curricula, 1,963 chapters |
| Chapters without flashcards | 289 |
| Chapters without Match & Sort | 2,721 (20 curricula have 0 chapter-level activities) |
| Interactive cards | 43 curricula with none; Commercial Banking 56 chapters without |
| Glossaries missing | 37 curricula |
| Glossary terms unverified | 867, in the 7 curricula with a glossary |
| Vietnamese | 3,994 eligible chapters in 43 curricula, plus their practice and Knowledge Check items; Commercial Banking 32 visuals |
| Cases missing | 212 of 220 |

None of these were filled with template or invented content in this run. Each needs source-grounded authoring.

## 6. Task log (priority order of the brief)

| Priority | Item | Result |
|---|---|---|
| Measurement | Gap register for 44 curricula plus Basic Economics, using real denominators and currency-verified sources | Done (sections 4–5) |
| a. P0/P1 | Payments & Fintech Knowledge Check gave every question the same answer key | **Fixed in source**, validated by local harness on byte-verified mirrors (section 7) |
| a. P0/P1 | AUD-01: legacy library tables `industry_articles`, `industry_briefs`, `industry_article_pointers` accept untrusted shared insert, update and delete | **Open, founder decision.** The only writer is the `casemate-industry-brief-v1` server function, so tightening to `serverHooksOnly: true` would very likely be safe. But a policy change takes effect on Live immediately, outside the Draft, and only the founder can loosen it again. Not applied under "Draft only" |
| a. P0/P1 | AUD-11: Audit & Assurance (10 lessons) and Healthcare Module 3 show another lesson's material | **Open, BLOCKED: needs authored content.** Cause: the `standardize*Lessons` builders spread 1 legacy chapter over 3 canonical titles. Re-mapping or retitling is not safe (it changes flashcard IDs or `legacyIndexes`, or misstates migration history). A per-chapter authoring spec for 35 chapters exists via the existing title-keyed `*_DETAILS` override, which keeps every ID |
| b | Missing or too-shallow General Info; broken Knowledge Checks | No missing General Info. Broken Knowledge Checks: Payments fixed. 22 shallow curricula not rewritten (needs authoring; no filler) |
| c | Practice activities | Not added: no new source-grounded activity sets fitted in this run's capacity |
| d | Essential Terms | GL-25 duplicate fixed. Essential Terms sheet, card and popover chrome localized. No new glossaries (37 missing) |
| e | Vietnamese localization (existing `uiText` and overlay infrastructure) | +20 CB visuals (38/70); +48 UI entries and 13 helpers; 6 components routed |
| f | Real-world cases | None added (212 missing; needs primary-source research) |
| Banking closure | 222/222 classic flashcards, Vietnamese UI labels, D-R1, D-R2 | Already done in Task #166960 (v1320); confirmed present, not redone. Priority visuals: Modules 5 and 4 done this run |
| Checks | Structural, mapping, duplicates, answer validation, TypeScript on touched files | Done locally (section 7). Regression suites NOT RUN; full build BLOCKED |

## 7. Checks run (this run)

| Check | Scope | Result |
|---|---|---|
| Structural / answer validation | Payments & Fintech, 27 lessons, 270 questions, built from the 5 real module files | IDs and `moduleId` identical 27/27. `validateLessonQuiz` [] 27/27. Correct text equals its chapter's insight or dimensions 270/270. Near-duplicate distractors 0. Fallback distractors 0. Answer positions unchanged (81/54/54/81). Longest-option cue 15.6% (was 100%). **PASS** |
| Number preservation and overlay | 20 new CB visuals | 393 strings, 57 number tokens, array lengths, `enTitle` keys; no held or 5.4 kinds; real `overlayVisualSpec` complete for 20/20. The checker was shown to catch 3 planted faults. **PASS** |
| English regression of localized chrome | 6 components | Original and patched render byte-identical English HTML in 26 cases; 18 test-asserted English strings unchanged; 75/75 hunks unique; no `data-testid`, id, className or logic changed. **PASS** |
| Duplicates / mapping (FMCG) | GL-25; `sourceMapping` helper; Tobacco sequence lengths; deck year rule | Local re-implementations of the assertions on the patched data: GL-25 duplicate gone; helper 2/4 → 4/4 cases; s1/s4 now 76 and 97 characters; year-rule offenders 7 → 0, card IDs identical. **PASS (local)** |
| TypeScript | Patched `paymentsFintechCore.tsx`, the 3 visual files, 7 localized files, `fmcgExpansion.ts`, `sourceMapping.test.ts` | `tsc --strict` 0 errors in the touched files (unrelated imports stubbed). **PASS (isolated)** |
| Byte integrity of writes | All 16 workspace writes | Each `contentSha256` returned by the bridge equals the locally validated file. **PASS** |
| Regression suites (`lessonFlow*`, `crossModeAccess`, `assessmentAutoAdvance*`, `glossaryEssentialTerms`, `localizationVi`, `progressSync`, flashcards `run-all`, `practiceReview/*`, `matchSort/*`, and the App-dependent `glossaryCoverage`, `assessmentCoverage`, `learningModeRouting`) | — | **NOT RUN** (see the next item) |
| Full-app build | — | **BLOCKED.** The bridge returns file content only as pages of at most 32,000 characters, delivered inline into the agent's context. Binary files (zip) are not readable. The Draft source for these apps is about 20 MB (`App.tsx` alone is 1.35 MB, 42 pages). A byte-exact mirror of the whole tree and its suites' graph does not fit in one run. **Needed:** (1) a bulk export of the Draft tree (all of `apps/IndustryKnowledge`, `apps/InteractiveLearning`, `lib`, `components`, `SpaceRuntimeContext.tsx`), byte-checked against bridge `contentSha256`, onto a machine with Node 22, `react@18.3.1`, `react-dom@18.3.1`, `lucide-react`, TypeScript 5, `tsx` and `jsdom@24`; (2) `tsc --noEmit` on the whole tree; (3) `tsx --tsconfig tsconfig.json --import jsdom-preload.mjs <suite>` for every suite above. The platform compile itself only runs at publish, which this task forbids |
| Browser QA | — | **NOT RUN.** No Draft Preview access in this session. Founder checklist in section 11 |

**Expected suite outcomes when run** (prediction, not evidence):
- `glossaryEssentialTerms` should now pass GL-25.
- `matchSort/sourceMapping` should pass.
- `matchSort/content` should pass its explanation-length check; the pinned-pack-order check stays red (F-03a).
- flashcards `decks` stays red on F-02a and F-02b; the year rule should no longer fire for Tobacco.
- Commercial Banking suites are unaffected apart from `localizationVi`, whose visuals check should count 38.

## 8. Files changed

| # | File | Change | Version after | SHA-256 (prefix) |
|---|---|---|---|---|
| 1 | `apps/IndustryKnowledge/localization/commercialBanking/cbViVisualsM04.ts` | **New**: 10 Module 4 VI visual overlays | 1795009188450557 | f6db1454 |
| 2 | `apps/IndustryKnowledge/localization/commercialBanking/cbViVisualsM05.ts` | **New**: 10 Module 5 VI visual overlays (5.1, 5.2, 5.3, 5.5; 5.4 excluded) | 1795009260412756 | 4135b612 |
| 3 | `apps/IndustryKnowledge/localization/commercialBanking/cbViVisuals.ts` | 2 imports plus the merge line | 1795009270689905 | 9e583134 |
| 4 | `apps/IndustryKnowledge/localization/commercialBanking/cbViVisualsM02.ts` | Typo "nữa" → "nửa" | 1795009271944564 | 3ed9e8b3 |
| 5 | `apps/IndustryKnowledge/paymentsFintechCore.tsx` | Chapter-grounded quiz seeds; question IDs kept | 1795011140454228 | 43a96e5b |
| 6 | `apps/IndustryKnowledge/localization/uiText.ts` | +48 VI entries, +13 helpers (append-only) | 1795011196792302 | ca9d2139 |
| 7 | `apps/InteractiveLearning/practiceReview/FlashcardDeckOverview.tsx` | Labels via `uiText` | 1795011220028641 | d0cd540e |
| 8 | `apps/InteractiveLearning/practiceReview/PracticeJourney.tsx` | Labels via `uiText` | 1795011228762104 | 564b9991 |
| 9 | `apps/InteractiveLearning/practiceReview/flashcardsMode.tsx` | aria-label via `uiText` | 1795011237703041 | e5d6a7ae |
| 10 | `apps/IndustryKnowledge/glossary/TermSheet.tsx` | Labels via `uiText` | 1795011257580101 | 97ef7cd0 |
| 11 | `apps/IndustryKnowledge/glossary/TermCard.tsx` | Labels via `uiText` (glossary's own language toggle unchanged) | 1795011266570653 | eb1b3bf4 |
| 12 | `apps/IndustryKnowledge/glossary/TermPopover.tsx` | Labels via `uiText` | 1795011273338760 | e28e5fdf |
| 13 | `apps/IndustryKnowledge/glossary/data/householdGlossaryM1.ts` | `hh.compliance-cost` English definition made household-specific (from M1 L4 ch4); id and status unchanged | 1795011278288984 | 42230755 |
| 14 | `apps/IndustryKnowledge/fmcgTobaccoM2.ts` | 2 sequence-step explanations lengthened from the chapter's own text; step ids unchanged | 1795011283578093 | 4231ff23 |
| 15 | `apps/InteractiveLearning/flashcards/decks/fmcgExpansion.ts` | Explanation falls back to a figure-free field (`FX_FIGURE_PATTERN`); card IDs unchanged | 1795011291466453 | f4e99cf1 |
| 16 | `apps/InteractiveLearning/matchSort/__tests__/sourceMapping.test.ts` | Test helper resolves FMCG source registries; no assertion removed | 1795011306399087 | 5fe9e9c2 |
| 17 | `reports/domain-knowledge-full-catalog-completion-2026-11-22.md` | This report | — | — |

**Not touched:**
- `App.tsx` and `Desktop.tsx`;
- any Knowledge Check data or scoring other than the Payments generator;
- chapter-access code, schedulers and persistence;
- progress endpoints and server functions;
- database tables and policies;
- Hotels Knowledge Check versions;
- lesson 5.4.

No ID, historical score, rating or progress key changed.

## 9. Defects

| ID | Sev | Area | Status | Evidence / next step |
|---|---|---|---|---|
| AUD-01 | **P0** | Legacy library tables accept untrusted shared writes | **Open (founder decision)** | `industry_articles` (17 rows), `industry_briefs` (36), `industry_article_pointers` (0): `allowSharedWrites: true`, `requireVerifiedOwner: false`, untrusted insert/update/delete. The only writer is server function `casemate-industry-brief-v1`. Recommended: ask Otto to set `writePolicy {serverHooksOnly: true}` on those three tables. This applies to Live immediately. `domain_knowledge_cards` (verified-owner shared inserts) needs a separate decision |
| PF-KC-01 | P1 | Payments & Fintech Knowledge Check, one answer for 270 questions | **Fixed in source (this run)** | Section 7. Unverified by suite or browser. Learner-visible effect: question wording and options change; IDs, chapter links and stored scores do not. An unsubmitted attempt in progress would show new options for its saved selections |
| AUD-11a | P1 | Audit & Assurance lessons 3.2, 3.3, 3.5, 3.6, 4.2, 4.4, 5.1, 5.2, 5.3, 5.4 show other material (22 class-C chapters in M3–M5); 178/186 key terms use a placeholder definition | **Open, BLOCKED** | Needs authored chapter text through `AUDIT_DETAILS`, plus an optional `sources?` field so new text cites correctly |
| AUD-11b | P1 | Healthcare Products Module 3 titles do not match text (12 class-C chapters) | **Open, BLOCKED** | Same mechanism and remedy as AUD-11a |
| AUD-09 | P1 | Lesson progress key not per learner | **Held by rule** | Fix is Sprint 03G, which must stay inactive |
| AUD-06 | P1 | Four ID systems; 14 study sub-categories unrouted | Open | Not touched (catalogue files unchanged since 30 Sep) |
| AUD-03 | P1 | "Verification Required — Do Not Publish" marker text in 18 holds | Open, not re-verified | Needs a browser check of held placeholders |
| 03D-H | P1 | Hotels generic Knowledge Check seeds in 6 lessons not covered by v2–v6 | **Held by rule** | No new Hotels question-ID migrations |
| F-01 | P2 | GL-25 duplicate glossary definition | Fixed in source | — |
| F-02c | P2 | Years in Tobacco flashcard explanations | Fixed in source (builder) | `FX_FIGURE_PATTERN` misses a bare "%" or "million" after a number; no current text has these |
| F-03b | P2 | Tobacco sequence explanations < 30 characters | Fixed in source | — |
| F-03c | P2 | `sourceMapping` helper routed FMCG to Consumer Finance sources | Fixed (test harness) | — |
| F-02a | P2 | FMCG generated decks have 15 cards, outside the size rule | **Decision needed** | Either allow `[4, 15]` for generated decks (product sign-off), or cap at 14 (loses 81 card IDs) |
| F-02b | P2 | `beauty-m2l4c1-cost-to-serve` repeats a Beauty M1 prompt | **Decision needed** | Keeping IDs needs lesson-qualified prompts plus rewording ≥21 definitions that would then clash; the alternative deletes card IDs |
| F-03a | P2 | Pinned Match & Sort order lacks 15 FMCG packs | **Decision needed** | Generate the pack list from the build, review it, then append to `expansionPins.ts` |
| PF-GI | P2 | Payments General Info: 61/90 chapters reuse a shared insight; keyTerms fall back to "A core Payments and Fintech concept related to …" | Open (content) | Part of the shallow-GI gap; the Knowledge Check now mirrors exactly what the reader shows |
| PF-GL | P2 | Payments chapter maps reference `fin.liquidity` and `fin.embedded-finance`, which are not in its shared-term list | Open, unverified | Check the lookup fallback in `glossaryIndex.ts` |
| D-R1, D-R2, D-02, D-03 | P2 | Banking flashcards and chrome | Fixed in source by #166960 | Unverified by suite |
| D-05 | P2 | Enlarge viewer empty for non-banking visuals | Open | Not re-checked |
| DK-QA-025 | P2 | Dairy: 31 chapter titles do not describe their content | Open | — |

## 10. Held content (unchanged)

- **Commercial Banking lesson 5.4:** legal review hold REV-P0-12 (3 chapters). Not translated, unlocked or edited; its visuals are excluded.
- **25 held chapters across the catalogue:**
  - Hotels M5 L4 ch1; Restaurants M5 L4 ch1;
  - RE Development M1 L4 ch5, M2 L2 ch2, M5 L4 ch1;
  - RE Advisory M1 L5 ch3, M5 L4 ch1;
  - M5 L4 ch1 in each of Construction Advisory, Distribution, Freight, Electrical, Packaging, Textiles, Building, Contract and Express;
  - Healthcare M2 L2 ch3; Audit M2 L6 ch3; Pharmacy M5 L2 ch1;
  - CB 5.4 (3 chapters); Packaged Food M5 L4 (3 chapters).
- **Held visual kinds:** CB Module 2 (4), Module 4 (4), Module 5 (1).
- **Not activated or re-enabled:** Sprint 03G (`casemate-dk-progress-sync-v1` stays disabled) and the retired 03H endpoint `casemate-domain-progress-v1` (disabled).

## 11. Go / no-go

| Release | Verdict | Basis and conditions |
|---|---|---|
| **Release B, 22 Nov** (Commercial Banking learning journey) | **CONDITIONAL GO** | No P0/P1 in banking scope. This run changed no banking logic: visuals, labels and Payments only. Conditions: (1) run the suites in section 7, and confirm D-R1/D-R2 and the 4 FMCG closures; (2) founder browser checklist A–F below, desktop and 375 px; (3) decide AUD-01 (it affects the wider Domain Knowledge app, not the banking journey) |
| **Release C, 29 Nov** (Commercial Banking Vietnamese) | **CONDITIONAL** | General Info 87/87 eligible; flashcards 222/222; interactive 62/62; Match & Sort 62/62; Knowledge Checks 260/260; cases 7/7; visuals 38/70; Vietnamese chrome now covers deck overview, Practice Journey and Essential Terms. Conditions: `localizationVi` run; native Vietnamese review (outstanding, not claimed); decide whether 32 English visuals are acceptable; 5.4 stays held |
| **Full catalogue "complete"** (44 curricula) | **NO-GO** | 0 COMPLETE-VERIFIED, 42 PARTIAL-CONTENT GAP, 2 BLOCKED. Remaining counts are in section 5. The current Draft is not regressed: every curriculum stays navigable and assessed |

**Founder checklist** (Draft Preview, test account; tick only what you see):

| # | Check |
|---|---|
| A | **Payments & Fintech** › Module 2 › Lesson 1 › Knowledge Check. Each question names its chapter. Options differ between chapters. Submitting gives a score, and the next chapter opens. Your earlier Payments scores are still shown |
| B | **Commercial Banking in VI** › Module 4 (4.1, 4.2, 4.4, 4.5) and Module 5 (5.1, 5.2, 5.3, 5.5) visuals are Vietnamese, with figures identical to EN. 4.3 and 5.2's open-ecosystem visual stay English (held). Lesson 5.4 is still under review |
| C | **VI chrome:** Practice & Review › Flashcards overview (scope buttons, tiles, "Study available cards"), Practice Journey, and Essential Terms sheet, card and popover labels are Vietnamese. Switching back to EN shows the same English as before |
| D | **FMCG Tobacco** › Module 2 › Midstream › manufacturing sequence: step hints read in full. **Household:** the glossary "Compliance cost" definition mentions approvals, labels and packaging |
| E | **Commercial Banking EN regression:** Essential Terms › General Info › Knowledge Check auto-advance › Flashcards (Study Remaining Cards) › Continue Learning, all behave as before |
| F | 375 px: repeat A and C |

## 12. Smallest next actions

1. **Founder:** decide AUD-01 (tighten the 3 library tables to server-function-only writes via Otto) and F-02a, F-02b and F-03a.
2. Provide a full-tree build and test environment (section 7), then run the suites. This is the gate for every IMPLEMENTED-QA PENDING status.
3. Authoring sprints, each source-grounded with no IDs changed:
   - Audit & Assurance and Healthcare (35 chapters, spec ready);
   - the 22 shallow General Info curricula, starting with Payments, Consumer Finance and Life Insurance;
   - Match & Sort for the 20 curricula with none.
4. Vietnamese: the remaining CB visuals (Module 1 lessons 1.2–1.5, Module 3); decide whether Vietnamese extends beyond Commercial Banking (currently 0/3,994 chapters elsewhere).
5. Cases: 212 missing, needing primary-source research; start with one per module in Consumer Finance and Payments.
