# Session Management Integration

User authentication and session handling with secure state management, including email verification via OTP.

## Category
Authentication

## Required API Keys
None (uses Express sessions)

## API Endpoints

### Basic Session Management

**Create Session (Register)**
```
POST /api/space/{spaceId}/register
```

**Request:**
```json
{
  "email": "user@example.com",
  "sessionId": "(optional, omitted for new clients)",
  "visitorId": "vid_abc123",
  "attribution": { "utmSource": "google" },
  "metadata": {},
  "workspaceId": "d915c389-2314-447f-bd96-f6acfcc6fb92"
}
```

**Response:**
```json
{
  "success": true,
  "contactId": "contact_abc123",
  "workspaceSessionId": "wses_907c886ac0ea4042a0d5ca35f47c0b66"
}
```

The `workspaceSessionId` is the stable, server-generated session identifier. Always use this for subsequent OTP and session operations.

**Get Session**
```
GET /api/session
```

**Response:**
```json
{
  "authenticated": true,
  "user": {
    "username": "john",
    "loginTime": 1234567890
  },
  "sessionId": "sess_abc123"
}
```

**Destroy Session**
```
DELETE /api/session
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out"
}
```

---

## Email Verification (OTP)

Verify user emails via one-time passcodes. This upgrades anonymous sessions to verified sessions with the user's email attached.

### CRITICAL: Session Must Exist Before OTP

**All OTP send and verify calls require a valid `sessionUuid` (the `workspaceSessionId` returned by register).** You must register a session BEFORE sending or verifying OTP codes. The server will return a 400 error if `sessionUuid` is missing or invalid.

### Required Flow (All Cases)

```
1. Register session  →  POST /api/space/{spaceId}/register
                         Returns: workspaceSessionId
                         
2. Send OTP          →  POST /api/auth/otp/space/send
                         Requires: email, workspaceId, sessionUuid
                         
3. Verify OTP        →  POST /api/auth/otp/space/verify
                         Requires: email, code, workspaceId, sessionUuid
```

### Returning Visitor Flow

For users who have visited before (email stored in localStorage), you still need to register a session before OTP:

```
1. Read email from localStorage
2. Check if previously verified  →  POST /api/auth/otp/space/check-session
                                     Body: { email, workspaceId }
                                     (email-based lookup, no sessionUuid needed)
3. If verified:
   a. Register session            →  POST /api/space/{spaceId}/register
                                      Body: { email, sessionId, workspaceId, ... }
                                      Returns: workspaceSessionId
   b. Send OTP                    →  POST /api/auth/otp/space/send
                                      Body: { email, workspaceId, sessionUuid: workspaceSessionId }
   c. Verify OTP                  →  POST /api/auth/otp/space/verify
                                      Body: { email, code, workspaceId, sessionUuid: workspaceSessionId }
4. If not verified: proceed without OTP (or show standard email gate)
```

The key insight: even for returning visitors, **step (a) must happen before steps (b) and (c)**. The register call is idempotent — calling it again for the same email won't create duplicate contacts, it will return the existing `workspaceSessionId`.

---

### Check if Email Was Previously Verified

Use this to determine whether a returning visitor should see upfront OTP.

```
POST /api/auth/otp/space/check-session
```

**Request (email-based, no session needed):**
```json
{
  "workspaceId": "d915c389-2314-447f-bd96-f6acfcc6fb92",
  "email": "user@example.com"
}
```

**Response (previously verified):**
```json
{
  "success": true,
  "verified": true,
  "email": "user@example.com",
  "verifiedAt": "2025-01-15T12:00:00Z"
}
```

**Response (never verified):**
```json
{
  "success": true,
  "verified": false
}
```

### Check if Current Session is Verified

```
GET /api/auth/otp/space/check-session?workspaceId={workspaceId}&sessionUuid={sessionUuid}
```

**Response:**
```json
{
  "success": true,
  "verified": true,
  "email": "user@example.com",
  "verifiedAt": "2025-01-15T12:00:00Z"
}
```

### Send OTP Code

```
POST /api/auth/otp/space/send
```

**Request:**
```json
{
  "email": "user@example.com",
  "workspaceId": "d915c389-2314-447f-bd96-f6acfcc6fb92",
  "sessionUuid": "wses_907c886ac0ea4042a0d5ca35f47c0b66"
}
```

All three fields are **required**. The `sessionUuid` must be a valid `workspaceSessionId` returned by the register endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Verification code sent to your email.",
  "expiresIn": 300,
  "resendCooldown": 60
}
```

### Verify OTP Code

```
POST /api/auth/otp/space/verify
```

**Request:**
```json
{
  "email": "user@example.com",
  "code": "1234",
  "workspaceId": "d915c389-2314-447f-bd96-f6acfcc6fb92",
  "sessionUuid": "wses_907c886ac0ea4042a0d5ca35f47c0b66"
}
```

All four fields are **required**.

**Response (success):**
```json
{
  "success": true,
  "verified": true,
  "sessionVerified": true,
  "email": "user@example.com"
}
```

**Response (invalid code):**
```json
{
  "success": false,
  "error": "Invalid or expired code",
  "attemptsRemaining": 2
}
```

### Resend OTP Code

```
POST /api/auth/otp/space/resend
```

**Request:**
```json
{
  "email": "user@example.com",
  "workspaceId": "d915c389-2314-447f-bd96-f6acfcc6fb92",
  "sessionUuid": "wses_907c886ac0ea4042a0d5ca35f47c0b66"
}
```

---

## OTP Configuration

Configure email verification settings for your space. OTP is enabled by default for new workspaces.

### Get OTP Configuration

```
GET /api/auth/otp/space/config/{workspaceId}
```

**Response:**
```json
{
  "success": true,
  "config": {
    "enabled": true,
    "trigger": "always",
    "triggerActions": [],
    "triggerRoutes": []
  }
}
```

### Update OTP Configuration

```
PUT /api/auth/otp/space/config/{workspaceId}
```

**Request (enable OTP for all pages):**
```json
{
  "enabled": true,
  "trigger": "always"
}
```

**Request (enable OTP for specific routes only):**
```json
{
  "enabled": true,
  "trigger": "on_route",
  "triggerRoutes": ["/checkout/*", "/account/*"]
}
```

**Request (enable OTP for specific actions only):**
```json
{
  "enabled": true,
  "trigger": "on_action",
  "triggerActions": ["checkout", "submit_order", "request_quote"]
}
```

**Request (disable OTP):**
```json
{
  "enabled": false
}
```

---

## Soft Verification (Checkpoint Triggers)

### Check if OTP is Required

```
POST /api/auth/otp/space/check-required
```

**Request:**
```json
{
  "workspaceId": "d915c389-2314-447f-bd96-f6acfcc6fb92",
  "sessionUuid": "wses_907c886ac0ea4042a0d5ca35f47c0b66",
  "action": "checkout",
  "route": "/checkout/confirm"
}
```

**Response:**
```json
{
  "success": true,
  "required": true,
  "reason": "Route matches checkpoint pattern"
}
```

### Trigger Types

| Trigger | Description | Use Case |
|---------|-------------|----------|
| `always` | Require verification on every page load | High-security apps, gated content |
| `on_action` | Require verification for specific actions | Checkout, form submissions |
| `on_route` | Require verification for specific routes | Account pages, checkout flow |

### Common Configuration Scenarios

| Entrepreneur Request | Config to Use |
|---------------------|---------------|
| "Require email to access the app" | `{ "enabled": true, "trigger": "always" }` |
| "Only require email at checkout" | `{ "enabled": true, "trigger": "on_route", "triggerRoutes": ["/checkout/*"] }` |
| "Require email for account pages" | `{ "enabled": true, "trigger": "on_route", "triggerRoutes": ["/account/*", "/profile/*"] }` |
| "Require email when submitting forms" | `{ "enabled": true, "trigger": "on_action", "triggerActions": ["submit_form", "request_quote"] }` |
| "Disable email verification" | `{ "enabled": false }` |

**Note:** OTP verification is enabled by default (`trigger: "always"`) for all new workspaces.

---

## Usage Example: Delayed OTP with Upfront Verification for Returning Visitors

This pattern lets new visitors enter the space freely (delayed OTP inside the experience), while returning visitors whose email was previously verified get OTP upfront.

```tsx
import { useState, useEffect } from 'react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';

function SmartEmailGate({ children, spaceId, workspaceId }: { 
  children: React.ReactNode;
  spaceId: string;
  workspaceId: string;
}) {
  const { setSessionId } = useSpaceRuntime();
  const [step, setStep] = useState<'checking' | 'otp' | 'code' | 'pass'>('checking');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    checkReturningVisitor();
  }, []);

  const checkReturningVisitor = async () => {
    const sessionKey = `space_session_${spaceId}`;
    const stored = localStorage.getItem(sessionKey);
    
    if (!stored) {
      setStep('pass');
      return;
    }
    
    try {
      const session = JSON.parse(stored);
      if (!session.email) {
        setStep('pass');
        return;
      }
      
      const res = await fetch('/api/auth/otp/space/check-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspaceId, email: session.email }),
      });
      const data = await res.json();
      
      if (data.verified) {
        setEmail(session.email);
        setStep('otp');
      } else {
        setStep('pass');
      }
    } catch {
      setStep('pass');
    }
  };

  const sendOtp = async () => {
    setError('');
    
    const visitorId = getVisitorId();
    const regRes = await fetch(`/api/space/${spaceId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, visitorId, workspaceId, metadata: {} }),
    });
    const regData = await regRes.json();
    
    if (!regRes.ok) {
      setError(regData.error || 'Failed to register session');
      return;
    }
    
    const wsSessionId = regData.workspaceSessionId;
    setPendingSessionId(wsSessionId);
    
    const otpRes = await fetch('/api/auth/otp/space/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, workspaceId, sessionUuid: wsSessionId }),
    });
    
    if (otpRes.ok) {
      setStep('code');
    } else {
      const otpData = await otpRes.json();
      setError(otpData.error || 'Failed to send code');
    }
  };

  const verifyOtp = async () => {
    if (!pendingSessionId) {
      setError('Session expired. Please try again.');
      setStep('otp');
      return;
    }
    
    const res = await fetch('/api/auth/otp/space/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, workspaceId, sessionUuid: pendingSessionId }),
    });
    const data = await res.json();
    
    if (data.success) {
      const sessionKey = `space_session_${spaceId}`;
      localStorage.setItem(sessionKey, JSON.stringify({
        id: pendingSessionId,
        workspaceSessionId: pendingSessionId,
        email,
        timestamp: Date.now(),
      }));
      setSessionId(pendingSessionId);
      setStep('pass');
    } else {
      setError(data.error || 'Invalid code');
    }
  };

  if (step === 'checking') return <div>Loading...</div>;
  if (step === 'pass') return <>{children}</>;

  if (step === 'otp') {
    return (
      <div>
        <h2>Welcome back!</h2>
        <p>We'll send a verification code to {email}</p>
        <button onClick={sendOtp}>Send Code</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  if (step === 'code') {
    return (
      <div>
        <h2>Enter verification code</h2>
        <p>We sent a 4-digit code to {email}</p>
        <input 
          type="text" 
          value={code} 
          onChange={e => setCode(e.target.value)} 
          maxLength={4}
        />
        <button onClick={verifyOtp}>Verify</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return null;
}
```

## Key Rules

1. **Always register before OTP** — Call `/api/space/{spaceId}/register` to get a `workspaceSessionId` before any OTP send/verify calls.
2. **sessionUuid is required** — The OTP send and verify endpoints will return 400 if `sessionUuid` is missing. This is the `workspaceSessionId` from register.
3. **Register is idempotent** — Calling register again for the same email won't create duplicates. It returns the existing session.
4. **Check previous verification with email** — Use `POST /api/auth/otp/space/check-session` with `{ email, workspaceId }` to check if a returning visitor was previously verified. This does NOT require a sessionUuid.
5. **Store workspaceSessionId in localStorage** — Save it as `workspaceSessionId` in the session object so it persists across page reloads.

## Route Aliases

The OTP endpoints are available at both paths:
- `/api/auth/otp/space/...` (preferred)
- `/api/otp/space/...` (backwards-compatible alias)

## Use Cases
- Email capture for lead generation
- Gated content access
- Checkout verification
- Account security
- User identification without passwords
- Returning visitor re-verification
