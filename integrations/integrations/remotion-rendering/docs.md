# Remotion Rendering Integration

Render arbitrary Remotion compositions to MP4 server-side. Submit a TSX composition + props, get back a job ID, then poll for the final video URL.

This is the same rendering pipeline that powers the platform's built-in demo-video composer — you get the full Remotion runtime (React, Framer Motion, Audio, Sequences, Google Fonts, lucide-react icons) without running a render farm yourself.

## Category
Media / Video

## Required API Keys (Platform-Level)

Handled by platform — no per-workspace setup.

- `GCS_BUCKET_NAME`, `GCP_PROJECT_ID`, `GCP_CREDENTIALS` (final MP4 storage)

---

## API Endpoints

### Submit Render Job
```
POST /api/render/remotion
```

**Request:**
```json
{
  "workspaceId": "ws_required",
  "compositionTsx": "import React from 'react'; import { AbsoluteFill, useCurrentFrame } from 'remotion'; export const Composition = ({ title }) => { const f = useCurrentFrame(); return <AbsoluteFill style={{ background: '#000', color: '#fff', alignItems: 'center', justifyContent: 'center' }}><h1>{title} {f}</h1></AbsoluteFill>; }; export const calculateDemoVideoDuration = () => 90;",
  "props": { "title": "Hello" },
  "durationInFrames": 90,
  "fps": 30,
  "width": 1920,
  "height": 1080
}
```

| Field | Type | Notes |
|-------|------|-------|
| `workspaceId` | string | Required. Render is namespaced + billed per workspace. |
| `compositionTsx` | string | Required. Your Remotion composition source. Must export a default React component plus `calculateDemoVideoDuration` (or include it as `durationInFrames` and we'll inject the stub). |
| `props` | object | Optional. Passed straight to your composition. |
| `durationInFrames` | number | Optional override for length. 1 to 18000 frames (10 min @ 30fps). |
| `fps`, `width`, `height` | number | Optional rendering hints. |

**Response (immediate):**
```json
{
  "success": true,
  "operationId": "9c8a7b6e-1234-...",
  "status": "pending",
  "statusUrl": "/api/render/remotion/9c8a7b6e-1234-..."
}
```

### Get Render Status
```
GET /api/render/remotion/:operationId
```

**Response (while rendering):**
```json
{
  "success": true,
  "operationId": "9c8a7b6e-...",
  "status": "rendering"
}
```

**Response (complete):**
```json
{
  "success": true,
  "operationId": "9c8a7b6e-...",
  "status": "complete",
  "videoUrl": "https://storage.googleapis.com/.../render.mp4",
  "completedAt": "2026-05-19T23:30:00.000Z"
}
```

`status` is one of `pending | rendering | complete | failed`. On failure an `error` field is populated.

---

## Installation Helper

```javascript
export const remotion = {
  async render({ workspaceId, compositionTsx, props, durationInFrames }) {
    const r = await fetch('/api/render/remotion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspaceId, compositionTsx, props, durationInFrames }),
    });
    const { operationId } = await r.json();
    return operationId;
  },
  async poll(operationId, { intervalMs = 2000, timeoutMs = 600000 } = {}) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const res = await fetch(`/api/render/remotion/${operationId}`);
      const body = await res.json();
      if (body.status === 'complete') return body.videoUrl;
      if (body.status === 'failed') throw new Error(body.error || 'Render failed');
      await new Promise(r => setTimeout(r, intervalMs));
    }
    throw new Error('Render timed out');
  },
};
```

## Use Cases
- Personalized share videos
- Data-driven explainer clips
- Animated certificates / receipts
- AI-narrated walk-throughs (pair with `elevenlabs-audio`)

## Limits
- Max ~10 min @ 30fps per render
- Single concurrent render per job ID; submit multiple jobs to render in parallel
- Renders run in-process — long jobs survive only until the next deploy; the final MP4 is durable on GCS
