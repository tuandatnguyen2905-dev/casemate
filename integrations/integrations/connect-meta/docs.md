# Connect Meta Integration

Form, read, and clear the workspace's Meta (Facebook/Instagram) connection from
inside your app — a dedicated "Connect your Meta account" button. This is the
**connect-only** surface: it establishes/reads the connection (page, Instagram
account, ad account IDs) and nothing else. There is **no campaign launch, no
publishing, and no wallet charge** here. Install this alone when your app just
needs to get a Meta account connected; install **Meta Ads** if you also need to
launch/read ads, or **Social Publishing** if you also need to post.

AppSmith holds the Meta tokens server-side; the app only ever sees the
connection status.

## Category
Marketing

## Required API Keys
None — the workspace's Meta connection is used server-side. The app only needs
the workspace DB token that the WorkspaceDB SDK already injects (see
Authentication below).

## Concepts

- **Connect flow** — The shared connect shape used across all marketing
  integrations: call `connect/init`, open the returned `authUrl` (popup or
  redirect), then poll `connect/status` until `connected` is true.
- **Scopes** — Optionally restrict what the connection grants:
  `messaging` | `content_publishing` | `ads`. Omit `scopes` to request all three.
- **Connection facts** — Once connected, status exposes `page`, `instagram`, and
  `adAccountIds`. These are read-only here; acting on them lives in the Meta Ads
  / Social Publishing integrations.

## Authentication

Every request is workspace-scoped and authenticated. Reference
`window.__workspaceDb` anywhere in your app so the SDK (and its token) is
injected, then attach the token on each call:

```ts
const ws = (window as any).__workspaceDb;        // { workspaceId, token }
const base = `/api/workspaces/${ws.workspaceId}/marketing`;
const headers = { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': ws.token };
```

---

## Quick Start

```tsx
const ws = (window as any).__workspaceDb;
const base = `/api/workspaces/${ws.workspaceId}/marketing`;
const auth = { 'X-Workspace-DB-Token': ws.token };

// 1. Is an account already connected?
const { connected } = await fetch(`${base}/connect/status`, { headers: auth }).then((r) => r.json());

// 2. If not, start the OAuth flow and open the returned URL, then poll status.
if (!connected) {
  const { authUrl } = await fetch(`${base}/connect/init`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({}), // all scopes by default
  }).then((r) => r.json());
  window.open(authUrl, '_blank');
}
```

---

## API Endpoints

### Start the OAuth flow
```
POST /api/workspaces/:workspaceId/marketing/connect/init
```
**Request (all optional):**
```json
{ "scopes": ["content_publishing", "ads"], "parentWorkspaceId": "your-own-ref-id" }
```
- `scopes` — subset of `messaging` | `content_publishing` | `ads` (defaults to all three)
- `parentWorkspaceId` — your app's own reference ID (e.g. an end-user/business id).
  It is forwarded to the gateway and echoed back on the connection callback, so a
  multi-user app can attribute the connection to one of its own records.

**Response:** `{ success: true, authUrl: "https://www.facebook.com/..." }`

### Read connection status
```
GET /api/workspaces/:workspaceId/marketing/connect/status
```
**Response:**
```json
{
  "success": true,
  "connected": true,
  "status": "connected",
  "page": { "id": "123", "name": "My Page" },
  "instagram": { "id": "456", "username": "myhandle" },
  "adAccountIds": ["act_789"]
}
```
When nothing is connected: `{ success: true, connected: false, status: "not_connected" }`.

### Disconnect
```
POST /api/workspaces/:workspaceId/marketing/connect/disconnect
```
**Response:** `{ success: true }`

---

## Installation

```javascript
// Reference window.__workspaceDb so the SDK + token are injected.
// Connect-only: form / read / clear the Meta connection. No launch or publish.
export const connectMeta = {
  _ctx() {
    const ws = window.__workspaceDb;
    return {
      base: `/api/workspaces/${ws.workspaceId}/marketing`,
      headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': ws.token }
    };
  },

  async connectInit(opts = {}) {
    const { base, headers } = this._ctx();
    const res = await fetch(`${base}/connect/init`, {
      method: 'POST', headers, body: JSON.stringify(opts)
    });
    return res.json();   // { success, authUrl }
  },

  async connectStatus() {
    const { base, headers } = this._ctx();
    return (await fetch(`${base}/connect/status`, { headers })).json();
  },

  async disconnect() {
    const { base, headers } = this._ctx();
    return (await fetch(`${base}/connect/disconnect`, { method: 'POST', headers })).json();
  }
};
```

### Connect button example

```tsx
async function connectMetaAccount() {
  const { authUrl } = await connectMeta.connectInit(); // all scopes by default
  const popup = window.open(authUrl, 'meta-connect', 'width=600,height=800');
  // Poll for completion while the user authorizes in the popup.
  const timer = setInterval(async () => {
    const s = await connectMeta.connectStatus();
    if (s.connected) {
      clearInterval(timer);
      popup?.close();
      // refresh your UI — s.page / s.instagram / s.adAccountIds are now populated
    }
  }, 2000);
}
```

## Use Cases
- A standalone "Connect your Meta account" onboarding step
- Showing which page / Instagram / ad accounts the workspace has connected
- Letting an owner disconnect and reconnect a Meta account

## Notes
- Connect-only — no launch, publish, or wallet charges. Add **Meta Ads** to
  launch/read campaigns or **Social Publishing** to post.
- The connect flow shape (`connectInit` → open `authUrl` → poll `connectStatus`
  → `disconnect`) is identical across Connect Meta, Meta Ads, and Social
  Publishing, so you learn it once.
