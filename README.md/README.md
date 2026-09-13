# Genesis Space Template

A production-ready space template demonstrating the unified spaces architecture with AI agent integration, WorkspaceDB-backed apps, and two-tier access control.

## Architecture Overview

### Two-Tier Access Model

1. **Entrepreneur Mode** (`/workspace > studio`)
   - Edit space template files in `/spaces/{spaceId}/`
   - Full access to all space configuration and apps
   - Changes affect the template that customers will use

2. **Customer Mode** (`/space/{spaceId}`)
   - End-users interact with personal data in `/user/{sessionId}/`
   - Agent restricted to user files only
   - Each customer gets isolated data storage

### Directory Structure

```
genesis-space/
├── config.json                 # Space configuration
├── README.md                   # This file
├── Desktop.tsx                 # Main desktop UI component
├── SpaceRuntimeContext.tsx     # Mode-aware context provider
├── types.ts                    # TypeScript type definitions
├── apps/                       # Mini-apps
│   └── TasksDB/
│       └── App.tsx
├── components/                 # Shared components
│   ├── AgentChat.tsx          # Claude Agent SDK integration
│   ├── FileBrowser.tsx        # File explorer
│   ├── EmailGate.tsx          # Customer email capture
│   └── Settings.tsx           # Session management
└── data/                       # Optional static seed/reference files
```

## Key Components

### Desktop.tsx
Main UI orchestrator that renders:
- Left dock with app icons
- Windowed interface for apps and agent
- Mode-aware file access
- Email gate for customer mode

### SpaceRuntimeContext.tsx
Provides mode-aware context:
- `mode`: 'entrepreneur' | 'customer'
- `sessionId`: Customer session identifier
- `spaceId`: Current space identifier

### AgentChat.tsx
Claude Agent SDK integration with:
- Session persistence across page reloads
- Streaming responses with SSE
- Tool usage visualization (read/write/edit files)
- Working indicators for agent actions

### WorkspaceDB
WorkspaceDB is the canonical persistence layer for all new mini-apps:
```tsx
const { data, loading, refresh } = window.useWorkspaceDB<T>('items', {
  orderBy: { column: 'created_at', direction: 'desc' },
  limit: 100
});

await window.__workspaceDb.from('items').insert({ title: 'Example' });
refresh();
```

The compiler auto-injects the SDK when app source references `window.useWorkspaceDB` or `window.__workspaceDb`. Do not introduce `useSpaceData` or `useSpaceFiles` in new apps.

## Configuration (config.json)

### Apps Array
```json
{
  "id": "tasks-db",
  "name": "Tasks",
  "description": "Canonical WorkspaceDB persistence template",
  "icon": "CheckSquare",
  "component": "apps/TasksDB/App.tsx"
}
```

**Required Fields:**
- `id` - Unique identifier (lowercase-with-dashes)
- `name` - Display name shown in UI
- `icon` - Lucide React icon name
- `component` - Path to React component file

**Optional Fields:**
- `description` - Helps AI agent understand when to suggest this app to customers

### Terminology
Customize agent action labels:
```json
{
  "terminology": {
    "reading": "loading",
    "writing": "saving",
    "creating": "adding"
  }
}
```

### Desktop Theme
```json
{
  "desktop": {
    "theme": {
      "gradient": "from-blue-50 via-indigo-50 to-purple-50",
      "accentColor": "hsl(240, 60%, 60%)",
      "dockStyle": "glass"
    }
  }
}
```

## Deep Linking to Apps

The AI agent can create clickable deep links to apps using a custom markdown syntax:

```markdown
[Open Tasks](app://tasks-db)
```

This renders as a purple button in the chat that, when clicked, opens the specified app. The syntax is:
- `[Link Text](app://app-id)` where `app-id` matches the app's ID in config.json
- Example: `[Open Tasks](app://tasks-db)`

The agent automatically knows about available apps and uses this syntax to provide helpful navigation to customers.

## Agent Editing Guide

This section helps AI agents understand how to safely and effectively edit this space template.

### What You're Editing

You're working in **entrepreneur mode** - editing the template that customers will use. Your changes affect `/spaces/{spaceId}/` which becomes the base template for all customer instances.

### Safe-to-Edit Files

**✅ Always Safe:**
- `config.json` - Add/remove apps, update theme, change terminology
- `apps/*/App.tsx` - Modify existing apps or create new ones  
- `data/*.json` - Optional static seed/reference files
- `Desktop.tsx` - Customize UI layout, dock appearance, theming
- `components/EmailGate.tsx` - Customize onboarding flow
- `types.ts` - Add/modify TypeScript types

**⚠️ Edit Carefully:**
- `SpaceRuntimeContext.tsx` - Core mode/session management (rarely needs changes)
- `components/AgentChat.tsx` - AI agent integration (test thoroughly after changes)
- `components/FileBrowser.tsx` - File access visualization

**❌ Never Edit:**
- Backend API endpoints (handled outside this space)
- Compilation system (managed by platform)
- Security/path validation (outside this scope)

### Integration Proxy Endpoints

Apps can use these secure API endpoints without exposing API keys:

**OpenAI Text Generation:**
```javascript
const response = await fetch('/proxy/openai/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: 'Hello!' }],
    stream: false
  })
});
```

**Web Search (SerpAPI):**
```javascript
const response = await fetch('/api/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'AI trends 2024',
    searchType: 'web',
    num: 10
  })
});
```

**AI Image Generation (DALL-E 3):**
```javascript
// Simple image generation (instant results with DALL-E 3)
const response = await fetch('/api/generate/image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A professional headshot photo',
    aspectRatio: '1:1', // '1:1', '16:9', or '9:16'
    quality: 'standard' // 'standard' or 'hd'
  })
});
const { imageUrl } = await response.json();
// Image is automatically uploaded to GCS and ready to use!
```

**AI Video Generation (Veo3):**
```javascript
// Video generation (async with polling)
const response = await fetch('/api/generate/video', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A cat playing with yarn',
    aspectRatio: '16:9', // '16:9' or '9:16'
    generateAudio: true
  })
});
const { operationId } = await response.json();

// Poll for completion
const checkStatus = async () => {
  const status = await fetch(`/api/veo/jobs/${operationId}`).then(r => r.json());
  if (status.status === 'completed') return status.videoUrl;
  if (status.status === 'failed') throw new Error(status.errorMessage);
  await new Promise(r => setTimeout(r, 5000));
  return checkStatus();
};
const videoUrl = await checkStatus();
```

**More Integration Endpoints:**

All apps can use these secure endpoints without API keys:

```javascript
// Web Search (SerpAPI) - Search web/news/images
const searchResults = await fetch('/api/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'AI trends 2024',
    searchType: 'web', // 'web', 'news', 'images', 'shopping', 'scholar'
    num: 10
  })
}).then(r => r.json());

// Apify Web Scraping - Run actor
const scrape = await fetch('/api/apify-actor', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    actorId: 'apify/web-scraper',
    input: { startUrls: [{ url: 'https://example.com' }] }
  })
}).then(r => r.json());

// OpenAI Realtime Audio - Get ephemeral token for voice chat
const { token } = await fetch('/api/realtime/token').then(r => r.json());
// Use token with OpenAI Realtime API client

// Note: Stripe and Twilio integrations available via integration store
// Check server/services/integrationStore.ts for implementation details
```

**Important Notes:**
- All endpoints are proxied through the backend for security
- No API keys needed in frontend code
- Endpoints work in both development and production
- Response formats match the original API providers

### Editing Constraints

**CDN-Only Imports:**
```tsx
// ✅ GOOD - CDN imports work in compiled space
import { useState } from 'https://esm.sh/react@18';
import { Activity } from 'https://esm.sh/lucide-react';

// ❌ BAD - Project imports won't work after compilation
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
```

**Data Persistence:**
```tsx
// ✅ GOOD - Use WorkspaceDB
const { data, loading, refresh } = window.useWorkspaceDB<Item>('items', {
  orderBy: { column: 'created_at', direction: 'desc' },
  limit: 100
});

await window.__workspaceDb.from('items').insert({ name: 'Example' });
refresh();

// ❌ BAD - Never use localStorage (breaks mode isolation)
localStorage.setItem('items', JSON.stringify(items));
```

**Component Patterns:**
```tsx
// ✅ GOOD - Self-contained app with clear props
interface MyAppProps {
  tableName: string;
}

export default function MyApp({ tableName }: MyAppProps) {
  // Use WorkspaceDB, render UI
}

// ❌ BAD - Dependencies on external state
import { useWorkspaceContext } from '@/contexts/workspace';
```

### Common Editing Tasks

**Adding a New App:**
1. Create `apps/NewApp/App.tsx` with a default exported component
2. Add entry to `config.json` apps array
3. Choose icon from lucide-react icon set
4. Test in both entrepreneur and customer modes

**Changing Theme:**
1. Edit `config.json` desktop.theme.gradient
2. Update `accentColor` in HSL format
3. Optionally modify Desktop.tsx for custom styling

**Customizing Agent:**
1. Edit `config.json` terminology for action labels
2. Modify AgentChat.tsx for UI changes
3. Agent tools (read_file, write_file, edit_file) are fixed

**Updating Data Schema:**
1. Modify TypeScript types in `types.ts`
2. Use `db_create_table` / `db_alter_table` for richer WorkspaceDB schemas
3. Update app components to use the new schema
4. Test data persistence flow

### Finding Examples

Look at existing apps for patterns:
- `apps/TasksDB/App.tsx` - Canonical WorkspaceDB reads/writes
- `components/AgentChat.tsx` - API integration, SSE streaming

## Creating a New App

1. **Create app directory:**
```bash
mkdir -p apps/MyApp
```

2. **Create App.tsx:**
```tsx
interface Item {
  id: number;
  name: string;
}

declare global {
  interface Window {
    useWorkspaceDB: <T = any>(table: string, options?: any) => { data: T[]; loading: boolean; error: Error | null; refresh: () => void };
    __workspaceDb: any;
  }
}

export default function MyApp() {
  const { data, loading, refresh } = window.useWorkspaceDB<Item>('items', {
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 100,
  });
  
  return <div>My App Content</div>;
}
```

3. **Add to config.json:**
```json
{
  "id": "my-app",
  "name": "My App",
  "icon": "Star",
  "component": "apps/MyApp/App.tsx"
}
```

## Design System

### Color Palette

The genesis space includes a cohesive color palette defined in `lib/colors.ts` to maintain visual consistency across all components. When editing spaces, use these color constants instead of hardcoded colors.

**Color Philosophy:**
- **Primary (Blue)**: Main actions, links, and highlights - `colors.primary`
- **Accent (Purple)**: Special elements and agent branding - `colors.accent`
- **Semantic**: Success (green), Warning (yellow), Danger (red)
- **Neutrals (Gray)**: Backgrounds, borders, and text

**Quick Reference:**
```tsx
import { colors, tw } from '../lib/colors';

// Using Tailwind class helpers (recommended)
<button className={tw.button.primary}>Save</button>
<div className={tw.dock.active}>Active</div>
<span className={tw.priority.high}>High Priority</span>

// Using color constants for custom styles
<div style={{ color: colors.primary[600] }}>Text</div>
```

**Available Helpers:**
- `tw.button.*` - Primary, secondary, danger, ghost buttons
- `tw.dock.*` - Active/inactive dock items
- `tw.message.*` - User/assistant message bubbles
- `tw.icon.*` - Icon colors by role
- `tw.card.*` - Card styles
- `tw.priority.*` - Priority badges (high/medium/low)
- `tw.category.*` - Category badges (work/ideas/personal/other)

### Typography

The space uses **Sora** from Google Fonts for a modern, clean look. The font is loaded in Desktop.tsx:

```tsx
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```

### Markdown Rendering

The AgentChat component properly renders markdown with bullets, numbered lists, and formatting. Bullet lists use proper `listStyleType: 'disc'` to ensure bullets display correctly.

## Session Management

### Customer Sessions
- Created via EmailGate component on first visit
- Stored in localStorage keyed by `space_session_{spaceId}` with a workspace session ID (`wses_xxx`)
- Propagated through SpaceRuntimeContext
- Used for mode-aware file routing

### Claude Agent Sessions
- Separate from customer sessions
- Managed by AgentChat component
- Persisted in sessionStorage as `claude_session_{spaceId}`
- Enables conversation continuity across page reloads

## Security

### Path Validation
Multi-layer security prevents path traversal:
- Blocks `..` (parent directory references)
- Blocks `/` (absolute paths)
- Blocks `:` (protocol prefixes)
- Blocks `\` (backslashes)
- Hard-fail in customer mode if sessionId missing

### Customer Mode Restrictions
- Agent can only access `/user/{sessionId}/` directory
- No access to template files or other customers' data
- Path normalization validates all resolved paths stay within sandbox

## API Endpoints

### Space Chat Stream
```
POST /api/space/:spaceId/chat/stream
Body: { message: string, sessionId?: string }
Response: SSE stream with progress, messages, and results
```

### Customer File Access
```
GET /api/space/:spaceId/user/:sessionId/file/*
PUT /api/space/:spaceId/user/:sessionId/file/*
```

## Compilation

The space is compiled into a self-contained bundle:

```bash
POST /api/space/:spaceId/unified/compile
Body: { mode: 'entrepreneur' | 'customer' }
```

**Compilation Process:**
1. All imports rewritten to CDN URLs
2. ESBuild compiles TypeScript to ESM
3. jsx-runtime imports fixed post-compilation
4. Global component registration via `window.__SPACE_COMPONENTS__[spaceId]`

## Best Practices

1. **Always use WorkspaceDB** for new app data persistence
2. **Never use localStorage** - breaks mode isolation
3. **Keep apps self-contained** - no cross-app dependencies
4. **Use CDN imports only** - no `@/` project imports
5. **Add comments** - document complex logic
6. **Test both modes** - entrepreneur and customer
7. **Validate forms** - provide clear error messages
8. **Handle empty states** - show helpful messages
9. **Loading states** - display spinners during async operations
10. **Session persistence** - use synchronous useState initializers

## Testing

### Entrepreneur Mode
```
http://localhost:5000/space/genesis-space?mode=entrepreneur
```

### Customer Mode
```
http://localhost:5000/space/genesis-space
```

## Deployment

Once ready, spaces can be deployed and shared:
1. Entrepreneur edits template in workspace
2. Template is compiled and hosted
3. Customers access via unique URLs
4. Each customer gets isolated data storage
5. Agent helps customers interact with their data

## Next Steps

- Customize theme colors and gradient
- Add more apps to the dock
- Update terminology to match your domain
- Create custom agent instructions
- Add branding (name, tagline)
- Deploy and share with customers
