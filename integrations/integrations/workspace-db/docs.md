# WorkspaceDB Integration

Store and query structured data in isolated PostgreSQL tables. Every workspace gets its own database schema. The SDK is auto-injected into Space apps — no imports needed.

## Category
Data Persistence / Database

## Required API Keys
None — WorkspaceDB is built into the platform. No configuration needed.

---

## Client SDK — `useWorkspaceDB` Hook

Auto-injected into Space apps at compile time. No import needed.

```tsx
function MyComponent() {
  const { data, loading, error, total, refresh } = useWorkspaceDB('orders', {
    filters: [
      { column: 'status', operator: 'eq', value: 'active' }
    ],
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 50,
    offset: 0,
    shared: false
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <ul>{data.map(row => <li key={row.id}>{row.name}</li>)}</ul>;
}
```

### Hook Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `filters` | `Array<{ column, operator, value }>` | `[]` | Filter rows |
| `orderBy` | `{ column, direction }` | — | Sort by column (`asc` or `desc`) |
| `limit` | `number` | `50` | Max rows to return |
| `offset` | `number` | `0` | Skip rows for pagination |
| `columns` | `string[]` | — | Column projection — return only these columns (sent as REST `_select`). Omit for every column |
| `shared` | `boolean` | `false` | If `true`, reads the workspace-shared scope: rows with `session_id = NULL`, rows written by the workspace founder, and the caller's own rows — never another visitor's session-owned rows |

### Filter Operators

`eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `ilike`

### Return Value

`{ data: Row[], loading: boolean, error: Error | null, total: number, refresh: () => void }`

---

## Column Projection — returning fewer columns

Every read surface can ask for a subset of columns. The three forms are the
same feature and hit the same server behavior.

```tsx
// Hook
const { data } = useWorkspaceDB('players', {
  shared: true,
  columns: ['id', 'username', 'color'],
});
```

```ts
// Imperative client
const { data } = await window.__workspaceDb.from('players', { shared: true })
  .select('id', 'username', 'color')
  .get();
```

```
# REST
GET /api/workspaces/{workspaceId}/data/players?_shared=1&_select=id,username,color
```

### Behavior

- **Unknown columns are a hard error.** A name that is not a real column fails
  the whole request — it is never silently ignored and the response is never
  partially projected. Check the table schema before projecting.
- **Nothing is added for you.** Only the columns you list come back. `id`,
  `session_id`, `created_at`, and `updated_at` are NOT implicitly included, so
  list `id` yourself if your UI keys rows by it.
- **Rows are unaffected.** Projection picks columns, never rows: the same rows
  match, and `total` is exactly what it would be without `columns`.
- **Omitting it keeps the old behavior.** No `columns` (or an empty array)
  sends no `_select` and returns every column, exactly as before.

### Projection is payload reduction, NOT access control

`columns` only shapes the response of *that one request*. The workspace DB
token lives in the published app bundle, so any visitor who can make the read
can repeat it without `columns` and get every column the read scope allows.
Never use projection to hide a column from a visitor — keep the sensitive value
out of the readable rows instead (see "Shared rows are fully visitor-readable"
below).

---

## Client SDK — `window.__workspaceDb`

Lower-level client for imperative operations (inserts, updates, deletes, advanced queries).

### Query

```ts
const { data, total } = await window.__workspaceDb.from('orders')
  .eq('status', 'active')
  .orderBy('created_at', 'desc')
  .limit(50)
  .offset(0)
  .get();
```

### Select (column projection)

```ts
const { data } = await window.__workspaceDb.from('orders')
  .select('id', 'customer_name', 'total')
  .eq('status', 'active')
  .get();
```

`.select(...)` takes column names as arguments and serializes to the REST
`_select` parameter — the same feature as the hook's `columns` option. See
[Column Projection](#column-projection--returning-fewer-columns) for edge and
security behavior.

### Insert

```ts
await window.__workspaceDb.from('orders').insert({
  customer_name: 'Alice',
  total: 99.99
});
```

> **NOT NULL columns must be in the payload.** The server auto-injects
> `id`, `created_at`, `updated_at`, `session_id`, and (when the table
> has a `user_profile_id` FK to `user_profiles`) `user_profile_id` from
> the visitor session. Every OTHER NOT-NULL-no-default column must be
> present as a literal key in the object passed to `.insert({...})`. If
> you omit one, the publish-time lint will block the publish with a
> precise `file:line` error naming the missing column(s), and the
> runtime `POST /workspaces/:wsId/data/:table` endpoint will reject the
> request with `400 missing_required_columns` when the
> `WORKSPACE_DATA_PREFLIGHT` flag is in `enforce` mode.
>
> Spread (`{ ...row }`) and computed keys (`{ [k]: v }`) are reported
> as warnings, not errors — the lint cannot statically prove what
> they contain.

### Bulk Insert

```ts
await window.__workspaceDb.from('orders').bulkInsert([
  { customer_name: 'Alice', total: 99.99 },
  { customer_name: 'Bob', total: 49.99 },
  // up to 1000 rows
]);
```

### Update

```ts
await window.__workspaceDb.from('orders').update(rowId, {
  status: 'shipped'
});
```

### Delete

```ts
await window.__workspaceDb.from('orders').delete(rowId);
```

### Count

```ts
const total = await window.__workspaceDb.from('orders').count();
```

### Aggregate

```ts
const totalRevenue = await window.__workspaceDb.from('orders')
  .eq('status', 'completed')
  .aggregate('total', 'sum');
// Operations: count, sum, avg, min, max
```

### Get by ID

```ts
const { data } = await window.__workspaceDb.from('orders').getById(rowId);
```

### Filter Methods

| Method | Description |
|--------|-------------|
| `.eq(column, value)` | Equal |
| `.neq(column, value)` | Not equal |
| `.gt(column, value)` | Greater than |
| `.gte(column, value)` | Greater than or equal |
| `.lt(column, value)` | Less than |
| `.lte(column, value)` | Less than or equal |
| `.like(column, value)` | SQL LIKE pattern |
| `.ilike(column, value)` | Case-insensitive LIKE |
| `.where(column, op, value)` | Generic filter |

---

## Session Scoping — Shared vs Per-Visitor Data

By default, `useWorkspaceDB` auto-filters by the current visitor's `session_id`. Each visitor sees only their own rows.

Use `{ shared: true }` to read the **workspace-shared scope** instead. A shared
read returns:

- rows with `session_id = NULL` — workspace-shared data, which is how Otto/MCP
  tools and `{ shared: true }` writes store rows,
- rows written by the workspace founder, and
- the caller's own rows.

It does **not** return another visitor's session-owned rows. "Shared" means
"the rows everyone is meant to see", not "every row in the table".

| Data Type | Example | Use `shared`? | Why |
|-----------|---------|---------------|-----|
| Per-visitor entries | Journals, trackers, personal logs | No (default) | Each visitor sees only their own data |
| Reference/catalog data | Articles, products, drill libraries | Yes | All visitors should see the same content |
| MCP-inserted data | Data seeded by Otto or MCP tools | **Yes** | MCP tools insert with `session_id=NULL` — invisible without `shared: true` |
| Collaborative data | Shared boards, team projects | Yes | Multiple visitors need to see the same data |

### IMPORTANT: MCP-Seeded Data

Data inserted via MCP/Otto tools has `session_id=NULL`. When an app reads with the default session-scoped behavior, it adds a `session_id=eq.<visitor_id>` filter. Rows with `session_id=NULL` do not match this filter and are **invisible** to app visitors.

**Fix:** Always use `{ shared: true }` when reading MCP-seeded data:

```tsx
// WRONG — returns [] even though table has rows (MCP data has session_id=NULL)
const { data } = useWorkspaceDB('articles');

// CORRECT — returns all rows including MCP-seeded data
const { data } = useWorkspaceDB('articles', { shared: true });
```

### Shared access with imperative API

```ts
const { data } = await window.__workspaceDb.from('articles', { shared: true }).get();
```

### Shared rows are fully visitor-readable

A shared read returns **every column** of every row in the shared scope. The
workspace DB token is embedded in the published app bundle, so any visitor can
replay that request from their browser with different filters, different
columns, or no projection at all. Treat everything stored in a workspace-shared
row as visible to every visitor.

Never put plaintext secrets, API keys, email addresses, phone numbers, or other
PII in a shared row. Column projection does not help here — a visitor can
always ask for the columns you left out.

**Recommended pattern for PII (an email address, say):**

1. Store a **digest** plus a **masked display value** in the shared table —
   never the real address.
2. Keep the real address in the workspace CRM contact record.
3. Resolve the digest back to the real value **server-side**, in a Server
   Function that applies its own authorization.

```ts
// Shared row: safe for every visitor to read
await window.__workspaceDb.from('players', { shared: true }).insert({
  username: 'ada',
  email_digest: digest,        // salted hash, computed in a Server Function
  email_masked: 'a**@e***.com', // what the UI displays
});
```

```javascript
// Server Function (see the server-functions integration): the real address
// lives in the CRM, and only server-side code ever sees or sends it.
await platform.createContact({ email: 'ada@example.com', name: 'ada' });

const { contacts } = await platform.getContacts({ limit: 100 });
const match = contacts.find(c => sha256(c.email + salt) === body.emailDigest);
if (!match) respond(404, { error: 'unknown player' });
await platform.sendEmail({ to: match.email, subject: 'Your turn', text: '...' });
respond(200, { sent: true });
```

The app calls that Server Function with the digest — it never handles the real
address:

```ts
await fetch(`/api/hooks/execute/workspace-{configId}/notify-player`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ emailDigest: digest }),
});
```

### Diagnostic Hint

When the SDK gets an empty result but the table has rows, the API response includes a `_diagnostic` field: `table_has_rows_but_session_filter_excluded_all`. The SDK logs this to the browser console as a warning.

---

## Writes from the browser are UNTRUSTED

The workspace DB token is embedded in the published app bundle. It is
effectively **public** — anyone can pull it out of the bundle and replay any
write from curl. So a client-side write is a *request*, never a guarantee:

- Do not trust that a row was written by the visitor whose `session_id` it
  carries, unless the server enforced it.
- Do not keep money-, payment-, entitlement- or trust-sensitive state in
  columns the browser can set. Route those through a **Server Function**
  (see the server-functions integration), which runs server-side with the
  workspace's real credentials.

The server enforces a **per-table write policy** on every client write. Reads
are unchanged.

### What the server enforces

| Rule | What it blocks |
|---|---|
| `ownerColumn` | Writing, editing or deleting a row that belongs to another app user. The caller's `session_id` is verified against the workspace's real sessions — a made-up id gets no ownership. |
| `protectedColumns` | A client setting a server-only column (e.g. `paid`, `amount_cents`, `verified`, `role`). Only a Server Function or Otto can set these. |
| `allowSharedWrites` | Writing unowned/shared rows (`{ shared: true }`) on tables where every row must belong to someone. |
| `untrustedOperations` | Whole operations, e.g. a table that clients may insert into but never update or delete. |

A refusal is a structured `403` naming the rule that blocked it:

```json
{
  "error": "Column \"paid\" is server-only on table \"app_splits\"...",
  "code": "WRITE_POLICY_DENIED",
  "rule": "protected_column",
  "column": "paid",
  "table": "app_splits"
}
```

### Declaring the policy

Ask Otto to declare it when the table is created (`db_create_table`), or to add
it to an existing table (`db_alter_table` → `changes.writePolicy`). For example:

> "On `app_splits`, make `paid` and `amount_cents` server-only, and don't allow
> shared writes."

```jsonc
{
  "ownerColumn": "session_id",          // null = the table has no per-row owner
  "protectedColumns": ["paid", "amount_cents"],
  "allowSharedWrites": false,
  "requireVerifiedOwner": true,
  "untrustedOperations": ["insert", "update", "delete"]
}
```

Tables created from now on get the safe default (`session_id` owner, no shared
writes, verified owner required). Tables that existed before the policy layer
keep behaving exactly as they did until someone declares a policy on them —
nothing breaks, but nothing is protected either, so migrate any table holding
sensitive state.

Founder/owner-level access (Otto, the dashboard, MCP tools) and Server
Functions are exempt — they are already server-side and authenticated.

### The pattern for money- or trust-sensitive state

```ts
// WRONG — the browser decides who paid.
await window.__workspaceDb.from('app_splits').update(id, { paid: true });

// RIGHT — the server decides, after checking with the payment provider.
await fetch(`/api/hooks/execute/workspace-{configId}/mark-paid`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ splitId: id, paymentIntentId }),
});
```

With `paid` in `protectedColumns`, the first call is refused with
`WRITE_POLICY_DENIED` and only the Server Function can move the flag.

---

## Standard Columns

Every table automatically gets these columns (do not define them yourself):

| Column | Type | Description |
|--------|------|-------------|
| `id` | serial | Primary key (auto-increment) |
| `session_id` | text | For per-visitor data scoping |
| `created_at` | timestamp | Row creation time |
| `updated_at` | timestamp | Last update time |

---

## Schema changes & JSON columns

### Columns are fixed at creation (from app code)

A table's columns are defined when the table is created. **App code cannot
add, rename, or retype columns at runtime** — there is no ALTER operation on
the data API, and inserting a key that isn't a real column is rejected. The
schema is changed by an agent using the schema tools below, and then the app
code is updated to match.

The standard columns (`id`, `session_id`, `created_at`, `updated_at`)
are added automatically at creation and always exist — never declare them
yourself and never try to set them on insert.

### Evolve an existing table — do not create a replacement

An existing table can be extended in place. Do **not** create a `<name>_v2`
replacement table and migrate rows into it: creating a table that already
exists fails with `TABLE_EXISTS`, and a replacement leaves the original behind
as an orphan that keeps advertising itself as live.

| Goal | Editing agent (MCP bridge) | Otto |
|------|----------------------------|------|
| Add a nullable column, an index, or a foreign key to an existing table | `workspace_db_alter_table({ table, addColumns?, addIndexes?, addForeignKeys? })` — strictly additive; existing rows and columns are untouched | `db_alter_table` |
| Relabel a table — change its display name or description, e.g. to mark a superseded table deprecated | `workspace_db_update_table_metadata({ table, displayName?, description? })` — registry metadata only, no DDL and no row changes | `db_update_table_metadata` |
| Rename, drop, or retype a column; drop a table | Not available — say so and let the founder ask Otto | `db_alter_table` / `db_drop_table` (destructive-confirmation gated) |

Adding a column with `workspace_db_alter_table` is additive only: `unique` and
`primaryKey` are rejected on added columns (add a unique index instead), and
added columns must be nullable so existing rows stay valid.

### Re-creating an existing table changes nothing

Asking to create a table whose name already exists is **refused** with
`TABLE_EXISTS` and changes absolutely nothing — not the columns, not the rows,
not the `displayName` or `description`. It is **not** an idempotent "ensure
these columns exist" call: passing the existing columns plus a new one does not
add the new one. A re-call is harmless, but it is never a way to add a field —
use `workspace_db_alter_table` (Otto: `db_alter_table`) for that.

### `defaultValue` is raw SQL, passed through as written

A column's `defaultValue` is interpolated into the DDL **exactly as you type
it** — it is never quoted or escaped for you. A text default must carry its own
single quotes (`"'app'"`); an unquoted word (`"app"`) is read as a **column
name**, not as the string `app`. Numbers (`"0"`), booleans (`"false"`), and SQL
expressions (`"now()"`, `"gen_random_uuid()"`) are written through as-is.

### Raw SQL cannot change the schema

`workspace_db_raw_query`, `db.rawQuery`, and the `/db/sql` endpoint are
**SELECT-only**. A `CREATE TABLE`, `ALTER TABLE`, `INSERT`, `UPDATE`, or
`DELETE` sent through them is **rejected with a loud `RAW_QUERY_RESTRICTED`
error** — it does not silently fail, and it never applies. Use the schema
tools above.

### Writing to `json` columns

A `json` column is stored as PostgreSQL JSONB. Pass a plain JS object or
array directly in `.insert({...})` / `.update(...)` — do **not**
`JSON.stringify` it first. (A string value is accepted only when it is
itself valid JSON text; a malformed JSON string makes the write fail.) Reads
return the parsed object/array, not a string.

```ts
await window.__workspaceDb.from('orders').insert({
  customer_name: 'Alice',
  total: 99.99,
  line_items: [{ sku: 'A1', qty: 2 }],  // json column: pass the object/array directly
});
```

---

## Error Handling

All SDK operations return structured errors:

```json
{ "error": "Table not found", "code": "TABLE_NOT_FOUND" }
```

The SDK throws `WorkspaceDBError` with `.message` and `.status` properties.

---

## REST API (for external integrations)

**Base URL:** `/api/workspaces/{workspaceId}/data`

**Authentication:** `X-Workspace-DB-Token` header or `Authorization: Bearer <token>`

### List Tables
```
GET /api/workspaces/{workspaceId}/db/tables
```

### Describe Table
```
GET /api/workspaces/{workspaceId}/db/tables/{tableName}?module={module}
```
`module` is optional. When omitted, searches across all modules.

### Query Rows
```
GET /api/workspaces/{workspaceId}/data/{table}?_limit=50&_offset=0&_sort=created_at&_order=desc&status=eq.active
```

### Insert Rows
```
POST /api/workspaces/{workspaceId}/data/{table}
Content-Type: application/json

{ "rows": [{ "name": "Alice", "email": "alice@example.com" }] }
```

### Update Row
```
PATCH /api/workspaces/{workspaceId}/data/{table}/{id}
Content-Type: application/json

{ "name": "Updated Name" }
```

### Delete Row
```
DELETE /api/workspaces/{workspaceId}/data/{table}/{id}
```

### Query Parameters

| Param | Description |
|-------|-------------|
| `_limit` | Max rows (default 50, max 1000) |
| `_offset` | Skip rows |
| `_sort` | Column to sort by |
| `_order` | `asc` or `desc` |
| `_select` | Comma-separated column names to return (projection). An unknown column name fails the request |
| `_shared` | Set to `1` to read the workspace-shared scope (see Session Scoping) |
| `{column}={op}.{value}` | Filter (e.g., `age=gt.21`, `name=like.%john%`) |
