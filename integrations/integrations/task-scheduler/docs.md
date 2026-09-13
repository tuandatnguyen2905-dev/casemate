# Task Scheduler Integration (Cron Jobs)

Schedule recurring tasks and one-time automations scoped to a workspace.

## Category
Automation

## Required API Keys
None

## Concepts

- **Schedule** — A task definition scoped to a workspace. Can be recurring (using RRULE frequencies) or one-time (scheduled at a specific datetime). Each schedule has one of four accepted action types (`hook`, `webhook`, `email`, or `custom`) and an action payload.
- **Recurring Schedule** — Fires repeatedly at a given frequency (hourly, daily, weekly, monthly). The system automatically calculates the next run time after each execution.
- **One-time Schedule** — Fires once at a specific datetime and then completes.

---

## API Endpoints

All endpoints are scoped to a workspace via the URL path. The `workspaceId` is the only required identifier — no app ID or other headers are needed.

The `/api/workspaces/:workspaceId/schedules*` routes documented here are the
canonical family for space app code. The bundled `example.tsx` uses the older
`/api/app-skills/scheduler/*` family. Both families read and write the same
scheduled-task storage, but their request and response shapes differ, so use
one family consistently.

### Create a Recurring Schedule
```
POST /api/workspaces/:workspaceId/schedules
```

**Request:**
```json
{
  "name": "Daily Digest",
  "description": "Sends a daily summary via webhook",
  "frequency": "daily",
  "time": "09:00",
  "timezone": "America/New_York",
  "actionType": "webhook",
  "actionPayload": {
    "url": "https://example.com/webhook",
    "method": "POST"
  }
}
```

- `frequency` — Required. One of: `hourly`, `daily`, `weekly`, `monthly`
- `time` — Optional. Time of day in `HH:MM` format. If the time has already passed today, the first run is pushed to the next interval.
- `timezone` — Optional. Defaults to `UTC`.
- `actionType` — Optional. One of: `hook`, `webhook`, `email`, `custom`. Defaults to `hook`.
- `actionPayload` — Optional at creation. Its shape depends on `actionType` (see Action Types below). A webhook is rejected at creation if neither `actionPayload` nor `webhookUrl` is present. Required hook and email fields are checked when the schedule runs.
- `webhookUrl` — Optional shorthand for `actionPayload` only. When `actionPayload` is absent, this sets it to `{ "url": webhookUrl, "method": "POST" }`. It does **not** change `actionType`; set `actionType: "webhook"` explicitly.

**Response:**
```json
{
  "success": true,
  "schedule": {
    "id": "uuid-abc-123",
    "workspaceId": "workspace-123",
    "name": "Daily Digest",
    "description": "Sends a daily summary via webhook",
    "actionType": "webhook",
    "scheduleType": "recurring",
    "rrule": "FREQ=DAILY;INTERVAL=1",
    "timezone": "America/New_York",
    "status": "pending",
    "nextRun": "2024-01-15T14:00:00.000Z",
    "createdAt": "2024-01-14T12:00:00.000Z"
  }
}
```

### Schedule a One-Time Email
```
POST /api/workspaces/:workspaceId/schedules/email
```

**Request:**
```json
{
  "name": "Welcome Email",
  "description": "Send onboarding email to new user",
  "scheduledAt": "2024-01-15T14:00:00Z",
  "timezone": "America/New_York",
  "email": {
    "to": "user@example.com",
    "subject": "Welcome!",
    "text": "Thanks for signing up.",
    "html": "<h1>Welcome!</h1><p>Thanks for signing up.</p>"
  }
}
```

**Response:**
```json
{
  "success": true,
  "schedule": {
    "id": "uuid-def-456",
    "workspaceId": "workspace-123",
    "name": "Welcome Email",
    "scheduledAt": "2024-01-15T14:00:00.000Z",
    "status": "pending"
  }
}
```

### List Schedules
```
GET /api/workspaces/:workspaceId/schedules
```

**Response:**
```json
{
  "success": true,
  "schedules": [
    {
      "id": "uuid-abc-123",
      "workspaceId": "workspace-123",
      "name": "Daily Digest",
      "actionType": "webhook",
      "scheduleType": "recurring",
      "rrule": "FREQ=DAILY;INTERVAL=1",
      "status": "pending",
      "nextRun": "2024-01-15T14:00:00.000Z",
      "lastRun": null,
      "runCount": 0,
      "createdAt": "2024-01-14T12:00:00.000Z"
    }
  ]
}
```

### Get a Schedule
```
GET /api/workspaces/:workspaceId/schedules/:scheduleId
```

Returns full details including `actionPayload`, `lastError`, and `updatedAt`.

### Update a Schedule
```
PATCH /api/workspaces/:workspaceId/schedules/:scheduleId
```

**Request (any fields to update):**
```json
{
  "name": "Weekly Digest",
  "frequency": "weekly",
  "status": "pending",
  "timezone": "America/Chicago"
}
```

Updatable fields: `name`, `description`, `frequency`, `timezone`, `status`, `actionPayload`.

### Delete a Schedule
```
DELETE /api/workspaces/:workspaceId/schedules/:scheduleId
```

**Response:**
```json
{
  "success": true,
  "deleted": true
}
```

Cannot delete a schedule that is currently processing.

---

## Action Types

The create schema accepts all four action types: `hook`, `webhook`, `email`,
and `custom`. The scheduler executes `hook`, `webhook`, and `email`. `custom`
is accepted for storage but is not executable.

### hook (run a Server Function)

Runs an enabled workspace Server Function internally, without a public URL
round-trip. Create the function through the `server-functions` integration,
then reference it by name:

```json
{
  "actionType": "hook",
  "actionPayload": {
    "hookName": "nightly-cleanup",
    "payload": { "dryRun": false }
  }
}
```

- `hookName` — Required at execution. It must name an existing, enabled Server
  Function in the same workspace.
- `payload` — Optional object. The scheduler delivers it directly as
  `request.body`; it is not wrapped in another `payload` property. If omitted,
  `request.body` is `{}`.

The scheduler calls the function internally, so no API key, workspace token,
or other secret is stored in the schedule.

Do **not** create a `webhook` action that points at a Server Function's public
`/api/hooks/execute/...` address. That public address needs a secret to
authorize the caller. Putting the secret in `actionPayload.headers` stores it
in the scheduled-task record, and the get-schedule endpoint returns
`actionPayload` in full. Use `actionType: "hook"` instead.

### webhook
```json
{
  "actionType": "webhook",
  "actionPayload": {
    "url": "https://example.com/hook",
    "method": "POST",
    "headers": { "Authorization": "Bearer token" },
    "body": { "key": "value" }
  }
}
```

### email
To send an email immediately, use
`POST /api/workspaces/:workspaceId/emails/send`; the `inbound-email`
integration docs describe that endpoint. The scheduler endpoints are only for
future delivery: use `/schedules/email` for a one-time scheduled email, or set
`actionType: "email"` on a recurring schedule:
```json
{
  "actionType": "email",
  "actionPayload": {
    "to": "user@example.com",
    "subject": "Daily Report",
    "text": "Here is your daily report.",
    "html": "<h1>Daily Report</h1>"
  }
}
```

### custom

The create schema accepts `custom`, but the public scheduler has no `custom`
execution handler. A `custom` schedule is accepted for storage but is not
executable; when it becomes due, it fails with an unknown-action-type error.
Do not use it until a runtime handler exists.

The following shape can be stored but cannot run:
```json
{
  "actionType": "custom",
  "actionPayload": {
    "type": "generate-report",
    "params": { "format": "pdf" }
  }
}
```

---

## Server-Side Alerts (no app open)

Everything above is an HTTP contract, so calling it needs an app open in
someone's browser. Most alerts are not like that: a trial-expiry reminder or a
"your booking is tomorrow" nudge has to fire whether or not anyone is looking
at the product.

Build those from **server-side code** in two pieces:

1. A recurring `hook` schedule wakes a Server Function on a cadence.
2. That function works out who is due and calls
   `platform.sendEmail({ ..., scheduledAt })` for each one-off future send.

No app needs to be open for either piece — the platform's scheduler runs both
server-side.

**Step 1 — the recurring job.** Create it once (from app code, from Otto, or
from a Server Function):

```json
POST /api/workspaces/:workspaceId/schedules

{
  "name": "Trial expiry sweep",
  "frequency": "daily",
  "time": "09:00",
  "timezone": "America/New_York",
  "actionType": "hook",
  "actionPayload": { "hookName": "trial-expiry-sweep" }
}
```

**Step 2 — the Server Function it runs.** Inside hook code
`platform.sendEmail` takes an optional `scheduledAt` (an ISO-8601 timestamp in
the future) and registers a one-time scheduled email instead of sending now:

```javascript
// Server Function: trial-expiry-sweep
const expiring = await db.query(/* trials ending in the next 3 days */);

for (const trial of expiring) {
  const remindAt = new Date(new Date(trial.endsAt).getTime() - 24 * 60 * 60 * 1000);
  const scheduled = await platform.sendEmail({
    to: trial.email,
    subject: 'Your trial ends tomorrow',
    html: '<p>Your trial ends on ' + trial.endsAt + '.</p>',
    scheduledAt: remindAt.toISOString(),
  });
  if (!scheduled.success) {
    console.error('Could not schedule for ' + trial.email + ':', scheduled.error);
  }
}

respond(200, { swept: expiring.length });
```

A scheduled call resolves to `{ success: true, scheduled: true, schedule }`, and
a refused one to `{ success: false, scheduled: false, error }` — check
`success` rather than assuming it landed. Supply `text`, `html`, or both; an
HTML-only email is accepted. Attachments are immediate-send only. See the
`server-functions` integration docs for the full helper contract.

---

## Installation

The module below is **browser-side** — it runs in a space app, so it only fires
while someone has that app open. For alerts that must fire on their own, use
the server-side pattern above.

```javascript
export const taskScheduler = {
  async createSchedule(workspaceId, { name, frequency, timezone, actionType, actionPayload, webhookUrl, time, description }) {
    const response = await fetch(`/api/workspaces/${workspaceId}/schedules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        frequency,
        time,
        timezone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        actionType: actionType || 'hook',
        actionPayload,
        webhookUrl
      })
    });
    const data = await response.json();
    return data.schedule;
  },

  async scheduleEmail(workspaceId, { name, scheduledAt, email, timezone, description }) {
    const response = await fetch(`/api/workspaces/${workspaceId}/schedules/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, scheduledAt, email, timezone })
    });
    const data = await response.json();
    return data.schedule;
  },

  async listSchedules(workspaceId) {
    const response = await fetch(`/api/workspaces/${workspaceId}/schedules`);
    const data = await response.json();
    return data.schedules;
  },

  async getSchedule(workspaceId, scheduleId) {
    const response = await fetch(`/api/workspaces/${workspaceId}/schedules/${scheduleId}`);
    const data = await response.json();
    return data.schedule;
  },

  async updateSchedule(workspaceId, scheduleId, updates) {
    const response = await fetch(`/api/workspaces/${workspaceId}/schedules/${scheduleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await response.json();
    return data.schedule;
  },

  async deleteSchedule(workspaceId, scheduleId) {
    await fetch(`/api/workspaces/${workspaceId}/schedules/${scheduleId}`, { method: 'DELETE' });
  },

  async pauseSchedule(workspaceId, scheduleId) {
    return this.updateSchedule(workspaceId, scheduleId, { status: 'cancelled' });
  },

  async resumeSchedule(workspaceId, scheduleId) {
    return this.updateSchedule(workspaceId, scheduleId, { status: 'pending' });
  }
};
```

## Frequencies
- `hourly` — Every hour
- `daily` — Every day
- `weekly` — Every week
- `monthly` — Every month

The documented `frequency` and `time` creation fields expose no day-of-week
control. A newly created weekly schedule inherits its initial weekday from
its creation time; the optional `time` field controls only the time of day.
A later low-level update can replace the raw `rrule` (including `BYDAY`), but
that is separate from the weekly creation option.

## Schedule Statuses
- `pending` — Ready to fire at the next scheduled time
- `processing` — Currently executing
- `completed` — One-time schedule that has finished
- `failed` — Last execution failed (check `lastError`)
- `cancelled` — Manually paused/cancelled

## Use Cases
- Daily/weekly email digests
- Scheduled webhook calls
- Recurring data syncs
- Automated alerts and notifications
- One-time scheduled emails
- Batch processing jobs

## Documentation
- [RRULE Specification](https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.5.3)
