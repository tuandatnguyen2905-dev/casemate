# Apollo Leads Integration

Search, enrich, and manage leads using Apollo.io's comprehensive B2B contact database. Find potential customers, partners, or media contacts for outreach.

## How It Works

The Apollo integration connects your Space to Apollo.io's database of 275M+ business contacts. You can:

1. **Search Leads** - Find contacts by job title, industry, company size, location
2. **Enrich Contacts** - Get verified emails, photos, LinkedIn profiles
3. **Save Leads** - Store qualified leads in your Space for follow-up

## Quick Start

### 1. Search for Leads

```typescript
const response = await fetch('/api/leads/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'marketing automation',
    personTitles: ['VP Marketing', 'CMO', 'Director of Marketing'],
    personSeniorities: ['director', 'vp', 'c_suite'],
    includeSimilarTitles: true,
    limit: 25
  })
});

const { people, pagination } = await response.json();
// people[] contains name, title, company, email (if available), etc.
```

### 2. Enrich a Contact

```typescript
// Get additional data: photo, LinkedIn URL, verified email
const response = await fetch('/api/leads/enrich', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    apolloPersonId: 'abc123def456...' // From search results
  })
});

const { photoUrl, linkedinUrl, email, emailStatus } = await response.json();
```

### 3. Save a Lead

```typescript
const response = await fetch('/api/space-data/leads.json');
const existingLeads = response.ok ? await response.json() : [];

const newLead = {
  id: crypto.randomUUID(),
  apolloPersonId: person.id,
  name: person.name,
  title: person.title,
  company: person.organization_name,
  email: person.email,
  linkedinUrl: person.linkedin_url,
  status: 'new',
  addedAt: new Date().toISOString()
};

await fetch('/api/space-data/leads.json', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify([...existingLeads, newLead])
});
```

## API Reference

### POST /api/leads/search

Search Apollo's database for contacts matching your criteria.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | No | Keyword search (e.g., "AI startup", "real estate") |
| `personTitles` | string[] | No | Job titles to match |
| `personLocations` | string[] | No | Locations (cities, states, countries) |
| `organizationIndustries` | string[] | No | Industry keywords |
| `organizationDomains` | string[] | No | Company domains (e.g., `["google.com"]`) |
| `personSeniorities` | string[] | No | Seniority levels (see below) |
| `emailStatus` | string[] | No | Filter by email status (e.g., `["verified"]`) |
| `employeeRanges` | string[] | No | Company size ranges (see below) |
| `includeSimilarTitles` | boolean | No | Include similar job titles (default true when personTitles set) |
| `limit` | number | No | Results per page (max 100, default 25) |
| `page` | number | No | Page number (default 1) |

**Seniority Values:**
- `entry` - Entry level
- `senior` - Senior individual contributor
- `manager` - Manager
- `director` - Director
- `vp` - Vice President
- `c_suite` - C-Level executives
- `owner` - Owner/Founder

**Employee Ranges:**
- `1,10` - 1-10 employees
- `11,50` - 11-50 employees
- `51,200` - 51-200 employees
- `201,500` - 201-500 employees
- `501,1000` - 501-1000 employees
- `1001,5000` - 1001-5000 employees
- `5001,10000` - 5001-10000 employees
- `10001` - 10000+ employees

**Response:**
```json
{
  "people": [
    {
      "id": "5f8a1234567890abcdef1234",
      "name": "Jane Smith",
      "first_name": "Jane",
      "last_name": "Smith",
      "title": "VP of Marketing",
      "headline": "Marketing Leader | B2B SaaS",
      "email": "jane@company.com",
      "email_status": "verified",
      "linkedin_url": "https://linkedin.com/in/janesmith",
      "photo_url": "https://...",
      "city": "San Francisco",
      "state": "California",
      "country": "United States",
      "organization_name": "TechCorp",
      "organization": {
        "name": "TechCorp",
        "website_url": "https://techcorp.com",
        "industry": "Software",
        "estimated_num_employees": 250
      },
      "seniority": "vp"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 25,
    "total_entries": 1542,
    "total_pages": 62
  }
}
```

### POST /api/leads/enrich

Enrich a contact with additional data (photo, LinkedIn, verified email).

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `apolloPersonId` | string | Yes | Apollo person ID from search results |

**Response:**
```json
{
  "success": true,
  "photoUrl": "https://...",
  "linkedinUrl": "https://linkedin.com/in/...",
  "email": "verified@email.com",
  "emailStatus": "verified",
  "name": "Jane Smith",
  "firstName": "Jane",
  "lastName": "Smith",
  "headline": "VP of Marketing at TechCorp"
}
```

**Email Status Values:**
- `verified` - Email has been verified
- `unverified` - Email is guessed/unverified
- `pending` - Verification in progress
- `unavailable` - No email available

## Common Search Patterns

### Find Decision Makers in Your Industry

```typescript
const { people } = await fetch('/api/leads/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'software development',
    personTitles: ['CEO', 'CTO', 'VP Engineering', 'Director of Engineering'],
    personSeniorities: ['vp', 'c_suite', 'director'],
    employeeRanges: ['51,200', '201,500'], // SMB companies
    limit: 50
  })
}).then(r => r.json());
```

### Find Journalists and Media Contacts

```typescript
const { people } = await fetch('/api/leads/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'technology startups AI',
    personTitles: ['journalist', 'reporter', 'editor', 'writer'],
    limit: 50
  })
}).then(r => r.json());
```

### Find Potential Customers by Location

```typescript
const { people } = await fetch('/api/leads/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    personTitles: ['Real Estate Agent', 'Broker', 'Property Manager'],
    personLocations: ['Miami, Florida', 'Fort Lauderdale, Florida'],
    limit: 100
  })
}).then(r => r.json());
```

## Lead Data Storage

Store leads in your Space's data folder for persistence:

```typescript
// leads.json structure
interface Lead {
  id: string;              // Your internal ID
  apolloPersonId: string;  // Apollo's ID for enrichment
  name: string;
  title: string;
  company: string;
  email?: string;
  emailStatus?: string;
  linkedinUrl?: string;
  photoUrl?: string;
  location?: string;
  status: 'new' | 'contacted' | 'responded' | 'qualified' | 'unqualified';
  notes?: string;
  addedAt: string;
  contactedAt?: string;
}
```

## Use Cases

- **Sales Prospecting** - Find and qualify potential customers
- **Recruiting** - Source candidates by role and location
- **PR Outreach** - Find journalists covering your industry
- **Partnership Development** - Identify potential partners
- **Customer Research** - Understand your market landscape

## Rate Limits

Apollo enforces rate limits on API calls. The integration handles this automatically with:
- Automatic retry with backoff
- Rate limit header tracking
- Queueing of requests when limits are reached

## Error Handling

All endpoints return clear error responses:

- `400` — Invalid request body (missing required fields, bad types, malformed `apolloPersonId`)
- `500` — Enrichment returned a non-API failure (e.g., no person data found)
- `502` — Upstream Apollo API returned an error (e.g., rate limited, server error)
- `503` — `APOLLO_API_KEY` is not configured

**Example error response:**
```json
{
  "error": "Apollo API key is not configured. Please add APOLLO_API_KEY to your secrets."
}
```

**Validation error response (400):**
```json
{
  "error": "Invalid search criteria",
  "details": [
    { "code": "too_small", "path": ["limit"], "message": "Number must be greater than or equal to 1" }
  ]
}
```

## Notes

- Email enrichment may use Apollo credits - the integration tracks this
- Not all contacts have verified emails available
- Photo and LinkedIn URLs may not be available for all contacts
- Results are cached briefly to reduce API calls
- The `apolloPersonId` must be a valid 24-character hex string from Apollo search results
