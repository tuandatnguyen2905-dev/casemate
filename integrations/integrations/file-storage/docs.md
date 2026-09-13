# File Storage Integration (Google Cloud Storage)

Permanently store images and files in Google Cloud Storage with public URLs.

## Category
Storage

## Required API Keys
- `GCS_BUCKET_NAME`
- `GCP_PROJECT_ID`
- `GCP_CREDENTIALS`

## API Endpoints

### Upload Image (base64 JSON)
```
POST /api/upload/image
```

Use this when you already have base64 data (canvas export, clipboard paste, AI-generated data URL).

**Request:**
```json
{
  "imageData": "data:image/png;base64,...",
  "fileName": "photo.png"
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://storage.googleapis.com/bucket/..."
}
```

### Upload Any File (multipart binary)
```
POST /api/upload/file
```

Use this for any binary upload — videos, PDFs, audio, large images, arbitrary files. Multipart upload avoids the ~10MB base64 limit and preserves the original content type.

**Request** — `multipart/form-data`:

| Field | Type | Notes |
|-------|------|-------|
| `file` | file | Required. Single file, max 50MB. |
| `workspaceId` | string | Optional. Namespaces the object under `workspaces/<id>/uploads/`. |
| `folder` | string | Optional. Sub-folder hint inside the namespace. |

**Response:**
```json
{
  "success": true,
  "url": "https://storage.googleapis.com/bucket/workspaces/ws_x/uploads/general/abc.mp4",
  "key": "workspaces/ws_x/uploads/general/abc.mp4",
  "contentType": "video/mp4",
  "bytes": 7340032,
  "originalName": "my-clip.mp4"
}
```

### Delete an Uploaded File
```
DELETE /api/upload/file          (JSON body)
POST   /api/upload/delete        (same body, for clients that can't send DELETE bodies)
```

Erases a previously uploaded object. Pass either the `key` returned by `/api/upload/file` or the public `url` returned by any upload endpoint. Only objects in the upload namespaces (`uploads/`, `workspaces/<id>/uploads/`, `chat-attachments/`) can be deleted. Deleting an already-deleted object still answers `success: true` (erasure is idempotent).

**Request:**
```json
{ "key": "workspaces/ws_x/uploads/general/abc.mp4" }
```
or
```json
{ "url": "https://storage.googleapis.com/bucket/chat-attachments/abc.png" }
```

**Response:**
```json
{ "success": true, "key": "workspaces/ws_x/uploads/general/abc.mp4", "deleted": true }
```

## Installation

```javascript
export const fileStorage = {
  async uploadImage(file) {
    const reader = new FileReader();
    const base64Data = await new Promise((resolve) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

    const response = await fetch('/api/upload/image', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-App-Id': window.__APP_ID__
      },
      body: JSON.stringify({
        imageData: base64Data,
        fileName: file.name
      })
    });

    const { imageUrl } = await response.json();
    return imageUrl;
  },
  // Erase an uploaded object — pass the key or the public url the upload returned.
  async deleteFile(keyOrUrl) {
    const body = /^https?:\/\//.test(keyOrUrl) ? { url: keyOrUrl } : { key: keyOrUrl };
    const response = await fetch('/api/upload/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Id': window.__APP_ID__
      },
      body: JSON.stringify(body)
    });
    const { success, error } = await response.json();
    if (!success) throw new Error(error || 'Delete failed');
    return true;
  }
};
```

## Use Cases
- User avatars
- Product images
- Document storage
- Media galleries
- File uploads
- Asset management

## Supported File Types
- Images (JPEG, PNG, GIF, WebP)
- Documents (PDF)
- Videos (MP4)
- Any file type supported by GCS

## Documentation
- [Google Cloud Storage Docs](https://cloud.google.com/storage/docs)
