# Inbound Email Integration

Receive, process, and auto-respond to emails on behalf of workspace customers using Mailgun inbound routing and server functions.

## Category
Communication

## Required API Keys
- Mailgun API Key (already configured platform-wide)
- Workspace must have a verified email domain

## Concepts

- **Inbound Route** — A Mailgun route that forwards incoming emails to a workspace's server function hook for processing.
- **Email Thread** — Tracked using In-Reply-To and References headers to maintain conversation context.
- **Auto-Response** — The agent can analyze incoming emails and generate contextual replies using the workspace's AI agent and business context.
- **User-Key Tagging** — Every email (inbound and outbound) can be tagged with a `sessionId`, `contactId`, or `userId` so you can query all emails for a specific end customer.

---

## Architecture

```
Incoming Email → Mailgun → POST /api/mailgun/webhooks/inbound → Email Processor stores to workspace_email_messages → AI Chat Service auto-responds
```

1. Customer sends email to `support@yourdomain.com` (or any address on the workspace's verified domain)
2. Mailgun receives the email and forwards it to the platform's inbound webhook endpoint
3. The platform automatically resolves the recipient to the correct workspace
4. The email is stored in the `workspace_email_messages` table with direction `inbound`
5. The AI Chat Service automatically processes the email and generates a contextual reply using workspace context

This is **already fully built** — emails received by Mailgun are automatically processed, stored, and replied to by the workspace's AI agent. No additional setup is needed beyond having a verified email domain.

---

## Workspace-Scoped Email API

All endpoints are scoped to a workspace via the URL path. Emails can be tagged with a **user key** (`sessionId`, `contactId`, or `userId`) to associate them with a specific end customer.

### Send an Email
```
POST /api/workspaces/:workspaceId/emails/send
```

**Request:**
```json
{
  "to": "john@example.com",
  "subject": "Your order has shipped!",
  "text": "Hi John, your order #12345 has shipped and will arrive by Friday.",
  "html": "<h1>Your order has shipped!</h1><p>Order #12345 will arrive by Friday.</p>",
  "sessionId": "session-abc-123",
  "contactId": "contact-xyz-456",
  "metadata": {
    "orderId": "12345",
    "type": "shipping-notification"
  }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `to` | Yes | Recipient email address |
| `subject` | Yes | Email subject line |
| `text` | Yes | Plain text body |
| `html` | No | HTML body (for rich formatting) |
| `from` | No | Sender address (defaults to workspace's verified email) |
| `replyTo` | No | Reply-to address |
| `sessionId` | No | Workspace session ID to tag this email with (for per-customer querying) |
| `contactId` | No | Funnel contact ID to tag this email with |
| `userId` | No | Workspace user ID to tag this email with |
| `metadata` | No | Custom JSON metadata attached to the email record |
| `inReplyTo` | No | Message-Id of the email being replied to (for threading) |
| `references` | No | Thread reference chain (for threading) |

**Response:**
```json
{
  "success": true,
  "id": "wemail_abc123",
  "mailgunMessageId": "<msg-id@yourdomain.com>",
  "status": "sent"
}
```

### List Email Messages
```
GET /api/workspaces/:workspaceId/emails
```

Returns email messages for the workspace with filtering and pagination.

**Access Control:** A user key (`sessionId`, `contactId`, or `userId`) is **always required**. This prevents end-customer apps from accidentally fetching another customer's emails. Otto uses the internal `/api/mailgun/messages/:workspaceId` endpoint for full workspace-wide email access.

**Query Parameters:**

| Param | Description |
|-------|-------------|
| `sessionId` | Filter by workspace session ID (get all emails for a specific customer session) |
| `contactId` | Filter by funnel contact ID |
| `userId` | Filter by workspace user ID |
| `direction` | Filter by `inbound` or `outbound` |
| `status` | Filter by email status (`sent`, `delivered`, `opened`, `bounced`, `failed`, etc.) |
| `limit` | Max results per page (default 50, max 100) |
| `offset` | Pagination offset (default 0) |

**Response:**
```json
{
  "messages": [
    {
      "id": "wemail_abc123",
      "workspaceId": "workspace-123",
      "workspaceSessionId": "session-abc-123",
      "funnelContactId": "contact-xyz-456",
      "direction": "outbound",
      "from": "Acme <support@acme.com>",
      "fromEmail": "support@acme.com",
      "to": "john@example.com",
      "toEmail": "john@example.com",
      "subject": "Your order has shipped!",
      "bodyPlain": "Hi John, your order #12345 has shipped...",
      "bodyHtml": "<h1>Your order has shipped!</h1>...",
      "status": "delivered",
      "deliveredAt": "2025-01-14T12:01:00.000Z",
      "createdAt": "2025-01-14T12:00:00.000Z"
    },
    {
      "id": "wemail_def456",
      "workspaceId": "workspace-123",
      "workspaceSessionId": "session-abc-123",
      "direction": "inbound",
      "from": "John Doe <john@example.com>",
      "fromEmail": "john@example.com",
      "to": "support@acme.com",
      "toEmail": "support@acme.com",
      "subject": "Re: Your order has shipped!",
      "bodyPlain": "Thanks! What's the tracking number?",
      "strippedText": "Thanks! What's the tracking number?",
      "status": "delivered",
      "createdAt": "2025-01-14T14:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 2,
    "limit": 50,
    "offset": 0,
    "hasMore": false
  }
}
```

### Get a Specific Email
```
GET /api/workspaces/:workspaceId/emails/:messageId
```

Returns full details of a single email message, ensuring it belongs to the workspace.

**Access Control:** Same as list — always requires a user key. Also verifies the message belongs to that user key (won't return another customer's email even if you have the message ID).

**Example:** `GET /api/workspaces/ws-123/emails/wemail_abc123?sessionId=session-abc-123`

### Get Email Thread by Customer Email
```
GET /api/workspaces/:workspaceId/emails/thread/:email
```

Returns all inbound and outbound emails for a specific email address within the workspace, in chronological order. This is the key endpoint for building a conversation view in a UI.

**Access Control:** Same as list — always requires a user key. The thread is scoped to only show emails tagged with that user key, so one customer can't see another customer's email threads.

**Example:** `GET /api/workspaces/ws-123/emails/thread/john@example.com?sessionId=session-abc-123`

**Response:**
```json
{
  "messages": [
    {
      "id": "wemail_001",
      "direction": "outbound",
      "subject": "Welcome to Acme!",
      "bodyPlain": "Thanks for signing up...",
      "status": "delivered",
      "createdAt": "2025-01-10T09:00:00.000Z"
    },
    {
      "id": "wemail_002",
      "direction": "inbound",
      "subject": "Re: Welcome to Acme!",
      "strippedText": "Thanks! How do I get started?",
      "status": "delivered",
      "createdAt": "2025-01-10T15:30:00.000Z"
    },
    {
      "id": "wemail_003",
      "direction": "outbound",
      "subject": "Re: Welcome to Acme!",
      "bodyPlain": "Great question! Here are 3 steps to get started...",
      "status": "delivered",
      "createdAt": "2025-01-10T15:31:00.000Z"
    }
  ]
}
```

---

## User-Key Tagging

Every email can be tagged with one or more user keys to associate it with a specific end customer:

| Key | Use Case |
|-----|----------|
| `sessionId` | Tag with the customer's workspace session (most common — aligns with session-based tracking) |
| `contactId` | Tag with a CRM contact record from the funnel_contacts table |
| `userId` | Tag with a workspace user record (for logged-in users) |

**How to use in practice:**

1. **Sending emails** — Pass `sessionId`, `contactId`, or `userId` in the send request body
2. **Querying emails** — Filter the list endpoint by the same key: `GET /emails?sessionId=session-abc-123`
3. **Thread view** — Use the thread endpoint to see all emails to/from a specific address: `GET /emails/thread/john@example.com`

**All three keys have database indexes** for fast filtering at scale.

---

## How It Works (Already Implemented)

### Inbound Webhook (Platform-Level)
The platform handles Mailgun inbound webhooks at:
```
POST /api/mailgun/webhooks/inbound
```
This endpoint verifies Mailgun signatures, stores the email, detects duplicates, and triggers AI processing. Workspace developers do **not** need to create this route — it exists.

### Email Storage
All inbound and outbound emails are stored in the `workspace_email_messages` table with fields:
- `direction` — `inbound` or `outbound`
- `from`, `to`, `subject`, `bodyPlain`, `bodyHtml`
- `strippedText` — Mailgun's cleaned reply text (no signatures/quoted text)
- `mailgunMessageId` — For deduplication
- `workspaceId` — Workspace scope
- `workspaceSessionId` — Session-based customer tracking
- `workspaceUserId` — User-based customer tracking
- `funnelContactId` — CRM contact linkage
- `status` — Delivery status: `pending`, `sent`, `delivered`, `opened`, `clicked`, `bounced`, `failed`

### AI Auto-Response
The Email Chat Service automatically:
1. Identifies the workspace from the recipient domain
2. Loads workspace context and business information
3. Generates a contextual reply using the workspace's AI agent
4. Sends the reply via Mailgun with the workspace's domain

### Optional: Custom Processing via Server Functions Hook
For workspaces that want custom email processing logic beyond AI auto-response, create a server function hook:

```
POST /api/workspaces/:workspaceId/hooks
```

```json
{
  "name": "inbound-email",
  "description": "Custom email processing",
  "code": "const email = request.body;\nconsole.log('From:', email.from);\nconsole.log('Subject:', email.subject);\nrespond(200, { received: true });",
  "secret": "mailgun-webhook-secret-123"
}
```

---

## Inbound Email Payload

When Mailgun forwards an email, your hook receives this in `request.body`:

```json
{
  "from": "John Doe <john@example.com>",
  "sender": "john@example.com",
  "to": "support@yourdomain.com",
  "subject": "Question about my order",
  "bodyPlain": "Hi, I have a question about order #12345...",
  "bodyHtml": "<p>Hi, I have a question about order #12345...</p>",
  "strippedText": "Hi, I have a question about order #12345...",
  "messageId": "<msg-id@example.com>",
  "inReplyTo": null,
  "references": null,
  "date": "2025-01-14T12:00:00Z",
  "attachments": []
}
```

---

## Building an Email Activity UI

To show email activity in a workspace app, use these endpoints:

### Show All Emails for a Customer Session
```javascript
const response = await fetch(`/api/workspaces/${workspaceId}/emails?sessionId=${sessionId}`);
const { messages, pagination } = await response.json();
```

### Show Conversation Thread with a Contact
```javascript
const response = await fetch(`/api/workspaces/${workspaceId}/emails/thread/${customerEmail}`);
const { messages } = await response.json();
```

### Send a Reply from the UI
```javascript
const response = await fetch(`/api/workspaces/${workspaceId}/emails/send`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: customerEmail,
    subject: `Re: ${originalSubject}`,
    text: replyText,
    sessionId: currentSessionId,
    contactId: contactId,
    inReplyTo: originalMessageId,
  })
});
```

---

## Common Patterns

### Log and Acknowledge
```javascript
const { from, subject, bodyPlain } = request.body;
console.log(`Email from ${from}: ${subject}`);
console.log(`Body: ${bodyPlain}`);
respond(200, { received: true });
```

### Categorize and Route
```javascript
const { from, subject, bodyPlain } = request.body;
const subjectLower = subject.toLowerCase();

let category = 'general';
if (subjectLower.includes('order') || subjectLower.includes('shipping')) {
  category = 'orders';
} else if (subjectLower.includes('refund') || subjectLower.includes('return')) {
  category = 'returns';
} else if (subjectLower.includes('billing') || subjectLower.includes('invoice')) {
  category = 'billing';
}

console.log(`Categorized as: ${category}`);
respond(200, { received: true, category });
```

---

## Use Cases

1. **Customer Support Inbox** — Show inbound/outbound email threads in a workspace app UI
2. **Lead Capture** — Process inquiry emails and add contacts to CRM
3. **Order Updates** — Send shipping/delivery notifications tagged to customer sessions
4. **Appointment Booking** — Process email-based booking requests
5. **Feedback Collection** — Receive and analyze customer feedback emails
6. **Per-Customer History** — Query all emails for a specific session or contact

---

## Security

- Always set a `secret` on your inbound-email hook to prevent unauthorized access
- Mailgun provides the secret in the `x-hook-secret` header when forwarding
- Validate the sender address if needed (check `request.body.sender`)
- Never expose internal workspace data in auto-replies
- Email messages are workspace-isolated — queries always require `workspaceId`
