# Stripe Payments Integration

Accept payments and subscriptions in your Space. Payments work out of the box using the platform's Stripe account, with an optional upgrade to your own Stripe Connect account.

## How It Works

### Two Payment Modes

1. **Platform Mode (Default)** - Payments work immediately
   - Uses the platform's Stripe account
   - No setup required - just start accepting payments
   - Perfect for getting started quickly

2. **Connect Mode (Upgrade)** - Your own Stripe merchant account
   - Go to Wallet → "Accept Payments" to set up Stripe Connect
   - Payments go directly to your bank account
   - Small platform fee applies (default 5%)
   - Full control over your payment processing

## Default Subscription Settings

All subscriptions come with sensible defaults:
- **7-day free trial** - Let customers try before they buy
- **$5/month** - Simple, accessible pricing
- **Cancel anytime** - Customer-friendly experience

These defaults can be customized per checkout session.

## Quick Start

All payment requests should include `X-App-Id: window.__APP_ID__ || window.__SPACE_ID__` so hosted mini-apps and compiled spaces both resolve the workspace correctly, especially on custom domains.

### 1. Create a Subscription (Default Settings)

```typescript
// Uses defaults: 7-day trial, $5/mo
const { checkoutUrl } = await fetch('/api/payments/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
  body: JSON.stringify({
    customerEmail: 'customer@example.com',
    successUrl: window.location.origin + '/welcome',
    cancelUrl: window.location.href
  })
}).then(r => r.json());

// Redirect to Stripe Checkout
window.location.href = checkoutUrl;
```

### 2. Custom Subscription Pricing

```typescript
// Custom: 14-day trial, $29/mo
const { checkoutUrl } = await fetch('/api/payments/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
  body: JSON.stringify({
    priceCents: 2900, // $29.00
    trialDays: 14,
    customerEmail: 'customer@example.com',
    successUrl: window.location.origin + '/welcome'
  })
}).then(r => r.json());

window.location.href = checkoutUrl;
```

### 2b. Annual Subscription

```typescript
// Annual: 7-day trial, $19/year
const { checkoutUrl } = await fetch('/api/payments/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
  body: JSON.stringify({
    priceCents: 1900, // $19.00
    interval: 'year', // 'month' (default), 'year', 'week', or 'day'
    trialDays: 7,
    customerEmail: 'customer@example.com',
    successUrl: window.location.origin + '/welcome'
  })
}).then(r => r.json());

window.location.href = checkoutUrl;
```

### 2b1. Semiannual / Quarterly Subscription (multi-interval)

Any cadence is `interval` × `intervalCount`. To bill every N months/weeks,
keep `interval` as the base unit and set `intervalCount` to the multiplier —
e.g. every 6 months (semiannual) is `interval: 'month', intervalCount: 6`.

```typescript
// Semiannual: $60 billed every 6 months
const { checkoutUrl } = await fetch('/api/payments/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
  body: JSON.stringify({
    priceCents: 6000,    // $60.00
    interval: 'month',   // base unit
    intervalCount: 6,    // × 6 → every 6 months (use 3 for quarterly, 2 with 'week' for every 2 weeks)
    trialDays: 7,
    customerEmail: 'customer@example.com',
    successUrl: window.location.origin + '/welcome'
  })
}).then(r => r.json());

window.location.href = checkoutUrl;
// Note: Stripe caps a billing cycle at one year — max is month×12 or year×1.
```

### 2b2. Non-USD Subscription

```typescript
// EUR subscription: €15/month
const { checkoutUrl } = await fetch('/api/payments/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
  body: JSON.stringify({
    priceCents: 1500, // €15.00
    currency: 'eur', // Any Stripe-supported currency code
    customerEmail: 'customer@example.com',
    successUrl: window.location.origin + '/welcome'
  })
}).then(r => r.json());

window.location.href = checkoutUrl;
```

### 2d. Intro Pricing (e.g., $19 for 4 months → $69/year)

```typescript
// Intro pricing: $19 for 4 months, then auto-renews at $69/year
const { checkoutUrl } = await fetch('/api/payments/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
  body: JSON.stringify({
    introPriceCents: 1900,       // $19.00 intro price
    introInterval: 'month',
    introIntervalCount: 4,       // 4-month intro period
    introIterations: 1,          // Charge intro price once
    regularPriceCents: 6900,     // $69.00 regular price
    regularInterval: 'year',     // Annual renewal after intro
    regularIntervalCount: 1,
    billingPlanId: '4month-intro',
    billingPlanName: '4-Month Plan',
    customerEmail: 'customer@example.com',
    successUrl: window.location.origin + '/welcome'
  })
}).then(r => r.json());

window.location.href = checkoutUrl;
```

> **How intro pricing works:** When `introPriceCents` and `regularPriceCents` are both provided, the endpoint creates a Stripe Checkout session for the intro price. After checkout completes, a Stripe Subscription Schedule is automatically created with two phases: the intro phase and the regular renewal phase. The trial is forced to 0 days — the intro IS the entry offer. The `planTier` stays the same across both phases; only billing metadata changes.

### 2e. Multi-Plan Selector (from payment config)

When payment config includes a `plans` array, use `createSubscriptionFromPlan()` to handle both standard and intro pricing plans:

```typescript
// Load config and render plans
const config = await stripePayments.loadConfig();
if (config?.plans) {
  for (const plan of config.plans) {
    // createSubscriptionFromPlan automatically handles intro pricing
    const { checkoutUrl } = await stripePayments.createSubscriptionFromPlan(plan, {
      customerEmail: 'customer@example.com',
    });
    window.location.href = checkoutUrl;
  }
}
```

### 2c. Subscription with Pre-Applied Promo Code

```typescript
// Pre-apply a promo code so the discount shows automatically at checkout
const { checkoutUrl } = await fetch('/api/payments/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
  body: JSON.stringify({
    priceCents: 2900,
    customerEmail: 'customer@example.com',
    promoCode: 'promo_abc123', // Stripe promotion code ID
    successUrl: window.location.origin + '/welcome'
  })
}).then(r => r.json());

window.location.href = checkoutUrl;
```

> **Note:** If you don't pass `promoCode`, customers will see a "Add promotion code" field on the Stripe checkout page where they can enter their own code. If you pass a `promoCode`, the discount is pre-applied and the promo field is hidden.

### 3. One-Time Payment

```typescript
const { checkoutUrl } = await fetch('/api/payments/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
  body: JSON.stringify({
    amount: 4999, // $49.99
    productName: 'Premium Course',
    productDescription: 'Full access to all course materials',
    customerEmail: 'customer@example.com',
    successUrl: window.location.origin + '/thank-you'
  })
}).then(r => r.json());

window.location.href = checkoutUrl;
```

### 4. Digital Asset Delivery (Book Funnels, PDFs, Downloads)

When selling digital products (eBooks, playbooks, courses), pass a `digitalAssetKey` in the checkout metadata so the buyer automatically receives a download link in their confirmation email.

```typescript
const { checkoutUrl } = await fetch('/api/payments/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
  body: JSON.stringify({
    amount: 2700, // $27.00
    productName: 'The KingsCode Playbook',
    productDescription: 'Your complete guide to building a personal brand',
    customerEmail: 'buyer@example.com',
    successUrl: window.location.origin + '/thank-you',
    metadata: {
      digitalAssetKey: 'workspaces/<workspaceId>/books/kingscode-playbook.pdf',
      digitalAssetLabel: 'Download The KingsCode Playbook'
    }
  })
}).then(r => r.json());

window.location.href = checkoutUrl;
```

**Metadata Fields for Digital Delivery:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `digitalAssetKey` | string | Recommended | GCS object path relative to the bucket (e.g., `workspaces/<id>/books/my-ebook.pdf`). Resolved server-side to a trusted `https://storage.googleapis.com/` URL. |
| `digitalAssetUrl` | string | Fallback | Full HTTPS URL to the asset. Only used if `digitalAssetKey` is not provided. Must be hosted on `storage.googleapis.com` — other domains are rejected for security. |
| `digitalAssetLabel` | string | No | Custom button text in the email (default: "Download Your Purchase"). |

> **Important:** Always prefer `digitalAssetKey` over `digitalAssetUrl`. The key is resolved server-side to a validated storage URL, which is more secure and less error-prone. Upload your PDF to GCS first (via the file-storage integration or directly), then reference the object path in checkout metadata.

**How it works:**
1. Pass `digitalAssetKey` in the `metadata` object when creating a checkout session
2. After successful payment, the Stripe webhook fires `checkout.session.completed`
3. The confirmation email is sent with a prominent "Download" button linking to the PDF
4. If no digital asset metadata is present, the confirmation email is sent as usual (no regression)

## Saved Payment Methods (Card on File)

For apps where the **same customer buys repeatedly** — "Buy Now" flows,
coin/credit top-ups, in-app purchases, one-click reorders — you don't have
to put them through Stripe Checkout every time, and you don't need a
subscription either. Save the customer's card once, then charge it later
**off-session** with a single API call. Funds settle on the workspace's
connected Stripe account (Connect direct charge).

> **You no longer need a subscription just to bill a returning customer
> without re-entering a card.** Subscriptions are for recurring billing on a
> schedule; saved cards are for charging an arbitrary amount, on demand,
> whenever the customer takes an action.

There are two ways to save a card:

1. **Save while charging** — pass `savePaymentMethod: true` on the first
   `POST /api/landing/:appId/checkout`. The card is saved as part of the
   normal checkout.
2. **Save without charging** — create a SetupIntent
   (`POST /api/landing/:appId/saved-cards/setup-intent`) and confirm it with
   Stripe Elements on the client. Nothing is charged; the card is stored for
   later.

After a card is on file you can list it, charge it one-click off-session, and
delete it.

### Server-side identity rule (important)

Identity is **always resolved server-side** from the authenticated landing
session. The contact is identified by `email`, the session is proven by
`sessionId` (the same value the server stored at registration time), and the
workspace is bound by the `:appId` in the URL. The client **never** passes a
raw `contactId` — it is ignored. A request whose `sessionId` does not match
the stored contact is rejected with `403`.

> All saved-card endpoints accept `{ email, sessionId }` on the JSON body —
> the same identity shape as `/register`, `/track`, and `/checkout`. Both
> `email` and `sessionId` are required.

### Endpoint Summary

| Endpoint | Purpose |
|----------|---------|
| `POST /api/landing/:appId/checkout` (with `savePaymentMethod: true`) | First checkout — saves the card while charging |
| `POST /api/landing/:appId/saved-cards/setup-intent` | Add a card without charging (Stripe Elements) |
| `POST /api/landing/:appId/saved-cards/list` | List the contact's saved cards (brand, last4, exp) |
| `POST /api/landing/:appId/saved-cards/charge` | One-click off-session charge against a saved card |
| `POST /api/landing/:appId/saved-cards/delete` | Detach a saved card |

> **Why is `list` a POST?** So the body can carry `{ email, sessionId }`
> without leaking them in URL query strings or referer logs.

### Working Example (setup → list → charge)

```typescript
// Step 1a — save the card WHILE charging on the first purchase
const { checkoutUrl } = await fetch(`/api/landing/${appId}/checkout`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'parent@example.com',
    sessionId,                    // the landing session id stored at registration
    amount: 999,                  // cents
    productName: 'Coin Pack',
    savePaymentMethod: true,      // ← saves the card on first checkout
    successUrl: window.location.origin + '/thanks',
    cancelUrl: window.location.href,
  }),
}).then(r => r.json());
window.location.href = checkoutUrl;

// Step 1b (alternative) — save a card WITHOUT charging, using Stripe Elements
const { clientSecret } = await fetch(`/api/landing/${appId}/saved-cards/setup-intent`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'parent@example.com', sessionId }),
}).then(r => r.json());
// then on the client: await stripe.confirmCardSetup(clientSecret, { payment_method: { card } })

// Step 2 — later, list the contact's saved cards
const { cards } = await fetch(`/api/landing/${appId}/saved-cards/list`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'parent@example.com', sessionId }),
}).then(r => r.json());
// cards: [{ id: 'pm_...', brand: 'visa', last4: '4242', expMonth: 12, expYear: 2028 }]
// (Expired cards are filtered out server-side.)

// Step 3 — one-click repeat charge against the saved card
const res = await fetch(`/api/landing/${appId}/saved-cards/charge`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'parent@example.com',
    sessionId,
    paymentMethodId: cards[0].id,
    amount: 499,
    description: 'Coin Pack refill',
    metadata: { orderId: 'order_123' },
  }),
}).then(r => r.json());

if (res.success) {
  // res.paymentIntentId, res.status ('succeeded'), res.amount, res.currency
  // charge captured — Stripe email receipt sent automatically
} else if (res.requiresAction || res.code === 'requires_action') {
  // SCA needed — re-prompt the customer ON-SESSION with Stripe.js, then retry:
  //   await stripe.confirmCardPayment(res.clientSecret)
  // then call /saved-cards/charge again with the same body.
} else {
  // hard failure — res.error / res.code (see Error Codes below)
}

// Step 4 (optional) — detach a saved card
await fetch(`/api/landing/${appId}/saved-cards/delete`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'parent@example.com', sessionId, paymentMethodId: cards[0].id }),
}).then(r => r.json());
```

> ⚠️ **Always check the requires-action branch before treating a non-success
> as a hard failure.** An SCA-triggered card (`requires_action`) is
> *recoverable*: re-prompt the customer on-session with the returned
> `clientSecret` via `stripe.confirmCardPayment()`, then retry the same
> charge call. Only `code` values other than `requires_action` are true
> failures.

### Error Codes

The `charge`, `setup-intent`, `list`, and `delete` endpoints return a
structured error envelope `{ error, code }` (HTTP 4xx/5xx) for hard
failures. The off-session SCA case is returned as a normal HTTP 200 with
`success: false, code: "requires_action"` so it can be branched on without
parsing an error body.

| `code` | Meaning |
|--------|---------|
| `requires_action` | Card needs SCA — recover on-session via `confirmCardPayment(clientSecret)` then retry (HTTP 200, `success: false`). |
| `no_customer` | The contact has no saved cards / no Stripe Customer yet. |
| `payment_method_not_owned` | The `paymentMethodId` does not belong to this contact's saved cards. |
| `rate_limited` | Too many repeated charge failures in the rolling window — back off. |
| `invalid_input` | Missing/invalid fields (e.g. non-positive `amount`, missing `paymentMethodId`). |
| `stripe_error` | Upstream Stripe error (declines, network, etc.). |

## API Reference

### POST /api/payments/subscribe

Create a subscription checkout session.

**Request Body:**
| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `priceId` | string | No | - | Stripe Price ID (if using pre-created prices) |
| `priceCents` | number | No | 500 | Custom price in cents ($5.00 = 500) |
| `currency` | string | No | 'usd' | Three-letter ISO currency code (e.g., 'usd', 'eur', 'gbp'). Only used with `priceCents`, not with `priceId` |
| `trialDays` | number | No | 7 | Number of trial days |
| `interval` | string | No | 'month' | Base billing unit: 'month', 'year', 'week', or 'day'. The actual billing cadence is `interval` × `intervalCount` — e.g. `interval: 'month'` with `intervalCount: 6` bills **every 6 months**. Don't assume only monthly/annual exist; any cadence is reachable by combining these two fields (see "Billing cadence: interval × intervalCount" below) |
| `customerEmail` | string | No | - | Pre-fill customer email |
| `successUrl` | string | No | current page | Redirect after successful payment |
| `cancelUrl` | string | No | current page | Redirect if customer cancels |
| `metadata` | object | No | - | Custom metadata for the subscription |
| `promoCode` | string | No | - | Stripe promotion code ID (promo_xxx) to pre-apply a discount. If not provided, customers can enter their own promo code at checkout |
| `intervalCount` | number | No | 1 | Multiplier on `interval` that sets the billing cadence. `interval: 'month', intervalCount: 3` = quarterly; `intervalCount: 6` = **semiannual (every 6 months)**; `interval: 'week', intervalCount: 2` = every 2 weeks. Stripe caps a billing cycle at one year, so the maximums are `month`×12 or `year`×1 (combinations longer than a year are rejected) |
| `introPriceCents` | number | No | - | Intro price in cents (triggers intro pricing mode) |
| `introInterval` | string | No | 'month' | Intro billing interval |
| `introIntervalCount` | number | No | 1 | Intro interval count |
| `introIterations` | number | No | 1 | Number of intro billing cycles |
| `regularPriceCents` | number | No | - | Regular price after intro (required with introPriceCents) |
| `regularInterval` | string | No | 'year' | Regular billing interval after intro |
| `regularIntervalCount` | number | No | 1 | Regular interval count |
| `billingPlanId` | string | No | - | Identifier for the billing plan (for tracking) |
| `billingPlanName` | string | No | - | Display name of the billing plan |

**Response:**
```json
{
  "success": true,
  "checkoutUrl": "https://checkout.stripe.com/...",
  "sessionId": "cs_...",
  "mode": "platform",
  "trialDays": 7,
  "priceCents": 500
}
```

#### Billing cadence: interval × intervalCount

The billing cycle is **`interval` × `intervalCount`**, not a fixed list of
plans. `interval` is the base unit and `intervalCount` multiplies it, so you
can bill on any cadence — don't assume only monthly and annual exist.

| Cadence | `interval` | `intervalCount` |
|---------|------------|-----------------|
| Weekly | `'week'` | `1` (or omit) |
| Every 2 weeks | `'week'` | `2` |
| Monthly | `'month'` | `1` (or omit) |
| **Quarterly (every 3 months)** | `'month'` | `3` |
| **Semiannual (every 6 months)** | `'month'` | `6` |
| Annual | `'year'` | `1` (or omit) |
| Biannual (every 2 years) | `'year'` | `2` — ❌ rejected, exceeds Stripe's 1-year cap |

**Stripe limit:** a recurring billing cycle can't be longer than one year.
The maximum valid combinations are `month` × 12 or `year` × 1; anything longer
(e.g. `year` × 2 for a true biannual plan) is rejected by Stripe. Use a
1-year cycle instead.

**Example — semiannual subscription ($60 billed every 6 months):**
```typescript
const { checkoutUrl } = await fetch('/api/payments/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
  body: JSON.stringify({
    priceCents: 6000,      // $60.00 charged each cycle
    interval: 'month',     // base unit
    intervalCount: 6,      // × 6  →  bills every 6 months (semiannual)
    trialDays: 7,
    customerEmail: 'customer@example.com',
    successUrl: window.location.origin + '/welcome'
  })
}).then(r => r.json());

window.location.href = checkoutUrl;
```

### POST /api/payments/checkout

Create a one-time payment checkout session.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | number | Yes | Amount in cents ($49.99 = 4999) |
| `productName` | string | No | Name shown in checkout |
| `productDescription` | string | No | Description shown in checkout |
| `currency` | string | No | Default: 'usd' |
| `customerEmail` | string | No | Pre-fill customer email |
| `successUrl` | string | No | Redirect after success |
| `cancelUrl` | string | No | Redirect if cancelled |
| `metadata` | object | No | Custom metadata |

**Response:**
```json
{
  "success": true,
  "checkoutUrl": "https://checkout.stripe.com/...",
  "sessionId": "cs_...",
  "mode": "platform"
}
```

### GET /api/payments/status/:sessionId

Check the status of a payment session.

**Response:**
```json
{
  "status": "complete",
  "paymentStatus": "paid",
  "customerEmail": "customer@example.com",
  "amountTotal": 500,
  "currency": "usd",
  "mode": "subscription"
}
```

### GET /api/payments/list

List payments filtered by workspace or space. Use for internal admin tools.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | string | Conditional | Filter by workspace ID |
| `spaceId` | string | Conditional | Filter by space ID |
| `configId` | string | Conditional | Filter by config ID |
| `limit` | number | No | Max results (default 100) |

At least one of `workspaceId`, `spaceId`, or `configId` is required.

**Response:**
```json
{
  "success": true,
  "payments": [
    {
      "id": "pi_abc123",
      "amount": 4999,
      "currency": "usd",
      "status": "succeeded",
      "customerEmail": "customer@example.com",
      "created": "2025-01-06T12:00:00.000Z",
      "paymentMode": "platform"
    }
  ],
  "total": 1
}
```

### GET /api/payments/subscriptions

List subscriptions filtered by workspace or space.

**Query Parameters:** Same as `/api/payments/list`

**Date semantics:** `created` is the original subscription creation/signup timestamp. `currentPeriodStart` is the current billing period start and advances on renewal; do not label it as a new signup date in dashboards. `currentPeriodEnd` is the period end/renewal boundary.

For Stripe Connect admin dashboards, prefer `/api/stripe-connect/subscriptions`: it returns `customerEmail`, `customerName`, `created_iso`, `current_period_start_iso`, `current_period_end_iso`, latest invoice fields, and cursor pagination so dashboards do not need to join subscriptions against a partial customers page.

**Response:**
```json
{
  "success": true,
  "subscriptions": [
    {
      "id": "sub_abc123",
      "status": "active",
      "currentPeriodStart": "2025-01-01T00:00:00.000Z",
      "currentPeriodEnd": "2025-02-01T00:00:00.000Z",
      "cancelAtPeriodEnd": false,
      "customerEmail": "customer@example.com",
      "created": "2025-01-01T00:00:00.000Z",
      "paymentMode": "connect"
    }
  ],
  "total": 1
}
```

### Saved Payment Methods (Card on File)

These endpoints let a returning customer pay again without re-entering a card
and without a subscription. See the full guide in
[Saved Payment Methods (Card on File)](#saved-payment-methods-card-on-file).
All accept `{ email, sessionId }` on the JSON body for server-side identity;
never pass a raw `contactId`.

#### POST /api/landing/:appId/saved-cards/setup-intent

Create a SetupIntent so the client can attach a card with Stripe Elements
(no charge). Confirm the returned `clientSecret` with
`stripe.confirmCardSetup()`.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Contact email (identity) |
| `sessionId` | string | Yes | Landing session id stored at registration |

**Response:**
```json
{
  "clientSecret": "seti_..._secret_...",
  "setupIntentId": "seti_...",
  "customerId": "cus_..."
}
```

#### POST /api/landing/:appId/saved-cards/list

List the contact's saved cards. Expired cards are filtered out server-side.

**Request Body:** `{ email, sessionId }` (both required)

**Response:**
```json
{
  "cards": [
    { "id": "pm_...", "brand": "visa", "last4": "4242", "expMonth": 12, "expYear": 2028 }
  ]
}
```

#### POST /api/landing/:appId/saved-cards/charge

One-click off-session charge against a saved card. Funds settle on the
workspace's connected Stripe account.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Contact email (identity) |
| `sessionId` | string | Yes | Landing session id stored at registration |
| `paymentMethodId` | string | Yes | A `pm_...` id from `/saved-cards/list` |
| `amount` | number | Yes | Amount in cents (positive integer) |
| `currency` | string | No | Defaults to the workspace currency |
| `description` | string | No | Statement / receipt description |
| `metadata` | object | No | Custom key/value metadata |
| `returnUrl` | string | No | URL Stripe uses for SCA redirects if required |

**Success Response (HTTP 200):**
```json
{
  "success": true,
  "paymentIntentId": "pi_...",
  "status": "succeeded",
  "amount": 499,
  "currency": "usd"
}
```

**Requires-Action Response (HTTP 200 — recoverable, NOT a hard failure):**
```json
{
  "success": false,
  "code": "requires_action",
  "paymentIntentId": "pi_...",
  "clientSecret": "pi_..._secret_...",
  "status": "requires_action",
  "message": "Card requires customer authentication..."
}
```
Re-prompt the customer on-session with `stripe.confirmCardPayment(clientSecret)`,
then retry the same charge call. Hard failures return `{ error, code }` with a
4xx/5xx status (see [Error Codes](#error-codes)).

#### POST /api/landing/:appId/saved-cards/delete

Detach a saved card from the contact.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Contact email (identity) |
| `sessionId` | string | Yes | Landing session id stored at registration |
| `paymentMethodId` | string | Yes | The `pm_...` id to detach |

**Response:**
```json
{ "success": true, "paymentMethodId": "pm_..." }
```

## Space-Level Payment Tracking

To track payments at the space level (for multi-space workspaces), pass `spaceId` when creating checkouts:

```typescript
// With spaceId for filtering
const { checkoutUrl } = await fetch('/api/payments/checkout?spaceId=my-space-id', {
  method: 'POST',
  body: JSON.stringify({ amount: 2999, productName: 'My Product' })
}).then(r => r.json());

// Or in metadata
const { checkoutUrl } = await fetch('/api/payments/checkout', {
  method: 'POST',
  body: JSON.stringify({
    amount: 2999,
    metadata: { spaceId: 'my-space-id' }
  })
}).then(r => r.json());
```

## Payment Configuration

The payment configuration is automatically injected at `data/payment-config.json`:

```json
{
  "enabled": true,
  "mode": "platform",
  "stripeAccountId": null,
  "platformFeeBps": 500,
  "currency": "USD",
  "businessName": "My Business",
  "supportEmail": "support@example.com",
  "defaultTrialDays": 7,
  "defaultPriceCents": 500,
  "defaultInterval": "month",
  "defaultPriceId": null
}
```

### Config Fields

| Field | Description |
|-------|-------------|
| `enabled` | Always true - payments always available |
| `mode` | 'platform' (default) or 'connect' (after Stripe setup) |
| `stripeAccountId` | Connected Stripe account ID (null in platform mode) |
| `platformFeeBps` | Platform fee in basis points (500 = 5%) |
| `defaultTrialDays` | Default trial period (7 days) |
| `defaultPriceCents` | Default subscription price ($5 = 500) |
| `defaultInterval` | Default billing interval: 'month' (default), 'year', 'week', or 'day' |

## Upgrading to Stripe Connect

To receive payments directly into your own Stripe account:

1. Go to your Workspace dashboard
2. Click on "Wallet"
3. Click "Accept Payments" or "Connect Stripe"
4. Complete the Stripe Connect onboarding
5. Once approved, your Space switches to Connect mode

**Benefits of Connect mode:**
- Payments deposited directly to your bank account
- Your brand on customer receipts
- Full access to Stripe Dashboard
- Manage refunds and disputes directly

## Installation Helper

```javascript
// Stripe Payments Helper
export const stripePayments = {
  config: null,

  async loadConfig() {
    if (this.config) return this.config;
    
    try {
      const response = await fetch('/api/space-data/payment-config.json');
      if (response.ok) {
        this.config = await response.json();
      }
    } catch (e) {
      console.warn('Payment config not found');
    }
    return this.config;
  },

  async isEnabled() {
    const config = await this.loadConfig();
    return config?.enabled === true;
  },

  async createSubscription(options = {}) {
    const response = await fetch('/api/payments/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
      body: JSON.stringify({
        priceCents: options.priceCents,
        currency: options.currency,
        trialDays: options.trialDays,
        interval: options.interval,
        priceId: options.priceId,
        promoCode: options.promoCode,
        successUrl: options.successUrl || window.location.origin + '/success',
        cancelUrl: options.cancelUrl || window.location.href,
        customerEmail: options.customerEmail,
        metadata: options.metadata
      })
    });
    return response.json();
  },

  async createCheckout(options) {
    const response = await fetch('/api/payments/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || window.__SPACE_ID__ },
      body: JSON.stringify({
        amount: options.amount,
        productName: options.productName,
        productDescription: options.productDescription,
        currency: options.currency || 'usd',
        successUrl: options.successUrl || window.location.origin + '/success',
        cancelUrl: options.cancelUrl || window.location.href,
        customerEmail: options.customerEmail,
        metadata: options.metadata
      })
    });
    return response.json();
  },

  async getPaymentStatus(sessionId) {
    const response = await fetch(`/api/payments/status/${sessionId}`);
    return response.json();
  },

  redirectToCheckout(checkoutUrl) {
    try {
      if (window.top && window.top !== window) {
        window.top.location.href = checkoutUrl;
        return;
      }
    } catch (_) { /* cross-origin iframe */ }
    window.location.href = checkoutUrl;
  }
};
```

## Use Cases

- SaaS subscriptions with free trials
- Course or content access
- Membership sites
- Digital product sales
- Service booking payments
- Donation collection
- Event ticket sales
- **Repeat purchases without re-entering a card** — "Buy Now" flows,
  coin/credit top-ups, in-app purchases, one-click reorders. Use
  [Saved Payment Methods (Card on File)](#saved-payment-methods-card-on-file)
  instead of forcing a subscription or a full Checkout every time.

## Coupon & Promo Code Management (Connect Mode Only)

Create and manage discount coupons and promotional codes for your Stripe Connect account.

**Note:** These endpoints only work for workspaces with Stripe Connect set up (not platform mode).

### GET /api/stripe-connect/coupons

List all coupons and promo codes for your connected Stripe account.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | string | Yes | Your workspace ID |
| `limit` | number | No | Max results (default 20) |

**Response:**
```json
{
  "coupons": [
    {
      "id": "SAVE20",
      "name": "20% Off",
      "percentOff": 20,
      "amountOff": null,
      "currency": null,
      "duration": "once",
      "durationInMonths": null,
      "valid": true
    }
  ],
  "promotionCodes": [
    {
      "id": "promo_abc123",
      "code": "SUMMER2026",
      "couponId": "SAVE20",
      "active": true,
      "maxRedemptions": 100,
      "timesRedeemed": 5,
      "expiresAt": "2026-08-31T23:59:59.000Z"
    }
  ]
}
```

### POST /api/stripe-connect/coupons

Create a new coupon.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `workspaceId` | string | Yes | Your workspace ID |
| `name` | string | Yes | Display name for the coupon |
| `percentOff` | number | Conditional | Percentage discount (1-100). Either percentOff or amountOff required |
| `amountOff` | number | Conditional | Fixed amount discount in cents. Either percentOff or amountOff required |
| `currency` | string | Conditional | Required if using amountOff (e.g., 'usd') |
| `duration` | string | Yes | 'once', 'repeating', or 'forever' |
| `durationInMonths` | number | Conditional | Required if duration is 'repeating' |
| `maxRedemptions` | number | No | Maximum number of times coupon can be used |
| `redeemBy` | string | No | ISO date after which coupon expires |

**Example - Percentage Discount:**
```typescript
const response = await fetch('/api/stripe-connect/coupons', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    workspaceId: 'your-workspace-id',
    name: '20% Off First Month',
    percentOff: 20,
    duration: 'once'
  })
});
const coupon = await response.json();
```

**Example - Fixed Amount Discount:**
```typescript
const response = await fetch('/api/stripe-connect/coupons', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    workspaceId: 'your-workspace-id',
    name: '$10 Off',
    amountOff: 1000, // $10.00 in cents
    currency: 'usd',
    duration: 'once'
  })
});
```

**Response:**
```json
{
  "id": "SAVE20",
  "name": "20% Off First Month",
  "percentOff": 20,
  "amountOff": null,
  "currency": null,
  "duration": "once",
  "durationInMonths": null,
  "valid": true
}
```

### POST /api/stripe-connect/promo-codes

Create a promotional code for an existing coupon. Promo codes are shareable codes that apply a coupon.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `workspaceId` | string | Yes | Your workspace ID |
| `couponId` | string | Yes | ID of the coupon to attach |
| `code` | string | No | Custom code (auto-generated if not provided) |
| `maxRedemptions` | number | No | Maximum uses for this promo code |
| `firstTimeOnly` | boolean | No | Only valid for first-time customers |
| `minimumAmount` | number | No | Minimum order amount in cents |
| `expiresAt` | string | No | ISO date when promo code expires |

**Example:**
```typescript
const response = await fetch('/api/stripe-connect/promo-codes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    workspaceId: 'your-workspace-id',
    couponId: 'SAVE20',
    code: 'SUMMER2026',
    maxRedemptions: 100,
    expiresAt: '2026-08-31T23:59:59.000Z'
  })
});
```

**Response:**
```json
{
  "id": "promo_abc123",
  "code": "SUMMER2026",
  "couponId": "SAVE20",
  "active": true,
  "maxRedemptions": 100,
  "expiresAt": "2026-08-31T23:59:59.000Z"
}
```

### DELETE /api/stripe-connect/coupons/:couponId

Delete a coupon. This also invalidates any promo codes using this coupon.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | string | Yes | Your workspace ID |

**Example:**
```typescript
await fetch('/api/stripe-connect/coupons/SAVE20?workspaceId=your-workspace-id', {
  method: 'DELETE'
});
```

**Response:**
```json
{
  "success": true,
  "deleted": "SAVE20"
}
```

## Server-Side Subscription Verification

The platform automatically tracks subscription status via Stripe webhooks. When a customer completes checkout, their subscription status is stored server-side in the CRM contact metadata.

### GET /api/space/:spaceId/subscription-status

Check a customer's subscription status by email. This is the **recommended way** to verify subscription access.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Customer's email address |

**Response:**
```json
{
  "status": "active",
  "trialDaysRemaining": 0,
  "trialDays": 7,
  "trialExpired": false,
  "trialStartDate": "2025-01-15T00:00:00.000Z",
  "hasPaymentMethod": true,
  "subscriptionId": "sub_abc123",
  "subscriptionStatus": "active",
  "contactId": "contact-uuid"
}
```

**Status Values:**
| Status | Description |
|--------|-------------|
| `active` | Subscription is active and paid |
| `trial` | Customer is in trial period (maps from Stripe's `trialing`) |
| `registered` | Contact exists but has no Stripe subscription yet (e.g. a registration-based trial). **May still be inside a valid trial — you MUST check `trialExpired` / `trialDaysRemaining` before denying access (see below).** |
| `trial_expired` | Trial ended, no active subscription |
| `canceled` | Subscription was canceled |
| `past_due` | Payment failed, subscription at risk |
| `incomplete` | Initial payment failed or pending |
| `not_registered` | No contact found for this email |

> ⚠️ **Do NOT gate access on `status` alone.** In production, a contact with a valid
> registration-based trial returns `status: "registered"` together with
> `trialExpired: false` and a positive `trialDaysRemaining` — it does **not** return
> `status: "trial"` (that value only maps from Stripe's `trialing` subscription state).
> A naive `switch (data.status)` that only grants access on `active`/`trial` will
> wrongly reject valid trial users.
>
> **Required access-decision order:**
> 1. If `subscriptionStatus === 'active'` (the raw Stripe status) → **grant full paid access.**
>    Raw `subscriptionStatus: "active"` always takes precedence over any trial fields,
>    even if the trial fields look expired or stale.
> 2. Else if `status` is `active` or `trial` → grant access.
> 3. Else if `trialExpired === false && trialDaysRemaining > 0` → **grant trial access**,
>    even when `status` is `registered`.
> 4. Otherwise → deny access (expired trial, canceled, past due, or not registered).

**Example Usage:**
```typescript
async function checkSubscriptionStatus(email: string) {
  const spaceId = window.SPACE_ID; // Injected by platform
  const response = await fetch(
    `/api/space/${spaceId}/subscription-status?email=${encodeURIComponent(email)}`
  );
  const data = await response.json();
  
  // IMPORTANT: never decide access from `data.status` alone.
  // 1) Raw Stripe subscriptionStatus 'active' always wins over trial fields.
  if (data.subscriptionStatus === 'active' || data.status === 'active') {
    return { hasAccess: true, message: 'Full access' };
  }
  // 2) A valid, non-expired trial grants access — including contacts where
  //    status is 'registered' (registration trials do NOT return status 'trial').
  if (data.status === 'trial' || (data.trialExpired === false && data.trialDaysRemaining > 0)) {
    return { hasAccess: true, message: `${data.trialDaysRemaining} days left in trial` };
  }
  switch (data.status) {
    case 'trial_expired':
      return { hasAccess: false, message: 'Trial expired - please subscribe' };
    case 'canceled':
      return { hasAccess: false, message: 'Subscription canceled' };
    case 'past_due':
      return { hasAccess: false, message: 'Payment failed - please update payment method' };
    default:
      return { hasAccess: false, message: 'Please register' };
  }
}
```

### Example: useSubscription Hook

Here's an example React hook pattern for subscription state management (adapt to your needs):

```typescript
// hooks/useSubscription.ts (example implementation)
import { useState, useEffect, useCallback } from 'react';

export function useSubscription(email: string | null) {
  const [status, setStatus] = useState<string>('loading');
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(0);
  const [trialExpired, setTrialExpired] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!email) return;
    setIsLoading(true);
    try {
      const spaceId = (window as any).SPACE_ID;
      const res = await fetch(
        `/api/space/${spaceId}/subscription-status?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();
      setStatus(data.status);
      setTrialDaysRemaining(data.trialDaysRemaining || 0);
      setTrialExpired(data.trialExpired === true);
      setSubscriptionStatus(data.subscriptionStatus || null);
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  useEffect(() => { refetch(); }, [refetch]);

  // Raw Stripe subscriptionStatus 'active' always takes precedence. A non-expired
  // trial with days remaining is valid even when status is 'registered'.
  const hasAccess =
    subscriptionStatus === 'active' ||
    ['active', 'trial', 'trialing'].includes(status) ||
    (!trialExpired && trialDaysRemaining > 0);
  
  return { status, trialDaysRemaining, hasAccess, isLoading, refetch };
}

// Usage in component
function PremiumContent() {
  const { status, trialDaysRemaining, hasAccess, isLoading } = useSubscription(userEmail);

  if (isLoading) return <div>Loading...</div>;
  
  if (!hasAccess) {
    return (
      <div>
        <p>Subscribe to access premium content</p>
        <button onClick={() => startSubscription()}>Subscribe Now</button>
      </div>
    );
  }

  return <div>Premium content here...</div>;
}
```

## Subscription Data Architecture

Contact **metadata** is the single source of truth for all subscription state. Every endpoint — app runtime, CRM dashboard, agent queries — reads from the same metadata fields on the CRM contact. This ensures consistency across the entire platform.

### How It Works

1. **Customer signs up** — Contact created in CRM with `trialStartDate` in metadata
2. **Customer completes checkout** — Stripe sends `checkout.session.completed` webhook
3. **Platform updates contact metadata** — Writes `subscriptionId`, `subscriptionStatus`, `stripeCustomerId`, `planTier` into the contact's metadata
4. **Subscription changes** — Stripe sends `customer.subscription.updated/deleted` webhooks
5. **Platform keeps metadata in sync** — Updates `subscriptionStatus` on every change
6. **All consumers read metadata** — App runtime, CRM dashboard, subscriber queries all derive state from the same metadata fields

### Contact Metadata Fields (Source of Truth)

| Field | Description |
|-------|-------------|
| `subscriptionStatus` | Current Stripe status: `active`, `trialing`, `canceled`, `past_due`, `incomplete`, `unpaid` |
| `planTier` | Subscription tier (e.g., `companion`, `guide`) |
| `stripeCustomerId` | Stripe customer ID (`cus_xxx`) |
| `subscriptionId` | Stripe subscription ID (`sub_xxx`) |
| `subscriptionCreatedAt` | When subscription was created (ISO timestamp) |
| `subscriptionUpdatedAt` | Last status update time (ISO timestamp) |
| `trialStartDate` | When trial period began (ISO timestamp, set on registration) |
| `trialEndDate` | When Stripe trial ends (ISO timestamp, from Stripe) |
| `trialDays` | Length of trial in days (default 7) |
| `cancelAtPeriodEnd` | Whether subscription will cancel at period end |
| `currentPeriodEnd` | When current billing period ends |
| `manualSubscriptionOverride` | Object with `tier`, `grantedBy`, `reason`, `expiresAt` for manual access grants |

### Computed Status (Derived from Metadata)

All endpoints use a shared `computeSubscriptionState()` function that reads metadata and returns a normalized status:

| Status | Description |
|--------|-------------|
| `active` | Subscription is active and paid |
| `trialing` | Customer is in trial period |
| `trial_expired` | Trial ended, no active subscription |
| `canceled` | Subscription was canceled |
| `past_due` | Payment failed, subscription at risk |
| `incomplete` | Initial payment failed or pending |
| `not_registered` | No subscription data found |
| `manual_override` | Access granted manually by entrepreneur |

## Querying Subscribers

### List Subscribers (Metadata-Based)

Query contacts by subscription metadata. No tags required — queries metadata directly using Postgres JSON operators.

**Authentication required.** This read returns customer emails and Stripe
customer ids, so it is workspace-authorized. It answers the workspace owner
(the in-workspace dashboards, which attach the owner's session automatically)
and server-side callers running for that same workspace. An anonymous request
gets `401`; a credential for a different workspace gets `404`. It is not
callable from a visitor's browser — put the read in a server function and
return only what the UI needs.

```
GET /api/crm/subscribers/:workspaceId
GET /api/crm/subscribers/:workspaceId?planTier=companion
GET /api/crm/subscribers/:workspaceId?planTier=companion,guide
GET /api/crm/subscribers/:workspaceId?status=active
GET /api/crm/subscribers/:workspaceId?planTier=guide&limit=50
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `planTier` | string | No | Filter by plan tier. Supports comma-separated values for multiple tiers (e.g., `companion`, `companion,guide`) |
| `status` | string | No | Filter by raw Stripe status (e.g., `active`, `trialing`) |
| `limit` | number | No | Max results (default 200, max 500) |

**Response:**
```json
{
  "success": true,
  "subscribers": [
    {
      "id": "contact-uuid",
      "email": "customer@example.com",
      "name": "Jane Doe",
      "planTier": "companion",
      "status": "active",
      "subscriptionId": "sub_xxx",
      "stripeCustomerId": "cus_xxx",
      "trialDaysRemaining": 0,
      "hasPaymentMethod": true,
      "manualOverride": null,
      "lastPaymentAmount": 8,
      "lastPaymentCurrency": "USD",
      "createdAt": "2025-01-15T00:00:00.000Z"
    }
  ],
  "total": 1,
  "activeCount": 1,
  "trialCount": 0,
  "overrideCount": 0,
  "expiredCount": 0
}
```

### Using in Server Functions (Hooks)

```javascript
// Call the platform path with the sandbox `fetch`. The runner recognises it,
// routes it to the platform and authenticates it for the workspace this
// function is executing for — you attach nothing. There is no
// `platform.callAPI` helper; a relative path or `https://audos.com/...`
// both work, and `workspaceId` is already bound in the sandbox.
const res = await fetch(`/api/crm/subscribers/${workspaceId}?planTier=companion`);
const subs = await res.json();

for (const sub of subs.subscribers) {
  await platform.sendEmail({
    to: sub.email,
    subject: 'Your weekly check-in',
    html: `<p>Hi ${sub.name || 'there'}!</p>`
  });
}
```

### CRM Tags (Derived, Not Required for Queries)

When payment events occur, the platform also applies CRM tags as a convenience. These are **derived from metadata** and can be used for visual filtering in the CRM dashboard, but are not the primary query mechanism.

| Tag | When Applied |
|-----|-------------|
| `subscriber` | Contact has an active or trialing subscription |
| `subscriber-{planTier}` | Contact has subscription at a specific tier |
| `subscriber-canceled` | Subscription was canceled |
| `subscriber-past-due` | Subscription payment is overdue |

### Backfill Existing Subscribers

If you had payments before this system was added, run a one-time backfill.
The same authentication rule applies as for the read above — call it from a
server function, or as the workspace owner:

```
POST /api/crm/subscribers/:workspaceId/backfill
POST /api/crm/subscribers/:workspaceId/backfill?dryRun=true  (preview only)
```

This scans Stripe for paid invoices, matches them to CRM contacts by email, and updates their metadata with subscription details.

## Security Notes

- Customer payment info never touches your app
- Stripe handles all PCI compliance
- Platform fees automatically calculated
- Secure checkout via Stripe Hosted Page
- Subscription status verified server-side (cannot be faked by clients)
