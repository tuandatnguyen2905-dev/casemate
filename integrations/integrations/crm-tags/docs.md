# CRM Tags Integration

Manage contact and session tags for organizing and triggering automated boosters.

## Category
CRM

## Required API Keys
None (uses internal APIs)

## API Endpoints

Note: All entity-tags endpoints require `workspaceId` as a query parameter.

### Create a Tag

```
POST /api/workspace-tags/:workspaceId
```

**Request:**
```json
{
  "name": "vip-customer",
  "color": "#FF5733"
}
```

**Response:**
```json
{
  "tag": {
    "id": "wtag_abc123",
    "workspaceId": "ws_xyz",
    "name": "vip-customer",
    "color": "#FF5733"
  }
}
```

### List All Tags

```
GET /api/workspace-tags/:workspaceId
```

**Response:**
```json
{
  "tags": [
    {
      "id": "wtag_abc123",
      "workspaceId": "ws_xyz",
      "name": "vip-customer",
      "color": "#FF5733"
    }
  ]
}
```

### Apply Tag to Contact

Applying a tag to a contact automatically propagates it to any linked sessions.

```
POST /api/entity-tags/contacts/:contactId/tags?workspaceId=:workspaceId
```

**Request:**
```json
{
  "tagId": "wtag_abc123",
  "propagateToSessions": true
}
```

**Response:**
```json
{
  "entityTag": {
    "id": "etag_xyz",
    "entityType": "contact",
    "entityId": "contact_123",
    "tagId": "wtag_abc123",
    "sourceType": "direct"
  }
}
```

### Apply Tag to Session

```
POST /api/entity-tags/sessions/:sessionId/tags?workspaceId=:workspaceId
```

**Request:**
```json
{
  "tagId": "wtag_abc123",
  "propagateToContact": false
}
```

### Get Contact Tags

```
GET /api/entity-tags/contacts/:contactId/tags?workspaceId=:workspaceId
```

**Response:**
```json
{
  "tags": [
    {
      "id": "etag_xyz",
      "tagId": "wtag_abc123",
      "sourceType": "direct",
      "tag": {
        "id": "wtag_abc123",
        "name": "vip-customer",
        "color": "#FF5733"
      }
    }
  ],
  "count": 1
}
```

### Get Session Tags

```
GET /api/entity-tags/sessions/:sessionId/tags?workspaceId=:workspaceId&includeInherited=true
```

Optional query parameter `includeInherited` (default: true) controls whether tags inherited from linked contacts are included.

### Remove Tag from Contact

```
DELETE /api/entity-tags/contacts/:contactId/tags/:tagId?workspaceId=:workspaceId
```

### Remove Tag from Session

```
DELETE /api/entity-tags/sessions/:sessionId/tags/:tagId?workspaceId=:workspaceId
```

## Additional Endpoints (Advanced)

- `PUT /api/workspace-tags/:workspaceId/:tagId` - Update tag name/color
- `DELETE /api/workspace-tags/:workspaceId/:tagId` - Delete a tag
- `POST /api/entity-tags/bulk?workspaceId=:workspaceId` - Bulk tag multiple entities
- `GET /api/entity-tags/entities?workspaceId=:workspaceId&tagId=:tagId` - Find all entities with a tag

## Event-Triggered Boosters

When a tag is applied, it can trigger automated "boosters" (reminder templates). Create boosters with `timing_type: "on_tag"` in the CRM Boosters UI to automatically send messages when contacts or sessions receive specific tags.

## Use Cases
- Segment contacts into categories (VIP, lead, customer)
- Trigger automated follow-up messages when tags are applied
- Organize sessions by status or intent
- Build conditional workflows based on customer segments
- Track customer journey stages

## Notes
- Tags are workspace-scoped (tag IDs are prefixed with `wtag_`)
- Color must be a valid hex color (e.g., #FF5733)
- Tags propagate from contacts to linked sessions by default
- Boosters can be configured to trigger on specific tags
