# Gemini Video Understanding Integration

Analyze videos with Google's Gemini API to extract insights, summarize content, answer questions, and reference specific timestamps.

## Category
AI/ML

## Required API Keys
- `GOOGLE_API_KEY` or `GEMINI_API_KEY` (server-side only)

## API Endpoints

### 1. Analyze Video (File Upload for videos >20MB)

Upload a video file for analysis. Best for larger videos or when you need to reuse the video across multiple queries.

```
POST /api/generate/video-analysis
```

**Request (multipart/form-data):**
```
file: <video-file>
prompt: "Summarize this video and list the key topics discussed"
```

**Response:**
```json
{
  "success": true,
  "result": "This video covers three main topics: 1) Introduction to machine learning...",
  "metadata": {
    "model": "gemini-2.5-flash",
    "duration": "5:32",
    "processedAt": "2024-01-15T10:30:00Z"
  }
}
```

### 2. Analyze Video (Inline for videos <20MB)

For smaller videos, send the video data directly in the request body.

```
POST /api/generate/video-inline
```

**Request:**
```json
{
  "prompt": "What happens at the 2 minute mark?",
  "video": "<base64-encoded-video>",
  "mimeType": "video/mp4"
}
```

**Response:**
```json
{
  "success": true,
  "result": "At the 2 minute mark, the presenter demonstrates...",
  "metadata": {
    "model": "gemini-2.5-flash",
    "processedAt": "2024-01-15T10:30:00Z"
  }
}
```

### 3. Analyze YouTube Video

Analyze a YouTube video by passing its URL directly.

```
POST /api/generate/video-youtube
```

**Request:**
```json
{
  "prompt": "Create a quiz with 5 questions based on this video",
  "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Response:**
```json
{
  "success": true,
  "result": "Quiz based on the video:\n\n1. What is the main topic discussed?\na) ...",
  "metadata": {
    "model": "gemini-2.5-flash",
    "source": "youtube",
    "processedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Helper Functions

```typescript
export const geminiVideo = {
  // Analyze a video file (upload method for larger files)
  async analyzeVideoFile(file: File, prompt: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', prompt);
    
    const response = await fetch('/api/generate/video-analysis', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.result;
  },
  
  // Analyze a video with inline base64 data (for smaller videos <20MB)
  async analyzeVideoInline(videoBase64: string, prompt: string, mimeType = 'video/mp4') {
    const response = await fetch('/api/generate/video-inline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, video: videoBase64, mimeType })
    });
    
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.result;
  },
  
  // Analyze a YouTube video by URL
  async analyzeYouTube(youtubeUrl: string, prompt: string) {
    const response = await fetch('/api/generate/video-youtube', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, youtubeUrl })
    });
    
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.result;
  },
  
  // Helper: Convert File to base64
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
  },
  
  // Shortcut: Summarize video
  async summarize(file: File) {
    return this.analyzeVideoFile(file, 'Provide a comprehensive summary of this video. Include the main topics, key points, and any important details mentioned.');
  },
  
  // Shortcut: Extract timestamps
  async extractTimestamps(file: File) {
    return this.analyzeVideoFile(file, 'List all the key moments in this video with their timestamps. Format as: [MM:SS] - Description');
  },
  
  // Shortcut: Generate transcript
  async transcribe(file: File) {
    return this.analyzeVideoFile(file, 'Transcribe the spoken content in this video as accurately as possible.');
  },
  
  // Shortcut: Ask question about video
  async askQuestion(file: File, question: string) {
    return this.analyzeVideoFile(file, question);
  }
};
```

## Example Prompts

### Summarization
```
"Summarize this video in 3 paragraphs"
"What are the main takeaways from this video?"
```

### Q&A
```
"What product is being demonstrated?"
"Who are the speakers in this video?"
"What problem is being solved?"
```

### Timestamps
```
"At what timestamp does the presenter discuss pricing?"
"List all the topics covered with their timestamps"
"What happens between 1:30 and 2:00?"
```

### Content Extraction
```
"Extract all URLs, email addresses, or contact info mentioned"
"List all statistics or data points mentioned"
"What brands or products are shown?"
```

### Educational
```
"Create a quiz based on this video content"
"Generate study notes from this lecture"
"What concepts should I understand before watching this?"
```

## Use Cases

- **Video Summarization**: Get quick summaries of long videos
- **Content Q&A**: Ask specific questions about video content
- **Timestamp Extraction**: Find when specific topics are discussed
- **Transcription**: Get text versions of spoken content
- **Quiz Generation**: Create educational quizzes from video content
- **Video Search**: Find specific moments in videos
- **Content Moderation**: Analyze video content for compliance
- **Accessibility**: Generate descriptions for video content

## Supported Video Formats

- MP4 (video/mp4)
- WebM (video/webm)
- MOV (video/quicktime)
- AVI (video/x-msvideo)
- MKV (video/x-matroska)
- 3GP (video/3gpp)

## Technical Details

- **Max file size (inline)**: 20MB
- **Max file size (upload)**: 2GB
- **Max duration**: ~1 hour (depends on resolution)
- **Frame sampling**: ~1 FPS by default
- **Audio**: Processed alongside video for speech understanding

## Documentation
- [Gemini Video Understanding](https://ai.google.dev/gemini-api/docs/video-understanding)
- [Files API](https://ai.google.dev/gemini-api/docs/files)
