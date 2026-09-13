# OpenAI Text Generation (GPT) Integration

Generate text, chatbots, content creation, and AI responses using OpenAI GPT models.

## Category
AI/ML

## Required API Keys
- `OPENAI_API_KEY`

## API Endpoint

**Chat Completions (Proxied)**
```
POST /proxy/openai/v1/chat/completions
```

The proxy handles API key security - never expose OPENAI_API_KEY to the browser.

**Request:**
```json
{
  "model": "gpt-4o-mini",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ],
  "max_tokens": 1000,
  "temperature": 0.7,
  "stream": false
}
```

**Response:**
```json
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Hello! How can I help you today?"
    }
  }]
}
```

## Installation

```javascript
export const openaiText = {
  async generateText(messages, options = {}) {
    const response = await fetch('/proxy/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: options.model || 'gpt-4o-mini',
        messages: messages,
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7,
        stream: options.stream || false
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  },

  async chat(userMessage, conversationHistory = [], systemPrompt = null) {
    const messages = [];
    
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    
    messages.push(...conversationHistory);
    messages.push({ role: 'user', content: userMessage });

    return await this.generateText(messages);
  },

  async streamChat(userMessage, onChunk, conversationHistory = []) {
    const messages = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const response = await fetch('/proxy/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        stream: true
      })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\\n').filter(line => line.trim().startsWith('data: '));
      
      for (const line of lines) {
        const data = line.replace('data: ', '');
        if (data === '[DONE]') break;
        
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices[0]?.delta?.content;
          if (content) onChunk(content);
        } catch (e) {
          // Skip parse errors
        }
      }
    }
  }
};
```

## Use Cases
- AI chatbots
- Content generation
- Text summarization
- Question answering
- Creative writing assistance
- Code generation

## Supported Models
- gpt-4o
- gpt-4o-mini
- gpt-4
- gpt-3.5-turbo

## Documentation
- [OpenAI Text Generation Docs](https://platform.openai.com/docs/guides/text-generation)
