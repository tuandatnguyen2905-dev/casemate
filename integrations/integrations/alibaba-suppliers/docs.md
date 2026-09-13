# Alibaba Suppliers Integration

Find products and suppliers on Alibaba for any product idea. Search returns the product listing title, price range, a thumbnail image, and a link out to the Alibaba product page — everything an app needs to surface real sourcing options for a product idea.

> **What the official Sourcing search returns:** the Alibaba.com Open Platform Sourcing search is a **product-offer** search — each result is a product listing, not a company record. Product-level fields (`name`/`productTitle`, `priceRange`, `productUrl`, `thumbnailUrl`, `id`) are populated; company-level fields (`location`, `moq`, `leadTimeDays`, `verified`, `rating`, `yearsActive`) are **not provided by this endpoint and come back `null`**. Render them defensively. The `filters` below that depend on those fields (`verifiedOnly`, `minMoq`, `maxMoq`, `country`) will therefore drop most/all results — they are kept for forward-compatibility with a future supplier-detail endpoint.

## Category
E-commerce / Sourcing

## How It Works

This integration proxies a product/supplier search against Alibaba and normalizes the results into a consistent shape. Your app sends a product query (use **simple manufacturing terms** for best results — e.g. `"stainless steel water bottle"`, not `"my premium eco hydration solution"`) and gets back a list of suppliers you can render, shortlist, or save into your own workspace data.

Provider credentials live server-side — your app never handles an Alibaba API key.

## API Endpoint

```
POST /api/suppliers/search
```

**Request Body:**
| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `query` | string | ✅ | — | Product to source. Use simple manufacturing terms. |
| `pageSize` | number | — | `20` | Results per page (1–50). |
| `page` | number | — | `1` | Page number for pagination. |
| `filters` | object | — | — | Optional result filters (see below). |
| `filters.verifiedOnly` | boolean | — | — | Only return verified suppliers. |
| `filters.minMoq` | number | — | — | Drop suppliers whose MOQ is below this. |
| `filters.maxMoq` | number | — | — | Drop suppliers whose MOQ is above this. |
| `filters.country` | string | — | — | Match suppliers whose location contains this string. |
| `workspaceId` | string | — | — | Workspace to bill the search to. Also resolved from the `x-app-id` header. |

**Response:**
```json
{
  "suppliers": [
    {
      "id": "1601234567890",
      "name": "Shenzhen Acme Manufacturing Co., Ltd.",
      "location": "Guangdong, China",
      "verified": true,
      "priceRange": "$2.50 - $4.80",
      "moq": 500,
      "leadTimeDays": 25,
      "productUrl": "https://www.alibaba.com/product-detail/...",
      "thumbnailUrl": "https://s.alicdn.com/...jpg",
      "productTitle": "Custom Stainless Steel Water Bottle 500ml",
      "rating": 4.7,
      "yearsActive": 8
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalResults": 240,
    "totalPages": 12
  }
}
```

| Field | Description |
|---|---|
| `suppliers[].id` | Stable identifier for the supplier/product result |
| `suppliers[].name` | Supplier / company name |
| `suppliers[].location` | Supplier location (province, country) — may be `null` |
| `suppliers[].verified` | Whether the supplier is verified / gold / trade-assured |
| `suppliers[].priceRange` | Human-readable price range (e.g. `"$2.50 - $4.80"`) — may be `null` |
| `suppliers[].moq` | Minimum order quantity — may be `null` |
| `suppliers[].leadTimeDays` | Estimated production/lead time in days — may be `null` |
| `suppliers[].productUrl` | Link out to the Alibaba product/supplier page |
| `suppliers[].thumbnailUrl` | Product thumbnail image |
| `suppliers[].productTitle` | The matched product listing title |
| `suppliers[].rating` | Supplier rating (0–5) when available |
| `suppliers[].yearsActive` | Years the supplier has been on Alibaba |
| `pagination.totalResults` | Estimated total matches (may be `null`) |

## Pricing

Each supplier search costs **$0.01**, billed to the workspace wallet when a `workspaceId` (or `x-app-id` header) is supplied. Charges use the platform spending gate: if the provider call fails after the charge, the charge is **automatically refunded**. Searches without a workspace are not billed.

## Quick Start

```typescript
const response = await fetch('/api/suppliers/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'stainless steel water bottle',
    pageSize: 20,
    filters: { verifiedOnly: true, maxMoq: 1000 },
    workspaceId, // bills this workspace's wallet
  }),
});

const { suppliers, pagination } = await response.json();
suppliers.forEach((s) => {
  console.log(`${s.name} — ${s.priceRange} — MOQ ${s.moq} — ${s.productUrl}`);
});
```

## Helper Function

```typescript
interface Supplier {
  id: string;
  name: string;
  location: string | null;
  verified: boolean;
  priceRange: string | null;
  moq: number | null;
  leadTimeDays: number | null;
  productUrl: string | null;
  thumbnailUrl: string | null;
  productTitle: string | null;
  rating: number | null;
  yearsActive: number | null;
}

export const alibabaSuppliers = {
  async search(
    query: string,
    options: {
      pageSize?: number;
      page?: number;
      filters?: {
        verifiedOnly?: boolean;
        minMoq?: number;
        maxMoq?: number;
        country?: string;
      };
      workspaceId?: string;
    } = {},
  ): Promise<{ suppliers: Supplier[]; pagination: any }> {
    const response = await fetch('/api/suppliers/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, ...options }),
    });
    const data = await response.json();
    if (!response.ok) {
      // 402 carries the canonical insufficient_funds shape
      throw new Error(data.message || data.error || 'Supplier search failed');
    }
    return data;
  },
};
```

## Error Handling

| Status | Meaning |
|---|---|
| `400` | Invalid request body (missing `query`, bad types). Body includes `details`. |
| `402` | Insufficient wallet balance. Body is the canonical `insufficient_funds` shape. |
| `429` | Rate limit exceeded (30 searches/min per workspace or IP). |
| `502` | Upstream Alibaba provider returned an error (the wallet charge was auto-refunded). |
| `503` | Alibaba credentials are not configured (`ALIBABA_APP_KEY` / `ALIBABA_APP_SECRET`). |

**Insufficient funds (402):**
```json
{
  "code": "insufficient_funds",
  "required": 0.01,
  "available": 0.00,
  "shortfall": 0.01,
  "headroomMultiplier": 1.0,
  "message": "Insufficient wallet balance for Alibaba supplier search. Required: $0.01. Available: $0.00. Add $0.01 to continue."
}
```

**Validation error (400):**
```json
{
  "error": "Invalid search criteria",
  "details": [
    { "code": "too_small", "path": ["query"], "message": "query is required" }
  ]
}
```

## Use Cases

- **Product sourcing** — find manufacturers for a product idea and compare MOQs/pricing.
- **Cost research** — surface price ranges before committing to a product line.
- **Supplier shortlisting** — let users save promising suppliers into workspace data for follow-up.
- **Product Lab flows** — pair with image/3D tooling to go from concept → sourcing.

## Operator Configuration

This integration calls the official **Alibaba.com Open Platform** Sourcing
Solution API (`https://openapi-api.alibaba.com/rest{api_path}`) with
HMAC-SHA256 request signing. Configure server-side:

| Variable | Type | Required | Description |
|---|---|---|---|
| `ALIBABA_APP_KEY` | secret | ✅ | Open Platform App Key |
| `ALIBABA_APP_SECRET` | secret | ✅ | Open Platform App Secret (signs requests) |
| `ALIBABA_ACCESS_TOKEN` | secret | ✅ | OAuth access token. The Sourcing search is a buyer/business API and **requires** a valid access token (obtained via the Open Platform OAuth `code → /auth/token/create` flow). |
| `ALIBABA_SEARCH_API_PATH` | env | — | API path for the Sourcing product search. Default `/eco/buyer/product/search` (the confirmed live Sourcing search API). |
| `ALIBABA_REQUIRE_TOKEN` | env | — | `true` when the search API requires `access_token` (forces `ALIBABA_ACCESS_TOKEN`). Default for the Sourcing search is `true`. |

> **Auth & request note:** The Sourcing search API
> (`/eco/buyer/product/search`) rejects requests without a valid
> `access_token` (`MissingParameter` / `IllegalAccessToken`). It takes a
> single object parameter `param0` — a JSON string `{ "keyword", "index",
> "size" }` where `index` is the 1-based page number and `size` is the page
> size (all three required). Access tokens are issued per the Open Platform
> OAuth flow (buyer authorizes the app → you receive a `code` → exchange it
> at `/auth/token/create`) and expire, so they must be refreshed
> periodically.

The service signs requests per the Open Platform spec (ASCII-sorted
name+value concatenation, prefixed with the API path, HMAC-SHA256 keyed by the
App Secret, hex uppercase) and normalizes the response defensively, so it
tolerates the common field-name variants (`snake_case`/`camelCase`) and the
`*_response.result` envelope without a code change.

## Notes

- **Use simple manufacturing terms** for best results — describe the physical product, not your brand.
- Some fields (`moq`, `priceRange`, `leadTimeDays`, `location`) may be `null` when the provider doesn't supply them — render defensively.
- This integration covers **search only**. RFQ/quote requests, direct supplier messaging, and shortlist/shipment management are out of scope — apps layer those on top using their own workspace data.
- Supplier **detail** (full contact info, certifications, product gallery) is a planned future addition (`GET /api/suppliers/:supplierId`) and is not yet available.
- Alibaba only — other marketplaces (Made-in-China, Global Sources) are not covered.
