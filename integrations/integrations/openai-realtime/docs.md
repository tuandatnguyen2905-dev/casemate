# OpenAI Realtime Audio Integration

Real-time voice conversations with AI using OpenAI's Realtime API.

## Category
AI/ML

## Required API Keys
- `OPENAI_API_KEY`

## API Endpoint

**Get Ephemeral Token**
```
GET /api/realtime/token
```

Returns an ephemeral OpenAI token for secure client-side realtime connections.

**Response:**
```json
{
  "token": "eph_..."
}
```

## Installation

This integration uses ephemeral tokens for security - never expose API keys to the browser.

```javascript
import { RealtimeClient } from '@openai/agents-realtime';

export const realtimeAudio = {
  async createSession(options = {}) {
    // Get ephemeral token from your backend
    const response = await fetch('/api/realtime/token');
    const { token } = await response.json();
    
    // Create realtime client with ephemeral token
    const client = new RealtimeClient({
      token: token,
      model: "gpt-5-realtime-preview"
    });
    
    // Configure and connect
    await client.connect();
    return client;
  },
  
  async attachMicrophone(client) {
    console.log('[VoiceChat] requesting microphone…');
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });
    
    // Attach stream to client
    // (API method varies by SDK version)
    return stream;
  }
};
```

## Use Cases
- Voice assistants
- Real-time transcription
- Voice-controlled interfaces
- Interactive voice apps
- Language learning tools

## Documentation
- [OpenAI Realtime API Docs](https://platform.openai.com/docs/guides/realtime)
