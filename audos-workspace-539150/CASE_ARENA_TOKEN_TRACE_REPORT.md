# Case Arena token trace — instrumentation report

Date: 2026-10-13

## Outcome

Instrumentation is installed without changing Arena stages, UI, copy, timers, buttons, scoring, or seeded sessions. The persistent ledger is `cm_arena_token_trace` with: `id`, `session_code`, `ts`, `source`, `action`, `kind`, `chars`, `est_tokens`, `reported_tokens`, and `note`.

The trace is enabled by `ARENA_TOKEN_TRACE = true` in both the Case Arena app and `casemate-case-mastery-v4`. Set both constants to `false` to stop client trace requests, console trace output, and server trace inserts. Every added instrumentation line carries a `// TRACE` marker.

No fresh three-person run has happened yet, so the table correctly has zero rows. The first FINAL05 run is the measurement run.

## Static findings: lobby → Start → case visible

### Calls made by the Case Arena screen

1. **Initial app mount → `bootstrap`** — `CaseMasteryApp`'s refresh effect calls the Case Arena server function. It returns the public sessions plus the active participant bundle. Once Solve is open, that active bundle includes the full frozen candidate case.
2. **Unassigned lobby refresh → `bootstrap` every 5 seconds** — while a lobby exists and the viewer has no active registration, the lobby refresh effect repeats bootstrap.
3. **Active session polling → `poll` every 4 seconds per member/tab** — once a participant has an active session, the active-poll effect requests the participant bundle repeatedly. In Solve, each response includes the full candidate case payload.
4. **Leader clicks Start → `start_competition`** — database-only transition. Its response is small transition metadata; it does not include the case and does not call a model.
5. **Immediately after Start → direct `poll`** — `run()` hydrates the exact session ID before changing views. This response includes the case.
6. **Immediately after that → `refresh(true)` → `bootstrap`** — `run()` always refreshes after an action. This can return the case a second time immediately after the direct poll. If discovery disagrees with the remembered session, refresh can also issue a fallback direct `poll`.
7. **Ongoing active poll** — the 4-second timer can return the full case again. The client trace window closes when React has rendered the case; the server still records every `case_fetch`, so repeated case payloads remain measurable.

This means the transition can transfer the full Pawvia case multiple times without consuming model tokens. The fresh trace will show the exact response character counts and request multiplicity for each of the three members.

### Server call sites that can consume AI/tool tokens or platform usage

- **`generateResults()` → `platform.generateText`** — the only outbound model call in `casemate-case-mastery-v4`. Model: `gpt-5.6-terra`; JSON mode; maximum 6,000 output tokens. It sends a fixed judge system prompt plus a compressed envelope containing final team submission sections, each present member's two rebuttal Q&As, and private ordinal peer reviews. It is triggered only when the round reaches `complete` after all required peer reviews (or after a solo rebuttal path), or by explicit `generate_results` retry. It is not triggered by join, Start, bootstrap, poll, or case fetch.
- **`sendEmail()` → `platform.sendEmail`** — platform tool call, not an LLM call. It runs for the final submission receipt and once per participant during admin team formation. Only payload sizes are logged; recipient/content are not logged.
- **`admin_complete_judging`** — no outbound Claude/Anthropic call exists here. It validates and stores a caller-supplied Claude-shaped result payload. Historical metadata names Claude, but this handler itself consumes no model tokens.
- No OpenAI/Anthropic HTTP fetch, agent call, MCP/customer tool call, web search, or other outbound token-consuming call exists in this server function.

### Agent/chat layer check

Case Arena receives only `useSpaceRuntime()` and does not register app state or case text with AgentChat. In the app-first desktop shell, the Case Arena app and Mate support are mutually exclusive branches: AgentChat is shown only when the user explicitly opens Mate support. No case/app-state prop is passed to AgentChat. At case render, the trace therefore records `kind=agent`, `attached=false`, `chars=0`. If the platform usage meter still rises while all in-app AI rows remain absent, that is evidence for metering outside this workspace's explicit Arena call sites.

## What is instrumented

### Client: `apps/CaseMastery/App.tsx`

- Every Case Arena network response in the full-lobby → case-rendered window: action, endpoint, request count, request characters, response characters, HTTP status, stage, member function, and per-member/tab poll count.
- Trace-window open and case-rendered boundaries.
- Fetch-triggering effect reruns for the same session/stage.
- Explicit agent-context check at case render.
- Console output uses the `[ARENA_TOKEN_TRACE]` prefix; the same sanitized measurements are persisted through `trace_client`.

### Server: `casemate-case-mastery-v4`

- Every action entry and every response: action, resolved session/team code when available, caller role, timestamp, request characters, response characters, and estimated tokens (`ceil(chars / 4)`). This covers join/register, Start/`competition_started`, bootstrap, poll/session state, case fetch, submission, rebuttal, peer review, result generation, and all admin actions.
- Every case payload read in `participantBundle()` as a separate `case_fetch` row, including snapshot versus fallback source.
- `platform.generateText`: source function, triggering action/reason, system and user-input character counts, model, provider usage when returned, per-session call counter, and five-second double-fire detector.
- `platform.sendEmail`: payload/response size, triggering action, per-session call counter, and five-second double-fire detector.
- No secrets, emails, prompts, case text, answers, or response content are written to the trace table.

## Founder test: FINAL05

1. Use three distinct signed-in participants to join FINAL05 and claim three different functions.
2. Wait until all three screens show 3/3 members. The Team Leader clicks **Start Round once**.
3. Wait until the Pawvia case is visible for all three participants.
4. For the complete smoke test, have the leader complete and submit all seven solution sections; have every member answer both rebuttal questions; have every member rank both peers in all three dimensions; wait for results.
5. Ask Otto/Task to query `cm_arena_token_trace` filtered to `session_code = 'FINAL05'`, ordered by `ts, id`. Compare:
   - `kind='ai'` rows and `reported_tokens` for real model usage;
   - `action='poll'`, `action='bootstrap'`, and `action='case_fetch'` for repeated case transfer;
   - `doubleFire=true` and `callCounter` for duplicate outbound calls;
   - `case_open_agent_context` for attached context (expected 0);
   - per-member polling counts in `note`.

## Verification completed before the live run

- Manual restore snapshot created: **Before Case Arena token instrumentation**.
- Trace table created and schema verified; it is queryable and currently empty.
- Registered server function read back after edits and compiled successfully as an async JavaScript function.
- Final `apps/CaseMastery/App.tsx` parsed and bundled successfully as TSX.
- Static shell inspection confirmed no Case Arena → AgentChat app-state bridge.
- No seeded Arena session or ARENA03/04/05/FINAL01–FINAL05 data was changed.

The three-user end-to-end smoke test and populated trace verification remain intentionally pending the founder's fresh FINAL05 run.