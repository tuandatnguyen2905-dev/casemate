# Case Arena AI scoring: audit and fix

Date: 2026-11-04
Status: saved as Draft Preview; not published. The backend (server function `casemate-case-mastery-v4`) and the new database columns are live in the workspace right away because they are not part of the draft/publish cycle. The Case Arena app changes are draft only.

## What was wrong

The AI judge has never run on a real round. Evidence from the live data:

- `cm_scores` is empty. No Case Arena session has ever had `judging_complete = true`.
- `cm_arena_token_trace` has zero `kind='ai'` rows. The audit log has zero `ai_judging_completed` and zero `ai_judging_failed` events.
- The one real round ("First Called Team", 26 Oct) reached `complete` at 14:18:03 UTC. The last peer-review request (`submit_peer_reviews`) then returned HTTP 500 after about one second. The error happened before any AI call was made, and the `peer_review_submitted` audit row was never written.

Five separate defects, all fixed:

1. **Scoring ran on only one path.** Automatic scoring was triggered only when the last peer review was submitted normally. It never ran when the leader pressed "Finish peer review now", when a stage timer expired, or when the leader advanced from Feedback to Results.
2. **One failure blocked everything.** The completion cleanup (clearing seats, marking called teams finished) ran in the same request just before scoring. If it threw, the request returned 500 and scoring never started. The cleanup is now isolated and logged separately, so it can no longer stop scoring.
3. **No retry for participants.** Only an admin could re-run scoring. Participants saw a static "Pending AI judging" card forever.
4. **The screen stopped refreshing.** The live-round polling deliberately stops at `complete`. A teammate who landed on Results before the AI finished never saw the result appear unless they pressed Refresh.
5. **Scoring was brittle.** It threw if any peer ranking was missing, so a partly finished peer review could never be scored, and it scored the team on a compressed brief with no fixed criteria.

I could not reproduce the exact exception behind the 26 Oct 500. The post-completion database writes and the AI call both succeed when run on their own against that session. The fix therefore removes the dependency instead of guessing at the cause.

## What now happens

**Scoring always runs and heals itself.** Scoring starts on every route into Feedback or Complete. If it did not run or failed, the Feedback and Results screens call a new `ensure_results` action on load and every 5 to 15 seconds, then show the result as soon as it exists. Only one request scores at a time (a compare-and-set claim on new `cm_sessions` columns, with a 3 minute stale-lock timeout). After 3 failed attempts participants see the reason and a Try again button, and the admin can force a re-run.

**Fixed criteria, scored 0 to 10 each, weighted on the server:**

| Part | Criterion | Weight |
|---|---|---|
| Team case | Problem structuring and issue tree | 12 |
| | Market and buyer diagnosis | 18 |
| | Concept choice and justification | 18 |
| | Commercial and financial logic | 20 |
| | Go-to-market and supply-chain plan | 14 |
| | Assumptions and validation tests | 10 |
| | Final recommendation | 8 |
| Rebuttal (per member) | Answers the challenge directly | 30 |
| | Uses case evidence and numbers | 30 |
| | Handles trade-offs and counter-arguments | 25 |
| | Function-specific insight and clarity | 15 |

The AI returns a score, a short evidence quote and one or two sentences of feedback per criterion. The server computes the totals, so the AI never invents a total. The AI also sees the admin-only judge reference (calculation checks, valid issue trees, defensible alternatives, rebuttal judge notes). Scores are validated, and the AI call is retried once if the reply is invalid or cut off.

**Individual marks come from rebuttal answers and teammate rankings, not from the AI:**

- Rebuttal score: weighted from that member's own rebuttal criteria. If only the Team Leader answered, teammates inherit the leader's score (as before). A member who answered nothing scores 0.
- Peer score (computed by the server from the private rankings): each ranking is converted to points, 100 for rank 1 down to 40 for last place among the teammates that reviewer ranked. Dimensions are weighted analysis 40, communication 30, collaboration 30, and averaged over all reviewers. Reviewers never see this, and notes are never quoted back.
- Individual mark = (rebuttal x 20 + peer x 10) / 30, which equals the existing 70/20/10 weights. Final score = 70% team case + 30% individual mark.
- In a team of two, each reviewer ranks one teammate, so the ranking carries no signal. Peer is then excluded and the weights become 70/30 (the same rule as before for rounds with no peer review). Weights are read from the session's `scoring_weights` when present.

Participants now see their individual mark, the seven case criteria with evidence and feedback, their rebuttal criteria, and how teammates ranked them. Admin sees scoring status and a per-member table, and the re-run button forces a fresh run.

## Test results

- Logic tests in a sandbox (mock database and AI): 3-person team with leader-inherited rebuttal, 2-person team (peer excluded, 70/30), missing submission, wrong stage, concurrent claim blocked, bad JSON retried once, truncated reply fails cleanly and marks the session failed, idempotent second call.
- Live dry run of the exact deployed scoring code against the real "First Called Team" data with the real AI model (no scores written): 29 seconds end to end, valid JSON, every criterion scored with evidence and feedback. The submitted text was keyboard gibberish and every criterion correctly scored 0 with useful improvement advice.
- Backend compiles; the stored source was read back and matched byte for byte.

Not tested: I cannot sign in as a participant or admin from this environment, so the new `ensure_results` call, the participant Results screen and the admin panel have not been exercised live. Because that session still has `judging_complete = false`, the first participant or admin to open its Results screen will trigger real scoring. The stuck "First Called Team" round has not been re-scored by me.

## Files and resources changed

- Server function `casemate-case-mastery-v4`: new scoring engine, `ensure_results` action, resilient `afterStageTransition`, richer score payload and session status.
- WorkspaceDB `cm_sessions`: additive columns `scoring_attempt`, `scoring_state`, `scoring_started_at`, `scoring_error`.
- `apps/CaseMastery/App.tsx`: live AI-judging status, criteria and individual-mark panels, admin scoring panel.
- Temporary diagnostic function `case-arena-ai-diag-20261104` (disabled, kept for audit).
- Not changed: `agent/customer-prompt.md`, the Desktop shell, Settings and EmailGate.

## Open items for the founder

- The legacy scoring function is left in place under the name `generateResultsLegacy` and is unused. It can be removed later.
- `admin_complete_judging` (manual Claude-shaped scores) is untouched and still overwrites scores in its old format. New participant panels need the new criteria fields, so prefer "Run / re-run AI scoring".
- The Admin allowlist still holds one email (`ADMIN_EMAILS`).
