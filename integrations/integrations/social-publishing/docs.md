# Social Publishing Integration

Connect and publish to the workspace's social accounts — LinkedIn organization
pages and Instagram (feed / reel / story) — through the platform's privileged
connection. An app installed with **only** this integration can run the in-app
connect flow for both networks *and* post; it does not need the Meta Ads
integration. A browser app cannot talk to these networks directly; these
endpoints proxy the workspace's connected accounts so the app never holds social
credentials.

## Category
Marketing / Social Media

## Required API Keys
None — the workspace's LinkedIn/Instagram connection is used server-side. The
app only needs the workspace DB token that the WorkspaceDB SDK already injects
(see Authentication below).

## Concepts

- **Connect, then act** — Both networks follow the same shared connect shape:
  call `init`, open the returned `authUrl` (popup or redirect), poll `status`
  until connected, then `disconnect` to clear. This is the identical shape used
  by the **Connect Meta** and **Meta Ads** integrations, so you learn it once.
- **LinkedIn org picker** — After LinkedIn connects you list the user's
  organization pages and select one as the posting author; posts publish as that
  org page.
- **Instagram connect** — Instagram connects through the shared Meta connect
  flow with the `content_publishing` scope.
- **LinkedIn post** — Publishes to the connected LinkedIn organization page,
  with optional single image.
- **Instagram video** — Publishes a video to the connected Instagram account as
  a feed post, a reel, or a story.
- **App owns its own records** — these endpoints do NOT persist posts for you,
  and they do NOT schedule anything. Store post history in your own WorkspaceDB
  tables, and use the Task Scheduler integration if you need recurring posts.

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
// Publish a text post to the workspace's connected LinkedIn page.
const ws = (window as any).__workspaceDb;
const base = `/api/workspaces/${ws.workspaceId}/marketing`;

const result = await fetch(`${base}/posts/linkedin`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': ws.token },
  body: JSON.stringify({ text: 'Hello from our app!' }),
}).then((r) => r.json());
```

---

## API Endpoints

### Publish to LinkedIn
```
POST /api/workspaces/:workspaceId/marketing/posts/linkedin
```
**Request:**
```json
{
  "content": "We just shipped a big update.",
  "photoUrl": "https://.../image.jpg",
  "photoTitle": "Release banner"
}
```
- `content` — required post text
- `photoUrl`, `photoTitle` — optional single image

**Response:** `{ success: true, postId: "...", organization: "..." }`

### Publish a Video to Instagram
```
POST /api/workspaces/:workspaceId/marketing/posts/video
```
**Request:**
```json
{
  "destination": "instagram_reel",
  "videoUrl": "https://.../clip.mp4",
  "caption": "Behind the scenes 🎬"
}
```
- `destination` — `instagram_feed` | `instagram_reel` | `instagram_story`
- `videoUrl` — an https URL or a base64 data URL
- `caption` — optional

**Response:** `{ success: true, destination: "instagram_reel", mediaId: "..." }`

---

## Connecting Accounts (in-app)

Both connect flows follow the shared shape: start the OAuth flow, open the
returned `authUrl`, poll status until connected, then disconnect when needed.

### LinkedIn

```
POST /api/workspaces/:workspaceId/marketing/connect/linkedin/init
```
**Response:** `{ success: true, authUrl: "https://www.linkedin.com/..." }` — open it
(popup or redirect); the OAuth callback completes the connection.

```
GET /api/workspaces/:workspaceId/marketing/connect/linkedin/status
```
**Response:** `{ success: true, connected: true, organization: { id, urn, name } | null }`

```
GET /api/workspaces/:workspaceId/marketing/connect/linkedin/organizations
```
**Response:** `{ success: true, organizations: [...] }` — the org pages the user
can post as.

```
POST /api/workspaces/:workspaceId/marketing/connect/linkedin/select-organization
```
**Request:** `{ "organizationalTarget": "urn:li:organization:123", "organizationId": "123", "name": "My Co" }`
Selects the org page that LinkedIn posts publish as. `organizationalTarget` is
required (the others are optional bookkeeping).

```
POST /api/workspaces/:workspaceId/marketing/connect/linkedin/disconnect
```
**Response:** `{ success: true }`

### Instagram (Meta)

Instagram connects through the shared Meta connect flow with the
`content_publishing` scope:

```
POST /api/workspaces/:workspaceId/marketing/connect/init   { "scopes": ["content_publishing"] }
GET  /api/workspaces/:workspaceId/marketing/connect/status
POST /api/workspaces/:workspaceId/marketing/connect/disconnect
```
Status returns `{ success, connected, page, instagram, adAccountIds }`. (For the
full Meta connect surface, see the **Connect Meta** integration.)

---

## Installation

```javascript
// Reference window.__workspaceDb so the SDK + token are injected.
export const socialPublishing = {
  _ctx() {
    const ws = window.__workspaceDb;
    return {
      base: `/api/workspaces/${ws.workspaceId}/marketing`,
      headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': ws.token }
    };
  },

  // --- Posting (already-connected accounts) ---
  async postToLinkedIn(content, photoUrl, photoTitle) {
    const { base, headers } = this._ctx();
    const res = await fetch(`${base}/posts/linkedin`, {
      method: 'POST', headers, body: JSON.stringify({ content, photoUrl, photoTitle })
    });
    return res.json();
  },

  async postVideo(destination, videoUrl, caption) {
    const { base, headers } = this._ctx();
    const res = await fetch(`${base}/posts/video`, {
      method: 'POST', headers, body: JSON.stringify({ destination, videoUrl, caption })
    });
    return res.json();
  },

  // --- Connect LinkedIn from inside the app ---
  async connectLinkedInInit() {
    const { base, headers } = this._ctx();
    return (await fetch(`${base}/connect/linkedin/init`, { method: 'POST', headers })).json(); // { success, authUrl }
  },
  async linkedInStatus() {
    const { base, headers } = this._ctx();
    return (await fetch(`${base}/connect/linkedin/status`, { headers })).json();
  },
  async linkedInOrganizations() {
    const { base, headers } = this._ctx();
    return (await fetch(`${base}/connect/linkedin/organizations`, { headers })).json();
  },
  async selectLinkedInOrganization(org) {
    const { base, headers } = this._ctx();
    // org: { organizationalTarget, organizationId?, name? }
    return (await fetch(`${base}/connect/linkedin/select-organization`, { method: 'POST', headers, body: JSON.stringify(org) })).json();
  },
  async disconnectLinkedIn() {
    const { base, headers } = this._ctx();
    return (await fetch(`${base}/connect/linkedin/disconnect`, { method: 'POST', headers })).json();
  },

  // --- Connect Instagram (Meta) from inside the app ---
  async connectInstagramInit() {
    const { base, headers } = this._ctx();
    return (await fetch(`${base}/connect/init`, { method: 'POST', headers, body: JSON.stringify({ scopes: ['content_publishing'] }) })).json(); // { success, authUrl }
  },
  async instagramStatus() {
    const { base, headers } = this._ctx();
    return (await fetch(`${base}/connect/status`, { headers })).json();
  },
  async disconnectInstagram() {
    const { base, headers } = this._ctx();
    return (await fetch(`${base}/connect/disconnect`, { method: 'POST', headers })).json();
  }
};
```

### Connect button example (LinkedIn, with org picker)

```tsx
async function connectLinkedIn() {
  const { authUrl } = await socialPublishing.connectLinkedInInit();
  const popup = window.open(authUrl, 'li-connect', 'width=600,height=800');
  const timer = setInterval(async () => {
    const s = await socialPublishing.linkedInStatus();
    if (s.connected) {
      clearInterval(timer);
      popup?.close();
      // List org pages and let the user pick one as the posting author.
      const { organizations } = await socialPublishing.linkedInOrganizations();
      const chosen = organizations[0];
      await socialPublishing.selectLinkedInOrganization({
        organizationalTarget: chosen.organizationalTarget || chosen.urn,
        organizationId: chosen.id,
        name: chosen.name,
      });
      // now socialPublishing.postToLinkedIn(...) will publish as that page
    }
  }, 2000);
}
```

## Use Cases
- A "Connect LinkedIn / Instagram" onboarding step inside the app
- A "share to LinkedIn" button on app-generated content
- Publishing a generated video as an Instagram reel or story
- A simple cross-posting composer backed by the app's own WorkspaceDB history

## Notes
- These endpoints are stateless — persist post IDs/history in your own WorkspaceDB tables.
- For recurring/scheduled posts, combine with the Task Scheduler integration.
