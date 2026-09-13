# AI Phone Calls Integration

Make and receive AI-powered phone calls on behalf of workspace customers using Retell AI or ElevenLabs.

## Category
Communication / Voice

## Required API Keys (Platform-Level)

All API keys are stored as platform-level secrets (Replit secrets), NOT per workspace. Workspaces share the platform's phone infrastructure. There is no API endpoint to configure provider credentials — they are managed by the platform admin.

- `RETELL_API_KEY` — Retell AI API key (recommended provider)
- OR `ELEVENLABS_API_KEY` — ElevenLabs API key (alternative provider)

## Concepts

- **AI Voice Agent** — A configured AI agent that can conduct phone conversations with natural-sounding voice, following custom instructions and using workspace context.
- **Workspace-Scoped Agent** — An agent created via the API, tagged with a workspace ID using the naming convention `ws_{workspaceId}::{identifier}`. This ensures workspace isolation — each workspace can only see and manage its own agents.
- **Agent Identifier** — Either `default` (the workspace's main agent) or an email address (for contact-specific agents, e.g., `vip@customer.com`).
- **Agent Tools** — Custom functions an agent can call mid-conversation to look up live data. Tools are backed by Server Functions (hooks) in the same workspace.
- **Outbound Call** — An AI-initiated phone call to a customer for appointment reminders, lead qualification, follow-ups, etc.
- **Inbound Call** — A customer calls the workspace's phone number and speaks with the AI agent.
- **Batch Calling** — Initiate multiple outbound calls simultaneously for campaigns (reminders, surveys, alerts).
- **Call Transcript** — Automatic transcription of the full conversation, stored for review and analysis.
- **Auto-Resolve** — When making a call, if no specific agentId is provided, the system automatically resolves the best agent: contact-specific agent (by email) → workspace default agent → config-level fallback.

---

## Provider Comparison

| Feature | Retell AI | ElevenLabs + Twilio |
|---------|-----------|-------------------|
| Pricing | $0.07/min flat | ~$0.10-0.15/min combined |
| Voice Quality | Natural, low latency | Premium, most natural |
| Batch Calling | Native | Via API |
| Branded Caller ID | Yes | Via Twilio |
| Agent Management | Full API (create/list/update/delete) | Manual setup |
| Mid-Call Tools | Yes (custom functions) | Limited |
| Compliance | SOC 2, HIPAA, GDPR | SOC 2, HIPAA, GDPR |
| Setup Complexity | Low | Medium |
| Languages | 30+ | 32+ |

**Recommendation:** Retell AI for fastest setup, agent management, and mid-call tools. ElevenLabs for premium voice quality.

---

## API Endpoints

All endpoints are scoped to a workspace via the URL path.

### Phone Configuration (Auto-Provisioned)

**You do not need to configure the phone number manually.** The platform automatically provisions the outbound phone number for your workspace the first time a call is made. All you need to do is create an agent with your prompt — the platform handles the rest.

The config is created automatically when your workspace makes its first outbound call, using the platform's shared phone number and your workspace's default agent.

### Get Phone Config
```
GET /api/workspaces/:workspaceId/phone/config
```

Returns the current phone configuration for the workspace. This will be empty until the first call is made (which triggers auto-provisioning).

---

## Agent Management

Manage AI phone agents scoped to a workspace. Agents are stored directly in Retell (no local database table) and tagged with the workspace ID using the naming convention `ws_{workspaceId}::{identifier}`.

**Workspace isolation:** Every endpoint filters agents by the workspace ID prefix. A workspace can never see, modify, or delete another workspace's agents.

### Create an Agent
```
POST /api/workspaces/:workspaceId/phone/agents
```

Creates a new Retell LLM + Agent pair tagged with the workspace ID.

**Request:**
```json
{
  "prompt": "You are a friendly receptionist for Acme Dental. Greet callers warmly, answer questions about office hours (9-5 M-F), and take messages for the dentist.",
  "identifier": "default",
  "voiceId": "11labs-Cimo",
  "language": "en-US"
}
```

- `prompt` — Required. The instructions for the agent (what it says, how it behaves).
- `identifier` — Optional. Defaults to `"default"`. Use `"default"` for the workspace's main agent, or an email like `"vip@customer.com"` for a contact-specific agent.
- `voiceId` — Optional. Retell voice ID. Defaults to `"11labs-Cimo"`.
- `language` — Optional. Language code. Defaults to `"en-US"`.
- `tools` — Optional. Array of tools the agent can use mid-call (see Tools section below).

**Response:**
```json
{
  "agentId": "agent_abc123def456",
  "llmId": "llm_xyz789",
  "agentName": "ws_workspace-123::default",
  "tools": []
}
```

### Create a Contact-Specific Agent

An entrepreneur may want different agents for different customers:

```json
{
  "prompt": "You are speaking with a VIP customer. Be extra attentive, offer premium support, and prioritize their requests.",
  "identifier": "vip@customer.com"
}
```

This creates an agent named `ws_{workspaceId}::vip@customer.com`. When making a call to this contact (using `contactEmail`), this agent is automatically selected over the workspace default.

### List Agents
```
GET /api/workspaces/:workspaceId/phone/agents
```

Returns all agents belonging to this workspace.

**Response:**
```json
{
  "agents": [
    {
      "agentId": "agent_abc123",
      "agentName": "ws_workspace-123::default",
      "voiceId": "11labs-Cimo",
      "language": "en-US",
      "llmId": "llm_xyz789"
    },
    {
      "agentId": "agent_def456",
      "agentName": "ws_workspace-123::vip@customer.com",
      "voiceId": "11labs-Cimo",
      "language": "en-US",
      "llmId": "llm_abc123"
    }
  ]
}
```

### Get a Specific Agent
```
GET /api/workspaces/:workspaceId/phone/agents/:agentId
```

Returns the agent details. Returns 404 if the agent doesn't belong to this workspace.

### Update an Agent's Prompt
```
PATCH /api/workspaces/:workspaceId/phone/agents/:agentId
```

**Request:**
```json
{
  "prompt": "Updated instructions: You are now also able to schedule appointments..."
}
```

**Response:**
```json
{
  "agentId": "agent_abc123",
  "agentName": "ws_workspace-123::default",
  "updated": true
}
```

### Delete an Agent
```
DELETE /api/workspaces/:workspaceId/phone/agents/:agentId
```

Deletes the agent and its associated LLM from Retell. Returns 404 if the agent doesn't belong to this workspace.

**Response:**
```json
{
  "deleted": true
}
```

---

## Agent Tools (Mid-Call Function Calling)

Agents can call **Server Functions (hooks)** mid-conversation to look up live data, check inventory, query a database, or perform any server-side logic. This prevents the agent from hallucinating answers.

### How It Works

1. When creating an agent, pass a `tools` array. Each tool maps to a workspace Server Function (hook) by `hookName`.
2. The system registers these as custom functions on the Retell LLM, pointing to the platform's tool-call webhook.
3. During a live call, when the agent decides to use a tool, Retell calls the webhook.
4. The webhook looks up the matching hook in the workspace, executes it, and returns the result.
5. The agent speaks the result back to the caller.

### Creating an Agent with Tools

First, create the Server Function (hook) that the tool will call:

```
POST /api/workspaces/:workspaceId/hooks
```
```json
{
  "name": "lookup_hours",
  "description": "Look up business hours",
  "code": "const day = request.body.args.day || 'today'; respond(200, { hours: 'Monday-Friday 9am-6pm Pacific. Closed weekends.' });"
}
```

Then, create the agent with the tool attached:

```
POST /api/workspaces/:workspaceId/phone/agents
```
```json
{
  "prompt": "You are a helpful assistant for NoTimeForPods. When someone asks about hours, use the lookup_hours tool to get accurate information. Never guess or make up information — always use your tools.",
  "identifier": "default",
  "tools": [
    {
      "name": "Business Hours Lookup",
      "description": "Look up the business hours for any day of the week. Use this whenever someone asks about hours, availability, or when the business is open.",
      "hookName": "lookup_hours",
      "parameters": {
        "type": "object",
        "properties": {
          "day": {
            "type": "string",
            "description": "The day of the week to check hours for"
          }
        }
      }
    }
  ]
}
```

### Tool Definition Fields

Each tool in the `tools` array:

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Human-readable name for the tool (shown in logs) |
| `description` | Yes | Description that tells the agent WHEN to use this tool. Be specific. |
| `hookName` | Yes | The name of the Server Function (hook) in the same workspace to execute |
| `parameters` | No | JSON Schema defining what arguments the agent should extract from the conversation |
| `speakDuringExecution` | No | Whether the agent says "Let me look that up..." while waiting (default: `true`) |
| `speakAfterExecution` | No | Whether the agent speaks the result after getting it (default: `true`) |

### What the Hook Receives

When a tool is called mid-conversation, the hook's `request.body` contains:

```json
{
  "args": {
    "day": "Friday"
  },
  "call": {
    "call_id": "call_abc123",
    "agent_id": "agent_xyz",
    "from_number": "+14155551234",
    "to_number": "+15551234567"
  }
}
```

- `args` — The arguments extracted by the agent from the conversation
- `call` — Metadata about the current call (call ID, agent ID, phone numbers)

The hook should use `respond(200, ...)` to return data that the agent will speak back.

### Tool Example: Customer Lookup

Hook:
```javascript
const email = request.body.args.email;
const customers = {
  "john@example.com": { name: "John", plan: "Premium", renewalDate: "March 15" },
  "jane@example.com": { name: "Jane", plan: "Basic", renewalDate: "April 1" }
};
const customer = customers[email];
if (customer) {
  respond(200, { result: `${customer.name} is on the ${customer.plan} plan, renewing on ${customer.renewalDate}.` });
} else {
  respond(200, { result: "I couldn't find that customer in our records." });
}
```

Agent tool:
```json
{
  "name": "Customer Lookup",
  "description": "Look up a customer's account details by their email address. Use when someone asks about their plan, billing, or account status.",
  "hookName": "customer_lookup",
  "parameters": {
    "type": "object",
    "properties": {
      "email": {
        "type": "string",
        "description": "The customer's email address"
      }
    },
    "required": ["email"]
  }
}
```

---

## Making Calls

### Make an Outbound Call
```
POST /api/workspaces/:workspaceId/phone/calls/outbound
```

**Request:**
```json
{
  "toNumber": "+15551234567",
  "contactEmail": "john@example.com",
  "dynamicVariables": {
    "customerName": "John Doe",
    "appointmentDate": "January 20, 2025",
    "appointmentTime": "2:00 PM"
  },
  "metadata": {
    "contactId": "contact-abc",
    "purpose": "appointment-reminder"
  }
}
```

- `toNumber` — Required. The phone number to call.
- `agentId` — Optional. Specific Retell agent ID to use. If omitted, the system auto-resolves (see below).
- `contactEmail` — Optional. The contact's email address. Used for auto-resolving to a contact-specific agent.
- `dynamicVariables` — Optional. Key-value pairs injected into the agent's prompt as `{{variableName}}`.
- `metadata` — Optional. Custom metadata attached to the call record.

**Agent Auto-Resolution (when `agentId` is omitted):**
1. If `contactEmail` is provided, look for an agent named `ws_{workspaceId}::{contactEmail}`
2. If not found, look for `ws_{workspaceId}::default`
3. If not found, fall back to the `agentId` in the workspace's phone config

**Response:**
```json
{
  "callId": "uuid-call-id",
  "providerCallId": "call_retell_xyz",
  "status": "initiated"
}
```

### Batch Outbound Calls
```
POST /api/workspaces/:workspaceId/phone/calls/batch
```

**Request:**
```json
{
  "agentId": "agent_xyz789",
  "calls": [
    {
      "toNumber": "+15551234567",
      "dynamicVariables": { "customerName": "John Doe", "appointmentDate": "Jan 20" }
    },
    {
      "toNumber": "+15559876543",
      "dynamicVariables": { "customerName": "Jane Smith", "appointmentDate": "Jan 21" }
    }
  ]
}
```

**Response:**
```json
{
  "calls": [
    { "toNumber": "+15551234567", "callId": "uuid-1", "providerCallId": "call_1", "status": "initiated" },
    { "toNumber": "+15559876543", "callId": "uuid-2", "providerCallId": "call_2", "status": "initiated" }
  ]
}
```

### Get Call Details
```
GET /api/workspaces/:workspaceId/phone/calls/:callId
```

Returns full call details including transcript and recording.

**Response:**
```json
{
  "id": "uuid-call-id",
  "workspaceId": "workspace-123",
  "provider": "retell",
  "providerCallId": "call_retell_xyz",
  "direction": "outbound",
  "toNumber": "+15551234567",
  "fromNumber": "+14155551234",
  "agentId": "agent_abc123",
  "status": "ended",
  "duration": 145,
  "transcript": "Agent: Hi John, this is a reminder about your dental appointment...\nUser: Yes, I'll be there...",
  "recordingUrl": "https://cloudfront.net/.../recording.wav",
  "outcome": null,
  "dynamicVariables": { "customerName": "John Doe" },
  "metadata": { "purpose": "appointment-reminder" },
  "errorMessage": null,
  "startedAt": null,
  "endedAt": "2025-01-14T12:02:25.000Z",
  "createdAt": "2025-01-14T12:00:00.000Z",
  "updatedAt": "2025-01-14T12:02:30.000Z"
}
```

### List Calls
```
GET /api/workspaces/:workspaceId/phone/calls?limit=50
```

Returns recent calls for the workspace, ordered by most recent first.

---

## Webhooks

### Call Status Updates
```
POST /api/workspaces/:workspaceId/phone/webhooks/retell
POST /api/workspaces/:workspaceId/phone/webhooks/elevenlabs
```

Configure these URLs in your Retell/ElevenLabs dashboard to receive post-call updates (transcript, recording URL, call status, duration).

### Mid-Call Tool Execution Webhook
```
POST /api/workspaces/:workspaceId/phone/tool-call
```

This endpoint is called by Retell during a live phone call when the agent decides to use a tool. It is NOT called by Otto or workspace code directly — it is configured automatically when creating agents with tools.

**How it works:**
1. Retell sends a POST with the tool name and arguments extracted from the conversation
2. The endpoint maps the tool name to a Server Function (hook) in the workspace
3. The hook executes and returns data
4. The endpoint returns the result as a speakable string to Retell
5. The agent speaks the result to the caller

**Important:** This endpoint always returns `200 OK` with a string result, even if the hook fails. This prevents the phone agent from encountering HTTP errors mid-conversation. On failure, it returns a graceful fallback message like "I'm sorry, I wasn't able to look that up right now."

---

## Scheduler Integration

Schedule AI phone calls using the Task Scheduler:

```
POST /api/workspaces/:workspaceId/schedules
```

```json
{
  "name": "Appointment Reminder Call",
  "scheduledAt": "2025-01-19T10:00:00Z",
  "actionType": "hook",
  "actionPayload": {
    "hookName": "make-reminder-call",
    "payload": {
      "toNumber": "+15551234567",
      "customerName": "John Doe",
      "appointmentDate": "January 20, 2025"
    }
  }
}
```

---

## Typical Setup Flow

1. **Create a default agent** — `POST /phone/agents` with `identifier: "default"` and a prompt describing the business and how the AI should behave on calls
2. **Create hooks** for any live data the agent needs (hours, pricing, customer lookup, etc.)
3. **Attach tools to the agent** — Re-create or update the agent with `tools` pointing to those hooks
4. **Make calls** — `POST /phone/calls/outbound` with just `toNumber`; the platform auto-provisions the outbound phone number on the first call and auto-resolves the agent
5. **Check results** — `GET /phone/calls/:callId` for transcript, recording, and duration

> **No phone number setup required.** The platform provides a shared outbound number automatically. Your workspace only needs to define the agent and its prompt.

---

## Use Cases

1. **Appointment Reminders** — Automated reminder calls with confirmation/rescheduling
2. **Lead Qualification** — AI calls leads to qualify interest and book demos
3. **Payment Follow-ups** — Gentle reminder calls for overdue invoices
4. **Customer Surveys** — Post-service satisfaction surveys via phone
5. **Order Confirmations** — Call to confirm large or unusual orders
6. **Welcome Calls** — Personalized onboarding calls for new customers
7. **Emergency Alerts** — Batch calls for urgent notifications
8. **Personal Assistant** — Contact-specific agents that call on behalf of a person
9. **Live Data Agents** — Agents with tools that query real databases, check inventory, or look up customer records mid-call

---

## Security & Compliance

- API keys are stored at the platform level as encrypted secrets
- Agents are workspace-isolated via naming convention (`ws_{workspaceId}::...`)
- All agent CRUD operations enforce workspace ownership checks
- Mid-call tool execution is scoped to the same workspace's hooks
- All calls are recorded and transcribed (configurable)
- HIPAA-compliant mode available (Retell AI)
- Call recordings hosted on secure CDN with signed URLs

---

## Task #1235: Dedicated phone numbers per workspace

Apps can purchase Twilio-backed phone numbers dedicated to a workspace
(and optionally bound to a single space or contact). Numbers carry a
recurring monthly charge — the `phone-number-renewal` cron debits the
wallet every 30 days and gracefully releases numbers whose wallet runs
dry (status flips to `renewal_failed`).

### Outbound resolution chain

When `makeOutboundCall` runs, the dedicated registry is consulted first:

1. Contact-bound number (`contactId` match)
2. Space-bound number (`spaceId` match, no `contactId`)
3. Workspace-default number (`isWorkspaceDefault = true`)
4. Legacy platform-shared `workspace_settings.phone_config` (existing path)

### Inbound webhook routing

The shared `/phone/webhook/:workspaceId/:provider` endpoint now looks up
the destination number in `workspace_phone_numbers` when it can't find a
pre-existing call row — so inbound calls to a dedicated number are
attributed to the correct workspace + space + contact.

### Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/workspaces/:workspaceId/phone/numbers/search` | Twilio inventory search (`areaCode`, `contains`) |
| `POST` | `/api/workspaces/:workspaceId/phone/numbers/quote` | Monthly price quote with safety-headroom multiplier |
| `POST` | `/api/workspaces/:workspaceId/phone/numbers/purchase` | Wallet-gated purchase. Returns 402 with canonical `insufficient_funds` body when short. |
| `GET` | `/api/workspaces/:workspaceId/phone/numbers` | List dedicated numbers |
| `DELETE` | `/api/workspaces/:workspaceId/phone/numbers/:numberId` | Release (Twilio DELETE + DB flag) |

### Insufficient-funds response (402)

Identical shape to `domain-registration`:

```json
{
  "code": "insufficient_funds",
  "required": 1.65,
  "available": 0.50,
  "shortfall": 1.15,
  "headroomMultiplier": 1.10,
  "message": "Insufficient wallet balance for Provision phone number +14155551212. …",
  "phoneNumber": "+14155551212"
}
```

### Environment

| Var | Default | Notes |
| --- | --- | --- |
| `PHONE_NUMBER_MONTHLY_PRICE` | `1.50` | Per-number monthly charge in USD |
| `PHONE_NUMBER_HEADROOM_MULTIPLIER` | `1.10` | Wallet must cover price × multiplier |
| `PHONE_NUMBER_RENEWAL_ENABLED` | unset | Set to `1` on the prod replica to arm the renewal cron |
| `PHONE_NUMBER_RENEWAL_INTERVAL_MS` | `3600000` (1h) | Renewal poll cadence |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` | — | Required for purchase / release |
| `TWILIO_VOICE_WEBHOOK_URL` | — | If set, applied to newly purchased numbers |

### Failure model

- Twilio purchase succeeds but wallet charge fails → number is auto-released.
- Wallet charge succeeds but DB row write fails → wallet is auto-refunded AND the Twilio number is released.
- Renewal wallet charge fails → number released, status `renewal_failed`, app should re-purchase from inventory.
