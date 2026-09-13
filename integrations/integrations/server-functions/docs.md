# Server Functions (Workspace Hooks) Integration

Define server-side handler functions that receive HTTP requests at unique URLs per workspace.

## Category
Backend / Server Logic

## Required API Keys
None

---

## Workspace ID Format

**Any of the following formats work interchangeably** in all Server Functions API endpoints. The platform resolves them to the same workspace automatically:

| Format | Example | Description |
|---|---|---|
| Numeric config ID | `665201` | Shortest — use this by default |
| `workspace-{configId}` | `workspace-665201` | Alternate prefix format |
| UUID | `8a8181a4-9eab-...` | Internal UUID — also accepted |

**Recommendation: use the numeric configId** (e.g. `665201`) for REST API fetch URLs. It is the most stable identifier and easiest to find — it appears in the workspace URL and in `get_workspace_email` tool responses. The `resolveWorkspace()` middleware automatically resolves configId to UUID. However, for direct workspace DB engine operations (e.g., `workspaceDbEngine.*()` calls), always use the workspace UUID — never pass configId directly.

```
GET /api/workspaces/665201/hooks       ✅ works
GET /api/workspaces/workspace-665201/hooks  ✅ works
GET /api/workspaces/8a8181a4-.../hooks ✅ works
```

Inside the hook sandbox, the `workspaceId` global is always the **resolved UUID** so it's safe to pass to internal platform API calls.

---

## Concepts

- **Hook** — A named server-side JavaScript function stored in the database and executed in a sandboxed environment. Each hook is scoped to a workspace and accessible via a unique URL.
- **Hook Execution** — When a hook URL is called, the platform runs the hook code in a secure sandbox with a **5-minute (300s) timeout**. The hook receives the HTTP request context and can return custom responses via `respond()`.
- **Hook Secret** — An optional shared secret for webhook authentication. When set, callers must include the secret in the `x-hook-secret` header or `?secret=` query parameter.

---

## API Endpoints

All endpoints accept any workspace ID format (numeric configId, `workspace-{configId}`, or UUID). See "Workspace ID Format" above.

### Create a Hook
```
POST /api/workspaces/:workspaceId/hooks
```

**Request:**
```json
{
  "name": "process-payment",
  "description": "Handle incoming Stripe webhooks",
  "code": "const event = request.body;\nconsole.log('Received event:', event.type);\nrespond(200, { received: true });",
  "language": "javascript",
  "enabled": true,
  "secret": "whsec_abc123"
}
```

- `name` — Required. Unique name within the workspace. Used in the execution URL.
- `description` — Optional. Human-readable description.
- `code` — Required. JavaScript code to execute. Runs in a sandboxed environment.
- `language` — Optional. Defaults to `javascript`.
- `enabled` — Optional. Defaults to `true`. Disabled hooks return 403 when called.
- `secret` — Optional. If set, callers must provide this secret to execute the hook.

**Response:**
```json
{
  "id": "uuid-abc-123",
  "workspaceId": "8a8181a4-9eab-4076-b996-14b133c6558f",
  "name": "process-payment",
  "description": "Handle incoming Stripe webhooks",
  "code": "...",
  "language": "javascript",
  "enabled": true,
  "secret": "whsec_abc123",
  "executionCount": 0,
  "lastExecutedAt": null,
  "lastError": null,
  "createdAt": "2024-01-14T12:00:00.000Z",
  "updatedAt": "2024-01-14T12:00:00.000Z"
}
```

Note: `workspaceId` in the response is always the resolved UUID, regardless of what format you used in the URL.

### List Hooks
```
GET /api/workspaces/:workspaceId/hooks
```

Returns an array of all hooks for the workspace. Returns `[]` if no hooks have been created yet.

### Get a Hook
```
GET /api/workspaces/:workspaceId/hooks/:hookId
```

### Update a Hook
```
PATCH /api/workspaces/:workspaceId/hooks/:hookId
```

Updatable fields: `name`, `description`, `code`, `language`, `enabled`, `secret`, `metadata`.

### Delete a Hook
```
DELETE /api/workspaces/:workspaceId/hooks/:hookId
```

Returns 204 No Content on success.

### Execute a Hook (Webhook Endpoint)

Two public execute URLs reach the same hook — both accept `POST` and `GET`:

```
POST /api/workspaces/:workspaceId/hooks/:hookName/execute
GET  /api/workspaces/:workspaceId/hooks/:hookName/execute

POST /api/hooks/execute/:workspaceRef/:hookName
GET  /api/hooks/execute/:workspaceRef/:hookName
```

Either is the URL you give to external services (Stripe, Mailgun, etc.) as a
webhook URL. Both `:workspaceId` and `:workspaceRef` accept any workspace id
format (numeric configId, `workspace-{configId}`, or UUID). Customer chat
tools registered in the `mcp-agent-tools` registry must point at the canonical
alias form `/api/hooks/execute/workspace-{configId}/{hookName}` — that is the
endpoint shape the tool registry accepts (see Customer Chat Tool Integration
below).

**Authentication:** A hook's `secret` is optional. If the hook has one,
callers must include it as:
- Header: `x-hook-secret: your-secret`
- Query: `?secret=your-secret`

If the hook has no secret, both execute URLs are open — anyone who knows the
URL can run the hook, so write secret-less hook code as handling untrusted
input. Hooks used as customer chat tools should stay secret-less or carry the
secret as a static `?secret=` query parameter in the registered endpoint.

**Response:**
```json
{
  "received": true,
  "_meta": {
    "success": true,
    "durationMs": 45,
    "logs": ["Received event: payment_intent.succeeded"],
    "error": null
  }
}
```

The response body comes from whatever the hook code passes to `respond()`.
For these JSON responses the `_meta` field (success, durationMs, logs, error)
is always appended with execution details. A hook that answers with
`respondRaw()` intentionally omits this wrapper: the body is returned verbatim
(plain text or base64-decoded bytes) with no `_meta`, which is what external
services that require an exact echo (e.g. Meta webhook verification) expect.

---

## Sandbox Environment

Hook code runs in a sandboxed JavaScript environment with:

### Available Globals
- `request` — The incoming HTTP request: `{ method, path, query, body, headers }`
- `workspaceId` — The workspace UUID string (always resolved to UUID regardless of URL format used)
- `hookName` — The hook's name
- `respond(statusCode, body)` — Set the response status and body. **Call this to return data to the caller.** If never called, the response defaults to `{ ok: true }` with status 200.
- `fetch(url, options)` — Make HTTP requests (max **50 calls** per execution, **90s default timeout** each). Hook code has no page origin, so use the platform's full `https://...` address by default; only the workspace-authenticated payment and subscriber endpoints listed below accept a path-only URL.
- `platform` — Helper object for common platform actions (see Platform Helpers below)
- `db` — Direct access to the workspace's database tables (see Database Access below)
- `console.log/error/warn/info` — Logging (captured in `_meta.logs`)
- `JSON`, `Date`, `Math`, `parseInt`, `parseFloat`, `Array`, `Object`, `String`, `Number`, `Boolean`, `Map`, `Set`, `Promise`, `RegExp`, `Error`
- `encodeURIComponent`, `decodeURIComponent`, `encodeURI`, `decodeURI`
- `setTimeout` (capped at 5 minutes)

### NOT Available (Security)
- `require` / `import` — No module loading
- `process` — No access to Node.js process
- `fs` — No filesystem access
- `eval` — No nested evaluation

### Timeout
Hooks have a **5-minute (300-second)** default execution timeout. If exceeded, the hook returns a 500 error.

**Configurable per-hook timeout:** Set `metadata.timeout` (in milliseconds) to override both the fetch timeout and the VM execution ceiling for that specific hook:

```
PATCH /api/workspaces/{workspaceId}/hooks/{hookId}
{ "metadata": { "timeout": 300000 } }
```

- **Default fetch timeout:** 90s (applies when no `metadata.timeout` is set)
- **Default VM ceiling:** 300s
- **With `metadata.timeout`:** both fetch timeout and VM ceiling use that value
- **Maximum:** 600000ms (10 minutes) — requests above this are capped

Use this for hooks that call slow external APIs (video analysis, AI processing, long-running scrapers).

---

## Database Access

Hooks have direct read/write access to the workspace's database tables via the `db` global. This is the same database that the workspace's App Studio apps and the AI agent's `db_query` tool operate on.

All `db` methods are async and automatically scoped to the current workspace — no need to pass `workspaceId`.

### Visitor ownership is conditional in hooks

A forwarded `X-Session-Id` does **not** make every hook database operation
visitor-scoped. The platform first resolves that id to a real session row in
this workspace. Only when it resolves do `db.insert`, `db.bulkInsert`, and
`db.update` add that validated `session.id` as `session_id`, and only when the
hook payload did not set `session_id` itself. Use the sandbox's validated
`session.id`; never copy the caller-supplied request header into a row yourself.

Legacy hooks still run when the header is absent, invalid, belongs to another
workspace, or the session lookup fails. In those cases `session` is `null` and
a write without an explicit `session_id` keeps an empty owner
(`session_id = NULL`). That is a **shared row**: any visitor can read it through
a shared read. The workspace DB token also ships in the published space, so
treat an ownerless row as world-readable and world-writable by anyone holding
that token. A shared row must never contain secrets, private customer data, or
anything else sensitive.

Hook reads and deletes are **never** filtered by the forwarded visitor. An
unfiltered `db.query()` reads matching rows across every visitor, and
`db.delete()` deletes exactly the rows matched by the filters you pass. For a
per-visitor list, count, quota, update, or delete, require the validated
`session` and filter explicitly:

```javascript
if (!session) {
  respond(401, { error: 'A valid workspace session is required' });
  return;
}

const mine = await db.query('app_items', {
  where: { session_id: session.id },
});

await db.delete('app_items', {
  id: request.body.id,
  session_id: session.id,
});
```

An explicit owner in the hook payload always wins. To deliberately create or
keep a shared row from a session-carrying hook, set `session_id: null`:

```javascript
await db.insert('app_catalog', {
  title: request.body.title,
  session_id: null,
});

await db.update(
  'app_catalog',
  { id: request.body.id, session_id: null },
  { title: request.body.title, session_id: null },
);
```

The explicit `session_id: null` on that update matters. With a valid visitor
session, an update patch that omits `session_id` inherits the automatic stamp
and can silently convert an existing shared row into that visitor's private
row.

### db.query(tableName, opts?)

Read rows from a table.

```javascript
// Get all rows
const result = await db.query('subscribers');
console.log(result.rows);        // Array of row objects
console.log(result.rowCount);    // Number of rows returned

// With filtering and options
const result = await db.query('subscribers', {
  select: ['id', 'email', 'status'],
  where: { status: 'active' },
  orderBy: [{ column: 'created_at', direction: 'desc' }],
  limit: 50,
  offset: 0,
});
```

**Options:**
- `select` — Array of column names to return. Omit to return all columns.
- `where` — Either a plain object `{ column: value }` for simple equality filters, or an array of filter objects `[{ column, operator, value }]` for complex queries. Supported operators: `=`, `!=`, `>`, `<`, `>=`, `<=`, `LIKE`, `ILIKE`, `IN`, `IS NULL`, `IS NOT NULL`.
- `orderBy` — Array of `{ column, direction }` objects. Direction defaults to `'asc'`.
- `limit` — Max rows to return (default: 50).
- `offset` — Row offset for pagination.

### db.insert(tableName, data)

Insert one or more rows. Pass a single object or an array of objects.

```javascript
// Insert one row
const result = await db.insert('subscribers', {
  email: 'jane@example.com',
  status: 'active',
  created_at: new Date().toISOString(),
});
console.log(result.insertedRows);  // Array of inserted rows (with auto-generated IDs)
console.log(result.count);         // Number of rows inserted

// Insert multiple rows
const result = await db.insert('orders', [
  { product_id: 1, quantity: 2, status: 'pending' },
  { product_id: 3, quantity: 1, status: 'pending' },
]);
```

**`json` columns — pass the object/array directly.** For columns of type `json`, pass a plain JavaScript object or array (including a top-level array and `[]`) — the hook `db` helper serializes it for you, matching the client SDK:

```javascript
// Inserting a row with a json-typed column ("payload")
await db.insert('events', {
  name: 'order.created',
  payload: { items: [{ sku: 'A1', qty: 2 }], total: 4999 }, // ✅ plain object
  created_at: new Date().toISOString(),
});
```

A pre-stringified JSON string (`JSON.stringify(value)`) is still accepted and stored as the JSON it encodes — it is not double-encoded — so existing code keeps working. A string that is not valid JSON fails the write. Reads return the parsed object/array.

### db.update(tableName, where, data)

Update matching rows. Returns the updated rows.

```javascript
// Update by simple equality
const result = await db.update('subscribers', { email: 'jane@example.com' }, {
  status: 'unsubscribed',
  updated_at: new Date().toISOString(),
});
console.log(result.count);        // Number of rows updated
console.log(result.updatedRows);  // Updated row objects

// Update with complex filter (array syntax)
const result = await db.update('orders',
  [{ column: 'status', operator: '=', value: 'pending' },
   { column: 'created_at', operator: '<', value: '2024-01-01' }],
  { status: 'expired' }
);
```

The same `json`-column rule as `db.insert` applies here: pass the new value as a plain object or array (`payload: { ... }` or `tags: []`); pre-stringified JSON is also accepted and not double-encoded.

### db.delete(tableName, where)

Delete matching rows.

```javascript
const result = await db.delete('subscribers', { status: 'bounced' });
console.log(result.deletedCount);  // Number of rows deleted
```

### db.rawQuery(sql, params?)

Run a raw SQL SELECT query against the workspace database. Use `$1`, `$2`, etc. for parameterized values.

```javascript
const result = await db.rawQuery(
  'SELECT email, COUNT(*) as order_count FROM orders GROUP BY email ORDER BY order_count DESC LIMIT 10',
);
console.log(result.rows);

// With parameters
const result = await db.rawQuery(
  'SELECT * FROM subscribers WHERE created_at > $1 AND status = $2',
  ['2024-01-01', 'active']
);
```

### db.listTables()

List all tables in the workspace database.

```javascript
const tables = await db.listTables();
tables.forEach(t => console.log(t.tableName, t.rowCount));
```

### Complete Example: Sync webhook data to DB

```javascript
const event = request.body;

if (event.type === 'checkout.session.completed') {
  const session = event.data.object;

  // Check if order already exists
  const existing = await db.query('orders', {
    where: { stripe_session_id: session.id },
    limit: 1,
  });

  if (existing.rowCount === 0) {
    await db.insert('orders', {
      stripe_session_id: session.id,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
      status: 'paid',
      created_at: new Date().toISOString(),
    });

    await platform.postAgentMessage({
      message: `New order received! ${session.customer_details?.email} paid $${(session.amount_total / 100).toFixed(2)}`,
    });
  }
}

respond(200, { received: true });
```

---

## fetch (HTTP Requests)

Hooks can make outbound HTTP requests using the standard `fetch` API:

```javascript
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' }),
});
const data = await response.json();
console.log('API response:', data);
respond(200, { result: data });
```

**Limits:**
- Maximum **50 fetch calls** per hook execution
- Each fetch has a **90-second default timeout** (override with `metadata.timeout` — see Timeout section)
- External services and ordinary platform endpoints require a full `https://...` address. Hook code has no page origin, so relative URLs (including path-relative, root path-only, and protocol-relative forms) fail before any request is sent, and broad `try/catch` code may reduce that to an "unknown error".
- Deliberate root path-only exceptions: `/api/payments/capture`, `/api/payments/cancel-hold`, `/api/payments/refund` (including their legacy `/api/sdk/payments/...` aliases), and `/api/crm/subscribers/...`. The platform resolves and authenticates those endpoints for the workspace.

---

## Platform Helpers

The `platform` object provides convenience methods for common workspace actions. These are pre-scoped to the current workspace — no need to pass `workspaceId`.

### platform.postAgentMessage({ message, destination?, ... })

Post a message into a conversation. **There are two different conversations, and choosing the wrong one is the single most common reason a scheduled automation reports success while nobody ever sees its message.** Pick with `destination`:

| `destination` | Where it lands | Who sees it |
|---------------|----------------|-------------|
| `'space_chat'` *(default)* | The **space chat** for a workspace session (`workspace_session_messages`) | A **visitor/customer** who has that space conversation open. The desktop workspace does **not** render this surface, so the workspace owner will not see it there. |
| `'founder_chat'` | The **founder's own Otto conversation** (My Plan) in the desktop workspace | The **workspace owner**, live, in the chat they actually use every day. |

**Rule of thumb: if the message is addressed to the founder/owner — a nightly digest, an alert, "your job finished" — use `destination: 'founder_chat'`. If it is addressed to a customer in a space conversation, keep the default.**

The default is unchanged and stays the default: omitting `destination` behaves exactly as it always has.

---

#### `destination: 'founder_chat'` — message the workspace owner

```javascript
const result = await platform.postAgentMessage({
  message: "Good morning! Today's digest: 5 new race entries, 2 pending payments.",
  destination: 'founder_chat',
});
// result = {
//   success: true,
//   destination: 'founder_chat',
//   messageId: 41502,
//   planThreadId: 'a1b2c3d4-…',
//   planThreadTitle: 'Daily Race Digest',
//   conversationCreated: false,
//   dedupeKey: 'hook:daily-race-digest:2026-09-11T01:10:00.000Z',
//   duplicate: false,
//   deliveredTo: 'Delivered to the founder\'s Otto chat (My Plan) in this workspace — conversation "Daily Race Digest" (plan thread a1b2c3d4-…).'
// }
```

- The message appears in the founder's workspace **live**, with no reload.
- **One conversation per automation.** Every run of the same server function reuses the same conversation, named after the function (`daily-race-digest` → "Daily Race Digest"), so a nightly job appends to one ongoing thread instead of creating a new entry every night. `conversationCreated` is `true` only on the very first run. If the founder archives that conversation, the next run visibly starts a fresh one.
- **A retried run does not post twice.** Delivery is idempotent on the automation plus the occurrence it is running for. A scheduled run carries its occurrence automatically; a retry of the same occurrence returns `duplicate: true` and adds nothing. Pass `occurrenceKey` to supply your own identity (e.g. an order id) when the natural unit of work is not the schedule tick. Without any occurrence at all, the message text plus the UTC date is used, so an identical repeat on the same day is suppressed while different text still posts.
- `contextType`, `contextId`, `sessionId` and `threadId` do not apply to this destination — the founder's conversation is resolved from the workspace.

**Do not** send both destinations "to be safe". Mirroring a daily automation into both surfaces is how founders end up with duplicate notifications.

---

#### `destination: 'space_chat'` (default) — message a space visitor

Full signature: `platform.postAgentMessage({ message, contextType?, contextId?, sessionId?, threadId? })`

The message is **persisted** to `workspace_session_messages` and **broadcast** on the session WebSocket so a visitor who has that conversation open sees it live. It does **not** appear in Otto / My Plan.

```javascript
await platform.postAgentMessage({
  message: "Good morning! Here's your daily summary: 5 new contacts, 2 pending tasks.",
});
respond(200, { sent: true });
```

**Targeting a specific user's session and conversation:**
```javascript
const result = await platform.postAgentMessage({
  message: "Hello! Just checking in...",
  contextType: 'space',
  sessionId: 'wses_41502c7d…',
  threadId: 'main',
});
// result = { success: true, destination: 'space_chat', messageId: 881234, sessionId: 'wses_41502c7d…', threadId: 'main', storedThreadId: null, deliveredTo: 'Delivered to the space chat for session wses_41502c7d… — conversation "main". …' }
```

- `message` — Required. The text message to post.
- `contextType` — Optional. Defaults to `'space'` (not `'workspace'`). Can be `'workspace'`, `'space'`, or `'landing_page'`. When `sessionId` is provided this is stored on the row only — it does **not** change which session the message is written to.
- `contextId` — Optional. Defaults to the current workspace UUID.
- `sessionId` — Optional. A `wses_…` id or session UUID. When provided, the message goes into that session. When omitted, defaults to the workspace owner's session for `contextType` + `contextId`.
- `threadId` — Optional. Which **conversation** inside that session to write to.
  - `"main"` (or omitted) is the primary conversation. It is stored as `thread_id = NULL` so it matches every pre-thread row and `GET /chat/history?threadId=main`.
  - `"main"` is **not** "whatever conversation the visitor currently has open". After someone starts another conversation (`t_…`), that sidebar thread is a different id. Posting to `"main"` while they are looking at `t_…` succeeds and is invisible on the open thread.
  - A `t_…` (or any `[A-Za-z0-9_-]{1,64}`) id writes into that conversation. List ids with `GET /api/space/{spaceId}/chat/threads?sessionId=wses_…`.
  - A malformed `threadId` **throws**. The call does not return `{ success: true }` and does not silently fall back to `main`.

The return value always names the delivery location: `{ success, destination, messageId, sessionId, threadId, storedThreadId, deliveredTo }`. `threadId` is the public id (`"main"` or `t_…`). `storedThreadId` is `null` for the primary conversation (the column value) and the same string otherwise.

---

#### "It said success but I can't find it"

Read **`deliveredTo`** on the return value. Both destinations return it, in plain words, and a dry run returns the same sentence prefixed with `Dry run — would deliver…` naming the conversation the live run would use. If it says *space chat*, that is the visitor surface and the workspace owner will not see it in their desktop workspace — re-send with `destination: 'founder_chat'`. An unrecognised `destination` **throws**; it never silently falls back.

### platform.getChatHistory({ sessionId, limit?, excludeSystem? })

Retrieve chat messages from a specific user's session. Returns messages in chronological order. By default, system messages (like `[SYSTEM:...]` prefixed messages and JSON blobs) are filtered out so you get only human-readable conversation content.

```javascript
const history = await platform.getChatHistory({
  sessionId: 'space-nicholas.y.thorne@gmail.com-d915c389-2314-447f-bd96-f6acfcc6fb92',
  limit: 30,
});
// Returns: { messages: [{ role: 'user'|'assistant', content: '...', createdAt: '...' }] }

const lastUserMessage = history.messages.filter(m => m.role === 'user').pop();
console.log('Last thing the user said:', lastUserMessage?.content);
```

- `sessionId` — Required. The session UUID to read messages from.
- `limit` — Optional. Maximum number of messages to return. Defaults to 50.
- `excludeSystem` — Optional. Defaults to `true`. When true, filters out `[SYSTEM:...]` messages and raw JSON blobs, returning only readable conversation content.

### platform.generateText({ userPrompt, systemPrompt?, model?, maxTokens? })

Call an AI model to generate text from within the hook.

```javascript
const result = await platform.generateText({
  userPrompt: 'Summarize this in 2 sentences: ' + longText,
  model: 'gpt-4o-mini',
});
console.log('Summary:', result.text);
respond(200, { summary: result.text });
```

- `userPrompt` — Required. The prompt to send to the model.
- `systemPrompt` — Optional. A system prompt to steer the model's behavior.
- `model` — Optional. Model id, e.g. `gpt-4o-mini`.
- `maxTokens` — Optional (camelCase). Maximum completion length in tokens. **Default: ~1,400 tokens (roughly 5,600 characters of output).** Output that exceeds the cap is **silently truncated mid-stream** — no error is raised and `result.text` simply ends early.

**Long structured output: set `maxTokens` explicitly.** With the default cap, any generation longer than ~5,600 characters gets cut off, which turns structured output (e.g. a multi-section JSON document) into truncated, unparseable text — typically surfacing later as a `JSON.parse` error like `Expected , or ] after array element`. Size `maxTokens` to comfortably fit your expected output:

```javascript
// Generating a long multi-section JSON brief — raise the completion cap,
// or the default (~1,400 tokens) truncates the output and JSON.parse fails.
const result = await platform.generateText({
  userPrompt: buildBriefPrompt(input),
  model: 'gpt-4o-mini',
  maxTokens: 4000,
});
const brief = JSON.parse(result.text);
respond(200, { brief });
```

### platform.sendEmail({ to, subject, text?, html? })

Send an email immediately using the workspace's email system.

```javascript
await platform.sendEmail({
  to: 'user@example.com',
  subject: 'Your daily report',
  text: 'Here is your report...',
  html: '<h1>Daily Report</h1><p>Here is your report...</p>',
});
respond(200, { emailSent: true });
```

### platform.getContacts({ limit?, offset?, tag? })

Retrieve contacts from the workspace CRM.

```javascript
const result = await platform.getContacts({ limit: 10, tag: 'vip' });
console.log(`Found ${result.contacts?.length} VIP contacts`);
respond(200, { contacts: result.contacts });
```

### platform.createContact({ email, name?, phone?, tags? })

Add a new contact to the workspace CRM.

```javascript
await platform.createContact({
  email: 'newuser@example.com',
  name: 'Jane Doe',
  tags: ['lead', 'website'],
});
respond(200, { created: true });
```

### platform.fetch(url, options)

Same as the global `fetch` — an alias for the scoped fetch function. Like the global, it requires absolute URLs.

### platform.getLatestSession({ contactId, workspaceId?, limit? })

Resolve a CRM contact to their most recent workspace session, including that session's recent chat messages. Useful when a hook starts from a contact (e.g. one returned by `platform.getContacts`) and needs the session id to message the customer or inspect their conversation.

```javascript
const result = await platform.getLatestSession({ contactId: contact.id, limit: 20 });
// Returns the contact's latest workspace session (including its session id)
// plus the recent chat messages from that session.
```

- `contactId` — Required. The CRM contact id to resolve.
- `workspaceId` — Optional. Defaults to the current workspace.
- `limit` — Optional. Maximum number of chat messages to include.

### platform.externalFetch(url, options)

Outbound `fetch` variant intended for calls to external (non-platform) services. Same signature as the global `fetch`, and the same absolute-URL requirement applies.

### platform.integrations.isAvailable / platform.integrations.proxy

Helpers for the platform integration catalog: `isAvailable` reports whether a given platform integration is enabled for this workspace, and `proxy` forwards a request to an integration endpoint with workspace-scoped auth handled server-side. For most hooks, prefer calling the documented integration REST endpoints directly with absolute URLs; reach for these helpers only when you specifically need availability checks or server-side proxying.

---

## Scheduler Integration

Hooks can be triggered on a schedule using the Task Scheduler with `actionType: "hook"`:

```
POST /api/workspaces/:workspaceId/schedules
```

```json
{
  "name": "Nightly Cleanup",
  "frequency": "daily",
  "time": "02:00",
  "timezone": "UTC",
  "actionType": "hook",
  "actionPayload": {
    "hookName": "nightly-cleanup",
    "payload": { "dryRun": false }
  }
}
```

The scheduler will call the named hook with the provided payload in `request.body`.

---

## Reacting to Workspace Events (Scheduled Polling)

**There is no declarative event→hook subscription on the platform.** A hook is
invoked in exactly two ways: direct HTTP execution (the public execute URLs
above) and the Task Scheduler (`actionType: "hook"`). There is no API to
subscribe a hook to workspace analytics events — routes such as
`/api/workspaces/:id/event-listeners`, `.../event-hooks`, `.../event-triggers`,
`.../event-bindings`, and `.../webhooks` do **not** exist (they return 404),
and hook `metadata` has no event-subscription field. Do not probe for one.

The supported pattern is **scheduler + polling**: a scheduled hook reads recent
events from the CRM events endpoint and a durable WorkspaceDB ledger records
what has already been handled.

### Reading recent events

```
GET /api/crm/events?workspaceId=:workspaceId&eventType=purchase&days=1&limit=100
```

Hook code has no page origin, so this `fetch` must use the platform's full
`https://...` address as shown — a bare `/api/crm/events` path fails before any
request is sent. This read needs no additional caller secret: pass the hook's
canonical `workspaceId` global in the query as shown.

**Query parameters:**
- `workspaceId` — Required. Any id format (configId, `workspace-{configId}`, UUID).
- `eventType` — Optional. Filter to one event type (e.g. `purchase`); omit or pass `all` for every type.
- `excludeType` — Optional. Comma-separated event types to exclude.
- `spaceId` / `appId` — Optional. Narrow to one space or app.
- `days` — Optional look-back window in days (default 30). `startDate`/`endDate` (YYYY-MM-DD, inclusive) take precedence when both are given.
- `limit` — Optional. Max events returned (default 100), newest first.
- `aggregation` — Optional. `by_type`, `by_space`, `by_app`, or `summary` return counts instead of raw events (as `{ success, aggregation, data }`).

**Response shape (raw events)** — the array is under `data`, not at the top level:

```json
{
  "success": true,
  "data": [
    { "id": "...", "eventType": "purchase", "spaceId": "...", "sessionId": "...", "visitorId": "...", "eventData": { }, "createdAt": "..." }
  ],
  "count": 1
}
```

The stable contract is the `{ success, data, count }` envelope; inspect a live
response before relying on per-event fields.

### Ledger table for deduplication

Create a WorkspaceDB table (e.g. `processed_events` with a unique `event_id`
text column) **before** deploying the hook, using the WorkspaceDB tooling.
Hooks cannot create tables — `db.rawQuery` is SELECT-only.

### Example: process new `purchase` events hourly

**Step 1 — the hook** (name: `process-purchase-events`):

```javascript
const res = await fetch(
  `https://audos.com/api/crm/events?workspaceId=${workspaceId}&eventType=purchase&days=1&limit=100`
);
const json = await res.json();
const events = json.data || [];

let processed = 0;
for (const event of events) {
  const seen = await db.query('processed_events', {
    where: { event_id: String(event.id) },
    limit: 1,
  });
  if (seen.rowCount > 0) continue; // already handled on a previous run

  // React to the purchase — keep this step IDEMPOTENT (safe to repeat).
  await platform.postAgentMessage({
    message: `New purchase event processed (id ${event.id}).`,
  });

  await db.insert('processed_events', {
    event_id: String(event.id),
    event_type: 'purchase',
    processed_at: new Date().toISOString(),
  });
  processed++;
}

respond(200, { checked: events.length, processed });
```

**Step 2 — schedule it hourly:**

```
POST /api/workspaces/:workspaceId/schedules
{
  "name": "Process purchase events",
  "frequency": "hourly",
  "timezone": "UTC",
  "actionType": "hook",
  "actionPayload": { "hookName": "process-purchase-events" }
}
```

### Delivery semantics (at-least-once)

Make the look-back window **overlap** the polling interval (hourly polling with
`days=1` is a safe overlap) so a late, skipped, or failed run never leaves a
gap — overlapping windows re-read events the ledger already covers, and the
ledger skips them.

This pattern is **at-least-once**, and the side effect must be idempotent:
if a run crashes between the side effect and the ledger insert, the next run
repeats the side effect for that event. It is **not** exactly-once delivery —
no polling recipe can promise that. Design the reaction so a repeat is harmless
(e.g. upsert by `event_id`, or make the message/action safe to duplicate)
rather than assuming each event is seen exactly once.

---

## Use Cases

1. **Webhook Receivers** — Give Stripe, Mailgun, or any external service a URL to send events to
2. **Scheduled Automations** — Run daily/weekly tasks that send emails, post agent messages, or sync data (via Task Scheduler + hook action type + platform helpers)
3. **API Endpoints** — Create lightweight server-side endpoints for your space's frontend to call
4. **Data Processing** — Process form submissions, calculate analytics, transform data
5. **Email Handlers** — Process inbound emails forwarded by Mailgun
6. **AI Phone Agent Tools** — Provide live data to AI phone agents mid-call (see Phone Agent Integration below)
7. **Daily Agent Notifications** — Schedule a hook to post daily updates into the agent chat using `platform.postAgentMessage()`
8. **External API Integration** — Call third-party APIs (weather, stock prices, news) and deliver results to the workspace
9. **Event-Driven Automations (via polling)** — React to workspace analytics events such as purchases with a scheduled hook that polls `/api/crm/events` (see Reacting to Workspace Events above — there is no direct event→hook trigger)

---

## Common Patterns

### Webhook Receiver
```javascript
const event = request.body;
console.log('Event type:', event.type);

if (event.type === 'payment_intent.succeeded') {
  console.log('Payment received:', event.data.object.amount);
  respond(200, { received: true, processed: 'payment' });
} else {
  respond(200, { received: true, processed: 'ignored' });
}
```

### Form Handler
```javascript
const { name, email, message } = request.body;

if (!name || !email) {
  respond(400, { error: 'Name and email are required' });
} else {
  console.log(`Contact form from ${name} (${email}): ${message}`);
  respond(200, { success: true, message: 'Thanks for reaching out!' });
}
```

### Scheduled Task Handler
```javascript
const { dryRun } = request.body;
const trigger = request.headers['x-trigger'];

console.log(`Running cleanup, trigger: ${trigger}, dryRun: ${dryRun}`);

if (!dryRun) {
  // Perform cleanup logic
  console.log('Cleanup completed');
}

respond(200, { cleaned: true, dryRun });
```

### Daily Agent Message (Scheduled + Platform)
Post a daily update into the agent chat. Combine with the Task Scheduler to run automatically:

**Step 1: Create the hook:**
```javascript
// Hook name: "daily-summary"
const contacts = await platform.getContacts({ limit: 100 });
const totalContacts = contacts.contacts?.length || 0;

const message = `Daily Summary (${new Date().toLocaleDateString()}):\n` +
  `Total contacts: ${totalContacts}\n` +
  `Check your dashboard for details!`;

await platform.postAgentMessage({ message });
respond(200, { sent: true, contactCount: totalContacts });
```

**Step 2: Schedule it to run daily:**
```
POST /api/workspaces/:workspaceId/schedules
{
  "name": "Daily Summary to Agent",
  "frequency": "daily",
  "time": "09:00",
  "timezone": "America/New_York",
  "actionType": "hook",
  "actionPayload": {
    "hookName": "daily-summary"
  }
}
```

### External API Call
Fetch data from a third-party API and return it:
```javascript
const response = await fetch('https://api.weather.gov/gridpoints/TOP/31,80/forecast');
const data = await response.json();
const forecast = data.properties?.periods?.[0];

if (forecast) {
  respond(200, {
    temperature: forecast.temperature,
    description: forecast.shortForecast,
  });
} else {
  respond(200, { error: 'Could not fetch forecast' });
}
```

### Email Contacts with a Tag
Send a message to all contacts with a specific tag:
```javascript
const result = await platform.getContacts({ tag: 'newsletter' });
const contacts = result.contacts || [];

for (const contact of contacts) {
  await platform.sendEmail({
    to: contact.email,
    subject: 'Weekly Newsletter',
    html: '<h1>This week in our community</h1><p>Here are the highlights...</p>',
  });
}

respond(200, { sent: contacts.length });
```

### Verifying the Caller's Identity / Subscription Inside a Hook

When a space app component calls a hook (e.g. an entitlement or paywall check), the caller's session id arrives in the `X-Session-Id` request header as a `wses_<uuid>` value. Never trust a client-supplied email on its own — resolve and verify it server-side. Note that every platform call below must use an **absolute URL** (e.g. `https://audos.com/api/...`) — see the fetch Limits section.

Three building blocks:

1. **Resolve session → email** (works for OTP-verified sessions only): `GET https://audos.com/api/auth/otp/space/check-session?workspaceId={workspaceId}&sessionUuid={sessionId}` returns the verified email for that session.
2. **Prove an email ↔ session binding** (when the email is supplied by the client, or the session is not OTP-verified): `POST https://audos.com/api/space/{spaceId}/register` with body `{ "email": "..." }` is idempotent for existing contacts and returns that email's stable canonical `workspaceSessionId`. Compare it to the caller's `X-Session-Id` — a match proves the caller genuinely owns that email's session, without trusting client-supplied input.
3. **Check the entitlement:** `GET https://audos.com/api/space/{spaceId}/subscription-status?email=...` returns the subscription status for that email.

Here `{spaceId}` is the space identifier (e.g. `workspace-665201`); the hook's `workspaceId` global (the resolved UUID) works for the `check-session` call's `workspaceId` parameter.

```javascript
// Hook name: "check-entitlement"
const sessionId = request.headers['x-session-id'];
const spaceId = 'workspace-665201'; // your space id
const base = 'https://audos.com';   // hooks require absolute URLs

if (!sessionId) {
  respond(401, { error: 'Missing X-Session-Id' });
} else {
  // 1) Resolve the session to an email (OTP-verified sessions)
  const check = await fetch(
    `${base}/api/auth/otp/space/check-session?workspaceId=${workspaceId}&sessionUuid=${encodeURIComponent(sessionId)}`
  );
  const checkData = check.ok ? await check.json() : null;
  let email = checkData?.email;

  // 2) If the email came from the client instead, verify the binding:
  //    register is idempotent for existing contacts and returns the
  //    email's canonical workspaceSessionId.
  if (!email && request.body?.email) {
    const reg = await fetch(`${base}/api/space/${spaceId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: request.body.email }),
    });
    const regData = reg.ok ? await reg.json() : null;
    if (regData?.workspaceSessionId === sessionId) {
      email = request.body.email; // binding proven
    }
  }

  if (!email) {
    respond(403, { error: 'Could not verify caller identity' });
  } else {
    // 3) Look up the entitlement
    const sub = await fetch(
      `${base}/api/space/${spaceId}/subscription-status?email=${encodeURIComponent(email)}`
    );
    const status = await sub.json();
    respond(200, { email, subscription: status });
  }
}
```

### AI Phone Agent Tool
When used as a phone agent tool, `request.body` contains `args` (from the conversation) and `call` (call metadata):
```javascript
const { args, call } = request.body;
const productName = args.product || 'unknown';

const products = {
  'basic': { price: '$9/mo', features: 'Email support, 1 user' },
  'pro': { price: '$29/mo', features: 'Priority support, 5 users, API access' },
  'enterprise': { price: 'Custom', features: 'Dedicated support, unlimited users' }
};

const product = products[productName.toLowerCase()];
if (product) {
  respond(200, { result: `The ${productName} plan is ${product.price} and includes: ${product.features}.` });
} else {
  respond(200, { result: `We offer Basic ($9/mo), Pro ($29/mo), and Enterprise (custom pricing) plans.` });
}
```

To connect this hook to a phone agent, create the agent with a tool referencing this hook's name. See the AI Phone Calls integration docs for full details.

---

## Phone Agent Integration

Server Functions can be used as **mid-call tools** for AI phone agents. This allows phone agents to look up live data during conversations instead of hallucinating answers.

### How It Works

1. Create a Server Function (hook) that returns the data you need
2. When creating a phone agent via `POST /api/workspaces/:workspaceId/phone/agents`, include a `tools` array where each tool's `hookName` matches your hook's name
3. During a call, when the agent decides to use the tool, the platform executes the hook and feeds the result back to the agent to speak

### What the Hook Receives

When called by a phone agent mid-conversation, the hook's `request.body` has this structure:

```json
{
  "args": {
    "query": "value extracted from conversation by the agent"
  },
  "call": {
    "call_id": "call_abc123",
    "agent_id": "agent_xyz",
    "from_number": "+14155551234",
    "to_number": "+15551234567"
  }
}
```

- `request.body.args` — The arguments the agent extracted from the conversation, based on the tool's `parameters` schema
- `request.body.call` — Metadata about the current phone call

### Best Practices

- Return clear, speakable text in `respond(200, { result: "..." })` — the agent will read this to the caller
- Keep responses concise — long responses sound unnatural when spoken
- Handle missing/invalid args gracefully — return helpful fallback text
- Use `console.log()` for debugging — logs are captured but not spoken
