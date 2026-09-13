# Workspace Community Integration

Create shared, social experiences in your mini-apps with feeds, posts, reactions, real-time updates, and user presence (who's online). Perfect for leaderboards, team collaboration, and multiplayer features.

## Category
Social

## Required API Keys
None

## Critical Distinction

**⚠️ IMPORTANT:**
- `sessionSave()` = INDIVIDUAL user data (private, personal, only they can see)
- `community.post()` = SHARED data (public, everyone in workspace can see)

Use `community.post()` when users should SEE EACH OTHER'S content (feeds, leaderboards, shared boards).  
Use `sessionSave()` only for private user preferences or settings.

## API Endpoints

All endpoints use `WORKSPACE_API_URL` to connect back to your AppSmith server.

**Initialize Space**
```
POST /api/community/spaces
```

**Request:**
```json
{
  "workspaceId": "workspace-123",
  "appId": "fitness-tracker",
  "name": "Workout Feed",
  "type": "feed",
  "metadata": {}
}
```

**List Spaces**
```
GET /api/community/spaces?workspaceId=workspace-123
```

**Create Post**
```
POST /api/community/spaces/:spaceId/posts
```

**Request:**
```json
{
  "userId": "user@example.com",
  "userName": "John Doe",
  "content": {
    "text": "Just completed 50 pushups!",
    "workout": {...}
  },
  "metadata": {}
}
```

**Get Posts**
```
GET /api/community/spaces/:spaceId/posts?limit=50
```

**Add Reaction**
```
POST /api/community/posts/:postId/reactions
```

**Connect WebSocket (Real-time)**
```
ws://WORKSPACE_API_URL/api/community/spaces/:spaceId/ws
```

## Installation

```javascript
export const community = {
  baseUrl: typeof WORKSPACE_API_URL !== 'undefined' 
    ? WORKSPACE_API_URL + '/api/community' 
    : '/api/community',
  
  async initSpace(workspaceId, appId, name, type = 'feed') {
    const response = await fetch(`${this.baseUrl}/spaces`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspaceId, appId, name, type, metadata: {} })
    });
    return response.json();
  },
  
  async listSpaces(workspaceId) {
    const response = await fetch(`${this.baseUrl}/spaces?workspaceId=${workspaceId}`);
    return response.json();
  },
  
  async getOrCreateSpace(workspaceId, appId, name, type = 'feed') {
    const { spaces } = await this.listSpaces(workspaceId);
    const existing = spaces.find(s => s.appId === appId && s.name === name);
    if (existing) return existing;
    return this.initSpace(workspaceId, appId, name, type);
  },
  
  async post(spaceId, userId, userName, content, metadata = {}) {
    const response = await fetch(`${this.baseUrl}/spaces/${spaceId}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, userName, content, metadata })
    });
    return response.json();
  },
  
  async getPosts(spaceId, limit = 50) {
    const response = await fetch(`${this.baseUrl}/spaces/${spaceId}/posts?limit=${limit}`);
    return response.json();
  },
  
  async react(postId, userId, reactionType) {
    const response = await fetch(`${this.baseUrl}/posts/${postId}/reactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, reactionType })
    });
    return response.json();
  },
  
  connectRealtime(spaceId, onMessage) {
    const wsUrl = this.baseUrl.replace('http', 'ws') + `/spaces/${spaceId}/ws`;
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => onMessage(JSON.parse(event.data));
    return ws;
  }
};
```

## Space Types
- `feed` - Social feed with posts and reactions
- `leaderboard` - Ranked list with scores
- `board` - Collaborative board (like Trello)
- `chat` - Real-time chat messages

## Use Cases
- Team workout feeds
- Leaderboards
- Collaborative boards
- Social feeds
- Multiplayer games
- Shared dashboards

---

## User Presence (Who's Online)

Track who's currently online in real-time. Uses efficient in-memory storage - no file writes, no rate limits.

**⚠️ IMPORTANT:**
- Call `presence.heartbeat()` every **60 seconds** (not faster!)
- Users are automatically marked offline after 2 minutes of no heartbeat
- Presence is ephemeral - resets on server restart (by design)

### Presence API Endpoints

**Join (mark user online)**
```
POST /api/presence/spaces/:spaceId/join
```
```json
{
  "userId": "user@example.com",
  "userName": "John Doe",
  "metadata": { "avatar": "🎮", "status": "playing" }
}
```

**Leave (mark user offline)**
```
POST /api/presence/spaces/:spaceId/leave
```
```json
{ "userId": "user@example.com" }
```

**Heartbeat (keep alive - call every 60 seconds)**
```
POST /api/presence/spaces/:spaceId/heartbeat
```
```json
{ "userId": "user@example.com" }
```

**Get Online Users**
```
GET /api/presence/spaces/:spaceId/online
```
Response:
```json
{
  "users": [
    { "userId": "user1@example.com", "userName": "Alice", "lastSeen": 1704067200000 }
  ],
  "count": 1
}
```

**WebSocket Events** (via community WebSocket):
- `presence.joined` - User came online
- `presence.left` - User went offline

### Presence Helper

```javascript
export const presence = {
  baseUrl: typeof WORKSPACE_API_URL !== 'undefined' 
    ? WORKSPACE_API_URL + '/api/presence' 
    : '/api/presence',
  
  heartbeatInterval: null,
  
  async join(spaceId, userId, userName, metadata = {}) {
    const response = await fetch(`${this.baseUrl}/spaces/${spaceId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, userName, metadata })
    });
    return response.json();
  },
  
  async leave(spaceId, userId) {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    const response = await fetch(`${this.baseUrl}/spaces/${spaceId}/leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    return response.json();
  },
  
  async heartbeat(spaceId, userId) {
    const response = await fetch(`${this.baseUrl}/spaces/${spaceId}/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    return response.json();
  },
  
  async getOnline(spaceId) {
    const response = await fetch(`${this.baseUrl}/spaces/${spaceId}/online`);
    return response.json();
  },
  
  startPresence(spaceId, userId, userName, metadata = {}) {
    this.join(spaceId, userId, userName, metadata);
    this.heartbeatInterval = setInterval(() => {
      this.heartbeat(spaceId, userId);
    }, 60000);
    const handleUnload = () => this.leave(spaceId, userId);
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      this.leave(spaceId, userId);
    };
  }
};
```

### Presence Use Cases
- Multiplayer games - show who's in the lobby
- Collaborative tools - see who's editing
- Chat rooms - online indicator
- Live events - viewer count

## Documentation
- [Community API Docs](https://audogpts.com/docs/community-api)
