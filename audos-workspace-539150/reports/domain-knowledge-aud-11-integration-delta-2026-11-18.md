# AUD-11 integration delta: Audit & Assurance and Healthcare Products Module 3

Date: 18 Nov 2026 · Mode: **Draft only, not published** · Follows `reports/domain-knowledge-aud-11-chapter-authoring-2026-11-18.md`.

**Read this first.** This session has file access only. No test, type check, build or browser could be run, no task could be started, and no other curriculum was authored. Everything marked PASS below is by reading source against source. Nothing here is COMPLETE-VERIFIED.

## 1. Headline finding

The 35 rewritten chapters broke the live flashcards that were grounded in their old text. Live decks `professionalAuditM03-M05.ts` and `healthcareProductsM03.ts` (registered in `flashcards/decks/expansion.ts`) quote chapter text verbatim, and `renderedGrounding.test.ts` checks that. After the rewrite, **17 Audit cards and 10 Healthcare cards quoted text that is no longer displayed.** The previous report said practice gating was safe because the old integrity gate withholds those cards. That gate covers a different, unregistered card system, so the statement was incomplete. It is corrected here.

## 2. Per directive item

| # | Item | Result |
|---|---|---|
| 1 | Chapters fully integrated (of 35) | **0 fully verified.** 35/35 now have General Info, key terms, sources and visuals authored, and at least one live flashcard whose excerpt I matched by eye to the new displayed text. Match & Sort, Knowledge Check and progress are covered in rows 4-6. Browser and test verification NOT RUN. |
| 2 | Flashcards reviewed and corrected | Reviewed every card in Audit M3-M5 and Healthcare M3 decks against the 35 chapters. **27 stale cards retired** (Audit 17, Healthcare 10) and **68 new cards added** (Audit 42, Healthcare 26) with new IDs, each excerpt copied from the new chapter text. Per the flashcards README, a card whose meaning changes gets a new ID, and the retired IDs are added to `RETIRED_CARD_IDS` so their review history is left untouched and never reused. Cards on unchanged chapters were not edited. |
| 3 | Preserve card IDs and history | Done by policy: no stale ID was reused, no ID deleted from storage, pins updated in `expansionPinsProfessionalAudit.ts`, `expansionPinsHealthcareProducts.ts` and `expansionPins.ts`. A learner mid-way through a retired card keeps its stored history, but that card is no longer offered. |
| 4 | Match & Sort aligned | Audit and Healthcare have **no authored live Match & Sort packs**; the live registry holds Commercial Banking, Consumer Finance and FMCG only. These lessons use runtime-generated activities built from displayed chapter text, so they follow the new text automatically. The generated output was not inspected (cannot run). The 11 unregistered activities in `expansionWave2` are all excluded and not served to learners. Only one of them, `pa-m5-l2-match-limits-of-digital-tools`, cites a rewritten chapter (5.2 ch06), and it describes the old text. |
| 5 | Knowledge Check conflicts | **Found, not changed.** See section 3. Fixing them changes what a question asks, so it is classified **requires assessment migration review**. |
| 6 | Progress compatibility | No progress, gating, persistence, ID or score code was touched. Flashcard IDs were retired by the repo's own policy, not deleted. Existing completion crediting by chapter position is unchanged by construction. **Not verified by a progress or gating regression run (NOT RUN).** |
| 7 | Remaining legacy overrides | I count **19** pre-existing title-keyed overrides in the two cores (Audit 10, Healthcare 9), not 34. The 34 may include other curricula, which I did not inspect. All 19 still inherit the legacy item's sources. The six 3.4 revenue, cost and KPI overrides (Audit 3.4 ch10-12, Healthcare 3.4 ch10-12) cite technology or channel sources that do not support their text. I did not change them: the arithmetic is hypothetical and no cited source clearly supports it, so choosing sources needs a reviewer. Content of the 19 was not replaced. |
| 8 | Tests executed | **None.** Suites that should be run first: `flashcards/__tests__/decks.test.ts`, `practiceReview/__tests__/renderedGrounding.test.ts`, `expansionWave2/__tests__/chapterIntegrity.test.ts`, `professionalAudit.test.ts`, `flashcards/__tests__/run-all.test.ts`. |
| 9 | Full-app build | **NOT RUN** (same blocker as the 22 Nov report: no full-tree environment). |
| 10 | Browser QA | **NOT RUN.** |
| 11 | Source and content review gaps | Sources are cited by id and the text follows each source note, but no source document was opened and compared. Statements that most need a subject-matter reader: Audit 3.3 ch08 (additional requirements for public-interest entities), 4.2 ch04 (IESBA Code can extend independence to network firms; ISQM 1 network requirements), 5.3 ch08 (ISA 220 and ISA 600 partner responsibility), 3.2 ch05 (review gives limited assurance; ISRS 4400 scope), Healthcare 3.2 ch04-05 (Codex scope, special dietary use), 3.6 ch17 (WHO traceability). Healthcare cards must not be read as clinical or legal advice. |
| 12 | Files modified | Section 5. |
| 13 | Task IDs created and run | **None run.** This bridge cannot start tasks. One draft follow-up was created for the source review (section 6). No task is claimed to be running. |
| 14 | Blockers and founder decisions | Section 7. |

## 3. Knowledge Check conflicts (not changed)

Knowledge Check questions for these lessons are generated from the `topics` lists in `auditAssuranceModule03-05.tsx` and `healthcareProductsModule03.tsx`, and chapters are linked by position. Stems read "What is central to <topic>?". After the rewrite these topics no longer match their chapters:

| Lesson | Topics still in the stems | Status |
|---|---|---|
| Audit 3.2 | fee and pricing models, scope and budget, utilization and realization, rework and specialist cost, portfolio economics | all stale |
| Audit 3.3 | team leverage, competence and supervision, seasonality and specialists, training and retention, capacity planning | all stale |
| Audit 3.5 | industry specialization, client segmentation, concentration and conflicts, geographic coverage, portfolio review | all stale |
| Audit 3.6 | independence threats, non-assurance services, fees and relationships, ethics and conflicts, decline or withdrawal | partly stale (ch16, ch18 changed; ch17 unchanged) |
| Audit 4.2 | quality systems, technical reputation, inspection remediation, professional integrity, stakeholder trust | all stale |
| Audit 4.4 | Vietnam firm categories, local and group reporting, talent competition, digital delivery, regulatory readiness | all stale |
| Audit 5.1, 5.2, 5.3 | skills and talent, AI and analytics, group audit coordination topics | partly stale (only the changed chapters) |
| Healthcare 3.1, 3.2, 3.3, 3.6 | brand and developer models, manufacturing models, import and distribution roles, technical and regulatory barriers | stale |

**Second finding, a P1 candidate.** For every lesson except Audit 3.4 and 2.3 (which have specific seeds), `quiz()` builds all questions with the same correct answer and the same three distractors. That is the pattern fixed in Payments & Fintech (PF-KC-01), and a learner can pass by recognising one sentence. I read this in the two cores only; other curricula using the same builder were not inspected. Fixing it changes correct answers and so needs an **assessment migration review**. Question IDs are positional (`<prefix>-<n>a|b`) and would not change.

## 4. Practice gate and holds

- `chapterIntegrity.ts` classes (22 Audit chapters still class C) and `source.ts` alignment flags are **not changed**. They govern only the unregistered `expansionWave2` system and fail closed. Reclassifying needs a card-by-card review that has not been done.
- **Test discrepancy, not caused by me and not weakened:** the last check in `chapterIntegrity.test.ts` asserts no `professional-audit` deck is in the live flashcard registry. The 13 Nov decks now are, so that check should fail on a real run. It needs an owner decision on whether the test or the registry reflects intent.
- Holds REV-P0-10 (Audit 2.6 ch3) and REV-P0-09 (Healthcare 2.2 ch3) were not touched. Neither is in Module 3-5, and no held text was reused.

## 5. Files modified (this continuation)

- `apps/InteractiveLearning/flashcards/decks/professionalAuditM03.ts`
- `apps/InteractiveLearning/flashcards/decks/professionalAuditM04.ts`
- `apps/InteractiveLearning/flashcards/decks/professionalAuditM05.ts`
- `apps/InteractiveLearning/flashcards/decks/healthcareProductsM03.ts`
- `apps/InteractiveLearning/flashcards/__tests__/expansionPinsProfessionalAudit.ts`
- `apps/InteractiveLearning/flashcards/__tests__/expansionPinsHealthcareProducts.ts`
- `apps/InteractiveLearning/flashcards/__tests__/expansionPins.ts`
- `reports/domain-knowledge-aud-11-integration-delta-2026-11-18.md` (this file)

Earlier in this task: the two cores, four visual spec files and the authoring report (see that report).

## 6. Task orchestration

No task was started or claimed to be running: this bridge exposes no start control, only drafts that the founder reviews. Draft created: source and subject-matter review of the 35 authored chapters and the 19 legacy overrides' sources. Not created, because they need founder or assessment decisions first: Knowledge Check realignment, the generic-answer fix, and further curricula.

## 7. Security: AUD-01 re-checked (read-only)

Read directly from the table registry on 18 Nov: `industry_articles` (17 rows), `industry_briefs` (36 rows) and `industry_article_pointers` (0 rows) all still have `allowSharedWrites: true`, `requireVerifiedOwner: false`, `serverHooksOnly: false`, no declared write policy, and untrusted `insert`, `update` and `delete`. **The exposure is confirmed and still open.** Least-privilege remediation to approve: set `writePolicy.serverHooksOnly: true` on all three. The only writer found earlier is the `casemate-industry-brief-v1` server function. The pointers table is written when Mate serves an article, so confirm that writer before applying it there. It takes effect on Live immediately, so it was **not applied**. Founder approval is needed. Do not expose the app to external beta users until it is resolved or accepted.

## 8. Updated full-catalog counts (source level, nothing QA-verified)

| Status | Before | Now |
|---|---|---|
| COMPLETE-VERIFIED | 0 | 0 |
| IMPLEMENTED-QA PENDING | 0 | 0 |
| PARTIAL-CONTENT GAP | 42 | 44 |
| BLOCKED | 2 | 0 (AUD-11 fixed in source, unverified) |

Open counts for the other 42 curricula are unchanged from `domain-knowledge-full-catalog-completion-2026-11-22.md`. New P1 candidate: generic Knowledge Check answers in Audit and Healthcare (section 3).

## 9. Remaining blockers and founder decisions

1. Approve tightening the three library tables to server-function-only writes (AUD-01).
2. Approve an assessment migration review for the Knowledge Check realignment and the generic-answer defect.
3. Provide a full-tree environment with Node, TypeScript and jsdom so the suites above can run. Until then every item is NOT RUN.
4. Decide whether `chapterIntegrity.test.ts` or the live flashcard registry reflects intent (section 4).
5. Assign a subject-matter reviewer for the statements listed in item 11.
