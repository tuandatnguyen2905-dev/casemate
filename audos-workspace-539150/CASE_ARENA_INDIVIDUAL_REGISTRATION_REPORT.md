# Case Arena — individual registration and manual team formation

Date: 2026-10-24
Status: saved as draft; not published

## What changed

- New Pawvia rounds default to `registration_mode = 'individual'`; all 12 existing rounds were backfilled by the database default as `team_code` and retain their original join path.
- Individual registration collects the verified session identity, full name, all five ranked function preferences, optional LinkedIn URL, and an optional unchecked consent flag. It creates one pending registration with no team, no assigned function, no approval, pending payment/attendance, and no presence/readiness.
- Duplicate registration returns HTTP 200 with the existing registration and the message “You've already registered for this round — awaiting team assignment.”
- The Admin tab now includes a Product team table with applicant name/email, ranked preferences, LinkedIn/consent, assignment, readiness, and manual create-team / assign / reassign / unassign / leader controls. There is no automatic matchmaking.
- `cm_team_members` is authoritative. `cm_teams.members_json` is now only a derived compatibility copy refreshed after changes. A unique `(team_id, function)` index is the concurrency gate; the losing assignment receives `409 SEAT_TAKEN`.
- Individual assignment never marks a participant present or ready. Only `mark_ready`, called by that participant's authenticated session, sets `ready_at`, `is_present`, `checkin_status`, `check_in_time`, and registration attendance.
- Start is backend-gated: explicitly designated leader, exactly five members, all five distinct functions, and five readiness timestamps. Individual assignments and leader changes lock after Start.
- Bootstrap, poll, and `stage_data` never return the case. `get_case` is the only full-case endpoint and is available only after Start to a present assigned member.
- The registered backend admin allowlist is centralized as `ADMIN_EMAILS` in `casemate-case-mastery-v4`.

## Exact additive DDL

The WorkspaceDB bridge applied the equivalent PostgreSQL DDL below (physical types verified with `pg_typeof`):

```sql
ALTER TABLE app_cm_sessions
  ADD COLUMN registration_mode text NOT NULL DEFAULT 'team_code';

CREATE INDEX idx_cm_sessions_registration_mode_stage
  ON app_cm_sessions (registration_mode, stage);

ALTER TABLE app_cm_registrations
  ADD COLUMN function_preferences jsonb NULL;

CREATE UNIQUE INDEX idx_cm_team_members_team_id_function
  ON app_cm_team_members (team_id, function);

ALTER TABLE app_cm_team_members
  ADD COLUMN ready_at timestamp without time zone NULL;

CREATE INDEX idx_cm_team_members_team_id_ready_at
  ON app_cm_team_members (team_id, ready_at);
```

The migration is additive. The legacy unique index on `(session_id, function_track, status)` could not be dropped through the additive bridge, so individual rows use a stable unique compatibility value (`individual:<verified-session-id>`) in `function_track`; ranked preferences live in `function_preferences`, and the assigned function lives in authoritative `cm_team_members.function`. Likewise, legacy NOT NULL `phone`, `linkedin_url`, and `function` columns remain intact and receive empty strings when an individual application has no value. `approved:false` is written explicitly, avoiding the legacy column default of true.

The server-function runtime documents no transaction or row-lock API and raw SQL is read-only. Seat assignment/reassignment therefore uses one atomic `cm_team_members` insert/update guarded by the unique seat index; `registration_id` is already unique, so one applicant cannot occupy two teams. Registration metadata, audit rows, and `members_json` are synchronized after the authoritative seat succeeds.

## Final user journey

1. A signed-in user opens an individual Pawvia round and registers once with name, five ranked functions, optional LinkedIn, and optional sharing consent.
2. They see **Registered — awaiting team assignment** across reloads.
3. An authorized Product team admin creates/selects the round's team, assigns one person per function, and designates exactly one leader.
4. The participant lobby shows team, function, leader, teammate names/functions/readiness, and only LinkedIn links where both URL and consent are present.
5. Each participant presses **I'm ready**. Assignment alone has no readiness effect.
6. Only the leader sees an active Start control. The backend rejects Start until all five seats and readiness confirmations exist.
7. After Start, the existing Solve → rebuttal → peer review → feedback workspace continues unchanged; the full case is fetched once through `get_case`.

## Current backend admin allowlist

- `benjaminnguyen.work03@gmail.com`

No other Product team emails existed in the codebase, so none were invented. Add the remaining Product team addresses to the single `ADMIN_EMAILS` constant in the registered `casemate-case-mastery-v4` server function. Backend tests confirmed a normal participant receives `403 ADMIN_REQUIRED` on `admin_load`, while the allowlisted founder succeeds.

## Verification results

A QA round (`QA — Individual Registration Verification`) was created through the production handler with `registration_mode='individual'`, no scheduled start, five seats, and one team. Existing rows were not deleted or modified.

| Check | Result |
|---|---|
| Individual registration | PASS — five applications created; initial responses showed `status=pending`, `approved=false`, no team/function, and ranked preferences |
| Optional LinkedIn / consent | PASS — no-URL registration accepted; an unconsented provided URL was absent from teammate lobby while name/function remained visible; consented URLs were visible |
| Duplicate registration | PASS — same row returned with friendly already-registered state |
| Admin create/assign | PASS — one team, five distinct functions, explicit leader |
| Assignment defaults | PASS — before readiness all five had `checkin_status=pending`, `is_present=false`, `ready_at=null` |
| Concurrent same-seat race | PASS — exactly one Strategy assignment succeeded; the other returned `409 SEAT_TAKEN` with refresh guidance |
| Unassign/reassign reset | PASS — a ready Marketing member was unassigned; Start relocked at 4/5; reassignment returned readiness to pending |
| Readiness | PASS — authenticated tap set the caller only; final aggregate was 5 members / 5 ready / 1 leader |
| Leader-only Start | PASS — non-leader received `403 LEADER_REQUIRED`; leader received `409 NOT_ALL_READY` before readiness and 200 after all five were ready |
| After-Start lock / continuation | PASS — stage became Solve with 3,600 seconds; `stage_data.case` stayed null; `get_case` returned the seven-exhibit Pawvia case |
| Non-admin pool read | PASS — direct `admin_load` returned 403 |
| Audit | PASS — session creation, five applications, team creation, each assignment, leader change, readiness, unassignment, reassignment, and Start were recorded; admin changes include actor email and from/to detail |
| Legacy regression | PASS — all 12 existing rounds remain `team_code`; founder and participant bootstrap on existing completed rounds still succeeded |
| AI calls on join/Start | PASS — trace count for `kind='ai'` in the QA round was 0 |

One invalid historical workspace session used in the first parallel registration attempt was rejected by the platform session gate before code execution; the five valid signed-in sessions completed the test.

## Payload measurement

Trace values are raw JSON response characters with token approximation `ceil(chars / 4)`:

| Response | Before | After | Effect |
|---|---:|---:|---|
| Member bootstrap without case | 8,399 chars (~2,100 tokens), FINAL05 lobby baseline | 7,770 chars (~1,943 tokens), final active QA bootstrap | 629 chars / ~157 tokens smaller |
| Poll | 501 chars (~126 tokens), three-member legacy lobby baseline | 742 chars (~186 tokens), five-member QA team with per-member readiness | 241 chars / ~60 tokens larger because it carries two additional members plus readiness; still case-free |
| Full-case bootstrap | 17,104–19,229 chars (~4,276–4,808 tokens), including a 10,678-char case body | 7,770-char bootstrap plus a separate 10,728-char `get_case` only after Start | repeated case body removed from bootstrap/poll |

No AI-cost claim is made. The trace confirms zero model calls on registration, assignment, readiness, or Start.

## Files and registered resources changed

- `apps/CaseMastery/App.tsx`
- `agent/customer-prompt.md`
- `CASE_ARENA_INDIVIDUAL_REGISTRATION_REPORT.md`
- Registered server function: `casemate-case-mastery-v4`
- WorkspaceDB tables: `cm_sessions`, `cm_registrations`, `cm_team_members`

Checked experience surfaces: Case Arena Overview, individual registration card, awaiting-assignment state, assigned team lobby, Live workspace routing, and Admin tab. No shell-theme or account surface change was needed.