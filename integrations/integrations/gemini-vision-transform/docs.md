# Gemini Vision & Image Transformation

Analyze images with Gemini Vision and transform them into new styles (line art, stylization, etc.) using AI-powered image-to-image processing.

## API Endpoints

### 1. Vision Analysis — Describe or analyze an image

```
POST /api/generate/vision
```

**Request:**
```json
{
  "prompt": "Describe the main subject of this image",
  "image": "<base64-encoded-image>",
  "mimeType": "image/jpeg"
}
```

**Response:**
```json
{
  "success": true,
  "result": "The image shows a sailboat on calm blue water..."
}
```

---

### 2. Image-to-Image — Transform an image into a new style

```
POST /api/generate/image-to-image
```

**Single image request:**
```json
{
  "prompt": "Create clean line art from this image",
  "image": "<base64-encoded-image>",
  "mimeType": "image/jpeg",
  "style": "clean line art, black outlines on white background"
}
```

**Multi-image request (up to 3 images):**
```json
{
  "prompt": "Blend these reference images into a single illustration",
  "images": [
    { "data": "<base64-encoded-image>", "mimeType": "image/jpeg" },
    { "data": "<base64-encoded-image>", "mimeType": "image/png" }
  ],
  "style": "watercolor illustration"
}
```

**Optional — return base64 instead of uploading to cloud storage:**

Add `"returnBase64": true` to either request format to skip the GCS upload and receive the generated image directly as base64. Useful for in-memory processing or when you want to display the result immediately without persisting it.

**Response (default — cloud storage URL):**
```json
{
  "success": true,
  "imageUrl": "https://storage.googleapis.com/...",
  "description": "Image transformed successfully",
  "metadata": {
    "model": "gemini-2.5-flash-image",
    "style": "clean line art, black outlines on white background",
    "processedAt": "2026-03-03T00:00:00.000Z"
  }
}
```

**Response (when `returnBase64: true`):**
```json
{
  "success": true,
  "imageBase64": "<base64-encoded-result>",
  "mimeType": "image/png",
  "description": "Image transformed successfully",
  "metadata": {
    "model": "gemini-2.5-flash-image",
    "style": "clean line art, black outlines on white background",
    "processedAt": "2026-03-03T00:00:00.000Z"
  }
}
```

---

## Helper Functions

```typescript
export const geminiVision = {
  // Analyze an image and get a text description
  async analyzeImage(imageBase64: string, prompt: string, mimeType = 'image/jpeg') {
    const response = await fetch('/api/generate/vision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, image: imageBase64, mimeType })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.result;
  },

  // Transform a single image to a new style — returns a cloud storage URL
  async transformImage(imageBase64: string, prompt: string, style: string, mimeType = 'image/jpeg') {
    const response = await fetch('/api/generate/image-to-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, image: imageBase64, mimeType, style })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.imageUrl;
  },

  // Transform and get result as base64 (skips cloud upload)
  async transformImageBase64(imageBase64: string, prompt: string, style: string, mimeType = 'image/jpeg') {
    const response = await fetch('/api/generate/image-to-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, image: imageBase64, mimeType, style, returnBase64: true })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return { imageBase64: data.imageBase64, mimeType: data.mimeType };
  },

  // Blend multiple images (up to 3) — returns a cloud storage URL
  async blendImages(images: Array<{ data: string; mimeType: string }>, prompt: string, style?: string) {
    const response = await fetch('/api/generate/image-to-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, images, style })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.imageUrl;
  },

  // Shortcut: Convert to line art — returns a cloud storage URL
  async toLineArt(imageBase64: string, mimeType = 'image/jpeg') {
    return this.transformImage(
      imageBase64,
      'Create clean, minimalist line art from this image. Black lines on white background.',
      'clean line art, professional illustration, black outlines only',
      mimeType
    );
  },

  // Helper: Convert a File object to base64
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};
```

---

## Use Cases

- **Line Art Conversion**: Transform photos into clean line drawings
- **Image Analysis**: Get AI-powered descriptions of image content
- **Style Transfer**: Convert images to different artistic styles
- **Multi-Image Blending**: Combine up to 3 reference images into one output
- **Content Detection**: Analyze what's in an image before processing

## Required Environment Variables

- `GOOGLE_API_KEY` — Your Google AI API key (server-side only)

## Important Notes

1. **Server-side only**: API keys are accessed on the server. Space apps call the endpoints via `fetch()`.
2. **Base64 encoding**: Images must be sent as base64-encoded strings (no `data:image/...;base64,` prefix).
3. **MIME types**: Supported types include `image/jpeg`, `image/png`, `image/webp`.
4. **Multi-image limit**: The `images[]` array supports up to 3 images.
5. **`returnBase64` vs URL**: Use `returnBase64: true` for ephemeral processing; omit it (default) to get a persistent cloud storage URL.
6. **Rate limits**: Be mindful of Google API rate limits for production use.
