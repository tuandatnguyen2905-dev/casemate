# Video Clip / Trim Integration

Trim a source video to a single `[startSec, endSec]` segment server-side with ffmpeg and get back a permanent public MP4 URL on GCS. Use it to produce clean clips for the Raw-to-Post flow or social sharing without bundling ffmpeg.wasm in the browser or paying for a full Remotion render just to cut a video.

## Category
Media / Video

## Required API Keys (Platform-Level)

Handled by platform — no per-workspace setup.

- `GCS_BUCKET_NAME`, `GCP_PROJECT_ID`, `GCP_CREDENTIALS` (clip storage)

---

## API Endpoints

### Trim a Clip
```
POST /api/video/clip
```

**Request:**
```json
{
  "videoUrlOrKey": "https://storage.googleapis.com/.../source.mp4",
  "startSec": 12.5,
  "endSec": 27,
  "workspaceId": "ws_optional"
}
```

| Field | Type | Notes |
|-------|------|-------|
| `videoUrl` | string (https) | Public URL of the source video. Alias of `videoUrlOrKey`. |
| `videoUrlOrKey` | string | Public https URL **or** a GCS object key. One of `videoUrl`/`videoUrlOrKey` required. |
| `startSec` | number | Segment start in seconds (float OK). Must be ≥ 0. |
| `endSec` | number | Segment end in seconds. Must be greater than `startSec`. |
| `workspaceId` | string | Optional. Clips get namespaced under `workspaces/<id>/clips/`. When present, the call is wallet-gated (auto-refunds on failure). |

**Response:**
```json
{
  "success": true,
  "url": "https://storage.googleapis.com/.../<id>-12500-27000.mp4",
  "key": "workspaces/ws_123/clips/<id>-12500-27000.mp4",
  "durationSec": 14.5
}
```

---

## Installation Helper

```javascript
export const videoClip = {
  async trim(videoUrlOrKey, startSec, endSec, workspaceId) {
    const r = await fetch('/api/video/clip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoUrlOrKey, startSec, endSec, workspaceId }),
    });
    const data = await r.json();
    if (!data.success) throw new Error(data.error || 'Clip failed');
    return data; // { url, key, durationSec }
  },
};
```

## Use Cases
- Raw-to-Post: cut a clean segment out of a raw upload before publishing
- Social clip trimming (highlight reels, teasers)
- Producing short shareable clips without a full Remotion render
- Pre-trimming footage before frame extraction or AI video analysis

## Limits
- `endSec` must be greater than `startSec`
- Max clip duration is 10 minutes per call
- ffmpeg timeout scales with clip length (60s floor, 10 min ceiling)
- Output is always MP4 (stream-copy when possible, re-encode fallback for clean cuts)
