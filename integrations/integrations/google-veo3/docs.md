# AI Video & Image Generation Integration

Generate AI-powered videos and images using Google Veo (2 / 3 / 3.1), Gemini 2.5 Flash, or OpenAI DALL-E 3.

## Category
AI/ML

## Required API Keys
- `GOOGLE_API_KEY` or `GEMINI_API_KEY` (for Veo3/Gemini)
- `OPENAI_API_KEY` (for DALL-E 3 and Sora)

## API Endpoints

**Generate Image (DALL-E 3)**
```
POST /api/generate/image
```

**Request:**
```json
{
  "prompt": "A professional headshot photo",
  "aspectRatio": "1:1",
  "quality": "standard"
}
```

**Response:**
```json
{
  "imageUrl": "https://storage.googleapis.com/..."
}
```

**Generate Video (Veo / Sora — full proxy)**
```
POST /api/veo/generate/video
```

This is the schema-validated proxy used by apps built on the platform. It accepts every option the underlying SDK supports, including the Veo 3.1 "ingredients" workflow (multiple reference images + an optional last-frame image).

**Minimal request:**
```json
{
  "model": "veo-3.1-generate-preview",
  "prompt": "A cat playing with yarn",
  "aspectRatio": "16:9",
  "generateAudio": true
}
```

**Full request with Veo 3.1 ingredients:**
```json
{
  "model": "veo-3.1-generate-preview",
  "prompt": "A golden retriever running through a sunlit meadow, cinematic, 35mm film",
  "aspectRatio": "16:9",
  "duration": 8,
  "resolution": "1080p",
  "referenceImages": [
    { "imageData": "<base64-png>", "mimeType": "image/png", "referenceType": "asset" },
    { "imageData": "<base64-png>", "mimeType": "image/png", "referenceType": "style" }
  ]
}
```

**Image-to-video with a locked last frame** (canonical Veo 3.1 image-to-video pattern — the seed image is the first frame, `lastFrameImage` is the final frame, and Veo interpolates the motion between them):
```json
{
  "model": "veo-3.1-fast-generate-preview",
  "prompt": "Camera pulls back from the subject as the scene transitions to dusk",
  "imageData": "https://storage.googleapis.com/bucket/opening-frame.png",
  "lastFrameImage": {
    "imageData": "https://storage.googleapis.com/bucket/closing-frame.png"
  }
}
```

Each `imageData` field (on the top-level seed, on `referenceImages[]`, and on `lastFrameImage`) accepts any of:

- raw base64-encoded image bytes (no `data:` prefix), or
- a `data:image/<mime>;base64,<bytes>` URL, or
- an `http(s)://` URL — the proxy downloads the image and forwards the bytes to Google.

**Response:**
```json
{
  "success": true,
  "generationId": "gen_abc123",
  "operationId": "operations/...",
  "status": "processing",
  "progress": 10,
  "estimatedDuration": "1-3 minutes",
  "message": "Video generation started. Use the operationId to check status."
}
```

**Simple proxy (defaults to `veo-3.1-generate-preview`):**
```
POST /api/generate/video
```

```json
{
  "prompt": "A cat playing with yarn",
  "aspectRatio": "16:9",
  "generateAudio": true
}
```

**Check Video Status**
```
GET /api/veo/status/:operationId
```

**Response:**
```json
{
  "status": "completed",
  "videoUrl": "https://storage.googleapis.com/...",
  "progress": 100
}
```

## Veo 3.1 ingredients (multi-image + last-frame)

Veo 3.1 introduces an "ingredients" workflow on top of the basic text-to-video and image-to-video paths. You can pass:

- `referenceImages`: up to **3** images that the model uses as ingredients. Each entry has:
  - `imageData` — base64 / `data:` URL / `http(s)://` URL, max ~10MB decoded for inline base64.
  - `mimeType` — one of `image/png`, `image/jpeg`, `image/webp`. Optional; inferred from the data URL or `Content-Type` header when omitted, defaulting to `image/png`.
  - `referenceType` — `"asset"` (default) for subjects/objects/scene, or `"style"` for aesthetics, lighting, and color.
- `lastFrameImage`: a single image used as the final frame of the generated clip.
  - Same `imageData` / `mimeType` shape as a reference image.
  - Designed to be combined with `imageData` (the seed first frame) for image-to-video with a locked end frame. May also be sent on its own.

**Combining rules** (enforced by the proxy — violating them returns a `400`):

- `referenceImages` is mutually exclusive with `imageData` and with `lastFrameImage`. This matches the underlying Veo 3.1 SDK contract: when `referenceImages` is set, the model derives the seed and final frame from the prompt + references.
- `imageData` + `lastFrameImage` is allowed (and is the canonical Veo 3.1 image-to-video flow).
- `imageData` alone, `lastFrameImage` alone, and `referenceImages` alone are all allowed.

### Per-model support matrix

| Model                              | `imageData` (single seed) | `referenceImages` | `lastFrameImage` |
| ---------------------------------- | :-----------------------: | :---------------: | :--------------: |
| `veo-3.1-generate-preview`         | ✅                        | ✅ (max 3)        | ✅               |
| `veo-3.1-fast-generate-preview`    | ✅                        | ✅ (max 3)        | ✅               |
| `veo-3.0-generate-001`             | ✅                        | ❌                | ❌               |
| `veo-3.0-fast-generate-001`        | ✅                        | ❌                | ❌               |
| `veo-2.0-generate-001`             | ✅                        | ❌                | ❌               |
| `sora-2`, `sora-2-pro`             | ✅ (single reference)     | ❌                | ❌               |

Passing `referenceImages` or `lastFrameImage` to a non-Veo-3.1 model returns a `400` from the proxy with a message naming the unsupported fields rather than silently dropping them.

### Per-request limits

- Up to **3** entries in `referenceImages`.
- Each `imageData` is at most ~**10MB** decoded (`14_000_000` characters of base64 input). The proxy enforces this on every input shape (raw base64, `data:` URL, and the bytes downloaded from an `http(s)://` URL).
- Accepted mime types: `image/png`, `image/jpeg`, `image/webp`. The whitelist is enforced against the explicit `mimeType`, the type embedded in a `data:` URL, and the `Content-Type` header returned by an `http(s)://` URL.
- For URL inputs the proxy refuses to fetch from non-public ranges (loopback, link-local, RFC1918 private, CGNAT, multicast, IPv6 unique-local, the AWS metadata service, etc.) and refuses HTTP redirects. Use a public HTTPS URL or upload a `data:` / base64 payload directly.
- Exceeding any of these returns a `400` from the proxy. Schema-level violations include a Zod-style `details` array; runtime ingredient failures (mime, size, SSRF, fetch error) include `field` and `message` describing the offending input.

### Otto / agent guidance

When the user is generating a hero video on a Veo 3.1 model, Otto can suggest:

1. Adding 1–3 `referenceImages` of the brand subject, product, or character so the video stays on-model. Use `referenceType: "asset"` for the thing itself, `"style"` for a mood-board image.
2. Setting a `lastFrameImage` to lock the final frame (useful for endings that lead into a logo plate or product hero shot).
3. Reminding the user that ingredients require `model: "veo-3.1-generate-preview"` (or `veo-3.1-fast-generate-preview`).

## Automated long video (multi-clip chaining + auto-stitch)

Veo clips are capped at ~8 seconds. To produce a video **longer than 8s** without
manually chaining clips, post an ordered list of scene prompts and let the server
generate each clip, seed the next clip with the previous clip's extracted last
frame (so motion continues seamlessly), and auto-stitch them into one MP4.

**Start a long video job**
```
POST /api/veo/generate-long-video
```

**Request:**
```json
{
  "model": "veo-3.1-generate-preview",
  "aspectRatio": "16:9",
  "startImage": "https://storage.googleapis.com/bucket/opening-frame.png",
  "scenes": [
    { "prompt": "A drone shot rising over a misty forest at dawn" },
    { "prompt": "The camera glides forward between the treetops" },
    { "prompt": "It breaks above the canopy into golden sunrise light" }
  ]
}
```

- `scenes`: ordered list of `{ prompt, lastFrameImage? }`, **1–8** entries. Each
  clip uses the previous clip's last frame as its first frame.
- `startImage` (optional): seeds the very first clip's first frame.
- `model` (optional, defaults to `veo-3.1-generate-preview`), `aspectRatio`
  (default `16:9`), `duration`, `resolution`, `generateAudio` (default `false`),
  `enhancePrompt` (default `true`) apply to every clip — keep them consistent.
- `lastFrameImage` is only allowed on Veo 3.1 models (returns `400` otherwise).

**Response:**
```json
{
  "success": true,
  "jobId": "long_video_...",
  "overallStatus": "pending",
  "overallProgress": 0,
  "statusUrl": "/api/veo/status-long-video/long_video_..."
}
```

**Poll status**
```
GET /api/veo/status-long-video/:jobId
```

**Response:**
```json
{
  "jobId": "long_video_...",
  "overallStatus": "completed",
  "overallProgress": 100,
  "stitchedUrl": "https://storage.googleapis.com/.../longvideo_....mp4",
  "clipUrls": ["https://.../clip0.mp4", "https://.../clip1.mp4"],
  "clips": [ { "index": 0, "status": "completed", "videoUrl": "..." } ]
}
```

- `overallStatus`: `pending` → `processing` → `stitching` → `completed`.
  `partial` means clips rendered but stitching failed (`stitchedUrl` falls back to
  the first clip); `failed` means a clip could not be generated.
- When `completed`, `stitchedUrl` is the final long video. A single-scene job
  skips stitching and returns that clip as `stitchedUrl`.

## Installation

### Image Generation (DALL-E 3)
```javascript
const response = await fetch('/api/generate/image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A professional headshot photo',
    aspectRatio: '1:1', // '1:1', '16:9', or '9:16'
    quality: 'standard' // 'standard' or 'hd'
  })
});
const { imageUrl } = await response.json();
// Image is automatically uploaded to GCS!
```

### Video Generation (Veo 3.1 with ingredients)
```javascript
// Start video generation
const response = await fetch('/api/veo/generate/video', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'veo-3.1-generate-preview',
    prompt: 'A cat playing with yarn in a sunlit kitchen, cinematic',
    aspectRatio: '16:9',
    duration: 8,
    resolution: '1080p',
    referenceImages: [
      { imageData: brandSubjectBase64, referenceType: 'asset' },
      { imageData: moodBoardBase64,   referenceType: 'style' }
    ]
  })
});
const { operationId } = await response.json();

// Poll for completion
const checkStatus = async () => {
  const status = await fetch(`/api/veo/status/${operationId}`).then(r => r.json());
  if (status.status === 'completed') return status.videoUrl;
  if (status.status === 'failed') throw new Error(status.errorMessage);
  await new Promise(r => setTimeout(r, 5000));
  return checkStatus();
};
const videoUrl = await checkStatus();
```

## Use Cases
- Product mockups
- Marketing content
- Social media assets
- Video ads
- Animated explainers
- Hero images/videos
- Brand-consistent video where reference images keep the subject on-model

## Supported Aspect Ratios
- **Images**: 1:1, 16:9, 9:16
- **Videos**: 16:9, 9:16

## Documentation
- [Google Veo Docs](https://ai.google.dev/gemini-api/docs/video-generation)
- [DALL-E 3 Docs](https://platform.openai.com/docs/guides/images)
