# Human Tasks API

Request, approve, track, and complete human tasks with wallet-based budgeting. Tasks go through an approval workflow before being posted to Slack.

## Endpoints

### List Tasks
```
GET /api/human-tasks?workspaceId={workspaceId}
GET /api/workspace/{workspaceId}/human-tasks
```

Query params:
- `workspaceId` (required) — workspace UUID
- `status` — filter: `awaiting_approval`, `pending`, `in_progress`, `completed`, `cancelled`
- `includeCompleted` — `true` to include completed/cancelled tasks

Response:
```json
{
  "success": true,
  "tasks": [
    {
      "id": "task_abc123",
      "workspaceId": "...",
      "title": "Research competitor pricing",
      "description": "Find pricing pages for top 5 competitors...",
      "status": "awaiting_approval",
      "approvalStatus": "pending",
      "priority": "medium",
      "estimatedHours": "2",
      "hourlyRate": "2500",
      "quotedBudget": "5000",
      "channel": "human-tasks",
      "createdAt": "2026-01-15T...",
      "approvedAt": null,
      "completedAt": null,
      "finalCost": null
    }
  ]
}
```

### Create Task
```
POST /api/human-tasks
POST /api/workspace/{workspaceId}/human-tasks
```

Body:
```json
{
  "workspaceId": "uuid-here",
  "title": "Task title",
  "description": "Detailed description of what needs to be done",
  "estimatedHours": 2,
  "hourlyRate": 2500,
  "priority": "medium",
  "dueDate": "2026-02-15T00:00:00Z"
}
```

- `workspaceId` (required)
- `title` (required)
- `description` (required)
- `estimatedHours` (required, positive number)
- `hourlyRate` (optional, in cents, default 2500 = $25/hr)
- `quotedBudget` (optional, auto-calculated from hours × rate, in cents)
- `priority` (optional: `low`, `medium`, `high`, default `medium`)
- `dueDate` (optional, ISO date)

New tasks always start with `status: "awaiting_approval"` and `approvalStatus: "pending"`.

Response:
```json
{ "success": true, "taskId": "task_abc123" }
```

### Approve Task
```
POST /api/human-tasks/{taskId}/approve
POST /api/workspace/{workspaceId}/human-tasks/{taskId}/approve
```

Body:
```json
{
  "workspaceId": "uuid-here",
  "approvedBy": "user@example.com"
}
```

Checks wallet balance, posts task to Slack channel, updates status to `pending`.

### Complete Task
```
POST /api/human-tasks/{taskId}/complete
POST /api/workspace/{workspaceId}/human-tasks/{taskId}/complete
```

Body:
```json
{
  "workspaceId": "uuid-here",
  "actualHours": 1.5,
  "notes": "Completed research, findings attached"
}
```

Charges the workspace wallet, creates a wallet transaction, posts completion to Slack thread.

### Reject Task
```
POST /api/human-tasks/{taskId}/reject
POST /api/workspace/{workspaceId}/human-tasks/{taskId}/reject
```

Body:
```json
{
  "workspaceId": "uuid-here",
  "reason": "Budget too high"
}
```

Sets status to `cancelled` and approval to `rejected`.

## Task Lifecycle

1. **Created** → `awaiting_approval` / `pending`
2. **Approved** → `pending` / `approved` (posted to Slack)
3. **In Progress** → `in_progress` / `approved`
4. **Completed** → `completed` / `approved` (wallet charged)
5. **Rejected** → `cancelled` / `rejected`

## Budget

- `hourlyRate` and `quotedBudget` are stored in **cents** (e.g., 2500 = $25.00)
- Display: `$${(value / 100).toFixed(2)}`
- Wallet balance is checked on approve and on complete
- Final cost may differ from quoted budget if `actualHours` is provided on completion
