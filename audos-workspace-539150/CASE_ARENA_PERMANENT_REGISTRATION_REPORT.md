# Case Arena — permanent registration pool and archived legacy sessions

Date: 2026-10-25
Status: saved as Draft Preview; not published

## Outcome

Case Arena now has one permanent, always-open registration box for signed-in users. Registration is independent of any round. A participant can register once, receive the friendly “You're already registered” response on a second attempt, and edit their full name, all five ranked function preferences, optional LinkedIn URL, and sharing consent.

The Product team Admin tab now reads one global registration pool. Admins select or create an individual-assignment session, create a team, assign one pool applicant per function, explicitly designate the Team Leader, reassign or unassign before Start, and see registration date, email, preferences, LinkedIn/consent, assignment, and readiness. There is no automatic matchmaking.

## Schema choice and additive migration

I chose a separate `cm_registration_pool` table rather than making `cm_registrations.session_id` nullable. The existing session registration table has a non-null session foreign key and is deeply connected to team membership, readiness, rebuttals, scoring, and audit behavior. Keeping it as the session participation snapshot avoids weakening those invariants.

New table: `cm_registration_pool`

- Canonical identity: unique normalized verified email; the most recently verified workspace session id is refreshed on bootstrap.
- Profile: full name, all five ranked functions, optional LinkedIn URL, `consent_share`.
- Safe defaults: `approved=false`, `payment_status='pending'`, `attendance_status='pending'`, `is_present=false`, `checkin_status='pending'`, `status='pending'`.
- Server-function-only write policy declared.

Additive columns and indexes:

- `cm_sessions.archived boolean NOT NULL DEFAULT false`
- `cm_sessions.archived_at timestamp NULL`
- index `(archived, stage)`
- `cm_registrations.pool_registration_id integer NULL`
- unique index `(session_id, pool_registration_id)`
- foreign key `pool_registration_id → cm_registration_pool.id ON DELETE RESTRICT`

On admin assignment, the backend idempotently materializes one `cm_registrations` participation snapshot from the permanent pool, then claims the authoritative `cm_team_members` seat. Pool profile state remains independent; team/function/leader/readiness remain session-scoped.

The server-function runtime exposes query/insert/update/delete but no transaction or row-lock API. The atomic concurrency boundary is therefore the database unique index on `cm_team_members(team_id, function)`; two simultaneous claims for one seat cannot both succeed. The existing unique registration and new `(session_id, pool_registration_id)` constraints prevent duplicate participation snapshots. Assignment/reassignment audit rows include the pool source id. Readiness and Start gates remain backend-enforced.

## Archive migration

The live source of truth contained 13 Case Arena sessions, 37 registrations, and 13 teams (the earlier brief's 12/32 counts predated the latest QA round). All 13 existing non-library sessions were reversibly archived with `archived=true` and one `archived_at` timestamp. No session, registration, team, or historical audit row was deleted.

Post-migration verification:

- Sessions: 13
- Archived sessions: 13
- Registrations: 37, unchanged
- Teams: 13, unchanged
- New archive audit rows: 13
- Total audit rows: 184 after the 13 archive entries

Archived sessions are excluded from participant bootstrap and default Admin lists. A direct participant request for an archived session receives `410 SESSION_ARCHIVED`. The flag is reversible in the database; an un-archive UI was intentionally deferred.

## Final participant journey

1. Sign in and open Case Arena; no active round is required.
2. Use the permanent **Register for Case Arena** box. Account email is prefilled, then enter full name, rank all five functions, optionally add LinkedIn, and choose whether teammates may see that exact link.
3. Submit once and see **Registered — awaiting team assignment**. A duplicate creates no row. Use **Edit preferences or profile** at any time.
4. After Product team assignment, the lobby shows team, function, explicit leader, teammates, readiness, and LinkedIn links only for consenting participants.
5. Each participant presses **I'm ready**. Assignment alone leaves `is_present=false`, `checkin_status='pending'`, and `ready_at=null`.
6. Only the designated Team Leader can Start, and only after exactly five distinct functions and five readiness confirmations.
7. The full Pawvia case is fetched only after Start when entering the live exercise.

## Authorization and current allowlist

Admin authorization remains enforced in `casemate-case-mastery-v4`, not by tab visibility. Current allowlisted Product team email:

- `benjaminnguyen.work03@gmail.com`

The founder should add the remaining Product team emails to the single backend `ADMIN_EMAILS` constant.

## Verification run

- Backend syntax/runtime: allowlisted founder `admin_load` returned 200; archived session list was empty and the global pool response loaded.
- Participant bootstrap: current signed-in non-admin returned 200 with `sessions: []`, `active: null`, and permanent `poolRegistration` state; no case payload was returned.
- Authorization: current non-allowlisted participant calling `admin_load` returned `403 ADMIN_REQUIRED` and no admin data.
- Permanent registration: created one pool row with all five ranked preferences, `consent_share=true`, and every safe default.
- Duplicate: second submission returned `alreadyRegistered=true` and the original row; no duplicate was created.
- Editing/optional LinkedIn: update kept the same row id, changed preference order, removed LinkedIn, and set `consent_share=false`.
- QA cleanup: the temporary pool row was removed after verification; production pool remains empty until a real customer registers.
- Archive integrity: confirmed 13/13 sessions archived with registrations=37 and teams=13 unchanged.
- Frontend/backend static verification: updated TSX and server-function source parse cleanly; permanent registration, global pool materialization, consent-safe assigned roster, unique seat gate, explicit leader, readiness, and Start checks were reviewed.
- Existing manual-assignment/readiness/Start behavior was not destructively re-run against historical teams; those 13 sessions are archived, and the previously verified gates were left unchanged.

## Files and registered resources changed

- `apps/CaseMastery/App.tsx`
- `agent/customer-prompt.md`
- `CASE_ARENA_PERMANENT_REGISTRATION_REPORT.md`
- Registered server function: `casemate-case-mastery-v4`
- Disabled one-time functions retained for audit: `case-arena-archive-existing-20261025`, `case-arena-permanent-pool-qa-cleanup-20261025`
- WorkspaceDB: new `cm_registration_pool`; additive changes to `cm_sessions` and `cm_registrations`

Checked surfaces: Case Arena permanent registration empty/registered/edit states, assigned team lobby, live workspace gating, results routing, and Admin global pool/session/team controls. No Desktop, AgentChatView, Settings, EmailGate, shell theme, or account behavior needed a change.