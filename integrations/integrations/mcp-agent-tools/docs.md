# MCP Agent Tools (customer tools registry)

Register **MCP tools** that THIS workspace's customer-facing agent can call
mid-conversation. The agent gets these tools injected into its next session, so
it can take real actions (look something up, create a row, fire an event) on
behalf of the visitor instead of only talking about them.

This is the workspace-side of MCP: each tool is an `api_call` the agent is
allowed to make to a small allow-list of safe endpoints. Tools live in a
per-workspace **registry** that you read/write over HTTP.

## Registry shape

```json
{
  "version": 1,
  "tools": [
    {
      "name": "add_to_catalog",
      "description": "Add an item to the shared catalog when the visitor asks to save or share something.",
      "parameters": {
        "name": { "type": "string", "required": true, "description": "Item name" },
        "description": { "type": "string", "required": false, "description": "Optional details" }
      },
      "action": {
        "type": "api_call",
        "method": "POST",
        "endpoint": "/api/hooks/execute/workspace-{configId}/add-to-catalog",
        "bodyMapping": { "name": "name", "description": "description" }
      }
    }
  ]
}
```

- `name` — tool name the agent sees (snake_case).
- `description` — when the agent should reach for it. Be explicit; this is the
  only hint the model gets.
- `parameters` — typed args (`string` | `number` | `boolean`, each optional
  `required` / `default` / `enum`). Turned into the tool's input schema.
- `action.endpoint` — must start with one of the allowed prefixes (below).
- `action.bodyMapping` — maps tool args → request body fields.

## Allowed endpoint prefixes

A registered tool may only call endpoints under these prefixes (anything else is
rejected at registration time):

```
/api/crm/        /api/spaces/         /api/community/    /api/app-skills/
/api/funnel/     /api/workspace-settings/   /api/microsites/
/api/space-tools/   /api/hooks/
```

**Hook-backed tools and this allow-list:** the only allow-listed way to point a
tool at a workspace server function (hook) is the public execute alias
`/api/hooks/execute/workspace-{configId}/{hookName}` (under the `/api/hooks/`
prefix). The management/webhook URL form
`/api/workspaces/{workspaceId}/hooks/{hookName}/execute` is NOT on the
allow-list — it is only accepted as a recognized legacy exception for
already-registered tools; do not use it for new registrations. Both URLs
execute the same hook.

### The hook-execute route under `/api/hooks/`

The `/api/hooks/` prefix exists so a tool can execute a **server-functions
hook** (see the `server-functions` integration). The route shape is:

```
POST /api/hooks/execute/{workspaceId}/{hookName}
GET  /api/hooks/execute/{workspaceId}/{hookName}
```

- This is the same executor as the server-functions webhook route
  `POST /api/workspaces/{workspaceId}/hooks/{hookName}/execute` — same hook,
  same sandbox, same response shape. But that `/api/workspaces/...` form is
  NOT in the allow-list above, so registry entries MUST use the
  `/api/hooks/execute/...` form.
- The `execute` segment comes FIRST. A commonly guessed shape,
  `/api/hooks/{workspaceId}/{hookName}/execute`, is NOT a route at all — it
  returns 404 `API route not found`.
- `{workspaceId}` accepts the usual formats (numeric configId like `539150`,
  `workspace-{configId}`, or the workspace UUID). Write it literally into the
  registered `endpoint`: the auto-injected `workspaceId` param (see "Session &
  auth context handoff" below) is added to the request body/query only — it
  does NOT fill path segments for you.
- **Multi-action hooks:** when one hook implements several behaviors, put a
  static query string on the registered endpoint (e.g. `...?action=generate`)
  to pick the behavior. The hook reads it via `request.query.action`; the
  tool's own args flow through `bodyMapping` into `request.body`.

### Example: a tool wired to a server-functions hook

A hook named `case-engine` (created via the `server-functions` integration)
branches on `action` and serves two tools. Replace `workspace-539150` with
YOUR workspace id:

```json
{
  "version": 1,
  "tools": [
    {
      "name": "generate_practice_case",
      "description": "Create a practice case for the candidate and save it to their log. Use when they ask to practice.",
      "parameters": {
        "case_type": { "type": "string", "required": false, "description": "Optional case type to generate." }
      },
      "action": {
        "type": "api_call",
        "method": "POST",
        "endpoint": "/api/hooks/execute/workspace-539150/case-engine?action=generate",
        "bodyMapping": { "case_type": "case_type" }
      }
    },
    {
      "name": "grade_practice_case",
      "description": "Grade the candidate's answer to a case created with generate_practice_case.",
      "parameters": {
        "case_id": { "type": "number", "required": true, "description": "The case id returned by generate_practice_case." },
        "answer": { "type": "string", "required": true, "description": "The candidate's full answer." }
      },
      "action": {
        "type": "api_call",
        "method": "POST",
        "endpoint": "/api/hooks/execute/workspace-539150/case-engine?action=grade",
        "bodyMapping": { "case_id": "case_id", "answer": "answer" }
      }
    }
  ]
}
```

Inside the hook: `request.query.action` is `"generate"` or `"grade"`,
`request.body` carries the mapped args plus the auto-injected `workspaceId`,
and `request.headers['x-session-id']` is the visitor's session — so the hook's
`db.*` writes are stamped to that visitor automatically.

## Endpoints

### Read the registry
```
GET /api/workspace-settings/{workspaceId}/customer-tools
→ { "registry": { "version": number, "tools": [...] } }   (404 if none yet)
```

### Replace the registry
```
PUT /api/workspace-settings/{workspaceId}/customer-tools
Body: { "value": { "version": 1, "tools": [ ...full list... ] } }
```

> **GET/PUT asymmetry — do not mirror the GET shape back into the PUT.** The
> GET above returns the registry wrapped as `{ "registry": ... }`, but the PUT
> expects the top-level key `value`:
> `{ "value": { "version": 1, "tools": [...] } }`. Sending
> `{ "registry": ... }` is rejected with HTTP 400 (a Zod validation error
> demanding a top-level `value` field). Verified working on 2026-08-01 against
> workspace-539150.

The PUT replaces the whole `tools` array — read first, append, then write back
so you don't drop existing tools.

## How it reaches the agent

On the agent's next conversation the platform calls
`loadCustomerToolsRegistry(workspaceId)` and turns each entry into a live MCP
tool. When the visitor's intent matches a tool's `description`, the agent calls
it, the platform performs the `api_call`, and the result flows back into the
conversation. No redeploy needed — registry changes take effect on the next
session.

## Session & auth context handoff

When the agent calls a registered tool, the platform doesn't hit the endpoint
blindly — it forwards the current visitor's context:

- **`X-Session-Id`** — the visitor's workspace session is forwarded on every
  tool call, but a hook stamps `session_id` only when that id resolves to a real
  session row in this workspace. A missing, invalid, cross-workspace, or
  unavailable session lookup leaves a legacy hook running with no resolved
  owner; writes that omit `session_id` then stay shared. Hook reads and deletes
  are never automatically filtered by visitor. Never copy the raw header into
  a row yourself; use the hook's validated `session.id` and an explicit owner
  filter. See **Visitor ownership is conditional in hooks** in the
  `server-functions` docs for the full contract and examples.
- **Shared writes** — from a session-carrying hook, set `session_id: null`
  explicitly in the hook payload. Pointing the tool at an endpoint that writes
  without a session is also shared. Apps read those rows with `{ shared: true }`.
  Shared rows are world-readable and must never contain sensitive data.
- **`workspaceId`** — auto-injected into the request body (POST/PUT/PATCH) or
  query string (GET) of every tool call, so endpoints always know which
  workspace they're acting on.
- **App-side auth** — your app components authenticate their OWN WorkspaceDB
  calls with the workspace DB token (`window.__workspaceDb`, sent as the
  `X-Workspace-DB-Token` header). The agent's tool calls use the session
  channel above instead; both paths read and write the same tables.

## Request shaping (fixed)

The platform builds every tool-call request the same way — none of this is
configurable per tool:

- **Static query parameters are preserved.** Anything baked into
  `action.endpoint` (e.g. `?secret=abc`) stays on the outgoing request; the
  platform appends its own parameters alongside yours.
- **Arguments become one flat request body.** For `POST`/`PUT`/`PATCH`, the
  tool's arguments are sent as a single flat JSON object: `bodyMapping`
  renames top-level keys (`{ toolArgumentName: requestBodyField }`), and when
  it is omitted all arguments pass through as-is. There is no nesting,
  templating, or per-field transformation. For `GET`, arguments land in the
  query string instead.
- **Workspace identity is injected for you.** The canonical workspace UUID is
  added automatically as `workspaceId` — always on the query string, and also
  in the body for write verbs — so endpoints know which workspace is acting.
  Never declare it as a tool parameter.
- **Custom request headers cannot be configured.** The platform sends a fixed
  header set: `Content-Type: application/json`, `X-Workspace-Id`, and the
  forwarded visitor `X-Session-Id`. A tool cannot add auth or API-key
  headers — if the target needs a credential, back the tool with a hook and
  keep the credential server-side, or use a static `?secret=` query
  parameter.

## Pairs well with WorkspaceDB

Point a tool at a hook (`/api/hooks/execute/workspace-{configId}/{hookName}`)
that writes to WorkspaceDB (see the Collection app) so the agent can populate the
same tables your apps read from. Visitor ownership is conditional: a hook adds to the visitor's
**private** list only when the forwarded session resolves in this workspace.
For the **shared catalog**, write `session_id: null` explicitly in the hook (or
use an endpoint that writes with no session). Human-created and agent-created
rows stay in sync either way.

> Tip: ask Otto to "register an MCP tool that lets the agent add items to the
> shared catalog" and it will write the registry entry for you.
