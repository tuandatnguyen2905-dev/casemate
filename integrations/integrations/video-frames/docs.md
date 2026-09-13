# Video Frame Extraction Integration

Pull still PNG frames out of any video URL at the timestamps you specify. Powered by ffmpeg server-side; returns public GCS URLs you can use as thumbnails, scrubber previews, or AI vision inputs.

## Category
Media / Video

## Required API Keys (Platform-Level)

Handled by platform — no per-workspace setup.

- `GCS_BUCKET_NAME`, `GCP_PROJECT_ID`, `GCP_CREDENTIALS` (frame storage)

---

## API Endpoints

### Extract Frames
```
POST /api/video/frames
```

**Request:**
```json
{
  "videoUrl": "https://storage.googleapis.com/.../clip.mp4",
  "timestamps": [0, 1.5, 3, 5, 10],
  "workspaceId": "ws_optional"
}
```

| Field | Type | Notes |
|-------|------|-------|
| `videoUrl` | string (http/https) | Public URL of the source video. Required. |
| `timestamps` | number[] | Seconds (float OK). 1–20 values per call. |
| `workspaceId` | string | Optional. Frames get namespaced under `workspaces/<id>/video-frames/`. |

**Response:**
```json
{
  "success": true,
  "frames": [
    { "timestamp": 0, "url": "https://storage.googleapis.com/.../frame-0.png" },
    { "timestamp": 1.5, "url": "https://storage.googleapis.com/.../frame-1.png" }
  ]
}
```

---

## Installation Helper

```javascript
export const videoFrames = {
  async extract(videoUrl, timestamps, workspaceId) {
    const r = await fetch('/api/video/frames', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoUrl, timestamps, workspaceId }),
    });
    const { frames } = await r.json();
    return frames;
  },
};
```

## Use Cases
- Video thumbnails and scrubber preview strips
- Hero stills for share cards
- Frame-by-frame review tools
- Feeding frames into vision LLMs (gemini-vision-transform, document-analysis)

## Limits
- Max 20 timestamps per request
- 30s ffmpeg timeout per frame
- Output is always PNG
