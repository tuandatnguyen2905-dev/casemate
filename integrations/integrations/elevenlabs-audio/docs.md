# ElevenLabs Audio Integration

Generate natural-sounding speech from text and create AI background music. Powered by ElevenLabs with 30+ premium voices and 8 music presets.

## Category
AI / Audio

## Required API Keys (Platform-Level)

All API keys are managed at the platform level. Apps call the endpoints below and the platform handles authentication.

- `ELEVENLABS_API_KEY` — Managed by platform admin (not per workspace)

---

## Neutral Path Aliases

The original endpoints live under `/api/workspaces/:workspaceId/demo-video/...` (left in place for back-compat). Hosted apps that aren't building demo-videos should prefer these **neutral aliases**, which delegate to the exact same handlers:

| Neutral alias | Original path |
|---|---|
| `GET /api/voices` | `GET /api/voiceover/voices` |
| `POST /api/workspaces/:workspaceId/audio/voiceover` | `…/demo-video/voiceover` |
| `POST /api/workspaces/:workspaceId/audio/voiceover/segments` | `…/demo-video/voiceover/segments` |
| `GET /api/audio/music/presets` | `GET /api/music/presets` |
| `POST /api/workspaces/:workspaceId/audio/music/preset` | `…/demo-video/music/preset` |
| `POST /api/workspaces/:workspaceId/audio/music/custom` | `…/demo-video/music/custom` |

The request/response shapes are identical — the alias choice is purely cosmetic.

---

## Text-to-Speech (TTS)

Convert any text to natural speech audio. Returns a public URL to the generated MP3 file.

### List Available Voices
```
GET /api/voices
```
(alias for `GET /api/voiceover/voices`)

**Response:**
```json
{
  "success": true,
  "voices": [
    {
      "id": "EXAVITQu4vr4xnSDxMaL",
      "name": "Sarah",
      "category": "premade",
      "labels": { "accent": "American", "age": "young", "gender": "female" },
      "previewUrl": "https://..."
    }
  ]
}
```

### Popular Voice IDs

| Voice | ID | Best For |
|-------|-----|----------|
| Sarah (default) | `EXAVITQu4vr4xnSDxMaL` | Friendly, conversational |
| Adam | `pNInz6obpgDQGcFmaJgB` | Professional narration |
| Rachel | `21m00Tcm4TlvDq8ikWAM` | Calm, authoritative |
| Domi | `AZnzlk1XvdvUeBnXmlld` | Energetic, youthful |
| Antoni | `ErXwobaYiN019PkySvjV` | Warm, storytelling |

### Generate Speech
```
POST /api/workspaces/:workspaceId/demo-video/voiceover
```

**Request:**
```json
{
  "script": "Welcome to our app! Here's how to get started.",
  "voiceId": "EXAVITQu4vr4xnSDxMaL"
}
```

- `script` — Required. The text to convert to speech.
- `voiceId` — Optional. Defaults to Sarah (`EXAVITQu4vr4xnSDxMaL`). Use the voice list endpoint to find other voices.

**Response:**
```json
{
  "success": true,
  "audioUrl": "https://storage.googleapis.com/.../voiceover.mp3",
  "estimatedDurationMs": 3200,
  "script": "Welcome to our app! Here's how to get started."
}
```

### Generate Segmented Speech
```
POST /api/workspaces/:workspaceId/demo-video/voiceover/segments
```

Generate multiple audio segments with individual timing. Useful for step-by-step narration or multi-section audio.

**Request:**
```json
{
  "segments": [
    { "text": "Step one: Enter your email address." },
    { "text": "Step two: Choose your plan." },
    { "text": "Step three: Start building!" }
  ],
  "voiceId": "EXAVITQu4vr4xnSDxMaL",
  "fps": 30
}
```

**Response:**
```json
{
  "success": true,
  "segments": [
    { "text": "Step one...", "audioUrl": "https://...", "durationMs": 2100 },
    { "text": "Step two...", "audioUrl": "https://...", "durationMs": 1800 },
    { "text": "Step three...", "audioUrl": "https://...", "durationMs": 1500 }
  ],
  "totalSegments": 3,
  "totalDurationMs": 6300
}
```

---

## Music Generation

Generate AI background music from text prompts or presets. Returns a public URL to the generated audio file.

### List Music Presets
```
GET /music/presets
```

**Available Presets:**

| Preset | Style |
|--------|-------|
| `corporate` | Upbeat, inspiring, piano + guitar |
| `tech` | Electronic ambient, futuristic synths |
| `uplifting` | Acoustic guitar, warm and friendly |
| `calm` | Soft piano, ambient pads, relaxing |
| `energetic` | Driving drums, modern synths |
| `playful` | Bouncy, cheerful, xylophone |
| `cinematic` | Epic orchestral, strings + brass |
| `lofi` | Lo-fi hip hop, chill beats |

### Generate Music from Preset
```
POST /api/workspaces/:workspaceId/demo-video/music/preset
```

**Request:**
```json
{
  "preset": "calm",
  "lengthMs": 30000
}
```

- `preset` — Required. One of: corporate, tech, uplifting, calm, energetic, playful, cinematic, lofi.
- `lengthMs` — Optional. Duration in milliseconds (3000-600000). Default: 60000 (1 minute).

**Response:**
```json
{
  "success": true,
  "audioUrl": "https://storage.googleapis.com/.../music.mp3",
  "durationMs": 30000,
  "prompt": "calm and peaceful background music..."
}
```

### Generate Custom Music
```
POST /api/workspaces/:workspaceId/demo-video/music/custom
```

**Request:**
```json
{
  "prompt": "jazzy piano with soft drums, laid-back and sophisticated, 90 BPM",
  "lengthMs": 45000,
  "instrumental": true
}
```

- `prompt` — Required (10-4100 chars). Text description of the music style.
- `lengthMs` — Optional. Duration in milliseconds (3000-600000). Default: 60000.
- `instrumental` — Optional. Default: true. Set to false for vocals.

**Response:**
```json
{
  "success": true,
  "audioUrl": "https://storage.googleapis.com/.../music.mp3",
  "durationMs": 45000,
  "prompt": "jazzy piano with soft drums..."
}
```

---

## Installation Helper

```javascript
export const elevenlabsAudio = {
  async listVoices() {
    const response = await fetch('/voiceover/voices');
    const data = await response.json();
    return data.voices;
  },

  async speak(workspaceId, text, voiceId) {
    const response = await fetch(`/api/workspaces/${workspaceId}/demo-video/voiceover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script: text, voiceId: voiceId || 'EXAVITQu4vr4xnSDxMaL' })
    });
    const data = await response.json();
    return data.audioUrl;
  },

  async speakSegments(workspaceId, segments, voiceId) {
    const response = await fetch(`/api/workspaces/${workspaceId}/demo-video/voiceover/segments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ segments: segments.map(s => ({ text: s })), voiceId })
    });
    return response.json();
  },

  async generateMusic(workspaceId, preset, lengthMs = 30000) {
    const response = await fetch(`/api/workspaces/${workspaceId}/demo-video/music/preset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preset, lengthMs })
    });
    const data = await response.json();
    return data.audioUrl;
  },

  async generateCustomMusic(workspaceId, prompt, lengthMs = 30000) {
    const response = await fetch(`/api/workspaces/${workspaceId}/demo-video/music/custom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, lengthMs, instrumental: true })
    });
    const data = await response.json();
    return data.audioUrl;
  }
};
```

---

## Use Cases

- **Accessibility** — Read app content aloud for visually impaired users
- **Language Learning** — Generate pronunciation examples and listening exercises
- **Meditation / Wellness** — Guided meditations with calming voice + ambient music
- **Podcast Tools** — Convert written scripts to audio episodes
- **Audio Content** — Generate audio versions of articles, newsletters, or lessons
- **Notification Audio** — Speak alerts and status updates
- **Music Creation** — Background music for presentations, videos, or ambient app experiences
- **Voice Assistants** — Text-to-speech responses in conversational apps

---

## Tips

- ElevenLabs emphasizes **CAPITALIZED** words — use ALL CAPS for brand names or emphasis
- For longer texts, use the segmented endpoint to generate per-section audio
- Music generation takes 10-30 seconds depending on length; show a loading state
- All generated audio files are stored in Google Cloud Storage with permanent public URLs
- Cost: ~$0.30 per 1000 characters (TTS), ~$0.01 per second (music)
