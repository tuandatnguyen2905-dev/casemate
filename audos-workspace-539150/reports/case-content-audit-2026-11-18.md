# Case Drill and Case Pool: repeated and misplaced content audit

Date: 18 Nov 2026. Apps: Case Drill (`case-drill`) and Case Pool (`case-drill-log`).

## Status

- All fixes are saved in the Draft. **They are not published.** The Draft also holds 8 unpublished Domain Knowledge files edited today (`apps/IndustryKnowledge/paymentsFintechCore.tsx`, `fmcgTobaccoM2.ts`, `auditAssuranceCore.tsx`, `healthcareProductsCore.tsx`, `auditAssuranceM3VisualSpecs.ts`, `auditAssuranceM4VisualSpecs.ts`, `auditAssuranceM5VisualSpecs.ts`, `healthcareProductsM3VisualSpecs.ts`). Publishing releases the whole Draft and cannot leave those out, so publishing was stopped as instructed.
- Restore point before the change: snapshot 1323 (automatic, 18 Nov 15:27 UTC); a manual snapshot 1324 was also requested.

## What was audited

| Set | Current items audited | Also checked, not shown to learners |
| --- | --- | --- |
| Case Drill Question Library (static bank) | 656 | 292 archived |
| Case Drill Practice with Mate bank (`micro_drill_questions`) | 600 | 0 |
| Case Pool Case Library | 282 | 29 retired |

Per-learner rows (AI-generated Case Room cases, saved drafts, attempts) are attempt history and were not edited.

How it was checked:

1. Stored content: every question and case object in the current build was compared sentence by sentence across its learner-facing fields (case context, task, instruction, objective, constraints, hints, exhibit notes).
2. Rendered page: every library question and case (1,259 pages) was opened in a headless browser on the current build, before and after the fix, with sign-in and access mocked locally and every server write blocked (nothing was written to the database). The fix was checked by loading the exact new presentation module into a local copy of the build.
3. Rule: a sentence of 7 or more words shown twice on the pre-submission screen counts as a repeat. Interface text (for example "Every category and value") is excluded. A one-sentence root question in the issue-tree box is allowed, because the brief asks to keep a concise root question.

## Result

| Set | Items with a repeated sentence before | After |
| --- | --- | --- |
| Case Drill Question Library (656) | 362 | 33. All 33 are two different exhibits with the same title; listed for editorial input (gap ST). |
| Case Pool (282) | 119 | 1. `case-jrn-16` has two different exhibits with the same axis subtitle; the exhibits are distinct and were kept. |
| Practice with Mate bank (600) | 180 printed their data twice | 0 |

Hints revealing answers: the automated check found no hint, tip or exhibit note that states a correct option or numeric answer. 47 Structures questions showed "Use in your issue tree" notes that name the expected branches before submission; these now appear only after a tree is submitted.

## Fixes applied (display only)

Stored questions, cases, answer keys and grading inputs are unchanged. Each fix only decides where a stored sentence is shown, or hides a sentence already visible on the same screen.

| Code | Fix | Items |
| --- | --- | --- |
| C1 | Exhibit-reading sentences (what the chart shows, units, column definitions, "the exhibit is an internal planning snapshot") moved out of Case Context into a "Reading the exhibit" note beside the exhibits | 235 Drill, 73 Pool |
| C2 | "Plain-language terms" / "For reference" glossary shown as Key terms, not as case context | 65 Drill, 2 Pool |
| C3 | Skill labels ("Primary consulting skill", "… requires the candidate to …") moved out of the task into a Skill focus line | 208 Drill |
| C4 | Task guidance ("Management needs a testable decision structure, not a list of symptoms") moved from the case context to the task | 34 Drill, 34 Pool |
| C5 | Situation sentences stored inside the question ("JetParcel … faces late deliveries doubled …") moved into Case Context, so the task shows only the ask | 158 Drill, 34 Pool |
| T1 | Issue-tree and market-sizing tree boxes start from a concise root question instead of a copy of the whole prompt. Saved trees keep their stored text and display the concise root | 297 Drill |
| T2 | The generic "What is the key observation, what insight…" line is no longer shown as a second question (shown as "Answer format", or dropped where the answer form already has those four fields) | 81 Drill |
| T3 | Case Pool cases with an embedded issue-tree builder showed the title, case, exhibits and task twice (or three times); each now appears once | 117 Pool |
| T4 | A constraint that only repeated the task ("State your answer with its unit and show the calculation") removed | 50 Pool |
| E1 | An exhibit note or source line repeated under every exhibit is shown once below the exhibits, naming the exhibits it covers | 143 Drill, 3 Pool |
| H1 | "Use in your issue tree" branch hints shown only after submission | 47 Drill |
| H2 | An internal "Potential duplicate exhibit detected" warning (a false alarm on two distinct exhibits) removed from the learner view; it is logged for review instead | 2 Drill |
| P1 | Practice chart drills: the plotted values were printed as text above the chart, which already has a data table; the text copy is hidden | 80 Practice |
| P2 | Practice calculation drills: a givens box that repeated every figure of the one-line prompt is hidden | 100 Practice |

Files changed: `lib/learnerContentPresentation.ts` (new), `components/QuestionLibrary.tsx`, `components/ExpertDrillExperience.tsx`, `apps/CaseDrill/StructuresWorkspace.tsx`, `components/CasePoolLibrary.tsx`, `components/ExhibitRenderer.tsx`, `apps/CaseDrill/App.tsx`.

## Answer keys and grading (diff check)

- No content bank, answer-key or grading file was changed: `lib/skillQuestionLibrary.ts`, `lib/casePoolLibrary.ts` and every other bank file, `lib/libraryAnswerKeys.ts` (sha256 57c921cf… unchanged), `lib/caseScoringClient.ts`, `lib/caseScoringRubrics.ts`, all server functions and all WorkspaceDB tables.
- Answer keys are matched by a hash of the stored question fields; those fields are unchanged, so every synced key still matches.
- The grading calls in the changed views (`submit` in the Question Library, the expert drill, the issue-tree grader and the Case Pool grader) still send the stored context, question and exhibits; none of that code was edited. The only learner-side difference is that a new issue tree starts from a concise root node, which the learner can edit; the scoring text already excludes the root node.
- No database rows were written, deleted or changed. Domain Knowledge and other apps were not touched.

## Final report table

Where to check: the changes are in Draft Preview now and reach the Live URL only after publishing. Case Drill: Draft Preview › Case Drill › Question Library › skill tab › search the title (Live: https://app.casemateaud.com#case-drill). Case Pool: Draft Preview › Case Pool › Case Library › search the title (Live: https://app.casemateaud.com#case-drill-log/case/<id>).

| Case/question ID and title | Duplicate or misplaced content | What changed | Where to check it |
| --- | --- | --- | --- |
| E-CH-008 Textiles Regional Share Slope (Hanoi Loom) | Case Context held two exhibit-reading sentences ("The exhibit is an internal planning snapshot…", "Metro, Coastal, Highland and Delta … the exhibit gives each region's percentage share…") | Moved into "Reading the exhibit" above the chart; Case Context now states the business and the decision only. Verified on the rendered page. Editorial: see DL | Case Drill › Question Library › Charts › "Textiles Regional Share Slope" |
| case-e-ch-008 Textiles Regional Share Slope (Hanoi Loom) | Same two sentences in the situation; approach tip was a chart-reading instruction; constraint "State your answer with its unit and show the calculation" repeated the task | Reading sentences and tip moved beside the exhibit; repeated constraint removed; task shown once. Verified on the rendered page | Case Pool › Case Library › "Textiles Regional Share Slope" (#case-drill-log/case/case-e-ch-008) |
| charts-journey-717 Kaya Foods - Who Already Owns This Market | Chart-reading tip ("Read share alongside growth…") sat in the Question; "Primary consulting skill" label sat under the question; the same exhibit note and source were printed under both exhibits | Tip moved beside the exhibits; skill label moved to Skill focus; shared note and source shown once for Exhibits 1–2. Verified on the rendered page | Case Drill › Question Library › Charts › "Kaya Foods - Who Already Owns This Market" |
| structures-journey-718 Kaya Foods - Distributor, Joint Venture, or Own Operation | Full central question copied into the issue-tree root; glossary sentence opened the case brief; "Use in your issue tree" notes named the expected branches before submission | Root now "Which entry mode should Kaya choose?"; glossary shown as Key terms; branch notes appear after submission. Verified on the rendered page | Case Drill › Question Library › Structures › "Kaya Foods - Distributor…" |
| market-sizing-journey-716 Kaya Foods - How Big Is the Prize | Archived, not shown to learners | Not changed | Not visible in either app |
| structures-easy-010 JetParcel Issue Tree | Whole prompt (situation + question) copied into the tree root; Case Context said only "operates in parcel delivery" plus an instruction, while the problem sat in the question | Case Context: "JetParcel, a parcel delivery organisation, faces late deliveries doubled despite unchanged parcel volume."; task: the ask only; root: "How should JetParcel resolve late deliveries doubled despite unchanged parcel volume?"; instruction shown with the task. Verified on the rendered page | Case Drill › Question Library › Structures › "JetParcel Issue Tree" |
| case-structures-easy-010 JetParcel Issue Tree | Title twice; situation twice; task in three places (central question, tree root, Case task) | Title, situation and task each shown once inside the issue-tree view; root is the concise root. Verified on the rendered page | Case Pool › Case Library › "JetParcel Issue Tree" (#case-drill-log/case/case-structures-easy-010) |
| market-sizing-007 Ho Chi Minh City Bubble Tea Market Size | The full question with all its figures was copied into the thinking-tool tree root | Root is now "Estimate the annual bubble tea market in Ho Chi Minh City."; task shown once. Verified on the rendered page. Editorial: no business situation (NS) | Case Drill › Question Library › Market Sizing › "Ho Chi Minh City Bubble Tea Market Size" |
| case-099 Restructuring the staffing model - Deloitte Việt Nam | Title twice; situation twice; Exhibits 1 and 2 twice; key question three times; two exhibit-reading sentences in the situation | Each shown once inside the issue-tree view; "Billable hours (%) is…" and "Costs and revenue are in billion VND/year" moved beside the exhibits. Verified on the rendered page. Editorial: Exhibit 2 repeats Exhibit 1 figures (DE) | Case Pool › Case Library › "Restructuring the staffing model - Deloitte Việt Nam" (#case-drill-log/case/case-099) |
| All Structures questions (182) | Prompt copied into the tree root; meta or glossary text used as the brief (legacy items); task guidance in the brief (34 Easy) | T1, C2, C3, C4, C5, H1 | Case Drill › Question Library › Structures |
| 117 Case Pool cases with an issue-tree builder | Title, situation, exhibits and task repeated below the builder | T3 | Case Pool › Case Library (Structures cases) |
| 81 restored Hard questions (all five skills) | Generic "What is the key observation…" line read as a second question | T2 | Case Drill › Question Library, Hard filter |
| 143 multi-exhibit questions, 3 Case Pool journeys | Same exhibit note or source printed under every exhibit | E1 | Any multi-exhibit question |
| Practice with Mate: 80 chart drills, 100 calculation drills | Data printed twice (text and chart; givens and prompt) | P1, P2 | Case Drill practice reps opened from My Roadmap |

The full per-item list (1,538 current items with before/after repeat counts, fix codes and editorial codes) is in `reports/case-content-audit-2026-11-18-items.csv`.

## Cases needing editorial input

Nothing was invented to fill these gaps. Per-item detail is in `reports/case-content-audit-2026-11-18-editorial.csv` (433 rows).

| Gap | Items | Specific missing fact |
| --- | --- | --- |
| NS: no business situation | 180 Case Drill (100 legacy Charts `charts-0xx`, 67 standalone Market Sizing including HCM Bubble Tea `market-sizing-007`, 13 Calculations) | Who the client is, the problem, and the decision the answer should inform. These items only stored exhibit-reading notes or a bare estimation task |
| ND: no decision or problem | 39 Case Drill, 25 Case Pool (mostly Market Sizing bank and short Calculations items) | The decision or problem the learner's answer should inform |
| DL: decision not linked to the exhibit | 51 Charts Easy (`E-CH-001`–`E-CH-051`, including Hanoi Loom `E-CH-008`) and their 51 Case Pool copies | How the plotted metric bears on the stated decision. Hanoi Loom: how regional share bears on "which export order mix protects gross profit" (for example which regions take which export orders, or margin by region) |
| DE: exhibit only repeats another exhibit's figures | 54 Case Pool, including Deloitte `case-099` (Exhibit 2 "Staff cost by function" repeats Exhibit 1's cost column) | A distinct data series for the second exhibit, or approval to remove it. Answers may cite it by number, so it was not removed |
| ST: different exhibits share one title | 33 legacy Structures items (`structures-003` … `structures-099`, "… - complementary evidence") | A distinguishing title for each exhibit |
