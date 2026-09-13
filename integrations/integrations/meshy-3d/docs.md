# Meshy 3D Integration

Generate 3D models from text prompts or reference images using Meshy AI — the platform proxies requests so apps never manage the Meshy key, polling, or wallet billing.

The platform proxies requests to Meshy so your app never manages the Meshy API
key, polling boilerplate, or wallet billing — call the endpoints below with a
simple `fetch()`.

## Category
AI / 3D

## Required API Keys (Platform-Level)

All keys are managed at the platform level. Apps call the endpoints below and the
platform handles authentication.

- `MESHY_API_KEY` — Managed by platform admin (not per workspace). The proxy
  never exposes it to the client.

---

## Endpoints

| Method | Path | Purpose |
| ------ | ---- | ------- |
| `POST` | `/api/generate/3d/text` | Kick off a text-to-3D job. |
| `POST` | `/api/generate/3d/image` | Kick off an image-to-3D job. |
| `GET`  | `/api/generate/3d/status/:taskId` | Poll a job's status. |

All endpoints accept and return JSON. Auth follows the standard app session /
`x-app-id` + `x-user-id` headers. Wallet attribution resolves from `x-app-id`,
`?workspaceId=`, or a `workspaceId` field in the body.

---

## `POST /api/generate/3d/text`

```
POST /api/generate/3d/text
```

Starts an asynchronous text-to-3D job. Returns a `taskId` you poll until the
model is ready.

### Request body

| Field | Type | Required | Notes |
| ----- | ---- | -------- | ----- |
| `prompt` | string (1–600) | yes (preview) | Text description of the model. Required when `mode` is `preview`. |
| `artStyle` | enum | no | One of `realistic`, `cartoon`, `low-poly`, `sculpture`, `pbr`. Default `realistic`. |
| `negativePrompt` | string | no | Things that should not appear. |
| `mode` | `"preview"` \| `"refine"` | no, default `"preview"` | `preview` generates base geometry; `refine` adds textures. |
| `previewTaskId` | string | yes (refine) | The id of a completed preview task to refine. |
| `workspaceId` | string | no | Wallet attribution. Inferred from `x-app-id` when omitted. |

### Response (`200`)

```json
{
  "taskId": "0193b...e4",
  "status": "pending",
  "estimatedDuration": "1-3 minutes"
}
```

### Example

```javascript
const res = await fetch('/api/generate/3d/text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A low-poly wooden treasure chest with iron bands',
    artStyle: 'low-poly'
  })
});
const { taskId } = await res.json();
```

---

## `POST /api/generate/3d/image`

```
POST /api/generate/3d/image
```

Starts an asynchronous image-to-3D job from a reference image.

### Request body

| Field | Type | Required | Notes |
| ----- | ---- | -------- | ----- |
| `imageData` | string | yes | A reference image as raw base64, a `data:image/...;base64,...` URL, or an `http(s)://` URL. Inline images are capped at ~10MB decoded. |
| `artStyle` | enum | no | Same enum as text-to-3D. Default `realistic`. |
| `mode` | `"preview"` \| `"refine"` | no | |
| `workspaceId` | string | no | Wallet attribution. |

`imageData` accepts the same three input shapes as the
`image-and-video-generation` integration:

- raw base64-encoded image bytes (no `data:` prefix), or
- a `data:image/<mime>;base64,<bytes>` URL, or
- an `http(s)://` URL — passed through to Meshy, which downloads it.

### Response (`200`)

```json
{
  "taskId": "0193b...e4",
  "status": "pending",
  "estimatedDuration": "1-3 minutes"
}
```

### Example

```javascript
// http(s) URL input
await fetch('/api/generate/3d/image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    imageData: 'https://example.com/product.png',
    artStyle: 'realistic'
  })
});

// data: URL input
await fetch('/api/generate/3d/image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ imageData: 'data:image/png;base64,iVBORw0KG...' })
});
```

---

## `GET /api/generate/3d/status/:taskId`

```
GET /api/generate/3d/status/:taskId
```

Polls a job. Works for both text and image jobs. Optionally pass `?type=text`
or `?type=image` as a hint; otherwise the proxy tries text first, then image.

### Response (`200`)

```json
{
  "status": "processing",
  "progress": 60,
  "modelUrls": {
    "glb": "https://assets.meshy.ai/.../model.glb",
    "fbx": "https://assets.meshy.ai/.../model.fbx",
    "obj": "https://assets.meshy.ai/.../model.obj",
    "usdz": "https://assets.meshy.ai/.../model.usdz"
  },
  "thumbnailUrl": "https://assets.meshy.ai/.../thumbnail.png",
  "errorMessage": null
}
```

`status` is one of `pending | processing | completed | failed`. `modelUrls` is
populated as soon as the job completes. Poll every ~5 seconds until `status`
becomes `completed` or `failed`.

---

## Art styles

| `artStyle` | Best for |
| ---------- | -------- |
| `realistic` | Photoreal products, props, lifelike objects (default). |
| `cartoon` | Stylized, game-ready characters and objects. |
| `low-poly` | Lightweight, faceted meshes for real-time / web. |
| `sculpture` | High-detail statue / figurine looks. |
| `pbr` | Realistic geometry with physically-based rendering textures. |

---

## Pricing

Each kickoff is wallet-debited via the platform spending gate. If the provider
kickoff fails, the charge is automatically refunded.

| Call | Price (USD) |
| ---- | ----------- |
| Text-to-3D (preview) | $0.20 |
| Text-to-3D (refine) | $0.40 |
| Image-to-3D | $0.30 |

When the wallet is short, the endpoint returns a canonical `insufficient_funds`
(402):

```json
{
  "code": "insufficient_funds",
  "required": 0.20,
  "available": 0.05,
  "shortfall": 0.15,
  "headroomMultiplier": 1.0,
  "message": "Insufficient wallet balance for Meshy text-to-3D (preview). ..."
}
```

If no billable workspace can be resolved, the kickoff endpoints reject the
request with `400` — paid provider usage is never run un-billed.

---

## Error shapes

| Status | Meaning |
| ------ | ------- |
| `400` | Invalid request parameters (Zod `details` array), missing required field, or no billable workspace could be resolved. |
| `402` | Insufficient wallet balance (canonical `insufficient_funds`). |
| `502` | Provider kickoff failed — wallet charge auto-refunded (`{ error, refunded }`). |
| `503` | Meshy is not configured on this platform. |
| `500` | Unexpected server error. |

> A billable workspace is **required** for the two kickoff endpoints. Supply a
> valid `x-app-id` header, `?workspaceId=` query param, or a `workspaceId` body
> field — otherwise the call is rejected with `400` (paid provider usage is never
> run un-billed).

---

## Full polling example

```javascript
// 1. Kick off
const start = await fetch('/api/generate/3d/text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'A ceramic coffee mug', artStyle: 'realistic' })
});
const { taskId } = await start.json();

// 2. Poll until done
async function poll() {
  const r = await fetch(`/api/generate/3d/status/${taskId}`);
  const s = await r.json();
  if (s.status === 'completed') return s.modelUrls.glb;
  if (s.status === 'failed') throw new Error(s.errorMessage || '3D generation failed');
  await new Promise((res) => setTimeout(res, 5000));
  return poll();
}
const glbUrl = await poll();
```

Render the resulting `.glb` with `<model-viewer>` (see `example.tsx`) or any
GLTF-capable 3D viewer.
