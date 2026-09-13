# Image & Video Generation

Unified reference for the image and video generation endpoints exposed to apps built on the platform. The platform proxies requests to Google Veo, OpenAI Sora, OpenAI DALL-E 3, and Gemini Flash Image so apps don't have to manage provider keys themselves.

For provider-specific notes, see also:
- [`google-veo3/docs.md`](../google-veo3/docs.md) — full Veo / Sora request examples (including Veo 3.1 ingredients).
- [`gemini-vision-transform/docs.md`](../gemini-vision-transform/docs.md) — image edits with Gemini.

---

## Endpoints

| Method | Path | Purpose |
| ------ | ---- | ------- |
| `POST` | `/api/veo/generate/video` | Schema-validated video generation proxy. Supports every Veo / Sora option, including the Veo 3.1 ingredients workflow. |
| `POST` | `/api/generate/video` | Lightweight convenience proxy. Hardcodes `veo-3.1-generate-preview`. |
| `GET`  | `/api/veo/status/:operationId` | Poll the status of a video job. |
| `GET`  | `/api/generate/video/status/:operationId` | Same as above, alternate path used by some integrations. |
| `POST` | `/api/veo/generate/image` | Schema-validated image generation proxy (Gemini Flash Image / DALL-E 3). |
| `POST` | `/api/generate/image` | Convenience image proxy. |

All endpoints accept and return JSON. Auth follows the standard app session / `x-app-id` + `x-user-id` headers.

---

## `POST /api/veo/generate/video`

Starts an asynchronous video generation job. Returns an `operationId` that the app polls until the video is ready.

### Request body

| Field | Type | Required | Notes |
| ----- | ---- | -------- | ----- |
| `model` | enum | yes | One of: `veo-3.1-generate-preview`, `veo-3.1-fast-generate-preview`, `veo-3.0-generate-001`, `veo-3.0-fast-generate-001`, `veo-2.0-generate-001`, `sora-2`, `sora-2-pro`. |
| `prompt` | string (10–1000) | yes | Text prompt describing the desired video. |
| `negativePrompt` | string | no | Things that should not appear. |
| `aspectRatio` | `"16:9"` \| `"9:16"` \| `"1:1"` | no, default `"16:9"` | |
| `generateAudio` | boolean | no, default `false` | |
| `enhancePrompt` | boolean | no, default `true` | Veo 2 only — Veo 3.x ignores this and Sora ignores it. |
| `duration` | integer (4–25) | no | Will be normalized to the nearest value supported by the chosen model. |
| `resolution` | `"720p"` \| `"1080p"` \| `"4k"` | no | `"4k"` is only honored on `veo-3.1-*` models. |
| `imageData` | string | no | Single seed image for image-to-video. **Cannot** be combined with `referenceImages` (but may be combined with `lastFrameImage`). |
| `referenceImages` | array, max 3 | no | Veo 3.1 ingredients. Each item is `{ imageData, mimeType?, referenceType? }`. |
| `lastFrameImage` | object | no | Veo 3.1 last-frame image. `{ imageData, mimeType? }`. Mutually exclusive with `referenceImages`. |

Every `imageData` field (top-level seed, `referenceImages[].imageData`, and `lastFrameImage.imageData`) accepts any of:

- raw base64-encoded image bytes (no `data:` prefix), or
- a `data:image/<mime>;base64,<bytes>` URL, or
- an `http(s)://` URL — the proxy downloads and base64-encodes the image before forwarding it to Google.

`referenceImages[].referenceType` is `"asset"` (default) for subjects/objects/scene, or `"style"` for aesthetics, lighting, and color.

`mimeType` for any ingredient image accepts `image/png`, `image/jpeg`, or `image/webp`. It is optional — when omitted it is inferred from the data URL or HTTP `Content-Type` header, defaulting to `image/png`. Each inline base64 `imageData` is capped at ~10MB decoded (`14_000_000` characters of base64 input).

**Combining rules** (enforced by the proxy — violating any returns a `400`):

- `referenceImages` is mutually exclusive with both `imageData` and `lastFrameImage`. This matches the underlying Veo 3.1 SDK contract.
- `imageData` + `lastFrameImage` together is allowed and is the canonical Veo 3.1 image-to-video flow (seed = first frame, `lastFrameImage` = locked final frame).
- Each of `imageData`, `lastFrameImage`, and `referenceImages` may also be sent on its own.

### Per-model image-input support matrix

| Model | `imageData` (single seed) | `referenceImages` | `lastFrameImage` |
| ----- | :-----------------------: | :---------------: | :--------------: |
| `veo-3.1-generate-preview`        | ✅ | ✅ (max 3) | ✅ |
| `veo-3.1-fast-generate-preview`   | ✅ | ✅ (max 3) | ✅ |
| `veo-3.0-generate-001`            | ✅ | ❌         | ❌ |
| `veo-3.0-fast-generate-001`       | ✅ | ❌         | ❌ |
| `veo-2.0-generate-001`            | ✅ | ❌         | ❌ |
| `sora-2`, `sora-2-pro`            | ✅ (single reference) | ❌ | ❌ |

Passing `referenceImages` or `lastFrameImage` to a model that does not support them returns `400` with a Zod-style `details` array naming the unsupported field — the proxy never silently drops them.

### Response (`200`)

```json
{
  "success": true,
  "generationId": "gen_abc123",
  "operationId": "operations/...",
  "status": "processing",
  "progress": 10,
  "cost": "0.40",
  "estimatedDuration": "1-3 minutes",
  "message": "Video generation started. Use the operationId to check status."
}
```

### Common errors (`400`)

```json
{
  "error": "Invalid request parameters",
  "details": [
    {
      "code": "custom",
      "path": ["model"],
      "message": "Model \"veo-3.0-generate-001\" does not support the ingredients fields (referenceImages). Supported models: veo-3.1-generate-preview, veo-3.1-fast-generate-preview."
    }
  ]
}
```

### Example: Veo 3.1 ingredients

```javascript
const res = await fetch('/api/veo/generate/video', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'veo-3.1-generate-preview',
    prompt: 'A golden retriever running through a sunlit meadow, cinematic, 35mm film',
    aspectRatio: '16:9',
    duration: 8,
    resolution: '1080p',
    referenceImages: [
      { imageData: subjectBase64,  mimeType: 'image/png', referenceType: 'asset' },
      { imageData: moodBoardBase64, mimeType: 'image/jpeg', referenceType: 'style' }
    ]
  })
});
const { operationId } = await res.json();
```

### Example: Veo 3.1 last-frame

```javascript
await fetch('/api/veo/generate/video', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'veo-3.1-fast-generate-preview',
    prompt: 'Camera pulls back from the subject as the scene transitions to dusk',
    imageData: openingFrameBase64,
    lastFrameImage: { imageData: closingFrameBase64, mimeType: 'image/png' }
  })
});
```

---

## Polling

```
GET /api/veo/status/:operationId
```

Returns:

```json
{
  "status": "processing | completed | failed",
  "progress": 60,
  "videoUrl": "https://storage.googleapis.com/...",
  "errorMessage": "..."
}
```

Poll every ~5 seconds until `status` becomes `completed` or `failed`.

---

## Otto / agent guidance

When an app is on a Veo 3.1 model, Otto can recommend:

1. Adding 1–3 `referenceImages` of the brand subject, product, or character to keep the video on-model (`referenceType: "asset"`), plus an optional mood-board image (`referenceType: "style"`).
2. Setting a `lastFrameImage` to lock the final frame — useful for ad endings that lead into a logo plate or product hero shot.
3. Reminding the user that ingredients require `model: "veo-3.1-generate-preview"` (or `veo-3.1-fast-generate-preview`); on any other model the proxy will return a 400.

---

## Image generation (overview)

`POST /api/veo/generate/image` and `POST /api/generate/image` accept:

```json
{
  "model": "gemini-2.5-flash-image" | "dall-e-3",
  "prompt": "A professional headshot photo",
  "aspectRatio": "1:1" | "16:9" | "9:16",
  "quality": "standard" | "hd",
  "editImageData": "<optional base64 for image edits>"
}
```

The response includes the resulting `imageUrl` (uploaded to GCS) once the job completes. See [`gemini-vision-transform/docs.md`](../gemini-vision-transform/docs.md) for image-edit specifics.
