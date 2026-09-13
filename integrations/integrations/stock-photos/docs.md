# Stock Photos Integration (Unsplash)

Search the Unsplash library for royalty-free, attribution-friendly photography. Use the URLs in `<img>` tags, as hero backgrounds, or as starting material for image-edit AI tools.

## Category
Media / Images

## Required API Keys (Platform-Level)

Handled by platform — no per-workspace setup.

- `UNSPLASH_ACCESS_KEY`

---

## API Endpoints

### Search Photos
```
GET /api/stock-photos?query=...&perPage=10&orientation=landscape
```

| Param | Type | Notes |
|-------|------|-------|
| `query` (or `q`) | string | Required. Search keywords. |
| `perPage` | number | Optional. 1–30. Default 10. |
| `orientation` | string | Optional. One of `landscape`, `portrait`, `squarish`. |
| `workspaceId` | string | Optional. Used for usage attribution. |

**Response:**
```json
{
  "success": true,
  "query": "mountains",
  "perPage": 10,
  "results": [
    {
      "id": "abc123",
      "description": "Snow-capped mountain range at dawn",
      "altDescription": "...",
      "urls": {
        "thumb": "https://images.unsplash.com/.../thumb",
        "small": "https://images.unsplash.com/.../small",
        "regular": "https://images.unsplash.com/.../regular",
        "full": "https://images.unsplash.com/.../full",
        "raw": "https://images.unsplash.com/.../raw"
      }
    }
  ]
}
```

---

## Installation Helper

```javascript
export const stockPhotos = {
  async search(query, { perPage = 10, orientation } = {}) {
    const params = new URLSearchParams({ query, perPage: String(perPage) });
    if (orientation) params.set('orientation', orientation);
    const r = await fetch(`/api/stock-photos?${params}`);
    const { results } = await r.json();
    return results;
  },
};
```

## Use Cases
- Hero/section background images
- Card thumbnails when the user hasn't uploaded their own asset yet
- Mood-board / inspiration grids
- Starting frames for image-edit workflows (gemini-vision-transform, google-veo3)

## Attribution
Unsplash photos are free to use, but giving credit to the photographer is encouraged. The `id` field is the canonical Unsplash photo ID — link back to `https://unsplash.com/photos/<id>` where possible.
