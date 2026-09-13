# Slack Integration

Post messages, manage channels, and track VA tasks through Slack.

## Category
Communication & Collaboration

## Required API Keys
- `SLACK_BOT_TOKEN` - Bot User OAuth Token (xoxb-...)
- `SLACK_SIGNING_SECRET` - For webhook verification (optional)

## API Endpoints

### List Channels
```
GET /api/slack/channels?workspaceId=...
```

**Response:**
```json
{
  "channels": [
    {
      "id": "C01234567",
      "name": "general",
      "is_private": false,
      "member_count": 25,
      "topic": "Company announcements"
    }
  ]
}
```

### Post Message
```
POST /api/slack/messages
```

**Request:**
```json
{
  "workspaceId": "uuid",
  "channel": "C01234567",
  "text": "Hello from Otto!",
  "blocks": [],
  "attachments": []
}
```

**Response:**
```json
{
  "success": true,
  "ts": "1234567890.123456",
  "channel": "C01234567"
}
```

### Create VA Task
```
POST /api/slack/tasks
```

**Request:**
```json
{
  "workspaceId": "uuid",
  "channel": "C01234567",
  "title": "Research top 10 influencers in fitness niche",
  "description": "Find Instagram influencers with 10k-100k followers",
  "priority": "high",
  "dueDate": "2025-02-10"
}
```

**Response:**
```json
{
  "success": true,
  "taskId": "task_abc123",
  "messageTs": "1234567890.123456"
}
```

### List Tasks
```
GET /api/slack/tasks?workspaceId=...&status=pending
```

**Response:**
```json
{
  "tasks": [
    {
      "id": "task_abc123",
      "title": "Research influencers",
      "status": "pending",
      "assignee": null,
      "channel": "C01234567",
      "createdAt": "2025-02-05T10:00:00Z"
    }
  ]
}
```

### Update Task Status
```
PATCH /api/slack/tasks/:taskId
```

**Request:**
```json
{
  "workspaceId": "uuid",
  "status": "in_progress",
  "assignee": "U01234567"
}
```

## Installation

```javascript
export const slackIntegration = {
  async listChannels() {
    const response = await fetch('/api/slack/channels?' + new URLSearchParams({
      workspaceId: window.__WORKSPACE_ID__
    }));
    const data = await response.json();
    return data.channels;
  },

  async postMessage(channel, text, options = {}) {
    const response = await fetch('/api/slack/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workspaceId: window.__WORKSPACE_ID__,
        channel,
        text,
        ...options
      })
    });
    return response.json();
  },

  async createTask(channel, title, description, options = {}) {
    const response = await fetch('/api/slack/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workspaceId: window.__WORKSPACE_ID__,
        channel,
        title,
        description,
        ...options
      })
    });
    return response.json();
  },

  async listTasks(status) {
    const params = new URLSearchParams({
      workspaceId: window.__WORKSPACE_ID__
    });
    if (status) params.set('status', status);
    
    const response = await fetch('/api/slack/tasks?' + params);
    return response.json();
  },

  async updateTask(taskId, updates) {
    const response = await fetch(`/api/slack/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workspaceId: window.__WORKSPACE_ID__,
        ...updates
      })
    });
    return response.json();
  }
};
```

## Use Cases
- Post automated updates to Slack channels
- Create tasks for virtual assistants
- Track task completion and progress
- Send notifications on key business events
- Coordinate team work through Slack

## Documentation
- [Slack API Docs](https://api.slack.com/docs)
- [Slack Block Kit](https://api.slack.com/block-kit)
