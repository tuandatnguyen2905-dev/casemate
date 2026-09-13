# Domain Registration Integration

Wallet-gated, idempotent purchase of new apex domains through DNSimple,
with automatic Cloudflare hostname setup and auto-attachment to the
permalink-host registry. Every attempt — including aborted attempts — is
written to `domain_purchase_audit` so an incident can reconstruct exactly
which user approved which spend.

> **Task #1235.** Replaces the bare `POST /api/domains/register-with-cloudflare`
> path for app-driven flows. The underlying registrar work is unchanged;
> this integration adds the wallet-gating layer (canonical
> `insufficient_funds` shape, idempotency, audit, refund-on-failure) and
> the post-success permalink-host attach side-effect.

## Endpoints

All endpoints are mounted under `/api/workspaces/:workspaceId/domains`.

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/quote` | DNSimple availability + price (no charge, no audit-impacting outcome) |
| `POST` | `/preview-spend` | Wallet preview against the quoted price; returns `insufficient_funds` if low |
| `POST` | `/register` | Idempotent purchase with audit + refund-on-failure |
| `GET` | `/audit` | Per-workspace audit feed (default 50, max 200) |
| `GET` | `/` | List `purchased_domains` rows for this workspace |

### `POST /register`

```json
{
  "domain": "myapp.com",
  "userConfirmed": true,
  "idempotencyKey": "optional-stable-key"
}
```

`userConfirmed: true` is required when the request originates from an
agent context (presence of `x-audos-agent` header). Human-origin requests
do not need it.

The route:
1. Asserts user-approval (agent vs human).
2. Quotes DNSimple, checks wallet balance with safety headroom.
3. Returns `402 insufficient_funds` if the wallet cannot fund it.
4. Reserves an idempotency row; replays return the cached response with
   `idempotent: true` and **never** re-charge the wallet.
5. Delegates to the canonical registrar route (single source of charging).
6. On success, auto-attaches the apex + `www.<apex>` to the permalink-host
   registry so app authors can immediately publish pages on it.
7. On failure (registrar error, Cloudflare error), the underlying route
   has already refunded; this layer flips the audit row to `failed`.

### Insufficient-funds response (402)

```json
{
  "code": "insufficient_funds",
  "required": 12.99,
  "available": 5.00,
  "shortfall": 7.99,
  "headroomMultiplier": 1.0,
  "message": "Insufficient wallet balance for Register domain myapp.com. Required: $12.99 . Available: $5.00. Add $7.99 to continue.",
  "domain": "myapp.com",
  "registrationPrice": 12.99
}
```

This shape is shared with `phone-numbers/purchase` and any future
wallet-gated integration. Render it as an "Add $X to continue" CTA.

## Environment

| Var | Default | Notes |
| --- | --- | --- |
| `WALLET_SAFETY_HEADROOM_MULTIPLIER` | `1.0` | Multiplier applied to `required` before computing `shortfall`. Set >1 to require buffer for FX / TLD price drift. |
| `DNSIMPLE_API_TOKEN` / `DNSIMPLE_ACCOUNT_ID` | — | Required to quote and register. |
| `CLOUDFLARE_API_TOKEN` | — | Required for hostname setup (existing). |

## Audit row outcomes

| Outcome | When |
| --- | --- |
| `quoted` | `POST /quote` succeeded |
| `insufficient_funds` | `POST /register` rejected at the wallet gate |
| `registered` | Full registrar + Cloudflare setup completed |
| `failed` | Underlying registrar route returned non-2xx (refunded by the underlying route) |

## See also

- `permalink-pages` — uses the auto-attached hosts.
- `ai-phone-calls` — same `insufficient_funds` shape, same idempotency helper.
- `APP_INTEGRATION_MANIFEST.md` — runtime registry.
