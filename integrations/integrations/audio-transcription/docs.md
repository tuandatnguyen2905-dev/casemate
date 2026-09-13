# Audio Transcription Integration

Record audio and convert speech to text using OpenAI's GPT-4o Transcribe model. Simple POST endpoint for record-then-send transcription workflows.

## Category
AI/ML

## Required API Keys
- `OPENAI_API_KEY`

## API Endpoint

**Transcribe Audio**
```
POST /api/generate/transcribe
```

**Request:**
Send a `multipart/form-data` request with an `audio` file field.

```
Content-Type: multipart/form-data
Field: audio (File - .webm, .mp3, .wav, .m4a, .ogg)
```

**Response:**
```json
{
  "text": "The transcribed text from the audio recording"
}
```

## Installation

```javascript
export const audioTranscription = {
  async transcribe(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    const response = await fetch('/api/generate/transcribe', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Transcription failed');
    const { text } = await response.json();
    return text;
  },

  async recordAndTranscribe() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    const chunks = [];

    return new Promise((resolve, reject) => {
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunks, { type: 'audio/webm' });
        try {
          const text = await audioTranscription.transcribe(blob);
          resolve(text);
        } catch (err) {
          reject(err);
        }
      };
      mediaRecorder.onerror = reject;
      mediaRecorder.start();
    });
  }
};
```

## Use Cases
- Voice input for form fields
- Voice memos and note dictation
- Meeting/conversation recording
- Accessibility voice input
- Voice-to-text search

## When to Use This vs Realtime API
| Scenario | Use |
|---|---|
| Record audio, then get text back | `/api/generate/transcribe` |
| Voice input for a form field | `/api/generate/transcribe` |
| Voice memo / note dictation | `/api/generate/transcribe` |
| Live bidirectional voice conversation | Realtime API (`/api/realtime/token`) |
| Real-time streaming transcription | Realtime API (`/api/realtime/token`) |

## Supported Audio Formats
- WebM (recommended for browser recording)
- MP3
- WAV
- M4A
- OGG

## Documentation
- [OpenAI Audio API Docs](https://platform.openai.com/docs/guides/speech-to-text)
