# Pawvia Case Arena Marking Standard v1.0: integration report

Date: 2026-11-05
Source: `Pawvia_Case_Arena_Marking_Standard_3p.pdf` (3 pages, sections 01-24). Rubric version stored with every score: `pawvia-marking-standard-v1.0`. Rebuttal question bindings version: `pawvia-rebuttal-bindings-v1`.
Status: the scoring backend is live in the workspace now. The Case Arena app changes are saved as Draft Preview only; nothing was published.

## What is now the marking standard

**Team score T (0-100, same for every member), 17 criteria in 5 groups, points allocated criterion by criterion:**

| Group | Max | Criteria (max points) |
|---|---|---|
| Diagnosis | 20 | reach/trips/kg/price decomposition 8, volume-vs-value share 6, margin bridge 6 |
| Buyer and concept | 20 | segment opportunity and right to win 8, A-vs-B evidence 7, cannibalization and gaps 5 |
| Go-to-market | 20 | product, pack-price and channel design 8, demand plan 5, supply and quality 5, phases and timing 2 |
| Financial case | 25 | incremental logic 8, break-even 7, cannibalization and launch spend 5, scenarios and validation 5 |
| Board decision | 15 | choice and alternatives 6, pilot gates 5, risks and contingency 4 |

**Rebuttal I:** each member answers two function-specific questions. Each answer is scored on four criteria (addresses objection 20, case reasoning 35, assumptions and uncertainty 20, trade-off and next step 25). I is the mean of the two answers. A blank answer scores 0 and the other answer is kept. Grading uses the member's own response only (the old rule that teammates inherit the leader's rebuttal score is gone).

**Peer P:** conversion 1/2/3/4/5 = 0/40/70/85/100, weighted contribution 35, collaboration 25, reliability 20, constructive integration 20, averaged over valid independent raters. Automatic peer scoring needs at least three valid raters per member. If the form only collected rankings, the rank-only provisional rule applies (positions 1-4 = 90/80/70/60, labelled provisional). If any member has fewer than three valid raters, or there were no peer reviews, the whole team uses the 70/30 fallback and the reason is recorded. A zero is never substituted.

**Final:** Final = 0.70 T + 0.20 I + 0.10 P (fallback 0.70 T + 0.30 I). Only the displayed final is rounded; exact values are stored. Worked examples from the standard (81.9 and 81.4) reproduce exactly.

**Feedback and benchmarks:** the team gets T, five group scores, exhibit-cited evidence for each criterion, one strength, one material gap, the business implication, the next validation step and a suggested board answer that explains why an option is defensible (it never decrees one segment or concept). Each rebuttal answer gets four criterion scores, the evidence used, the strongest step, one omission, one improvement, the test that would change the decision and a suggested answer. Peer feedback never shows raters or their notes.

**Evidence and judging rules:** the judge always receives the exhibit facts E1-E7, the evidence-discipline rules, the financial benchmark and the performance anchors from the standard, plus the admin-only judge reference. Rebuttal questions are bound to their text, function, permitted exhibits and expected reasoning (28 live questions, per section 15 of the standard); expected reasoning is a guide, not an answer key.

**Fairness flags (for human review, never automatic punishment):** reciprocal near-maximum ratings, extreme outliers (40+ points from other raters), identical ballots, peer-quorum fallback and rank-only provisional. Retaliatory-comment checks are not automated.

**Machine-readable record (section 22):** every score stores case, team, rubric version, criterion scores, T, each member's question IDs, criterion scores and I, reviewer count, peer method, P, formula, exact and displayed final, flags and an empty human-override history. Re-running the same inputs gives the same arithmetic (tested).

## Peer review form change

The private peer review now also collects four 1-5 behavior ratings per teammate with a required behavior example for any 1 or 5, next to the existing ranks. The backend accepts forms with or without the behavior ratings, so the live site keeps working until the new form is published.

## Tests

- 10 sandbox scenarios with a mock judge: behavior ratings, rank-only, 3-person team fallback, no peer reviews, blank answer, missing ballots, mixed forms, collusion and outlier flags, recompute determinism, and identical team score for all members. All behaved as the standard specifies.
- Live check of the new judge prompts and JSON schema on the real model: all criteria returned within their maximums, and an unsupported 'raise price to 85.3 with no volume loss' answer scored low with the right omission, while a blank answer scored 0 and still got a suggested answer.
- Not run live: a full end-to-end round through the app (it needs signed-in participants), and the 15 release-check cases of section 23 that need real people, such as collusion with real ballots.

## Decisions and limits

- The standard assumes five-person teams. With fewer than four members the peer component cannot reach three raters, so those teams always use 70/30.
- Human Resources and Other questions have no role-specific guidance in the standard; they are scored on substance, as section 11 allows.
- The behavior weights, rating conversion, rank-only rule and quorum are marked in the standard as proposed policy choices that need calibration against real rounds.
- The legacy scoring engine remains commented out in the backend for reference.
