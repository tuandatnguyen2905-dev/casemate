# Meta Ads Integration

Read, control, and launch Meta (Facebook/Instagram) ad campaigns through the
platform's privileged Meta connection. A browser app cannot talk to the Meta
Marketing API directly — these endpoints proxy the workspace's connected ad
account, so the app gets insights, delivery status, object control, and paid
campaign launch without ever holding Meta credentials.

## Category
Marketing / Advertising

## Required API Keys
None — the workspace's Meta connection is used server-side. The app only needs
the workspace DB token that the WorkspaceDB SDK already injects (see
Authentication below).

## Concepts

- **Ad object hierarchy** — Meta organizes paid ads as Campaign → Ad Set → Ad.
  IDs returned by these endpoints (`metaCampaignId`, `metaAdSetId`, `metaAdIds`)
  are the real Meta object IDs.
- **Insights** — Performance metrics (spend, impressions, clicks, etc.) for any
  object level over a date range.
- **Object status** — Pause, activate, or archive a campaign/ad set/ad.
- **Launch** — Create and publish a brand-new paid campaign. This charges the
  workspace wallet up front; if the wallet is underfunded the call returns `402`
  and nothing is charged.
- **App owns its own records** — these endpoints do NOT persist campaigns or
  insights for you. Store whatever bookkeeping you need (campaign IDs, names,
  budgets) in your own WorkspaceDB tables.

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
// Connect a Meta account in-app, then read campaign insights.
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
    body: JSON.stringify({ scopes: ['ads'] }),
  }).then((r) => r.json());
  window.open(authUrl, '_blank');
}

// 3. Once connected, read performance.
const insights = await fetch(`${base}/ads/insights?level=campaign&objectId=CAMPAIGN_ID`, {
  headers: auth,
}).then((r) => r.json());
```

---

## API Endpoints

### Read Insights
```
GET /api/workspaces/:workspaceId/marketing/ads/insights?level=campaign&objectId={metaId}&datePreset=last_30d
```
- `level` — `campaign` | `adset` | `ad`
- `objectId` — the Meta object ID to report on
- `datePreset` — optional, e.g. `today`, `last_7d`, `last_30d`, `maximum`

**Response:** `{ success: true, insights: {...} }`

### Live Delivery Status (batch)
```
POST /api/workspaces/:workspaceId/marketing/ads/live-status
```
**Request:**
```json
{ "campaigns": [{ "metaCampaignId": "123", "metaAdSetId": "456", "metaAdIds": ["789"] }] }
```
**Response:** `{ success: true, statuses: [...] }`

### Pause / Activate / Archive an Object
```
POST /api/workspaces/:workspaceId/marketing/ads/object-status
```
**Request:**
```json
{ "level": "campaign", "objectId": "123", "status": "PAUSED" }
```
- `status` — `ACTIVE` | `PAUSED` | `ARCHIVED`

**Response:** `{ success: true, result: {...} }`

### List Ad Sets in a Campaign
```
GET /api/workspaces/:workspaceId/marketing/ads/campaigns/{metaCampaignId}/adsets
```
**Response:** `{ success: true, adsets: [...] }`

### List Ads in an Ad Set
```
GET /api/workspaces/:workspaceId/marketing/ads/adsets/{metaAdSetId}/ads
```
**Response:** `{ success: true, ads: [...] }`

### Launch a Paid Campaign
```
POST /api/workspaces/:workspaceId/marketing/ads/launch
```
Charges the workspace wallet. Returns `402` (no charge) if the wallet cannot
cover the budget.

**Request:**
```json
{
  "campaignName": "Summer Launch",
  "websiteUrl": "https://example.com",
  "budget": 50,
  "duration": 7,
  "budgetType": "lifetime",
  "objective": "OUTCOME_TRAFFIC",
  "creatives": [
    {
      "headline": "Try it free",
      "adCopyText": "The fastest way to do X.",
      "storyImageUrl": "https://.../story.jpg",
      "feedImageUrl": "https://.../feed.jpg",
      "videoUrl": "https://.../clip.mp4",
      "callToAction": "LEARN_MORE"
    }
  ]
}
```
- `budget` — in dollars
- `duration` — in days
- `budgetType` — optional, `lifetime` (default) or `daily`
- `objective`, `geoTargeting` — optional

**Response:**
```json
{
  "success": true,
  "metaCampaignId": "123",
  "metaAdSetId": "456",
  "metaAdIds": ["789"],
  "pixelId": "111",
  "attemptId": "uuid"
}
```

---

## Connecting a Meta Account (in-app)

The app can drive the Meta (Facebook/Instagram) OAuth flow itself — show a
"Connect your Meta account" button instead of sending the owner to the main
Audos UI. AppSmith holds the Meta tokens; the app only ever sees the connection
status. The flow is: call `connect/init`, open the returned `authUrl` (popup or
redirect), then poll `connect/status` until `connected` is true.

This is the **shared connect shape** (`connectInit` → open `authUrl` → poll
`connectStatus` → `disconnect`) used identically by the standalone **Connect
Meta** integration and by **Social Publishing** — learn it once and it applies
everywhere. If you only need to establish/read the Meta connection (no
ads/launch surface), install **Connect Meta** instead.

### Start the OAuth flow
```
POST /api/workspaces/:workspaceId/marketing/connect/init
```
**Request (all optional):**
```json
{ "scopes": ["content_publishing", "ads"], "parentWorkspaceId": "your-own-ref-id" }
```
- `scopes` — subset of `messaging` | `content_publishing` | `ads` (defaults to all three)
- `parentWorkspaceId` — your app's own reference ID (e.g. an end-user/business
  id). It is forwarded to the gateway and echoed back on the connection callback,
  so a multi-user app can attribute the connection to one of its own records.

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
export const metaAds = {
  _ctx() {
    const ws = window.__workspaceDb;
    return {
      base: `/api/workspaces/${ws.workspaceId}/marketing`,
      headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': ws.token }
    };
  },

  async getInsights(level, objectId, datePreset = 'last_30d') {
    const { base, headers } = this._ctx();
    const qs = new URLSearchParams({ level, objectId, datePreset });
    const res = await fetch(`${base}/ads/insights?${qs}`, { headers });
    return res.json();
  },

  async liveStatus(campaigns) {
    const { base, headers } = this._ctx();
    const res = await fetch(`${base}/ads/live-status`, {
      method: 'POST', headers, body: JSON.stringify({ campaigns })
    });
    return res.json();
  },

  async setStatus(level, objectId, status) {
    const { base, headers } = this._ctx();
    const res = await fetch(`${base}/ads/object-status`, {
      method: 'POST', headers, body: JSON.stringify({ level, objectId, status })
    });
    return res.json();
  },

  async listAdSets(metaCampaignId) {
    const { base, headers } = this._ctx();
    const res = await fetch(`${base}/ads/campaigns/${metaCampaignId}/adsets`, { headers });
    return res.json();
  },

  async listAds(metaAdSetId) {
    const { base, headers } = this._ctx();
    const res = await fetch(`${base}/ads/adsets/${metaAdSetId}/ads`, { headers });
    return res.json();
  },

  async launch(campaign) {
    const { base, headers } = this._ctx();
    const res = await fetch(`${base}/ads/launch`, {
      method: 'POST', headers, body: JSON.stringify(campaign)
    });
    if (res.status === 402) throw new Error('Wallet underfunded — top up to launch');
    return res.json();
  },

  // --- Connect a Meta account from inside the app ---
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
async function connectMeta() {
  const { authUrl } = await metaAds.connectInit({ scopes: ['content_publishing', 'ads'] });
  const popup = window.open(authUrl, 'meta-connect', 'width=600,height=800');
  // Poll for completion while the user authorizes in the popup.
  const timer = setInterval(async () => {
    const s = await metaAds.connectStatus();
    if (s.connected) {
      clearInterval(timer);
      popup?.close();
      // refresh your UI — s.page / s.instagram / s.adAccountIds are now populated
    }
  }, 2000);
}
```

## Use Cases
- A campaign dashboard that reports spend/clicks per campaign
- Pause/resume controls for live ads
- A "boost" button that launches a paid campaign from app content
- Reconciling live Meta delivery status against the app's own records

## Notes
- Launch charges the workspace wallet; surface the `402` underfunded case to users.
- Persist returned Meta IDs in your own WorkspaceDB tables — these endpoints are stateless.
