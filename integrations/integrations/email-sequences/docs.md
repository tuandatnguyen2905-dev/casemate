# Email Sequences Integration

Create multi-step automated email campaigns triggered by events, schedules, or manual actions.

## Category
Marketing / Automation

## Required API Keys
- Mailgun API Key (already configured platform-wide)
- Workspace must have a verified email domain

## Concepts

- **Sequence** — A series of emails with defined delays between them, scoped to a workspace. Example: Day 0: Welcome, Day 3: Tips, Day 7: Special Offer.
- **Step** — A single email within a sequence, with a delay (in hours or days) from the previous step or trigger event.
- **Enrollment** — When a contact is added to a sequence. Each contact progresses through steps independently.
- **Trigger** — What starts the sequence: manual enrollment, form submission, webhook, or scheduled event.

---

## API Endpoints

All endpoints are scoped to a workspace via the URL path.

### Create a Sequence
```
POST /api/workspaces/:workspaceId/email-sequences
```

**Request:**
```json
{
  "name": "Welcome Series",
  "description": "Onboarding email sequence for new signups",
  "fromName": "Acme Team",
  "replyTo": "hello@yourdomain.com",
  "steps": [
    {
      "order": 1,
      "delayHours": 0,
      "subject": "Welcome to Acme!",
      "textBody": "Hi {{firstName}}, thanks for joining!",
      "htmlBody": "<h1>Welcome, {{firstName}}!</h1><p>Thanks for joining Acme.</p>"
    },
    {
      "order": 2,
      "delayHours": 72,
      "subject": "3 tips to get started",
      "textBody": "Here are 3 tips...",
      "htmlBody": "<h1>Getting Started</h1><ol><li>Tip 1</li><li>Tip 2</li><li>Tip 3</li></ol>"
    },
    {
      "order": 3,
      "delayHours": 168,
      "subject": "Special offer just for you",
      "textBody": "As a valued member, here's 20% off...",
      "htmlBody": "<h1>20% Off</h1><p>Use code WELCOME20 at checkout.</p>"
    }
  ]
}
```

- `name` — Required. Sequence name.
- `steps` — Required. Array of email steps.
- `steps[].order` — Step order (1-indexed).
- `steps[].delayHours` — Hours to wait after previous step (0 = send immediately).
- `steps[].subject` — Email subject. Supports `{{variable}}` template syntax.
- `steps[].textBody` / `steps[].htmlBody` — Email content. Supports `{{variable}}` template syntax.
- `fromName` — Optional. Sender display name.
- `replyTo` — Optional. Reply-to address.

**Response:**
```json
{
  "id": "seq-abc-123",
  "workspaceId": "workspace-123",
  "name": "Welcome Series",
  "status": "active",
  "stepsCount": 3,
  "enrollmentCount": 0,
  "createdAt": "2024-01-14T12:00:00.000Z"
}
```

### List Sequences
```
GET /api/workspaces/:workspaceId/email-sequences
```

### Get Sequence Details
```
GET /api/workspaces/:workspaceId/email-sequences/:sequenceId
```

Returns sequence metadata plus all steps and enrollment stats.

### Update a Sequence
```
PATCH /api/workspaces/:workspaceId/email-sequences/:sequenceId
```

### Delete a Sequence
```
DELETE /api/workspaces/:workspaceId/email-sequences/:sequenceId
```

### Pause / Resume a Sequence
```
POST /api/workspaces/:workspaceId/email-sequences/:sequenceId/pause
POST /api/workspaces/:workspaceId/email-sequences/:sequenceId/resume
```

### Enroll a Contact
```
POST /api/workspaces/:workspaceId/email-sequences/:sequenceId/enroll
```

**Request:**
```json
{
  "email": "john@example.com",
  "variables": {
    "firstName": "John",
    "company": "Acme Inc"
  }
}
```

### Enroll Multiple Contacts (Batch)
```
POST /api/workspaces/:workspaceId/email-sequences/:sequenceId/enroll/batch
```

**Request:**
```json
{
  "contacts": [
    { "email": "john@example.com", "variables": { "firstName": "John" } },
    { "email": "jane@example.com", "variables": { "firstName": "Jane" } }
  ]
}
```

### Unenroll a Contact
```
POST /api/workspaces/:workspaceId/email-sequences/:sequenceId/unenroll
```

```json
{
  "email": "john@example.com"
}
```

### Get Enrollment Status
```
GET /api/workspaces/:workspaceId/email-sequences/:sequenceId/enrollments
```

Returns per-contact progress through the sequence.

---

## Template Variables

Email subjects and bodies support `{{variable}}` template syntax. Variables are provided at enrollment time.

**Built-in variables:**
- `{{email}}` — Contact's email address
- `{{unsubscribeUrl}}` — One-click unsubscribe link

**Custom variables:** Any key-value pair passed in the `variables` object at enrollment.

---

## Sequence Execution

The system uses the Task Scheduler to process sequence steps:

1. When a contact is enrolled, the first step (delayHours = 0) sends immediately
2. After each step, the system schedules the next step using the delay
3. If a sequence is paused, no new steps are sent
4. If a contact unsubscribes, they are removed from all active sequences

---

## Use Cases

1. **Welcome/Onboarding** — Multi-day onboarding series for new signups
2. **Nurture Campaigns** — Gradually educate leads about your product
3. **Post-Purchase** — Follow-up emails after a purchase (tips, review requests, upsells)
4. **Re-engagement** — Win back inactive customers with escalating offers
5. **Event Follow-up** — Post-event recap, slides, and next steps
6. **Trial Conversion** — Guide trial users toward paid conversion

---

## Common Patterns

### Welcome Series
```json
{
  "name": "Welcome Series",
  "steps": [
    { "order": 1, "delayHours": 0, "subject": "Welcome, {{firstName}}!", "textBody": "..." },
    { "order": 2, "delayHours": 24, "subject": "Quick tip to get started", "textBody": "..." },
    { "order": 3, "delayHours": 72, "subject": "Have questions? We're here to help", "textBody": "..." },
    { "order": 4, "delayHours": 168, "subject": "Your first week recap", "textBody": "..." }
  ]
}
```

### Trigger from Server Function Hook
Enroll contacts when a form is submitted:

```javascript
const { email, firstName } = request.body;

// Enroll in welcome sequence
console.log('Enrolling ' + email + ' in welcome sequence');
respond(200, {
  action: 'enroll',
  sequenceId: 'seq-welcome',
  email,
  variables: { firstName }
});
```

### Conditional Steps
Use step metadata to indicate conditions (agent interprets):

```json
{
  "order": 3,
  "delayHours": 72,
  "subject": "Special offer just for you",
  "metadata": {
    "condition": "has_not_purchased",
    "skipIfPurchased": true
  }
}
```
